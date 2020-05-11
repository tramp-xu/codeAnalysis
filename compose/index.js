/* 实例:
 * compose(fn1, fn2, fn3) === fn3(fn2(fn1))
*/

const fn1 = (x) => x + 1
const fn2 = (x) => x * 3
const fn3 = (x) => x / 4

// function compose(...args) {
//     let length = args.length
//     if (!length) {
//         return args[0]
//     }
//     args.forEach((fn, index) => {
//         let args1 = arguments
//         if (typeof fn !== 'function') {
//             throw new TypeError('参数必须为函数')
//         }
//         let result = fn(...args1)
//     })
//     return function (...args1) {

//     }
// }

// const compose = (fn1, fn2) => {
//     return function (x) {
//         return fn1(fn2(x))
//     }
// }

const compose = (...funcs) => {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    // funcs.reverse()

    return funcs.reduce((pre, next) => {
        return (...args) => {
            return pre(next(...args))
        }
    })
}

// const compose = (fn1, fn2) => (x) => fn1(fn2(x))

let fn4 = compose(fn2, fn1)

let result = fn4(3)
console.log(result)