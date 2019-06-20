ECMAScript中涉及字符串大小写转换的方法有4个： **toLowerCase()** 、**toLocaleLowerCase()**、**toUpperCase()**和**toLocaleUpperCase()**。其中， **toLowerCase()** 和 **toUpperCase()** 是经典方法。而 **toLocaleLowerCase()** 和 **toLocaleUpperCase()** 方法根据特殊地区返回特定的结果。

示例如下：

```JavaScript
var dotted = 'İstanbul';

console.log('EN-US: ' + dotted.toLocaleLowerCase('en-US'));
// expected output: "i̇stanbul"

console.log('TR: ' + dotted.toLocaleLowerCase('tr'));
// expected output: "istanbul"
```
