const curry = (fn) => {
    /**
     * 
     * @param {number} rest_num 剩余需要收集的参数数目 
     * @param {array} args_list 参数列表
     */
    const _c = (rest_num, args_list) => {
        if (rest_num <= 0) {
        return fn(...args_list);
        }
        return (...args) => _c(rest_num - args.length, [...args_list, ...args])
    }
    return _c(fn.length, []);
}

// example
const plus = (a, b, c, d) => a + b + c + d;
const curry_plus = curry(plus);
console.log(curry_plus(1, 2, 3, 4)) // 10
console.log(curry_plus(1)(2, 3, 4)) // 10
console.log(curry_plus(1)(2)(3, 4)) // 10
console.log(curry_plus(1)(2)(3, 4, 5)) // 10