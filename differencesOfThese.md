# transform、animation、transition、translate的区别

## 1. transform：2D、3D转换
应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。

## 2. translate 是的一个属性值
例如：
- transform : translate(x,y)
- transform : translate3d(x,y,z)
- transform : translateX(x)
- transform : translateY(y)
- transform : translateZ(z)

## 3. animation  属性指的是动画，是一个简写属性，用于设置六个动画属性：
+ animation-name
+ animation-duration
+ animation-timing-function
+ animation-delay
+ animation-iteration-count
+ animation-direction
## 4. transition 属性设置元素当过渡效果，四个简写属性为：
* transition-property
* transition-duration
* transition-timing-function
* transition-delay

## 简言之：
1. `transform`(变形)是CSS3中的元素的属性，而`translate`只是`transform`的一个属性值；`transform`是`transition`（过渡动画）的`transition-property`的一个属性值。　
2. `animation`（动画）、`transition`（过渡）是css3中的两种动画属性。`animation`强调流程与控制，`transition`强调过渡