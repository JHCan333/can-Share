# 解决san框架下ie8浏览器刷新时input值残留问题

 最近一直在用san框架，来开发一个兼容ie8的项目，多多少少碰到了一些问题。其中一个问题是在ie8浏览器下刷新页面，会偶现input的值残留的问题。

针对这个问题，是利用了san的路由来解决的。当页面刷新的时候，监听刷新事件，先跳转到一个空页面，再跳转回来，就会把input的数值清空掉。

上代码：

```JavaScript
//解决ie8下，input值的残留问题
if(browserType() === "IE8"){ 
    // 在刷新页面的时候，会先触发onbeforeunload事件，在此把当前页面的路由暂存到cookie，然后跳转到一个事先写好的空页面 common。
    window.onbeforeunload = function () {
        $.cookie('lastHash', '')
        if (!!window.location.hash && window.location.hash !== '#/') {
            $.cookie('lastHash', window.location.hash)
            window.location.href = '#/common'
        }
    };
    // 在执行触发 onload 事件时，将暂存到cookie中的路由取出，并且跳转到原页面。会看到input中残留的值清空了。
    window.onload = function () {
        if (!!$.cookie('lastHash') && $.cookie('lastHash') !== '#/') {
            window.location.href = $.cookie('lastHash')
            $.cookie('lastHash', '')
        }
    };
}
```
