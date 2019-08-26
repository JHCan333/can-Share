# vue 的 data 为何最好写成函数

一句话来解释：vue的data最好写成函数是出于对组件复用的考虑。

这里有一个vue组件的示例：
```
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

可以将组件任意次数进行复用
```
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

若data不写成函数，如下:
```
data: {
  count: 0
}
```
那当点击这三个按钮的时候，会使用同一个data，点击其中一个会影响其他。
