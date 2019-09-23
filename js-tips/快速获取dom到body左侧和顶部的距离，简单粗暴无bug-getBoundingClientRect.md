# 获取dom到body左侧和顶部的距离-getBoundingClientRect

平时在写js的时候，偶尔会需要用js来获取当前div到 body 左侧、顶部的距离。网上查一查，有很多都是通过offsetTop、offsetLeft来计算出来的。我按照网上的查到的资料用了一次，算出来了一堆错误答案。

下面我要分享的这个方法，兼容性很好（ie4都ok），而且很方便，不会算错。

这个方法就是 getBoundingClientRect。

## 1.getBoundingClientRect方法简介
getBoundingClientRect 返回的是一个 DOMRect 对象，是一组矩形集合，我们这次所使用的返回值主要是left、top、bottom和right。其余的返回值width、height、x、y这次用不到,就不再讨论。
使用方法如下：
```
let domToTop = dom.getBoundingClientRect().top  // dom 的顶边到视口顶部的距离
let domToLeft = dom.getBoundingClientRect().left // dom 的左边到视口左边的距离
let domToBottom = dom.getBoundingClientRect().bottom // dom 的底边到视口顶部的距离
let domToRight = dom.getBoundingClientRect().right // dom 的右边到视口左边的距离
```

### 注意事项：
1. 得到的值是相对于视口而言的，即如果页面的滚动位置发生变化，那么得到的top、left也会发生变化；如果需要计算到body边框的距离，需要再加上网页滚动条的长度。下面会给出完整例子。
2. 这个方法返回的四个值都是相对于当前视口的左上角而言的。即top和bottom是dom的顶边和底边到视口的顶部的距离，同理left和right是相对于视口左边的距离。

### 兼容性

| 属性 | chrome | Edge | Firefox | IE | Opera | Safari |
|----|----|----|----|----|----|----|
| 基础属性：left、top、right、bottom|Yes|12|3|4|Yes|6|
| height、width|Yes|Yes|3.5|9|Yes|Yes|
| x、y|Yes|No|Yes|No|Yes|No|


## 2.计算到body左侧和顶部的距离
因为 getBoundingClientRect 可以获取到视口边界的距离，所以得到的值加上滚动条的长度，就可以得到距离body边界的距离。

demo预览链接，方便大家查验效果 [预览链接](https://jhcan333.github.io/can-Share/preview/getBoundingClientRect.html)

[github地址](https://github.com/JHCan333/can-Share/blob/master/js-tips/%E5%BF%AB%E9%80%9F%E8%8E%B7%E5%8F%96dom%E5%88%B0body%E5%B7%A6%E4%BE%A7%E5%92%8C%E9%A1%B6%E9%83%A8%E7%9A%84%E8%B7%9D%E7%A6%BB%EF%BC%8C%E7%AE%80%E5%8D%95%E7%B2%97%E6%9A%B4%E6%97%A0bug-getBoundingClientRect.md)

实际使用时，直接使用 getScrollPosition 和 getDomToViewPosition这两个方法就好，其余的方法只是为了更好地展现。帮到你的话，点个赞呗~

下面是完整代码：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .box {
            width: 110%;
            height: 200%;
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid red;
        }

        .content {
            width: 20%;
            height: 30%;
            position: absolute;
            top: 30%;
            left: 30%;
            border: 1px solid blue;
        }

        .board {
            position: absolute;
            border: black 1px solid;
            transform: translate(200px, 200px);
        }
    </style>
</head>
<body>
<div class="box">
    <div class="content" id="content"></div>
</div>
<div class="board" id="board">
    <div>展示板：距离body的边框距离 = 视口距离 + 滚动条长度</div>
    <div>
        <span>距离视口左侧距离：</span><span id="toViewLeft"></span>
    </div>
    <div>
        <span>距离视口顶部距离：</span><span id="toViewTop"></span>
    </div>
    <div>
        <span>滚动条水平方向的长度：</span><span id="scrollX"></span>
    </div>
    <div>
        <span>滚动条垂直方向的长度：</span><span id="scrollY"></span>
    </div>
    <div>
        <span>距离body左侧距离：</span><span id="toBodyLeft"></span>
    </div>
    <div>
        <span>距离body顶部距离：</span><span id="toBodyTop"></span>
    </div>
</div>
<script>
    // 此方法是为元素添加事件，并做兼容处理
    function addHandler (element, type, handler) {
        if (element.addEventListener) { // DOM2级 事件处理程序，this 指向元素本身。按照添加的顺序正向执行
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) { // IE 事件处理程序，this 指向 window。按照添加的顺序反向执行
            element.attachEvent('on' + type, handler)
        } else { // DOM0级 事件处理程序。只能绑定一个事件处理程序
            element['on' + type] = handler
        }
    }

    // 获取 当前 滚动条的长度， 水平 && 垂直方向
    function getScrollPosition () {
        let x, y
        if (!!window.pageXOffset) {
            x = window.pageXOffset
            y = window.pageYOffset
        } else {
            x = (document.documentElement || document.body.parentNode || document.body).scrollLeft
            y = (document.documentElement || document.body.parentNode || document.body).scrollTop
        }
        return {x, y}
    }

    // 获取 dom 到视口左侧和顶部的相对位置
    function getDomToViewPosition (id) {
        var dom = document.getElementById(id)
        let rectObject = dom.getBoundingClientRect()
        return {
            domToViewLeft: rectObject.left,
            domToViewTop: rectObject.top
        }
    }

    // 设置展示板的展示位置，随着滚动条的滚动自适应，始终相对于视口左侧和顶部距离 200px
    function setDisplayBoardPosition () {
        let {x, y} = getScrollPosition()
        var board = document.getElementById('board')
        let transform = 'translate(' + (200 + x) + 'px,' + (200 + y) + 'px)'
        board.style.transform = transform

    }

    // 设置展示板的展示信息
    function setDisplayBoardDetail () {
        let {x, y} = getScrollPosition() // 获取滚动条长度
        let {domToViewLeft, domToViewTop} = getDomToViewPosition('content') // 获取到视口的距离
        // 在展示板中显示到视口的距离
        document.getElementById('toViewLeft').innerText = domToViewLeft + 'px'
        document.getElementById('toViewTop').innerText = domToViewTop + 'px'
        // 在展示板中显示滚动条的长度
        document.getElementById('scrollX').innerText = x + 'px'
        document.getElementById('scrollY').innerText = y + 'px'
        // 在展示板中显示距离body左侧、顶部的距离
        document.getElementById('toBodyLeft').innerText = domToViewLeft + x + 'px'
        document.getElementById('toBodyTop').innerText = domToViewTop + y + 'px'
    }

    // 设置展示板的相关信息
    function setDisplayBoard () {
        setDisplayBoardPosition() // 设置展示板的展示位置
        setDisplayBoardDetail() // 设置展示板的详细信息
    }

    // 监听 window 的滚动事件，计算到视口和body左侧和顶部的距离，并且在展示板中展示
    addHandler(window, 'scroll', setDisplayBoard)

</script>
</body>
</html>
```
