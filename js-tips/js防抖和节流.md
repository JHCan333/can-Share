# 防抖和节流
在处理高频事件，类似于window的resize或者scorll，或者input输入校验等操作时。如果直接执行事件处理器，会增大浏览器的负担，严重的直接卡死，用户体验非常不好。

面对这种情况，我们一般可以采用防抖和节流的方式减少调用频率。同时也不会影响实际效果。

## 一、防抖
防抖的作用是：在事件被触发的n秒后执行回调，如果在这n秒内又被触发，则重新计时。

常见场景：

input校验：在input输入完成后，不需进行额外操作（比如：点击按钮，或者blur事件），而是需要敲完代码通过keydown事件触发校验程序。此时如果不作处理，会导致校验程序频繁触发，影响用户体验。

此时可以使用防抖来解决这个问题。代码如下：
```
<input type="text" onkeydown="checkout(this)" />
<script>
    var timer = null
    // 防抖：当持续时间触发时。一定时间内没有再触发事件，事件处理函数才会执行一次
    function debounce (fn, delay) {
        clearTimeout(timer)
        timer = setTimeout(fn, delay)
    }

    // 校验方法在 1秒内 无操作后执行
    function checkout (input) {
        debounce(function(){
            ifCompliance(input.value)
        },1000)
    }

    // 校验方法，长度小于 7 不规范
    function ifCompliance (val) {
        if(val && val.length < 7){
            alert("不符合规范")
        }
    }
</script>
```

## 二、节流
节流的作用是：在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

常见场景：

如果在一个页面中有很多张图片，就可能会使用懒加载技术，即监听滚动条的改变，而加载图片。为了避免一直触发滚动事件的处理程序，可以使用节流。

节流 demo 如下：
```
// 打印 scroll 的日志
function scrollLog () {
    console.log('scrollLog')
}


// 节流：持续触发事件时，规定在一定时间内只会发生一次。
function throttle (fn, delay) {
    var startTime = Date.now()
    return function () {
        var curTime = Date.now()
        var remain
        if (curTime - startTime >= delay) {
            fn && fn()
            startTime = Date.now()
        }
    }
}

window.addEventListener('scroll', throttle(scrollLog, 1000))
```

防抖和节流的小知识就到这里，如果对你有帮助还请点个赞。