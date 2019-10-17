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

