##### 在日常的开发过程中，经常会碰到javaScript原生对象方法不够用的情况，所以经常会对javaScript原生方法进行扩展。下面就是在实际工作时，经常使用的一些方法，做一下记录，有需要的可以拿去。

## 1、String篇
### 1.1、字符串做相加运算：
浮点数的精度问题是javaScript计算的一个障碍，因为有些小数以二进制表示的话位数是无穷的。比如1.1，在程序中无法真正的表示1.1，只能做到一定程度的准确，但是无法避免精度的丢失。
```
String.prototype.add = function (arg2) {
    let r1, r2, m
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }

    m = Math.pow(10, Math.max(r1, r2))
    return (Math.round(this * m + arg2 * m) / m).toString()
}
```


### 1.2、字符串做相减运算
```
String.prototype.reduce = function (arg2) {
    let r1, r2, m
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (Math.round(this * m - arg2 * m) / m).toString()
}
```


## 2、Number篇
### 2.1、数字做相加运算
```
Number.prototype.add = function (arg2) {
    let r1, r2, m
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }

    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(this * m + arg2 * m) / m
}
```

### 2.2、数字做相减运算
```
Number.prototype.reduce = function (arg2) {
    let r1, r2, m
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(this * m - arg2 * m) / m
}
```

## 3、Array数组篇
### 3.1、获取数组最大值
```
Array.prototype.getMax = function () {
    return Math.max.apply(null, this.map((seg) => {return +seg}))
}
```
### 3.2、获取数组的深拷贝值
```
Array.prototype.getCopy = function () {
    let that = this
    return JSON.parse(JSON.stringify(that))
}
```

### 3.3、使用特殊字符（symbol）替换数组中的0
```
Array.prototype.replaceZero = function (symbol = '-') {
    return this.map(function (seg) {
        return +seg == 0 ? symbol : seg
    })
}
```

### 3.4、获取数组中指定 idx 的元素，其中 idx 若超过数组长度length，则查找 idx 与 length * n 相减的序号元素
```
Array.prototype.getItemByIdx = function (idx = 0) {
    function getArrByIdx (list, idx) {
        if (list.length - 1 < idx) {
            idx -= list.length
            return getArrByIdx(list, idx)
        } else {
            return list[idx]
        }
    }
    return getArrByIdx(this, idx)
}
```

### 3.5、获取数组中由自定义数量的随机元素组成的新数组。count 为所需数量
```
Array.prototype.getRandomArrayElements = function (count) {
    var shuffled = this.slice(0),
        i = this.length,
        min = i - count,
        temp, index
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(min)
}
```

### 3.6、获取数组中的随机元素
```
Array.prototype.getRandomElement = function () {
    let lth = this.length - 0.1
    return this[Math.floor(Math.random() * lth)]
}
```

### 3.7、数组内元素求加和
```
Array.prototype.sum = function () {
    return eval(this.join('+'))
}
```

