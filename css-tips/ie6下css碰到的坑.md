# ie6上css碰到的坑

前两天在给一个项目做东西的时候，碰到一个有意思的项目，是需要兼容ie6，有一些碰到并且解决的问题，给大家写下来，方便大家以后碰到类似的问题哈～

能帮到你的话，点个赞呗？

## 1.important支持的不够好
### 1.1为什么说不够好？
important某些情况下不能决定最终的样式属性。
### 1.2代码！代码！！
我们通过对颜色的控制说明这一切~
```html
<style type="text/css">
    div {
        width: 100px;
        height: 100px;
        border: aliceblue 2px solid;
    }

    .frist {
        background-color: red !important;
        background-color: blue;
    }

    .second {
        background-color: red !important;
    }

    .third {
        background-color: blue;
    }

    .second {
        background-color: blue;
    }
</style>
<div class="frist"></div>
<div class="second third"></div>
<div class="second"></div>
```
### 1.3 上图！上图！！
| 谷歌 | ie6 |
| ----- | ----- |
| ![](https://jhcan333.github.io/can-Share/image/ie6/1.3.1.png) |  ![](https://jhcan333.github.io/can-Share/image/ie6/1.3.2.png) |

### 1.4我们发现了啥？
```
1.在同一个css代码块中的important没那么强力，会被后续的样式覆盖；
2.不过如果不再同一个css代码块中写的话，你大爷终究是你大爷～
3.所以我们可以利用这个漏洞，写ie6专有的样式了（伪hack）（慎用，不如用ie6的hack写法“_”）
```
## 2.margin双倍问题
### 2.1出现原因
当float和margin同时设置时，就会出现margin双倍的问题
### 2.2代码代码！
```html
<style type="text/css">
     /** 包裹区 **/
    .area {
        width: 200px;
        height: 200px;
        background-color: #00FFFF;
    }

     /** 底部指示区 **/
    .footer {
        width: 200px;
        height: 100px;
        background-color: royalblue;
    }

     /** 测试，margin 的代码块 **/
    .testMargin {
        width: 200px;
        height: 100px;
        float: left;
        margin: 50px;
        background-color: #0079CC;
    }

     /** 50px 指示区 **/
    .checkLine {
        width: 50px;
        float: left;
        height: 100px;
        display: inline-block;
        background-color: #000;
    }

     /** 100px 指示区 **/
    .checkLine2 {
        width: 50px;
        height: 100px;
        display: inline-block;
        background-color: teal;
    }
</style>
<div class="area">
    <div class="testMargin"></div>
</div>
<div class="footer">
    <!-- 50px 指示块 -->
    <span class="checkLine"></span>
    <!-- 100px 指示块 -->
    <span class="checkLine2"></span>
</div>
```
### 2.3来看看效果
| 谷歌 | ie6 |
| ----- | ----- |
|  ![](https://jhcan333.github.io/can-Share/image/ie6/2.3.1.png) | ![](https://jhcan333.github.io/can-Share/image/ie6/2.3.2.png) |

### 2.4.怎么解决？
#### 方案1：
将div设置display：inline
```css
.testMargin {
    width: 200px;
    height: 100px;
    float: left;
    display: inline;
    margin: 50px;
    background-color: #0079CC;
}
```
#### 方案2：
编写ie6的hack
```css
.testMargin {
    width:200px;
    height:100px;
    float:left;
    margin:50px;
    background-color:#0079CC;
    _margin: 50px 25px;
}
```
### 2.5解决结果

![](https://jhcan333.github.io/can-Share/image/ie6/2.5.1.png)


## 3.ie6下图片的会带有蓝灰色背景色
### 3.1 css代码
```html
<style type="text/css">
    .pngImg {
        border: #FF0000 1px solid;
        width: 200px;
        height: 200px;
    }

    .jpgImg {
        border: black 1px solid;
        width: 200px;
        height: 200px;
    }

    .pngSpan {
        border: blue 1px solid;
        display: inline-block;
        width: 200px;
        height: 200px;
        background: transparent url(https://jhcan333.github.io/can-Share/image/ie6/404.png) no-repeat center top;
        background-size: cover;
        _filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="https://jhcan333.github.io/can-Share/image/ie6/404.png", sizingMethod='scale'); /*IE6有效*/
        _background: none; /*IE6有效*/
    }

    .jpgSpan {
        border: brown 1px solid;
        display: inline-block;
        width: 200px;
        height: 200px;
        background: transparent url(https://jhcan333.github.io/can-Share/image/ie6/404.jpg) no-repeat center top;
        background-size: contain;
        _filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="https://jhcan333.github.io/can-Share/image/ie6/404.jpg", sizingMethod='scale'); /*IE6有效*/
        _background: none; /*IE6有效*/
    }
</style>
```
### 3.2 html标签
```html
<span class="pngSpan"></span>
<img class="pngImg" src="https://jhcan333.github.io/can-Share/image/ie6/404.png">
<span class="jpgSpan"></span>
<img class="jpgImg" src="https://jhcan333.github.io/can-Share/image/ie6/404.jpg">
```
### 3.3展示效果
#### 1.谷歌浏览器
![](https://jhcan333.github.io/can-Share/image/ie6/3.3.1.png)

#### 2.IE6浏览器
![](https://jhcan333.github.io/can-Share/image/ie6/3.3.2.png)

### 3.4怎么搞
IE6不支持png背景透明或半透明，所以img标签中的图片会带有背景色，需要借助css滤镜来实现

```css
_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="https://jhcan333.github.io/can-Share/image/404.png",sizingMethod='scale');/*IE6有效*/
_background:none;/*IE6有效*/
```
在这里，首先把background取消，然后使用css滤镜来设置。其中属性前面添加”_”下划线，来表示，只在ie6上使用。

### 3.5现有的封装好的方法

```javascript
<script>
    function correctPNG() {
        var arVersion = navigator.appVersion.split("MSIE")
        var version = parseFloat(arVersion[1])
        if((version >= 5.5) && (document.body.filters)) {
            for(var j = 0; j < document.images.length; j++) {
                var img = document.images[j]
                var imgName = img.src.toUpperCase()
                if(imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                    var imgID = (img.id) ? "id='" + img.id + "' " : ""
                    var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                    var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                    var imgStyle = "display:inline-block;" + img.style.cssText
                    if(img.align == "left") imgStyle = "float:left;" + imgStyle
                    if(img.align == "right") imgStyle = "float:right;" + imgStyle
                    if(img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                    var strNewHTML = "<span " + imgID + imgClass + imgTitle +
                        " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" +
                        "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" +
                        "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                    img.outerHTML = strNewHTML
                    j = j - 1
                }
            }
        }
    }
    function addHandler (element, type, handler) {
        if (element.addEventListener) { // DOM2级 事件处理程序，this 指向元素本身。按照添加的顺序正向执行
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { // IE 事件处理程序，this 指向 window。按照添加的顺序反向执行
            element.attachEvent("on" + type, handler);
        } else { // DOM0级 事件处理程序。只能绑定一个事件处理程序
            element["on" + type] = handler;
        }
    }
    addHandler(window,'load',correctPNG)
</script>
```
将这个js引入项目就可以了

## 4.ie6下的display：inline-block异常问题

### 4.1表现
本是inline的html元素设置为inline-block后，会具有inline-block的特性；
但本是block的html元素设置为inline-block后，会出现不在同行排布的情况；
### 4.2上代码
```html
<style type="text/css">
    .span-inline-block {
        background-color: #7FFFD4;
        display: inline-block;
        width: 100px;
        height: 100px;
        margin: 5px;
    }

    .div-inline-block {
        background-color: #00ff00;
        display: inline-block;
        width: 100px;
        height: 100px;
        margin: 5px;
    }
</style>
<span class="span-inline-block"></span>
<span class="span-inline-block"></span>
<span class="span-inline-block"></span>
<span class="span-inline-block"></span>
<div class="div-inline-block"></div>
<div class="div-inline-block"></div>
<div class="div-inline-block"></div>
<div class="div-inline-block"></div>
```
### 4.3上图
#### 1.谷歌

![](https://jhcan333.github.io/can-Share/image/ie6/4.3.1.png)

#### 2.ie6

![](https://jhcan333.github.io/can-Share/image/ie6/4.3.2.png)

### 4.4怎么搞？
```
1.若无特殊要求，可以把div改为span
2.可以设置float属性。如float为right时，效果如下
```
 ![](https://jhcan333.github.io/can-Share/image/ie6/4.4.1.png)

## 5.ie6下min-height和min-width失效
### 5.1上代码
```html
<style type="text/css">
    .min-div-class {
        min-width: 200px;
        min-height: 200px;
        background-color: #00FF00;
    }
</style>
<div class="min-div-class"></div>
```
### 5.2上对比图
#### 1.谷歌
 ![](https://jhcan333.github.io/can-Share/image/ie6/5.2.1.png)

#### 2.ie6（没错，这是一张空白的图）
 ![](https://jhcan333.github.io/can-Share/image/ie6/5.2.2.png)

### 5.3 怎嘛整？
直接设置width、height。

## 6.ie6下的select宁死不从╥﹏╥...软硬不吃！ﾍ(;´Д｀ﾍ)
### 6.1what？
本来我把select框的样式给调的美美的，比如这样

 ![](https://jhcan333.github.io/can-Share/image/ie6/6.3.1.png)

结果在ie6上乱了套，源码我就不写了，直接写demo

### 6.2 demo!我的代码！！！
```html
<style type="text/css">
    .selectArea{
        position: relative;
        width:100px;
        height:24px;
        line-height:20px;
        padding-left: 5px;
        border:1px  solid #0079cc;
        overflow: hidden;
    }
    .testSelect{
        width:150px;
        line-height:30px;
        margin: -3px 0px;
        border:0px solid transparent;
        outline: none;
        background: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance:none;
    }
    .dropdown{
        position: absolute;
        right:5px;
        top:10px;
    }
</style>
<div class="selectArea">
    <select class="testSelect">
        <option>1</option>
        <option>2</option>
        <option>3</option>
    </select>
    <img class="dropdown" src="https://jhcan333.github.io/can-Share/image/ie6/arrow.png">
</div>
```

### 6.3各个浏览器展示

| 谷歌 |  ![](https://jhcan333.github.io/can-Share/image/ie6/6.3.1.png) |
| ----- | ----- |
| ie8 |  ![](https://jhcan333.github.io/can-Share/image/ie6/6.3.2.png) |
| ie6 |  ![](https://jhcan333.github.io/can-Share/image/ie6/6.3.3.png) |

### 6.4有木有发现ie6下select不听话？
高度~边框 ~ 完全不好整 ~

### 6.5如何解决？

Ie6上看起来整齐就好了，不要什么花里胡哨的东西了~hash走起！ (*T_T*)
```html
<style type="text/css">
    .selectArea {
        position: relative;
        width: 100px;
        height: 24px;
        line-height: 20px;
        padding-left: 5px;
        border: 1px solid #0079cc;
        overflow: hidden;
        _border: 0px #fff solid;
        _padding: 0px;
        _overflow: auto;
    }

    .testSelect {
        width: 150px;
        line-height: 30px;
        margin: -3px 0px;
        border: 0px solid transparent;
        outline: none;
        background: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        _width: 100px;
        _margin: 0px;
    }

    .dropdown {
        position: absolute;
        right: 5px;
        top: 10px;
        _display: none;
    }
</style>
```
差不多是这个效果了吧~（原生的也还是很整齐的啊）

 ![](https://jhcan333.github.io/can-Share/image/ie6/6.5.1.png)

```
ie6上的css问题就先整理到这里了，欢迎大家评论讨论
备注：转载注明出处
```
