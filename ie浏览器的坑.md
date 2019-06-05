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
