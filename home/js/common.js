/**
 * @author 靳宏灿
 * @date 2019/8/28
 * @time 下午2:37
 * @Description: 存放公共方法的js
 */

/**
 * @author 靳宏灿
 * @date 2019/8/28
 * @time 下午2:40
 * @Description: 初始化时页面执行的方法
 */
// function init(){
//     downLoadCssFile('./home/css/common.css')
//     downLoadCssFile('./home/bootStrap/css/bootstrap.css')
// }

// // 手动下载css文件
// function downLoadCssFile (url){
//     let head = document.getElementsByTagName('head')[0];
//     let link = document.createElement('link');
//     link.type = 'text/css';
//     link.rel = 'stylesheet';
//     link.href = url + '?v=' + new Date().getTime();
//     head.appendChild(link)
// }
//
// // 手动下载js文件
// function downLoadJsFile(url){
//     let head = document.getElementsByTagName('head')[0];
//     let jsDom = document.createElement('script');
//     jsDom.type = 'application/javascript';
//     jsDom.src = url + '?v=' + new Date().getTime();
//     head.appendChild(jsDom)
// }

/**
 * @author 靳宏灿
 * @date 2019/8/28
 * @time 下午3:06
 * @Description: 设置主页中心的鼠标事件，生成、取消模糊层
 */
function setBlurModal () {
    $('.home_center_login').mouseenter(function () {
        $('.home_start_blur_modal').show(1, function () {
            $(this).fadeTo('slow', 0.5)
        })
    }).mouseleave(function () {
        $('.home_start_blur_modal').fadeTo('slow', 0, function () {
            $(this).hide()
        })
    })
}

/**
 * @author 靳宏灿
 * @date 2019/8/28
 * @time 下午5:00
 * @Description: 前往指定页面
 */
function goAssignPage (url) {
    console.log('url',url)
    var urlList = ['login', 'content']
    if (url === 'content') {
        $('#login').css('z-index', -5)
        $('#content').css('z-index', 5)
    } else if (url === 'login') {
        $('#content').css('z-index', -5)
        $('#login').css('z-index', 5)
    }
}

/**
 * @author 靳宏灿
 * @date 2019/8/29
 * @time 下午3:37
 * @Description: 文章的数据总览
 */
var contentTotalData = [
    {
        title: '基础知识',
        key: 'basic-tips',
        list: [
            {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            }, {
                title: '代码重用和复用的关系',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '代码重用和复用的关系.md'
            }, {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            }, {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            }, {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            }, {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            }, {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            },
        ]
    },
    {
        title: '浏览器知识',
        key: 'browser-tips',
        list: [
            {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            }, {
                title: '互联网行业常用术语',
                imgSrc: 'home/images/road.jpg',
                articleUrl: '%E4%BA%92%E8%81%94%E7%BD%91%E8%A1%8C%E4%B8%9A%E5%B8%B8%E7%94%A8%E6%9C%AF%E8%AF%AD.md'
            }
        ]
    }
]

/**
 * @author 靳宏灿
 * @date 2019/8/29
 * @time 下午3:36
 * @Description: 设置内容总览区
 */
function setContentPandect (data) {
    var contentStr = ''
    data.map(function (module) {
        contentStr += createRollArea(module)
    })
    console.log('contentStr', contentStr)
    // $('#content').append(contentStr)
}

/**
 * @author 靳宏灿
 * @date 2019/8/30
 * @time 下午3:35
 * @Description: 设置查询结果区
 */
function setSearchResult (data) {
    var searchResultStr = ''
    data.map(function (item) {
        var urlPrefix = 'https://github.com/JHCan333/can-Share/blob/master/' + item.moduleKey + '/'
        searchResultStr += createShowItem(item, urlPrefix)
    })
    $('#home_search_result_list').html(searchResultStr)
}

/**
 * @author 靳宏灿
 * @date 2019/9/3
 * @time 下午9:05
 * @Description: 根据类别筛选文章
*/
function setSearchResultByModuleName (moduleName,node) {
    if(moduleName === 'all'){
        setSearchResult(articleList)
    } else {
        var data = articleList.filter(function(seg){
            return seg.moduleName === moduleName
        })
        setSearchResult(data)
    }
    $(node).parent().parent().children('.home_search_item').removeClass('home_search_condition_selected')
    $(node).parent().addClass('home_search_condition_selected')
}

/**
 * @author 靳宏灿
 * @date 2019/9/3
 * @time 下午9:36
 * @Description: 根据关键字查找对应文章
*/
function setSearchResultByKey () {
    var key = $('#home_search_key').val()
    var data = articleList.filter(function(seg){
        return key ? (~seg.moduleName.indexOf(key) || ~seg.title.indexOf(key)) : true
    })
    setSearchResult(data)
}


/**
 * @author 靳宏灿
 * @date 2019/9/3
 * @time 下午2:33
 * @Description: 设置查询条件区
 */
function setSearchCondition (data) {
    var moduleNameList = [] // 存放 moduleName 的列表
    data.map(function (seg) {
        if (!~moduleNameList.indexOf(seg.moduleName)) {
            moduleNameList.push(seg.moduleName)
        }
    })
    var searchConditionStr = '' // 拼接的查询条件的字符串
    moduleNameList.map(function (seg) {
        var addStr = '<span class="home_search_item">'
            + '<button type="button" class="btn btn-primary btn-sm" onclick="setSearchResultByModuleName(\'' +seg+ '\',this)">' + seg + '</button>'
            + '</span>'
        searchConditionStr += addStr
    })
    $('#home_search_item_group_module_name').append(searchConditionStr)
}

/**
 * @author 靳宏灿
 * @date 2019/8/29
 * @time 下午4:29
 * @Description: 创建滚动区域
 */
function createRollArea (module) {
    var listStr = createRollList(module.list, module.key)
    var rollAreaStr = '<div class="home_roll_area ">' + '<div class="home_roll_title">' + module.title + '</div>' + listStr + '</div>'
    return rollAreaStr
}

/**
 * @author 靳宏灿
 * @date 2019/8/30
 * @time 上午11:31
 * @Description: 创建滚动列
 */
function createRollList (list, key) {
    // 网页链接的前缀
    var urlPrefix = 'https://github.com/JHCan333/can-Share/blob/master/' + key + '/'
    var rollItemStr = ''
    list.map(function (item) {
        rollItemStr += createShowItem(item, urlPrefix)
    })
    return '<div class="home_roll_list_area">'
        + '<div class="home_roll_list">'
        + rollItemStr
        + '</div>'
        + '</div>'
}

/**
 * @author 靳宏灿
 * @date 2019/8/30
 * @time 上午11:33
 * @Description: 创建滚动单位
 */
function createShowItem (item, urlPrefix) {
    return '<div class="home_roll_item col-md-3">'
        + '<div class="home_roll_item_background"'
        +' onclick="window.open(\'' + urlPrefix + item.articleUrl + '\',\'_blank\')">'
        + '<p class="home_roll_item_title item_title">' + item.title + '</p>'
        + '</div>'
        + '</div>'
}