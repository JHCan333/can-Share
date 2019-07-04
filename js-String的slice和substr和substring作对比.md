## 总体而言，slice，substr，substring主要对比如下：
1. slice，截取方式为start到end，end不写则直到字符串末尾。特点是start和end可以为负数，n与n-str.length指代的位置相同；start和end的前后顺序不可交换；
2. substr，截取方式为start和length，length不写则直到字符串末尾。特点是start可以为负数，n与n-str.length指代的位置相同。length若为0或者负数，则默认为0，返回空字符串；start和end的前后顺序不可交换；
3. substring，截取方式为 start和end，若为负数，则默认为0，end若不填写，则到末尾。但是当end在前时，start和end的前后顺序可以自由交换。
 

### 示例如下：

```JavaString
var str = '1234567890'

// slice接收两个参数，start和end，可以为负数，其中，n与n-str.length指代的相同
str.slice(2) // '34567890'  如果省略了end，则截取到结尾
str.slice(-8) // '34567890'
str.slice(2,4) // '34'
str.slice(6,4) // '' start必须在end前，否则就截取不到
str.slice(-6,-4) // '56'
str.slice(-4,-6) // ''
// 更多示例
str.slice(-10,-1) // '1234567890'
str.slice(-10,9) // '1234567890'
str.slice(-10,1) // '1'
str.slice(0,1) // '1'


//substr 接收两个参数，start和length，start可以为负数，其中，n与n-str.length指代的相同;而length可以省略不写，直接到字符串末尾，length若为负数，则对应为0
str.substr(1) // "23456789"
str.substr(-1) // '9'
str.substr(1,4) // "2345"
str.substr(-8,4) // "2345"


// substring 接受两个参数，start和end，若为负数，则默认为0，但是start和end可以根据情况进行自动交换；若取消end的填写，则直到末尾
str.substring(5) // "6789" 不指定end，则截取到末尾
str.substring(-6) // "123456789"  若参数为负数，则默认为0
str.substring(5,8) // "678" 顺序会自动交换，从前到后截取
str.substring(8,5) // "678" 顺序会自动交换，从前到后截取
str.substring(8,-1) // "12345678"  -1会变为0，然后截取从0到8的字符串
str.substring(-8,-2) // "" start和end均为负数，则默认为0
```
