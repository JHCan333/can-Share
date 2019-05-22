/**
 * @author 靳宏灿
 * @date 2019/5/21
 * @time 上午9:41
 * @Description: 文章路由列表
 */
const menuList = function(){
    return [
        {path: '/browserRender', name: 'browserRender'},
        {path: '/confirmClickdIfThis', name: 'confirmClickdIfThis'},
        {path: '/cssProblemOfIe6', name: 'cssProblemOfIe6'},
        {path: '/differencesOfThese', name: 'differencesOfThese'},
        {path: '/nrmOrder', name: 'nrmOrder'},
        {path: '/nvmOrder', name: 'nvmOrder'}
    ]
}

function getMenuList (aheadRoute = '/blog') {
    return menuList().map(function (seg) {
        seg.path = `${aheadRoute}${seg.path}`
        return seg
    })
}

export { menuList, getMenuList }