let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get (target, property, receiver) {
      getLogger(target, property)
      // 为每个属性添加代理
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], handler);
      } else {
          return Reflect.get(target, property);
      }
    },
    set (target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler )
}

let obj = {a:1}

let p = onWatch(obj, (v, property) => {
  console.log(`监听到属性${property}改变为${v}`)
}, (target, property) => {
  console.log(`'${property}' = ${target[property]}`)
})

p.a = 2

p.a