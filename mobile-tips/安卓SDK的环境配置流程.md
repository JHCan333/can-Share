这两天做了一个移动端混合开发的项目，需要配置安卓的SDK，不过在这之前，需要先配置好Java环境（这个在这里就不写了）。下面开始配置步骤：

1. 下载SDK，然后解压到某个目录下面。推荐两个下载网址：

http://down.tech.sina.com.cn/page/45703.html

https://mac.softpedia.com/get/Developer-Tools/Google-Android-SDK.shtml
2. 配置环境变量:
```
// 打开此文件进行编辑,按下 i 进行编辑
vim ~/.bash_profile
// 设置 安卓 环境变量。注意一点，不要把过去的环境变量覆盖掉。我就是把过去的给全选覆盖了，导致环境崩了，血的教训~
export ANDROID_HOME=/Users/thisUser/android/android-sdk-macosx  // 这里为存放 sdk 的路径，即前面解压的路径加上 android-sdk-macosx
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
// 按下 esc 退出编辑模式，键入 “:wq!”，保存文件退出。然后 执行 source 命令。 使环境变量生效
source .bash_profile
// 校验是否配置成功
echo $ANDROID_HOME
// 成功后会显示路径
/Users/thisUser/android/android-sdk-macosx
```

3. 打开 android-sdk-macosx 下的tools文件夹，在终端执行指令“./android sdk”打开android SDK Manager的图形界面，安装扩展包
![安卓图形界面](https://jhcan333.github.io/can-Share/image/other/android_SDK.png)
4. 在安装的时候，会发现有提示，google 的网站连不上，因为被墙了；这时候可以通过改host文件的方式完成安装：
```
// 打开hosts文件进行编辑
sudo vim /etc/hosts
// 将下面的网站拷进去
69.171.248.112 www.google.com
216.58.200.238 developer.android.com
203.208.43.104 dl.google.com
74.125.203.190 dl-ssl.google.com
// 保存退出成功后，执行下面命令。使hosts文件生效
sudo killall -HUP mDNSResponder
```

5. 这时候再试一下install，就发现可以安装 builder-tools 之类的包了。

`备注 ：至于网上说的使用东软的镜像网址的配置方法，我这边没有成功，如果大家能够把东软镜像配置成功的话，可以跟我说一下啊。`