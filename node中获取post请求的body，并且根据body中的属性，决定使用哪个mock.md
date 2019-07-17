## node中获取post请求的body，并且根据body中的属性，决定使用哪个mock

```JavaScript
const bodyParserMethd = bodyParser.json() // 通过此方法解析出body
bodyParserMethd(req, res, function () {
    console.log('req.body', req.body)
    if (req.body && req.body.name && mocker[req.body.name]) { // 通过body中的name决定使用哪个mock
        let result = mocker[req.body.name]
        res.json(result)
    }
})
```

