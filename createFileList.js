/**
 * @author 靳宏灿
 * @date 2019/9/3
 * @time 上午10:26
 * @Description: 遍历文件夹，并且生成：
 *               1:每个模块的配置文件config.js；
 *               2:文章列表 articleList.js;
 *               3:每次打包的log文件；
 */

var fs = require('fs')
var path = require('path')

// 存放公共配置信息和参数的对象
var commonObj = {
    filePath: path.resolve('../can-Share'), //解析需要遍历的文件夹
    articleList: [], // 文件信息 list
    dataStash: {}, // config 数据缓存
    fileShowTypeList: ['.md', '.html'], // 所需展示的文件类型
    logList: [], //日志记录 list
    ifConfig: false, // 是否生成 config 文件
    ifList: false, // 是否生成 articleList 文件
    logSaveDays: 3, // 日志保留天数
}

var logInfoList = []

// module的文件夹和name对应关系
var moduleNameMap = {
    'basic-tips': '基础知识',
    'browser-tips': '浏览器',
    'css-tips': 'css',
    'database-tips': '数据库',
    'demos-tips': 'demo',
    'dev-tips': '开发经验',
    'form-tips': '表单',
    'http-tips': 'http',
    'js-tips': 'javaScript',
    'mobile-tips': '移动端',
    'optimizing-tips': '性能',
    'react-tips': 'React',
    'safe-tips': '前端安全',
    'san-tips': 'San',
    'vue-tips': 'Vue',
    'work-experience-tips': '工作经验',
    'money-tips': '理财知识'
}

outputSet() // 配置输出的文件
fileDisplay(commonObj.filePath) // 遍历文件夹，输出 配置文件、日志以及文章列表

/**
 * 文件遍历，并做处理
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay (filePath, lastDir) {
    fsReaddir(filePath, (files) => {
        files.forEach(function (filename) { //遍历读取到的文件列表
            var filedir = path.join(filePath, filename) //获取当前文件的绝对路径
            getFileStats(filedir, (stats) => { // 获取file Stats对象
                var {ifList, ifConfig, logSaveDays} = commonObj
                if (stats.isFile()) { // 对含 tips 文件夹下的 符合 fileShowTypeList 后缀名的文件进行处理，其余的滤掉
                    if (ifShowType(filedir, filename)) {
                        var title = filename.split('.')[0]
                        ifList && createArticleList(lastDir, title, filename) // 生成 文件 articleList
                        ifConfig && createConfigFile(lastDir, title) // 生成每个文件夹下的 config.js
                    } else if (lastDir === 'log') {
                        var thisTime = new Date().getTime()
                        var times = logSaveDays * 24 * 60 * 60 * 1000
                        logInfoList.push(stats.birthtimeMs)
                        var logInfoPath = commonObj.filePath + '/' + 'logInfoList.js'
                        writeFile(logInfoPath, JSON.stringify(logInfoList))
                        if ((thisTime - stats.birthtimeMs) > times) {
                            fs.unlink(filedir, (err) => {
                                if (err) throw err
                                console.log(filename + ' : 文件已删除')
                            })
                        }
                    }
                } else if (stats.isDirectory() && ifRecursion(filename)) { // 对带有 tips 字段的文件夹以及日志 log 执行递归操作
                    fileDisplay(filedir, filename)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
            })
        })
    })
}

// 判断是否递归遍历文件.1:存放文章的文件夹，名字带tips；2:存放日志的文件夹，名字为log
function ifRecursion (filename) {
    var ifArticleDir = filename !== 'node_modules' && ~filename.indexOf('tips')
    var ifLogDir = filename === 'log'
    return ifArticleDir || ifLogDir
}

// 是否是 fileShowTypeList 中规定的可以展示的文件类型
function ifShowType (filedir, filename) {
    return ~filedir.indexOf('tips') && ~commonObj.fileShowTypeList.indexOf(path.extname(filename))
}

/*** 配置文件config的相关配置 start ***/
// 创建每个文件夹下的配置文件 config.js
function createConfigFile (modulePath, title) {
    var {dataStash, filePath} = commonObj
    // 配置文件所需缓存对象，记录文件夹下的文件名字，用于生成每个文件夹下的 config.js
    if (dataStash[modulePath]) {
        dataStash[modulePath].push(title)
    } else {
        dataStash[modulePath] = [title]
    }
    var list = dataStash[modulePath]
    var configPath = filePath + '/' + modulePath + '/config.js'
    var historyData = getLastConfig(modulePath)
    var data = createConfigData(historyData, list, modulePath)
    writeFile(configPath, data)
    recordLog(commonObj.logList) // 写下日志
}

// 获取上一版本的配置文件
function getLastConfig (modulePath) {
    var configPath = commonObj.filePath + '/' + modulePath + '/config.js'
    getLogData('configPath', configPath)
    var historyData = {}
    try {
        historyData = require(configPath)
        if (typeof historyData !== 'object') {
            historyData = {}
        }
    } catch (e) {
        historyData = {}
    }
    return historyData
}

// 生成配置文件的数据
function createConfigData (historyData, list, modulePath) {
    var data = {}
    list.map(function (seg) {
        data[seg] = historyData[seg] || {
            tags: [],
            finishExtent: 1 // 完成情况 0：未完成；1：已完成；2：初步完成，待完善
        }
    })
    data['moduleName'] = moduleNameMap[modulePath] || ''
    data = 'var config = ' + JSON.stringify(data) + ';\n' + 'module.exports = config;'
    getLogData('data', data)
    return data
}

/*** 配置文件config的相关配置 end ***/

/*** 日志处理程序 start ***/
// 处理日志的数据.label 为标签，data 为数据
function getLogData (label, data) {
    commonObj.logList.push('\n ' + label + ': \n')
    commonObj.logList.push(data)
}

// 记录日志
function recordLog (logList) {
    var writeFilePath = commonObj.filePath + '/log/' + getCurrentTime() + '.txt'
    writeFile(writeFilePath, logList.join(' '))
}

/*** 日志处理程序 end ***/

/*** 生成 articleList 相关配置 start ***/
function createArticleList (lastDir, title, filename) {
    var historyData = getLastConfig(lastDir)
    var {moduleName} = historyData
    var {finishExtent, tags} = historyData[title] || {}
    commonObj.articleList.push({
        title,
        moduleKey: lastDir,
        imgSrc: 'home/images/titleBackground.jpg',
        articleUrl: filename,
        moduleName,
        tags,
        finishExtent
    })
    // 生成 articleList.js
    writeArticleList(commonObj.articleList)
}

// 写入到 articleList.js 文件
function writeArticleList (data) {
    var data = 'var articleList = ' + JSON.stringify(data)
    var writeFilePath = commonObj.filePath + '/' + 'articleList.js'
    writeFile(writeFilePath, data)
}

/*** 生成 articleList 相关配置 end ***/

// 编写文件
function writeFile (writeFilePath, data) {
    fs.writeFile(writeFilePath, data + '\n', function (err) {
        if (err) throw err
    })
}

// 获取当前时间
function getCurrentTime () {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second
}

// 判断是单独生成 config 还是 articleList，或者是两者都生成
function outputSet () {
    if (~process.argv.indexOf('config')) {
        commonObj.ifConfig = true
    } else if (~process.argv.indexOf('list')) {
        commonObj.ifList = true
    } else if (!~process.argv.indexOf('config') && !~process.argv.indexOf('list')) {
        commonObj.ifConfig = commonObj.ifList = true
    }
}

// node 读取文件信息
function fsReaddir (readPath, success) {
    fs.readdir(readPath, function (err, files) {
        if (err) {
            console.log(err)
        } else {
            success && success(files)
        }
    })
}

// 获取file Stats对象
function getFileStats (filedir, success) {
    fs.stat(filedir, function (error, stats) {
        if (error) {
            console.log('获取文件stats失败')
        } else {
            success && success(stats)
        }
    })
}