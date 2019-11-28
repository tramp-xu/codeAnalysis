// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isFunction = variable => typeof variable === 'function'

class MyPromise  {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }

    debugger
    this._status = PENDING

    this._value = undefined
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []

    try {
      // 使用bind将this指向了当前的promise对象， handle 中的 resolve 中的value能被 _resolve接收, reject同理
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  _resolve (val) {
    const run = () => {
      if (this._status !== PENDING) return
      this._status = FULFILLED
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = value => {
        let cb
        // shift() 把数组的第一个元素从其中删除，并返回第一个元素的值。
      // 在队列这种数据结构中,最先插入在元素将是最先被删除;反之最后插入的元素将最后被删除,因此队列又称为“先进先出”(FIFO—first in first out)
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }

      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }

      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
       * 当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
       */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          runRejected(value)
        }, err => {
          this._value = err
          runRejected(err)
        })
      } else {
        this._value = val
        runFulfilled(val)
      }
      
    }

    setTimeout(() => {
      run()
    }, 0)
  }

  _reject (err) {
    if (!this._status !== PENDING) return
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
      setTimeout(() => run(), 0)
    }
  }

  then (onFulfilled, onRejected) {
    const { _value, _status } = this

    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value)
            if (res instanceof MyPromise) {
               // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (error) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }

      // 失败时执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (error) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }

      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(onFulfilled)
          this._rejectedQueues.push(onRejected)
          break
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }

  catch (onRejected) {
    return this.then(undefined, onRejected)
  }

  // static 关键字定义的方法，不能在类的实例上调用，而应该通过类本身调用
  // 静态方法调用同一个类中的其他静态方法，可使用this关键字。
  // 非静态方法中，不能直接使用 this关键字来访问静态方法。而是要用类名来调用：CLASSNAME.STATIC_METHOD_NAME() ，
  // 或者用构造函数的属性来调用该方法：this.constructor.STATIC_METHOD_NAME().
  static resolve (value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  static reject (value) {
    return new MyPromise((resolve, reject) => reject())
  }

  static all (list) {
    return new MyPromise((resolve, reject) => {
      let values = []
      let count = 0
      for (let [i, p] of list.entrise()) {
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }

  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

  finally (cb) {
    return this.then(
      value => MyPromise.resolve(cb().then(() => value)),
      reason => MyPromise.resolve(cb().then(() => {throw reason}))
    )
  }
}

