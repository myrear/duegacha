export {}

declare global {
    interface Number {
        /**
         * 0から自身の値の間の整数値をランダムに取得します。
         */
        randomInteger(): number
    }
}

// eslint-disable-next-line
Number.prototype.randomInteger = function() {
    const self = this as number
    return Math.floor(Math.random() * self)
}