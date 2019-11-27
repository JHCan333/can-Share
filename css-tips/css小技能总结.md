# css小技能总结

1、cursor：设置鼠标指示器的形状。常用的：default（箭头)，crosshair（十字线），pointer（一只手），wait（程序正忙，一只表或者沙漏），help（指示可用的帮助，问号或者气球）；
2、visible:值为visible时展示，为hidden时，不展示，但是还占位置；
3、多出部分转省略号
```
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

4、 div 垂直水平居中：设置好绝对定位，然后四个方向都为0，margin设置为auo。
```
width:2.5rem;
height:3.1rem;
position:absolute;
margin:auto;
top:0;
left:0;
bottom:0;
right:0;
```

5、div铺满全屏
```
position:absolute;
top:0;
left:0;
bottom:0;
right:0;
width: 100%;
height: 100%;
```

6、 水平居中
1. 行内元素: text-align:center
2. 块级元素: margin:0 auto
3. 绝对定位和移动: absolute + transform
4. 绝对定位和负边距: absolute + margin
5. flex布局: flex + justify-content:center

7、 垂直居中
1. 子元素为单行文本: line-height:height
2. absolute + transform
3. flex + align-items:center
4. table: display:table-cell; vertical-align: middle
5. 利用position和top和负margin

8、 水平垂直居中
1. 已知元素宽高:绝对定位+margin:auto;
2. 已知元素宽高:  绝对定位+负margin;
3. absolute+transform;
4. flex + justify-content + align-items

9、 实现三栏布局的方法：两边固定宽度，中间宽度自适应;
1. flex 布局：两边固定宽度，中间flex为1;
2. 绝对定位 + margin：两边固定宽度，中间absolute + margin:0 200px;
3. 双飞翼布局：通过float实现，两边float:left、right,margin-left:-100%;中间通过margin-left、margin-right保留两侧距离;
4. 圣杯布局:容器设置左右margin，main设置100%；左右两侧根据容器的margin设置负margin、left、right；
