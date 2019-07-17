## Blob和File

&emsp; Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

&emsp; 要从其他非blob对象和数据构造一个Blob，请使用 Blob() 构造函数。要创建包含另一个blob数据的子集blob，请使用 slice()方法。

&emsp; 接受Blob对象的API也被列在 File 文档中。

```
Blob.slice([start,[ end ,[contentType]]])
```

&emsp; 注意：
1. slice()方法原本接受length作为第二个参数，以表示复制到新Blob 对象的字节数。如果设置的参数使start + length超出了源Blob对象的大小，那返回的则是从start到结尾的数据。				  
2. slice() 方法在某些浏览器和版本上带有浏览器引擎前缀：比如 Firefox 12及更早版本的blob.mozSlice() 和Safari中的blob.webkitSlice()。 没有浏览器引擎前缀的老版本slice()方法有不同的语义，并且已过时。 Firefox 30 中取消了对blob.mozSlice()的支持。

&emsp; 文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

&emsp; 通常情况下， File 对象是来自用户在一个 <input> 元素上选择文件后返回的 FileList 对象,也可以是来自由拖放操作生成的 DataTransfer 对象，或者来自 HTMLCanvasElement 上的 mozGetAsFile() API。在Gecko中，特权代码可以创建代表任何本地文件的File对象，而无需用户交互。

&emsp; File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。
