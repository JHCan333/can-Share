# css雪碧图（精灵图）与字体图标的介绍以及对比
设想一个实际场景：在一个页面为了展示，我们放置了很多独立的小图片，浏览器在显示页面的时候，就需要向服务器就会发送很多请求，来获取并加载这些小图片，但是这样的话，就会导致请求数量太多，造成资源浪费，以及访问速度变慢。

碰到这样的情况，可以使用两种方式解决这种问题：CSS雪碧图以及字体图标。但是这两种方式也都有不同的适用场景，需要根据实际需求来做取舍。

## 1.CSS雪碧图简介
CSS雪碧图 即 CSS Sprites，也有人叫它CSS精灵图，是一种CSS图像合并技术，该方法是将众多小图标合并到同一张图上，用以减轻http请求压力。然后通过操作CSS的background属性，控制背景的位置以及大小，来展示需要的部分。

不过大背景图还是自己单独一张比较好，此方法适用于图片体积较小且数量较多的情况。

下面就是一张CSS雪碧图，这些图标展示是固定的，数量较多且单个体积小，正适合使用雪碧图。

![雪碧图](https://jhcan333.github.io/can-Share/preview/cssSpritesAndIconFont/images/sprites.png)

下面是demo：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /* 同一张背景图，只是位置不同 */
        .common {
            width: 11px;
            height: 14px;
            background-image: url("https://jhcan333.github.io/can-Share/preview/cssSpritesAndIconFont/images/sprites.png");
            background-repeat: no-repeat;
        }

        .test1 {
            background-position: 0px 0px;
        }

        .test2 {
            background-position: -26px 0px;
        }

        .line div {
            display: inline-block;
        }
    </style>
</head>
<body>
<div class="line">
    <div>test1</div><div class="common test1"></div>
</div>
<div class="line">
    <div>test2</div><div class="common test2"></div>
</div>
</body>
</html>
```
展示效果如下:

![雪碧图预览效果](https://jhcan333.github.io/can-Share/image/CSS_Sprites/sprites_preview.png)

## 2.字体图标简介
通过一些工具软件，将图片转换成字体图标。这些字体图标可以像字体一样使用，可以使用字体相关的CSS属性来对它进行控制。

### 使用步骤如下：
1. 把字体图标下载下来放置到网页所在目录中
2. 通过 @font-face 声明自定义的字体。并应用到需要的地方，这里简单写的，设置成了 * 。如下例：
```
@font-face {
    font-family: 'demo'; // 定义字体的名字
    src: url('fonts/demo.eot?9ruqhl');
    src: url('fonts/demo.eot?9ruqhl#iefix') format('embedded-opentype'),
    url('fonts/demo.ttf?9ruqhl') format('truetype'),
    url('fonts/demo.woff?9ruqhl') format('woff'),
    url('fonts/demo.svg?9ruqhl#demo') format('svg');
    font-weight: normal;
    font-style: normal;
}

* {
    font-family: 'demo' !important; // 在需要的元素中定义所用字体
    speak: none;
}
```

3.为了方便，可以使用专门的 class 表示该图标，并且使用伪类为该元素添加内容，如下例：
```
.icon-close:before {
    content: "\e900";
}

.icon-help:before {
    content: "\e901";
}

.icon-lock:before {
    content: "\e902";
}
```

4.在页面中添加元素并且设置已经设置好的class，如下：
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="./style/style.css">
        <style>
            .icon-large {
                font-size: 40px;
                color:orange;
            }

            .icon-normal {
                font-size: 32px;
                color: #fc5830;
            }

            .icon-small {
                font-size: 24px;
                color:#0079cc;
            }

        </style>
    </head>
    <body>
        <span class="icon-close icon-large"></span>
        <span class="icon-help icon-normal"></span>
        <span class="icon-lock icon-small"></span>
    </body>
</html>
```

5.展示效果如下：

![字体图标预览效果](https://jhcan333.github.io/can-Share/image/CSS_Sprites/icon_font_preview.png)

## 3.两种方式如何取舍？
以上两种方式雪碧图和字体图标都可以解决图片数量多且体积小场景下的问题，但是两者在应用中也是需要根据实际情况来进行判断取舍。

### CSS雪碧图和字体图标对比情况如下
| 对比角度 | CSS雪碧图 | 字体图标 |
|----|----|----|
|做动画| 图片做动画较合适| 做动画的话，不如图片|
|高分辨率| 图片在高分辨率下会模糊 |字体图标是文字，受分辨率影响小|
|多色展示| 图片多色图片展示很好实现 |多色图标目前来看比较难实现|
|图标变换颜色或者其他效果| 需要换一个图片| 改变一下文字的color就好|
|文件体积| 图片体积较大| 字体图标体积较小|
|实现简单icon| 体积大、变化不灵活 |体积小、方便添加效果|

从上面可以看出，CSS雪碧图和字体图标因为本质上的不同（一个是图片，一个是文字），造成了其所适用的场景不同。

在一些对分辨率要求不高、展示的图标色彩丰富、图标变化不多的情况下，可以选用雪碧图。而对于那种多场景多分辨率下展示、单图标颜色单一、图标的颜色变化较多的情况下，比较适合使用字体图标。

github地址：https://github.com/JHCan333/can-Share/tree/master/preview/cssSpritesAndIconFont