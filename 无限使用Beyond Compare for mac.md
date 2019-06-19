### 具体操作如下:

1. 将主启动程序 BCompare 重命名为 BCompare.real
2. 在同级目录下新建一个脚本文件, 命名为 BCompare . 这样 BCompare 在启动的时候就会执行该脚本文件, 注意记得 `chmod a+x BCompare` 【添加权限】
3. 在这个脚本里面写如下代码:
```
#!/bin/bash
rm "/Users/$(whoami)/Library/Application Support/Beyond Compare/registry.dat"
"`dirname "$0"`"/BCompare.real &
//第二行即删除注册信息. 第三行则为启动真实的 BCompare 文件. 
```
