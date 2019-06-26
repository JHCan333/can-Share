# 1.js学习笔记[抄书之路]---数据类型
## 1.1五种基本数据类型，也称简单数据类型：
+ Undefined : 声明了变量，但是没有初始化。
+ Null：被认为是一个空对象的引用
+ Boolean：布尔值，true、false
+ Number：数值
+ String：字符串

## 1.2一种复杂数据类型：
+ Object

# 2.检测数据类型
 typeof用于检测数据类型， 属于操作符而不是函数，结果对应情况如下：
+ "undefined"  ----此值未定义或者没有初始化
+ "boolean"-------布尔值
+ "string"---------字符串
+ "number"--------数值
+ "object"---------对象或者null
+ "function"-------函数

```
备注：Safari 5、Chrome 7 以及之前的版本，对于正则表达式调用 typeof 会返回 "function" ,而在其他浏览器会返回 "Object"
```

# 3.各个数据类型介绍
## 3.1 Undefined
### 3.1.1 含义：
声明了变量，但是没有初始化。

### 3.1.2 与未定义（声明）的变量的区别
和未定义的变量不同，未定义的变量在使用时会报错，但是使用typeof检测时，都会返回undefined。尽量在声明变量时，初始化一下，这样一来，当使用typeof的时候，就能分辨出来是未定义而不是未初始化。

## 3.2 Null
null表示一个空对象的指针。
```javaScript
null === null // true
null == undefined //true
null === undefined // false
```


## 3.3 Boolean
### 3.3.1 含义：
该类型只有两个字面值：true和false，并且区分大小写（也就是说True和False都不是Boolean值）

### 3.3.2 各类型转换为Boolean的对照表
| 数据类型 | 转换为true的值 | 转换为false的值|
|---|---|---|
| Boolean | true | false |
| String | 任何非空字符串 | ""（空字符串）|
| Number | 任何非0数字值（包括无穷大）| 0和NaN |
| Object | 任何不为null的对象 | null |
| Undefined | 不适用 | undefined |

## 3.4 Number
### 3.4.1 number的两种类型
 number使用 IEEE754 格式来表示整数和浮点数（在某些语言中浮点数称为双精度数）

### 3.4.2 整数介绍
为了支持各种数据类型，ECMA-262定义了不同的数值字面量格式。
+ 十进制：最基本的字面量格式为十进制。可以直接这样写 ：
 ```javaScript
var num = 33;
```

+ 八进制：八进制字面值的第一位必须是0，然后是八进制数字序列（0~7）如果字面量中的数值超出了范围，那么前导0将被忽略，后面的数值当做十进制做解析。
```javaScript
// 例如：
var num1 = 070; //八进制的56    
var num2 = 079;//无效的八进制数值，解析为79    
var num3 = 08;//无效的八进制数值，解析为8
```

+ 十六进制：十六进制字面值的前两位必须是0x，后跟任何16进制数字（0-9及A-F或者a-f）
```javaScript
// 例如：
var num4 = 0xA; //十六进制的10 
var num5 = 0x1f; //十六进制的31
```

#### 备注: 
+ 所有以八进制和十六进制表示的数值最终都将被转换为十进制数值。 如
```javaScript
062 * 074 = 3000
0x28 * 0x32 = 2000
```

+ 八进制在严格模式下是无效的
js可以保存+0和-0，+0和-0相等
```javaScript
+0 === -0 // true
```

### 3.4.3 浮点数据类型
#### 3.4.3.1 定义
浮点数值，就是指数值中必须包括一个小数点，并且小数点后至少一位数字
```javaScript
var num1 = 1.1;
var num2 = 0.1;
var num3 = .1; //有效但是并不推荐
```


#### 3.4.3.2 特殊情况
因为保存的的浮点数值需要的内存空间是保存整数类型的两倍，所以，当如下情况发生时，ECMAScript会把浮点数值转换为整数值
小数点后没有跟任何数字
浮点数值本身表示的就是整数
```javaScript
var num1 = 1.;
var num2 = 1.0;
```


#### 3.4.3.3 科学计数法
对于一个极大或者极小的数，可以用e表示法（即科学计数法）表示的浮点数值表示，使用e表示的数值相当于e前面的数值乘以10的指数次幂。
例如：
```javaScript
var num1 = 3.4567e8; //等同于 3456780000
var num2 = 3e-7; //等同于 0.0000003
```


#### 3.4.3.4 计算精度问题
浮点数值的最高精度是17位小数，但是在其进行数值计算的时候精确度远不及整数。舍入误差会导致无法测试特定的浮点数值。
```javaScript
0.1 + 0.7 = 0.7999999999999999 //有问题
0.1 + 0.5 = 0.6 //无问题
```

```javaScript
关于浮点数值计算会产生舍入误差的问题，有一点需要明确：这是使用 IEEE754 数值的浮点计算的通病，并非只有ECMAScript，其他使用相同数据格式的语言也存在这个问题。
```

### 3.4.4 数值范围
由于内存的限制，ECMAScript 并不能保存世界上所有的数值。如果超出数值范围，则变为正负无穷，且无法参与计算。见下面代码：
```javaScript
console.log(Number.MAX_VALUE) // 能表示的最大数值 1.7976931348623157e+308
console.log(Number.MIN_VALUE) // 能表示的最小数值 5e-324
console.log(Number.MAX_SAFE_INTEGER) // 能表示的最大安全整数 9007199254740991
console.log(Number.MIN_SAFE_INTEGER) // 能表示的最小安全整数 -9007199254740991
console.log(Number.NEGATIVE_INFINITY) // 负无穷 -Infinity
console.log(Number.POSITIVE_INFINITY) // 正无穷 Infinity
```
如果要检测是否在最大和最小数值之间，使用 isFinite 函数
```javaScript
isFinite(1) // true
isFinite(Infinity) //false
isFinite(Number.MAX_VALUE)  //true
isFinite(Number.MAX_VALUE + Number.MAX_VALUE) // false
```


### 3.4.5 特殊数值 NaN
#### 3.4.5.1 含义
即非数值，是一个特殊的数值。用于表示本来要返回数值的操作数未返回数值的情况。
举例：
```javaScript
1 / 'a' // NaN
```


#### 3.4.5.2 特点
任何涉及NaN的操作都会返回NaN,
NaN与任何值都不相等，包括NaN本身

#### 3.4.5.3 判定函数 isNaN()
```javaScript
isNaN(NaN) // true
isNaN('aaa') // true  不可转为数值
isNaN(Infinity) // false
isNaN('1') // false '1' 可以转换为 1
isNaN(false) // false 可以转为数值 0
```


### 3.4.6 数值转换方法
#### 3.4.6.1 总述
有3个函数可以把非数值转换为数值：Number()、parseInt()、parseFloat()。Number()可以用于任何数据类型，另外两种专门用于把字符串转换为数值。

#### 3.4.6.2 Number()函数
##### 转换规则：
+ 如果是Boolean，true和false分别转换为1和0；
+ 如果是数值，只是简单的传入和返回；
+ 如果是null，则返回0；
+ 如果是undefined。返回NaN；
+ 如果是对象，则调用对象的valueOf 方法，然后按照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString 方法，然后再次按照前面的规则转换字符串值。
+ 如果是字符串，则有下列规则
 如果字符串中只包含数字（包括带正号和负号的情况），则将其转换为十进制，即'1'会变成1，'123'会变成123，而'011'会变成11（注意：前导的零被忽略了）
+ 如果字符串中包含有效的浮点格式，则转换为有效的浮点数，同样会忽略前导0
+ 如果字符串中包含有效的十六进制格式，例如'0xf',则转换为相同大小的十进制数
空字符串转换为0
+ 如果字符串包含除了上述格式之外的字符，则转换为NaN
+ 备注：一元加运算符(+)的操作与Number函数相同

##### 上代码：
```javaScript
Number(true) === +true   // 1
Number(123) ===  Number('123') === +'123' // 123
Number(null) === +null  // 0
Number(undefined) /  +undefined  //NaN
Number('011') === +'011' // 11 不会解析为八进制
Number('123.4') ===  +'123.4' // 123.4
Number('123.4.5') / +'123.4.5'  // NaN
Number('0xf') === +'0xf' // 15
Number('') === +'' // 0
```

#### 3.4.6.3 parseInt()函数
处理整数的时候，更常用的是parseInt函数。在转换字符串时，会忽略字符串前面的空格，直至找到第一个非空格函数。

具体来说，如果第一个字符不是数字字符或者负号,则会返回NaN（空字符串也是）；如果第一个字符是数字字符，则会继续解析第二个字符，直至解析完或者遇到一个非数字字符；如果字符串是八进制或者十六进制的函数，也能进行解析。

上代码：
```javaScript
parseInt('1234asada') // 1234 
parseInt('') // NaN
parseInt('0xf') // 15 
parseInt('33.3') // 33
parseInt('70') // 70
parseInt('070') // 70 
parseInt(070) // 56 
```

由上面的例子可以看出，parseInt在处理 "070" 时并没有处理为八进制数，这一点在ECMAScript 3 和 5 上面存在着分歧，3 中被当做是 八进制字面量，而 5中不具备解析八进制格式的字符串的能力，前导的0会被认为无效。

为了消除这种分歧，可以为parseInt 提供第二个参数：转换时使用的基数，即多少进制。而且可以不使用前面的前导'0'、'0x'。

上代码：
```javaScript
parseInt('070',8) === parseInt('70',8)  // 56
parseInt('0xf',16) === parseInt('f',16) // 15
```


#### 3.4.6.4 parseFloat()函数
与parseInt类似，parseFloat也是从第一个字符开始解析每个字符，不过第一个小数点是有效的（后续的小数点无效）；而且parseFloat只解析十进制值字符串，前导的0会被忽略，所以没有第二个参数的用法；还有一点，如果字符串包含的是一个可解析为整数的数（无小数点或者小数点后为0），则会返回整数。

上代码
```javaScript
parseFloat('1234dada') // 1234
parseFloat('1234.1dada') === parseFloat('1234.1.1dada') // 1234.1
parseFloat(070) // 56
parseFloat('070') // 70
parseFloat('3.33e5') // 333000
parseFloat('0xf') // 0
parseFloat(0xf) // 15
```

## 3.5 String类型
### 3.5.1 含义
String类型即字符串，可以由双引号（""）或者单引号（''）表示，前后引号需匹配。下面两种表示形式都是对的
```javaScript
var str1 = "abc";
var str2 = 'abc';
```

### 3.5.2 字符字面量
String包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符，或者具有其他用途的字符。

如下面所示:
```
\n  // 换行
\t //  制表
\b //  退格
\r  // 回车
\f // 进纸
\\  // 斜杠
\' //  单引号
\" // 双引号
\xnn // 以十六进制代码nn表示的一个字符
\unnnn // 以十六进制代码 nnnn 表示的一个 Unicode 字符
```

### 3.5.3 转换为字符串
要把一个值转换为字符串三种方式，toString(),String()和使用加号操作符把它与一个字符串("")加在一起。

#### 3.5.3.1 toString()方法
数值、布尔值、对象和字符串都有toString()方法，但是null和undefined没有这个方法。并且当为数值时，toString可以传入一个参数，即输出数值的基数，默认情况下，toString默认按照十进制格式输出，传入有效基数后，可以输出以二进制、八进制、十六进制乃至其他任意有效进制格式表示的字符串。

上代码：
```javaScript
var a = true; a.toString()  // 'true'
var b = {a:1}; b.toString(); // "[object Object]"
var c = 30;
c.toString(); // '30'
c.toString(2); // "11110"
c.toString(8); // '36'
c.toString(10); // '30'
c.toString(16); //'1e'
c.toString(5); // "110"
c.toString(36); //'u'
```


#### 3.5.3.2  String()方法
在不知道要转换的值是不是null或者undefined的时候，可以使用String()函数，能将任意类型的值转为字符串。对于数值、布尔值、对象和字符串，和toString()一样(不过没有参数)，对于null，则返回"null",undefined则返回"undefined";

#### 3.5.3.3 与""相加法 与 String（）的返回结果相同。

## 3.6 Object类型（只做简单介绍）
#### 对象的创建
```javaScript
var c = new Object() // {}
var c = {}
```
#### Object 的每个实例都有下列属性和方法
```javaScript
c.constructor  // 构造函数，即创建当前对象的函数
c.hasOwnProperty(propetyname) // 用于检查给定的属性是否在当前对象的实例中（而不是在实例的原型中存在）
c.isPrototypeOf(object) //用于检查传入的对象是否是当前对象的原型
c.propertyIsEnumerable(propetyname) // 用于检查给定的属性能否使用for-in枚举
c.toLocaleString() //返回对象的字符串表示，该字符串与执行环境的地区对应
c.toString() // 返回对象的字符串表示
```
## 参考资料
+ JavaScript高级程序设计（第三版）
