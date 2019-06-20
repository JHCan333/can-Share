1. 通过方法 getBoundingClientRect，如下：`推荐`

```JavaScript
let domToTop = dom.getBoundingClientRect().top
let domToLeft = dom.getBoundingClientRect().left
let domToBottom = dom.getBoundingClientRect().bottom
let domToRight = dom.getBoundingClientRect().right
```

2. 循环获取offsetLeft，求加和；`不推荐，易出错`

```JavaScript
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
},
```



