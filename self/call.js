Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

function A () {
  this.val = '1'
}

A.prototype.getVal = function (...value) {
  console.log(...value)
}

A.prototype.getApplyVal = function (value) {
  console.log(...value)
}

let a = new A()

a.getVal('ss')


function B () {
  this.val = 2
}

let b = new B()

// A.prototype.getVal.myCall(b, 'aaa', 121)

Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    throw TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result = null
  if (args && args.length) {
    result = context.fn(...args)
  } else {
    result = context.fn()
  }

  return result
}

// A.prototype.getVal.myApply(b, ['aaa', 121])

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  return function Fun() {
    if (this instanceof Fun) {
      return new _this(...args)
    } else {
      return _this.apply(context, args)
    }
  }
}

let c = A.prototype.getVal.myBind(b, 'aaa', 121)
c()