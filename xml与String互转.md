## xml与String互转
1. xml转string字符串
```
var oSerializer = new XMLSerializer();
var xmlString = oSerializer.serializeToString(xml);
```

2. string转xml
```
var xml = new DOMParser().parseFromString(str, "text/xml");  // 非 ie 浏览器
```

