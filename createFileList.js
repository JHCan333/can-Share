/**
 * @author 靳宏灿
 * @date 2019/9/3
 * @time 上午10:26
 * @Description: 创建文件列表，并且生成每个文件夹下的 config.js 文件
 */

var fs = require('fs')
var path = require('path')

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('../can-Share')
// 文章列表
var articleList = []
// 数据缓存
var dataStash = {}
// 所需展示的文件类型
var fileShowTypeList = ['.md', '.html']
// 日志记录
var logList = []
var date = new Date()
var year = date.getFullYear()

var month = date.getMonth() + 1
var day = date.getDate()
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()
var current = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second

// 判断是生成 config 还是 list
var ifConfig, ifList = false
if (~process.argv.indexOf('config')) {
    ifConfig = true
} else if (~process.argv.indexOf('list')) {
    ifList = true
} else if (!~process.argv.indexOf('config') && !~process.argv.indexOf('list')) {
    ifConfig = ifList = true
}

//调用文件遍历方法
fileDisplay(filePath)

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay (filePath, lastDir) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename)
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (error, stats) {
                    if (error) {
                        console.warn('获取文件stats失败')
                    } else {
                        var isFile = stats.isFile()//是文件
                        var isDir = stats.isDirectory()//是文件夹
                        // 对含 tips 文件夹下的 符合 fileShowTypeList 后缀名的文件进行处理，其余的滤掉
                        if (isFile && ~filedir.indexOf('tips') && ~fileShowTypeList.indexOf(path.extname(filename))) {
                            // 文章 list，用于生成 articleList.js
                            var title = filename.split('.')[0]
                            // 生成 文件 list
                            if (ifList) {
                                var historyData = getLastConfig(lastDir)
                                var {moduleName} = historyData
                                console.log(lastDir, title)
                                var {finishExtent, tags} = historyData[title]
                                articleList.push({
                                    title,
                                    moduleKey: lastDir,
                                    imgSrc: 'home/images/titleBackground.jpg',
                                    articleUrl: filename,
                                    moduleName,
                                    tags,
                                    finishExtent
                                })
                                // 生成 articleList.js
                                writeArticleList(articleList)
                            }
                            // 生成 config 文件
                            if (ifConfig) {
                                // 配置文件所需缓存对象，用于生成每个文件夹下的 config.js
                                if (dataStash[lastDir]) {
                                    dataStash[lastDir].push(title)
                                } else {
                                    dataStash[lastDir] = [title]
                                }
                                // 生成每个文件夹下的 config.js
                                createConfigFile(lastDir, dataStash[lastDir])
                            }
                        }
                        // 对包含 tips 字段的除了 node_modules 的文件夹执行递归操作
                        if (isDir && filename !== 'node_modules' && ~filename.indexOf('tips')) {
                            fileDisplay(filedir, filename)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            })
        }
    })
}

// var a = {
//     title: '互联网行业常用术语',
//     moduleKey: 'basic-tips',
//     imgSrc: 'home/images/road.jpg',
//     articleUrl: '互联网行业常用术语.md',
//     moduleName: '',
//     tags: [''],
//     finishExtent: ''
// }

// 写入到 articleList.js 文件
function writeArticleList (data) {
    var data = 'var articleList = ' + JSON.stringify(data)
    fs.writeFile(filePath + '/' + 'articleList.js', data + '\n', function (err) {
        if (err) throw err
        // console.log("写入成功");
    })
}

// 创建每个文件夹下的配置文件 config.js
function createConfigFile (modulePath, list) {
    var configPath = filePath + '/' + modulePath + '/config.js'
    logList.push('\n configPath：\n')
    logList.push(configPath)
    recordLog(logList)
    var historyData = getLastConfig(modulePath)
    logList.push('\n historyData: \n')
    logList.push(historyData)
    recordLog(logList)
    var data = {}
    list.map(function (seg) {
        data[seg] = historyData[seg] || {
            tags: [],
            finishExtent: 1 // 完成情况 0：未完成；1：已完成；2：初步完成，待完善
        }
    })
    data['moduleName'] = historyData['moduleName'] || ''
    data = 'var config = ' + JSON.stringify(data) + ';\n' + 'module.exports = config;'
    logList.push('\n data: \n')
    logList.push(data)
    recordLog(logList)
    fs.writeFile(configPath, data + '\n', function (err) {
        if (err) throw err
        // console.log("写入成功");
    })
}

// 获取上一版本的配置文件
function getLastConfig (modulePath) {
    var configPath = filePath + '/' + modulePath + '/config.js'
    return require(configPath)
}

// 记录日志
function recordLog (logList) {
    var str = logList.join(' ')
    fs.writeFile(filePath + '/log/' + 'log' + current + '.txt', str + '\n', function (err) {
        if (err) throw err
    })
}