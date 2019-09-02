var fs = require('fs')
var path = require('path')

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('../can-Share')
// 文件列表
var fileArr = []
// 文章列表
var articleList = []
// 数据缓存
var dataStash = {}

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
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败')
                    } else {
                        var isFile = stats.isFile()//是文件
                        var isDir = stats.isDirectory()//是文件夹
                        if (isFile && ~filedir.indexOf('tips')) {
                            fileArr.push(filedir)
                            articleList.push({
                                title: filename.split('.')[0],
                                moduleKey: lastDir,
                                imgSrc: 'home/images/road.jpg',
                                articleUrl: filename
                            })
                            if (dataStash[lastDir]) {
                                dataStash[lastDir].push(filename)
                            } else {
                                dataStash[lastDir] = [filename]
                            }
                            writeFile(fileArr)
                            writeArticleList(articleList)
                            createConfigFile(lastDir, dataStash[lastDir])
                        }
                        if (isDir && filename !== 'node_modules' && ~filename.indexOf('tips')) {
                            fileDisplay(filedir, filename)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            })
        }
    })
}

var a = {
    title: '互联网行业常用术语',
    moduleKey: 'basic-tips',
    imgSrc: 'home/images/road.jpg',
    articleUrl: '互联网行业常用术语.md',
    moduleName: '',
    tags: [''],
    finishExtent: ''  // 完成情况 0：未完成；1：已完成；2：初步完成，待完善
}

// 写入到 filelist.txt 文件
function writeFile (data) {
    var data = data.join('\n')
    fs.writeFile(filePath + '/' + 'filelist.txt', data + '\n', function (err) {
        if (err) throw err
        // console.log("写入成功");
    })
}

// 写入到 articleList.js 文件
function writeArticleList (data) {
    var data = 'var articleList = ' + JSON.stringify(data)
    fs.writeFile(filePath + '/' + 'articleList.js', data + '\n', function (err) {
        if (err) throw err
        // console.log("写入成功");
    })
}

// 创建配置文件
function createConfigFile (modulePath, list) {
    var data = {}
    list.map(function(seg){
        data[seg] = {
            tags: [],
            finishExtent: 1
        }
    })
    data['moduleName'] = ''
    data = JSON.stringify(data)
    fs.writeFile(filePath + '/' + modulePath + '/config.js', data + '\n', function (err) {
        if (err) throw err
        // console.log("写入成功");
    })
}