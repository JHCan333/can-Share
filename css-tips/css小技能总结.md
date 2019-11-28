# css小技能总结

### 一、居中系列

#### 1、 水平居中
1. 行内元素: text-align:center
2. 块级元素: margin:0 auto
3. 绝对定位和移动: absolute + transform
4. 绝对定位和负边距: absolute + margin
5. flex布局: flex + justify-content:center

#### 2、 垂直居中
1. 子元素为单行文本: line-height:height
2. absolute + transform
3. flex + align-items:center
4. table: display:table-cell; vertical-align: middle
5. 利用position和top和负margin

#### 3、 水平垂直居中
1. 已知元素宽高:绝对定位+margin:auto;
2. 已知元素宽高: 绝对定位+负margin;
3. 已知元素宽高：绝对定位 + calc，top、left = 50% - calc(50% - 高宽);
4. absolute+transform;
5. flex + justify-content + align-items
6. 针对行内元素:text-align+line-height；
7. writing-mode：需要针对居中元素外部嵌套两层。分别设置为水平、垂直方向，并且设置text-align：center；
8. table 标签：天然垂直居中，再添加text-align:center就行；
9. css-table：通过将元素设置 display:table-cell，再设置水平、垂直居中就好；
10. grid：设置display：grid；align-self,justify-self为center即可；

#### 建议
+ PC端有兼容性要求，宽高固定，推荐absolute + 负margin
+ PC端有兼容要求，宽高不固定，推荐css-table
+ PC端无兼容性要求，推荐flex
+ 移动端推荐使用flex

### 其他
1、cursor：设置鼠标指示器的形状。常用的：default（箭头)，crosshair（十字线），pointer（一只手），wait（程序正忙，一只表或者沙漏），help（指示可用的帮助，问号或者气球）；
2、visible:值为visible时展示，为hidden时，不展示，但是还占位置；
3、多出部分转省略号
```
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```
4、div铺满全屏
```
position:absolute;
top:0;
left:0;
bottom:0;
right:0;
width: 100%;
height: 100%;
```
5、 实现三栏布局的方法：两边固定宽度，中间宽度自适应;
1. flex 布局：两边固定宽度，中间flex为1;
2. 绝对定位 + margin：两边固定宽度，中间absolute + margin:0 200px;
3. 双飞翼布局：通过float实现，两边float:left、right,margin-left:-100%;中间通过margin-left、margin-right保留两侧距离;
4. 圣杯布局:容器设置左右margin，main设置100%；左右两侧根据容器的margin设置负margin、left、right；

6、 CSS就近原则：在CSS优先级相同的时候，CSS遵循后来者居上的原则，同名的属性，写的靠后面的会被渲染，前面的会被覆盖；
