### 1. 比较时间前后

可以先使用 Date.parse() 或者 new Date() 将时间字符串转为时间戳，然后相减，即可得出时间前后
```
var time1 = Date.parse(timeStr1) // 转化时间字符串为时间戳
var time2 = new Date(timeStr2) // 转化时间字符串为时间戳
var res = time1 - time2 // 判断时间前后
```

### 2. 全选 input 的文字
```
input.selectionStart = 0
input.selectionEnd = input.value.length
```

