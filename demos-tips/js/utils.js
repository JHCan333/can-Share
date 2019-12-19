/**
 * @author 靳宏灿
 * @date 2019/1/13
 * @Description: 封装在原生js对象中的一些方法
 */
//数组获取最大值
Array.prototype.getMax = function () {
    return Math.max.apply(null, this.map((seg) => {return +seg}))
}
//获取数组的拷贝值
Array.prototype.getCopy = function () {
    let that = this
    return JSON.parse(JSON.stringify(that))
}

//获取数组的最小值
Array.prototype.getMin = function () {
    return Math.min.apply(null, this.map((seg) => {return +seg}))
}

//使用指定标识符替换0值
Array.prototype.replaceZero = function (symbol = '-') {
    return this.map(function (seg) {
        return +seg == 0 ? '-' : seg
    })
}

//获取数组指定idx的值，若idx超过数组长度，则循环获取
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

//获取数组中任意数量的随机元素组成的数组
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

//获取数组中的随机元素
Array.prototype.getRandomElement = function () {
    let lth = this.length - 0.01
    return this[Math.floor(Math.random() * lth)]
}

//数组求和
Array.prototype.sum = function () {
    return eval(this.join('+'))
}

//获取截取指定位数的值，所需要的除数
Number.prototype.getDivisor = function (len) {
    var power = (this.valueOf() + '').length - (+len)
    return Math.pow(10, power)
}

//获取截取指定位数的值，所需要的除数
Number.prototype.getCN = function () {
    var list = {
        '10': '十',
        '100': '百',
        '1000': '千',
        '10000': '万',
        '100000': '十万',
        '1000000': '百万',
        '10000000': '千万',
        '100000000': '亿',
        '1000000000': '十亿',
        '10000000000': '百亿',
        '100000000000': '千亿',
        '1000000000000': '万亿',
    }
    return list[(this.valueOf() + '')] || '百万'
}

