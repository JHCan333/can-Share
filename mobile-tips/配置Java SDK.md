在开发移动端，搭建安卓开发环境的时候，需要先安装配置Java SDK。

java SDK的配置流程大致如下：
1. 下载安装，下载地址是 https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
2. 安装的话，一直点击下一步就成。
3. 安装完成后，在终端通过指令检测一下是否安装成功  java -version，成功的标志是，返回安装的版本信息。
4. 接下来需要配置环境变量，先找java_home的位置，在终端输入指令： /usr/libexec/java_home，就能看到安装路径。
5. 复制安装路径，在终端执行命令  vim  ~/.profile，粘贴下面的内容
```
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home
CLASSPAHT=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
PATH=$JAVA_HOME/bin:$PATH:
export JAVA_HOME
export CLASSPATH
export PATH
```
6. 按下esc，退出编辑模式，输入“:wq!”，保存退出。
7. 执行source ~/.profile 是配置文件生效；
8. 在终端执行命令： echo $JAVA_HOME 查看环境变量是否生效