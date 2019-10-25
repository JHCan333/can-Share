### 1.打包成功后，发布到蒲公英上，显示“未签名，只能越狱手机可以安装”。
出现这个问题，是因为打包的时候签名没有获取到。下面是配置签名的大概步骤。

![配置签名](https://jhcan333.github.io/can-Share/image/mobile/1.1.png)

打包的时候需要点击左上角选择这个设备：

![选择设备](https://jhcan333.github.io/can-Share/image/mobile/1.2.png)

然后选择 Product=》 Archive ，生成安装包

![开始打包](https://jhcan333.github.io/can-Share/image/mobile/1.3.png)

然后选择 Development

![打包](https://jhcan333.github.io/can-Share/image/mobile/1.4.png)

后面的一直点下一步就好了。但是上传到蒲公英上的时候，偶尔还是会出现“未签名，需要越狱手机安装”的情况。

这样的话，就执行下面的三步操作，可以解决问题：

第一步：点击Xcode =》 preferences 重新安装证书

![重装证书](https://jhcan333.github.io/can-Share/image/mobile/1.5.png)

第二步：清理一下项目，点击 product =》 clean

第三步：退出Xcode（退出不是关闭），然后重启Xcode软件。再执行Product=》 Archive 。就会发现没有问题了。

### 2.bitcode
打包的时候，出现了一个问题
```
error: Invalid bitcode signature
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```
这个报错的话，在这里调整一下设置就好，下面给截图

![设置bitcode](https://jhcan333.github.io/can-Share/image/mobile/2.1.png)

执行完上图的三步后，发现不报上面的那个错了。

但是又出现了新的问题，提示我xcode支持的ios系统版本有点低。里面的插件需要12.2以上的版本，于是乎，升级了一下macOs系统，然后装了一个最新的Xcode，就什么事情都木有了~~~

### 3.run

我在真机调试的时候，执行了一下 run，报了一个错。
```
Install claimed to have succeeded, but application could not be found on device. bundleId = xxxxxxx
```
这个的话，修改一下编译系统的环境就好。

点击 file =》 workspace setting。然后如下图

![设置编译系统](https://jhcan333.github.io/can-Share/image/mobile/3.1.png)

