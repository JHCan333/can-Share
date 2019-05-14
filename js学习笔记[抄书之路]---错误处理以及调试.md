# js学习笔记[抄书之路]---错误处理以及调试
错误处理在程序设计中的重要性是毋庸置疑的，作为开发人员，必须理解在处理javaScript错误的时候，都有哪些手段和工具可以利用。

## 1.捕获错误
### 1.1 try-catch
和java中的try-catch语句是完全相同的。
```javaScript
try {
    // 可能会导致错误的代码
} catch (error){
    // 错误发生时怎么处理
}
```
我们使用时应该把所有可能会抛出错误的代码都放在try语句块中，而把那些用于错误处理的代码放到catch块中。例如：
```javaScript
try {
    var a = 1;
    a = b + a
} catch(err) {
    console.log(err.message) // b is not defined
    console.dir(err) 
    // 谷歌浏览器
    // ReferenceError: b is not defined
    // at http://127.0.0.1:8020/Test/testError/testError.html?__hbt=1557728732520:13:5
    //    message: "b is not defined"
   //    stack: "ReferenceError: b is not defined↵    
   //         at http://127.0.0.1:8020/Test/testError/testError.html?__hbt=1557728732520:13:5"
   //    __proto__: Error
}
```
其中，err中包含的实际信息会因为浏览器而不同，但是共同的是，保存着一个错误消息的message属性。
上例中，safiri浏览器展示情况如下
```javaScript
ReferenceError: Can't find variable: b
    column: 10
    line: 13
    message: "Can't find variable: b"
    sourceURL: "http://127.0.0.1:8020/Test/testError/testError.html?__hbt=1557728732520"
    stack: "global code@http://127.0.0.1:8020/Test/testError/testError.html?__hbt=1557728732520:13:10"
  “ReferenceError”原型
```
火狐浏览器展示情况如下
```javaScript
ReferenceError: "b is not defined"
    <anonymous> http://127.0.0.1:8020/Test/testError/testError.html?__hbt=1557728732520:13
```

### 1.2 finally 子句
finally子句在try-catch语句中是可选的，但是finally语句一经使用，其代码无论如何都会执行（即使包含return，也不会阻止finally子句的执行）
示例如下：
```javaScript
function mainErr() {
    try {
	 return 1;
    } catch(err) {
	return 2;
    } finally{
	return 3;
    }
}
console.log(mainErr());//3 
```
```
备注：正常情况下，如果提供了finally就变成了可选的。但是ie7以及更早的版本中有一个bug：除非有catch子句，否则finally中的代码永远不会执行，所以最好是提供一个catch子句。ie8修复了这个bug。
```

## 2.错误类型
每种错误都有对应的错误类型，并且当错误发生时，就会抛出相应类型的错误对象。有如下7中错误类型：
1. Error
2. EvalError
3. RangeError
4. ReferenceError
5. SyntaxError
6. TypeError
7. URIError
### 2.1  Error
其中 Error 是基类型，其他错误类型都继承自该类型。因此，所有错误类型共享了一组相同的属性，Error类型的错误很少见，如果有，也是浏览器抛出的，这个基类的主要目的用于供开发人员抛出自定义错误。

### 2.2 EvalError 
EvalError 类型的错误会在使用eval()函数发生异常时被抛出，但是实际开发中碰到的情况很小，只有很小的概率会碰到。

### 2.3 RangeError
RangeError类型的错误会在数值超出相应范围时触发。例如：
```javaScript
var arr = new Array(Number.MAX_VALUE) // Array不支持项数为 Number.MAX_VALUE
```

### 2.4 ReferenceError
在找不到对象的情况下，会发生 ReferenceError 错误。例如：
```javaScript
var x = a  // 访问不存在的变量a时，会抛出 Uncaught ReferenceError: a is not defined  
```

### 2.5 SyntaxError
 当我们把语法错误的javaScript字符串传入eval函数时，就会导致此类错误。例如：
 ```javaScript
var c = d = 1;
eval('c ++ d') //Uncaught SyntaxError: Unexpected identifier
```

### 2.6 TypeError
在变量中保存着意外的类型时，或者在访问不存在的方法时，都会导致这种错误。主要是由于执行特定类型的操作时，变量的类型并不符合要求所致。
```javaScript
var a = new '111'  //Uncaught TypeError: "111" is not a constructor
console.log('name' in true) // Uncaught TypeError: Cannot use 'in' operator to search for 'name' in true
```

### 2.7 URIError
在使用encodeURI()或者decodeURI()，而URI格式不正确时，就会导致URIError错误，这种错误很少见，因为前面几个的容错性太高了。

### 2.8 检测错误类型:instanceof
```javaScript
try{
    doSomeErrorThing()
} catch (err){
    if(err instanceof TypeError){
        ...
    } else if (...){...}
}
```

## 3. 抛出错误
与 try-catch 语句相配的还有一个throw 操作符，用于随时抛出自定义错误。抛出错误时，必须要给 throw 操作符制定一个值，具体什么类型，没有要求。
```javaScript
// 下列代码都是有效的
throw 12345;
throw "Hello world!";
throw true
throw {name:1}
```
在遇到throw操作符时，代码会立即停止执行。仅当try-catch语句捕获到被抛出的值时，代码才会继续执行。
通过使用某种内置错误类型，可以更真实地模拟浏览器错误。每种错误类型的构造函数接收一个参数，即实际的错误信息。上代码举例：
```javaScript
throw new Error('adadasda')
throw new SyntaxError('adadasda')
throw new EvalError('adadasda')
```
另外还可以利用原型链通过继承Error来创建自定义错误类型。此时需要为新创建的错误类型指定name和message属性。自定义错误消息在各种浏览器对错误信息模糊不明确的情况下，显得极为有用。
```javaScript
function CustomErrorType (message){
    this.name = "CustomErrorType";
    this.message = message;
}
CustomErrorType.prototype = new Error();
throw new CustomErrorType('自定义Error');
```

## 4.错误事件
任何没有通过try-catch 处理的错误都会触发window对象的error事件。在任何web浏览器中，onerror事件处理程序都不会创建event对象，但是可以接受三个参数：错误信息、错误所在的URL以及行号。上代码：
```javaScript
window.onerror = function(message,url,line){
    console.error('message',message);
    console.error('url',url);
    console.error('line',line);
}
throw 'aaa'
// message Uncaught aaa
// url http://127.0.0.1:8020/Test/testError/testError.html?__hbt=1557751037433
// line 24
// Uncaught aaa
```
如果将onerror的时间处理程序的返回值设置为true，就可以捕获所有无代码处理的运行时的错误。这个事件处理程序是避免浏览器报告错误的最后一道防线，理想情况下，只要可能，就不要随便使用。上代码
```javaScript
window.onerror = function(message, url, line) {
    console.error('message', message);
    console.error('url', url);
    console.error('line', line);
    return true;
}
throw 'aaa'
// message Uncaught aaa
// url http://127.0.0.1:8020/Test/testError/testError.html?__hbt=1557751037433
// line 24
```
## 参考资料
+ JavaScript高级程序设计（第三版）
