export {}

declare global {
    interface Array<T> {
        /**
         * 配列をサイクリックとみなし、指定したインデックスの要素を先頭に並び替えた配列を取得します。
         * @param n 先頭になる要素のインデックス
         */
        orderFromIndex(n: number): Array<T>
    }
}

// eslint-disable-next-line
Array.prototype.orderFromIndex = function<T>(n: number) {
    if (n < 0) throw new Error("The argument must not be minus.")

    const self = this as Array<T>
    return self.slice(n % self.length).concat(self.slice(0, n % self.length))
}