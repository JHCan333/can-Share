## 安卓SDK的环境配置流程
1. 下载安装包；
2. 配置环境变量
```
// 打开此文件进行编辑,输入环境变量
vim ~/.bash_profile

// 设置环境变量
export ANDROID_HOME=/Users/shmaur/android-sdk-macosx  //这里为 sdk 路径地址
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

// 更新环境变量配置，不更新则不会使配置生效
source .bash_profile

// 校验是否配置成功
echo $path
```
3. 打开 android-sdk-macosx 下的tools文件夹，执行指令“./android sdk”打开android SDK Manager的图形界面，安装扩展包
4. 在安装的时候，会发现google的网站连不上，因为被墙了；这时候可以通过改host文件，ping 通google的网址；添加的host如下：
```
69.171.248.112 www.google.com
216.58.200.238 developer.android.com
203.208.43.104 dl.google.com
74.125.203.190 dl-ssl.google.com
```
这时候就可以安装builder-tools之类的包了。