# js学习笔记---this

js中的this，如果没有深入的学习了解，那么this将会是让开发人员很头疼的问题。下面，我就针对this，来做一个学习笔记。

## 1.调用位置
在理解this的绑定过程之前，首先要理解调用位置：调用位置就是函数在代码中被调用的位置（而不是声明的位置）。只有分析好调用位置，才能明白这个this到底引用的是什么？
寻找调用位置，最重要的是分析调用栈（就是为了到达当前执行位置所调用的所有函数）。调用位置就在当前正在执行的前一个调用中。
下面举例说明：
```javaScript
function baz (){
    // 当前调用栈是：baz
    //因此，当前调用位置是全局作用域
    console.log("baz");
    bar();// <-- bar的调用位置
}
function bar(){
    // 当前调用栈是 baz -> bar
    // 因此，当前调用位置在 baz 中
    console.log('bar');
    foo();// <-- foo 的调用位置
}
function foo(){
    // 当前调用栈是baz -> bar -> foo
    // 因此，当前调用位置在bar中
    console.log("foo");
}
baz(); // <-- baz的调用位置
```

## 2.绑定规则
### 2.1 默认绑定
首先看一下最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。
如下例：
```javaScript
function foo() {
    console.log(this.a);
}
var a = 2;
foo(); // 2
// 在本代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。
// 如果使用严格模式，那么全局对象无法使用默认绑定，因此this会绑定到undefined。
```

### 2.2 隐式绑定
另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。举例来说：
```javaScript
function foo() {
    console.log(this.a);
}
var obj = {
    a:2,
    foo
};
obj.foo(); // 2
```
首先要注意的是foo()的声明方式，以及之后是如何被当做引用属性添加到obj的。但是无论是直接在obj中定义还是先定义再添加为引用属性，这个函数严格来说都不属于obj 对象。

然而，调用位置会使用obj的上下文来引用函数，因此，可以说函数被调用时obj对象“拥有”或者“包含”它。

无论如何称呼这个模式，当foo()被调用时，落脚点确实指向obj对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。所以this.a和obj.a是一样的。

对象属性引用链中只有最后一层会影响调用位置。上代码：
```javaScript
function foo() {
    console.log(this.a);
}
var obj2 = {
    a:42,
    foo
};
var obj1 = {
    a:2,
    obj2
};
obj1.obj2.foo(); // 42
```

#### 隐式丢失
一个最常见额this绑定问题就是被隐式绑定的函数会丢失绑定对象，会应用默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式。看下面的代码：
```javaScript
function foo() {
    console.log(this.a);
}
var obj = {
    a:2,
    foo
};
var bar = obj.foo; // 函数别名！
var a = "What?"; // a 是全局对象的属性
bar();//"What?"
```
虽然bar是obj.foo 的一个引用，但是实际上，它引用的是foo函数本身，因此此时的bar()其实是一个不带任何修饰符的函数调用，因此应用了默认绑定。
下面举一个回调函数中隐式丢失的例子:
```javaScript
function foo() {
    console.log(this.a);
}
function doFoo(fn){
    // fn 其实引用的是foo
    fn(); // <- 调用位置
}
var obj = {
    a:2,
    foo
};
var a = "What?"; // a 是全局对象的属性
doFoo(obj.foo);//"What?"
```
参数传递其实就是一种隐式赋值，传入函数时也会被隐式赋值，所以结果和上一个例子一样。

### 2.3 显示绑定
在上面隐式绑定的时候，必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把this间接（隐式）的绑定到这个对象上。

如果我们不想在对象内部包含函数引用，而想在某个对象上强制调用函数，该如何处理？

基本上大部分函数会包含call(..)和apply(..)方法。但是有的时候JavaScript的宿主环境有时候会提供一些非常特殊的函数，可能没有这两个方法，但是极为罕见。

这两个函数的第一个参数是一个对象，会把这个对象绑定到this，接着在调用函数时指定这个this。因为这种方式可以直接指定this的绑定对象，因此我们称之为显示绑定。

上代码:
```javaScript
function foo() {
    console.log(this.a);
}
var obj = {
    a:2
};
foo.call(obj); // 2
```

通过foo.call(...)，我们可以在调用foo的时候强制将this绑定在obj上。

如果从传入了一个原始值（字符串类型、布尔类型或者数字类型）来当做this的绑定对象，这个原始值会被转换成它的对象形式（也就是new String(...)、new Boolean(...)或者new Number(...)），这通常称为“装箱”。

```javaScript
从this的绑定的角度来说，call(...)和apply(...)是一样的，他们的区别体现在其他的参数上。
```
不过上述的代码不能很好地解决我们提出的丢失绑定的问题。

#### 2.3.1 硬绑定
不过显示绑定的一个变种可以解决这个问题。
上代码：
```javaScript
function foo() {
    console.log(this.a);
}
var obj = {
    a:2
};
var bar = function(){
    foo.call(obj);
}
var a = '123';
bar(); // 2 
setTimeout(bar,10); // 2
bar.call(window); // 2 此时硬绑定的bar不能修改foo的this。foo总会在obj上调用。
```

由于硬绑定是一种非常常用的模式，所以在ES5中提供了内置方法 bind ，它的用法如下：
```javaScript
function foo(str) {
    console.log(this.a, str)
    return this.a + str;
}
var obj = {
    a: 2
};
var bar = foo.bind(obj);
var b = bar(3);// 2 3
console.log(b);// 5
```


#### 2.3.2 API调用的“上下文”
第三方库的许多函数，以及javaScript语言和宿主环境中的许多新的内置函数，都提供了一个可选的参数，通常被称为上下文，其作用和bind一样，确保回调函数使用指定的this。上代码：
```javaScript
function foo (item){
    console.log(item,this.id);
}
var obj = {
    id:"cool"
};

// 调用foo()时把this绑定到obj
[1,2,3].forEach(foo,obj);
// 1 cool 2 cool 3 cool
```

### 2.4 new绑定
js中使用new可以构造一个新的对象，使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造)一个全新的对象；
2. 创建这个新对象会被执行[[原型]]连接；
3. 这个新对象会绑定到函数调用的this；
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

上代码：
```javaScript
function foo(a) {
    this.a = a;
}
var a = 3;
var bar = new foo(2);
console.log(bar.a); // 2
```
使用new来调用foo()时，会构造一个新对象并绑定到foo()调用中的this上。

## 3.优先级。
+ 毫无疑问，默认绑定的优先级是最低的。
那么隐式绑定和显示绑定谁更高？上代码：
```javaScript
function foo() { 
     console.log( this.a );
}
var obj1 = { 
     a: 2,
     foo: foo
};
var obj2 = { 
      a: 3,
     foo: foo 
};
obj1.foo(); // 2 
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3 
obj2.foo.call( obj1 ); // 2
```
可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以应用显式绑定。

+ new 绑定 VS 隐式绑定：
```javaScript
function foo(something) { 
     this.a = something;
}
var obj1 = { 
     foo: foo
};
var obj2 = {};
obj1.foo( 2 ); 
console.log( obj1.a ); // 2
obj1.foo.call( obj2, 3 ); 
console.log( obj2.a ); // 3
var bar = new obj1.foo( 4 ); 
console.log( obj1.a ); // 2 
console.log( bar.a ); // 4
```
可以看到 new 绑定比隐式绑定优先级高。

+ new 绑定 VS 显示绑定:

new 和 call/apply 无法一起使用，因此无法通过 new foo.call(obj1) 来直接
进行测试。但是我们可以使用硬绑定来测试它俩的优先级。
```javaScript
function foo(something) { 
 this.a = something;
}
var obj1 = {};
var bar = foo.bind( obj1 ); 
bar( 2 );
console.log( obj1.a ); // 2
var baz = new bar(3); 
console.log( obj1.a ); // 2 
console.log( baz.a ); // 3
```
可以看到，new 修改了硬绑定（到 obj1 的）调用 bar(..) 中的 this。因为使用了new 绑定，我们得到了一个名字为 baz 的新对象，并且 baz.a 的值是 3。
### 总结
现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的
顺序来进行判断：
 1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
 ```javaScript
var bar = new foo()
```
2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象
```javaScript
var bar = foo.call(obj2)
```
 3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。
```javaScript
var bar = obj1.foo()
```
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。
```javaScript
var bar = foo()
```

## 4.箭头函数
之前介绍的四条规则已经可以包含所有正常的函数。但是 ES6 中介绍了一种无法使用这些规则的特殊函数类型：箭头函数。
箭头函数并不是使用 function 关键字定义的，而是使用被称为“胖箭头”的操作符 => 定义的。箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this。
```javaScript
function foo() {
     // 返回一个箭头函数
     return (a) => {
     //this 继承自 foo()
     console.log( this.a ); 
 };
}
var obj1 = { 
     a:2
};
var obj2 = { 
     a:3
 };
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 不是 3 ！
```
foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1，
bar（引用箭头函数）的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。（new 也不
行！）

箭头函数最常用于回调函数中，例如事件处理器或者定时器：
```javaScript
function foo() { 
     setTimeout(() => {
     // 这里的 this 在此法上继承自 foo()
     console.log( this.a ); 
 },100);
}
var obj = { 
     a:2
};
foo.call( obj ); // 2
```
箭头函数可以像 bind(..) 一样确保函数的 this 被绑定到指定对象，此外，其重要性还体
现在它用更常见的词法作用域取代了传统的 this 机制。实际上，在 ES6 之前我们就已经
在使用一种几乎和箭头函数完全一样的模式。
```javaScript
function foo() {
     var self = this; // lexical capture of this 
     setTimeout( function(){
     console.log( self.a );
     }, 100 );
} 
var obj = {
     a: 2
};
foo.call( obj ); // 2
```
虽然 self = this 和箭头函数看起来都可以取代 bind(..)，但是从本质上来说，它们想替
代的是 this 机制。


### 参考资料

+ 《你不知道的javaScript》---上卷
