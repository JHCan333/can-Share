```javaScript
// 通过循环调用，获取到左侧距离
getLeftToWindow (dom) {
    let toLeft = 0
    do {
        toLeft += dom.offsetLeft
        dom = dom.parentNode
    } while (dom.parentNode)
    return toLeft
},
// 通过循环调用，获取到顶部距离
getTopToWindow (dom) {
    let toTop = 0
    do {
        toTop += dom.offsetTop
        dom = dom.parentNode
    } while (dom.parentNode)
    return toTop
}
```
