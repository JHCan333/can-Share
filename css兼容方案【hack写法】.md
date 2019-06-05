# css兼容方案【hack写法】

兼容ie10+ ，以及兼容 iE6~10的hack写法

```CSS
// 兼容ie10+
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
 .className{
     
 }
}

.className{
    // IE6/IE7/IE8/IE9/IE10都生效
    padding-right: 22px \9;
}
```

