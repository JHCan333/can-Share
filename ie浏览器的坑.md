## ie浏览器的坑


1. input的type不能随便切换，如果想做type切换的话，比如密码框的切换密码展示功能，可以编写两个input，type分别为text和password，跟随切换功能，选择其中一个进行展示；
2. textarea的rows不能为0，或者空''，会报错；
3. 事件的获取需要做兼容：$event || window.event；
4. 事件的target需要做兼容：$event.target || $event.srcElement
5. 对keycode做兼容：$event.keyCode || $event.which || $event.charCode
6. textarea在ie上会有滚动条，可以尝试在外面包裹一层div，使textarea的宽度大于外层div，使外层div遮住滚动条。
7. 使用精灵图【雪碧图】的时候，background-position的位置会有偏差；
8. ie上的垂直滚动条，不包含在width里面；在谷歌浏览器中，则会包含在width里；[设置padding的时候需要注意]
9. ie上的line-height和谷歌里面的不太一样，主要是盒模型的问题。ie中的line-height需要减去上下padding之和。
10. ie8不支持flex布局；
11. ies不支持unset覆盖，比如在前面写了border:1px solid #000,后面如果写border-bottom:unset;的话，不会将bottom-bottom清空。不过设置为none则会有效。
12. ie禁止中文输入：在style中添加ime-mode:disabled;-ms-ime-mode:disabled;
13. ie8上的paste事件：如果在paste事件触发的时候，修改input的value，还是会被paste事件覆盖掉，可以使用setTimeout解决；
14. ie9以及以上ie浏览器，支持中文输入的识别事件。compositionstart中文输入开始，compositionend中文输入结束。如果需要清除中文，可以在compositionend中，对value进行修正；
15. 检测是否是inputNumber所需要的值，【'-','0~9','.'】可以使用 (keyCode !== 8 && keyCode !== 46 && keyCode !== 45 && keyCode < 48) || keyCode > 57 来判断，为false则是需要的值；
16. 非ie浏览器，可以使用 thisDom.selectionStart 获取光标位置；而ie浏览器，则需要
```
let range = document.selection.createRange()
range.collapse(false)
range.setEndPoint('StartToStart', thisInput.createTextRange())
position = range.text.length
```
17. 方法要规划好，避免乱糟糟的
18. js小数相加减，可以考虑扩大10^n倍，n为小数点后的位数。做完加减后，除以10^n；
19. input在ie11上会自带叉号。如下清除
```
// 清除input在ie11上的自带的叉号
input::-ms-clear{display:none;}
input::-ms-reveal{display:none;}
```
20. ie8对通过js对style进行操作的时候，如果同一时间段先后对==绝对定位==的元素修改`left`和right，会造成定位失准，==目前规律不明，待仔细排查==；

