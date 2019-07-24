## express挂载静态资源

express 有一个中间件 express.static 用于提供对静态资源的服务，用法如下

```
const express = require('express')
const path = require('path')
const app = express()
app.use('/static', express.static(path.resolve(__dirname, '../graphql')))
app.listen(4000, () => {
    console.log('Now browse to localhost:4000/static')
})
```

不过如果需要对文件的导航，则需要自己编写index.html。样板如下：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <a href="./utils">utils</a>
    <a href="./image">image</a>
    <a href="./index.js">index.js</a>
    <a href="./package.json">package.json</a>
</body>
</html>
```

另外linux系统自带python命令，比如mac，指令如下
```
python -m SimpleHTTPServer 4001
```

