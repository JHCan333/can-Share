
```javaScript

// 字符串的原生方法扩展， 去除空格， ie8中没有此方法， 所以需要自行扩充
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

// 设置一个对象，存储 style 中的属性
let styleObj = {}
dom.style.cssText.split(';').map((seg) => {
    let spList = seg.split(':')
    // ie8 中使用 trim 获取的字符串 会出现变大写情况，所以需要手动转小写
    spList[0] && (styleObj[spList[0].trim().toLowerCase()] = spList[1].trim().toLowerCase())
})

console.log(`styleObj`, styleObj)

styleObj.doSomeThing() // 处理styleObj

// 对 min-width 进行兼容性处理，当具有 min-width 时同时设置width，因为在ie8上的 min-width 会有问题
if (styleObj['min-width']) {
    if (dom.offsetWidth > parseFloat(styleObj['min-width'])) {
        styleObj['width'] = dom.offsetWidth + 'px'
    } else {
        styleObj['width'] = styleObj['min-width']
    }
}
// 开始拼接cssText字符串
let cssText = ''
for (let prop in styleObj) {
    if (prop && styleObj[prop]) {
        cssText += `${prop}:${styleObj[prop]};`
    }
}

dom.style.cssText = cssText


```
