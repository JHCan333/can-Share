## xml与String互转
1. xml转string字符串
```
var oSerializer = new XMLSerializer();
var xmlString = oSerializer.serializeToString(xml);
```

2. string转xml
```
 // 非 IE 浏览器
var xml = new DOMParser().parseFromString(str, "text/xml"); 
// IE 浏览器
function createDocument() { // 先创建一个 ActiveXObject
    if(typeof arguments.callee.activeXString !== "string") {
    	var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],
    		i, len;
    	for(i = 0, len = versions.length; i < len; i++) {
    		try{
    			new ActiveXObject(versions[i]);
    			arguments.callee.activeXString = versions[i];
    			break;
    		} catch (err){
    			// 跳过
    		}
    	}
    }
    return new ActiveXObject(arguments.callee.activeXString)
}
var xmlDom = createDocument(); // 利用 ActiveXObject 创建的 DOM 文档，调用 loadXML 方法，将传入的 xml 字符串解析之后传入 DOM 文档中
xmlDom.loadXML('<root><child/></root>');
alert(xmlDom.documentElement.tagName)
```

