#为什么js要放在最后执行？

##详细的说：
###1.JS文件会阻塞DOM的构建
因为浏览器渲染和 JS 执行共用一个线程，而且这里必须是单线程操作，多线程会产生渲染 DOM 冲突。JavaScript的加载、解析与执行会阻塞DOM的构建，也就是说，在构建DOM时，HTML解析器若遇到了JavaScript，那么它会暂停构建DOM，将控制权移交给JavaScript引擎，等JavaScript引擎运行完毕，浏览器再从中断的地方恢复DOM构建。
也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性（下文会介绍这两者的区别）。

###2.JS文件不只是阻塞DOM的构建，它会导致CSSOM也阻塞DOM的构建。
原本DOM和CSSOM的构建是互不影响，井水不犯河水，但是一旦引入了JavaScript，CSSOM也开始阻塞DOM的构建，只有CSSOM构建完毕后，DOM再恢复DOM构建。
这是什么情况？
这是因为JavaScript不只是可以改DOM，它还可以更改样式，也就是它可以更改CSSOM。因为不完整的CSSOM是无法使用的，如果JavaScript想访问CSSOM并更改它，那么在执行JavaScript时，必须要能拿到完整的CSSOM。所以就导致了一个现象，如果浏览器尚未完成CSSOM的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和DOM构建，直至其完成CSSOM的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建CSSOM，然后再执行JavaScript，最后在继续构建DOM。

##通俗来讲：
1.js文件会阻塞DOM的构建：浏览器渲染和js执行共用一个线程，如果在构建DOM的时候，有js文件，则会执行js文件，导致DOM构建延后；不过可以使用defer和async来优化；
2.js文件会导致CSSOM阻塞DOM的构建：不完整的CSSOM是无法使用的，在js执行中，如果操作了style，则必须等待CSSOM构建完成才能执行js脚本。此时的过程就是，CSSOM构建完成》JS执行》DOM构建