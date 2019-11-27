- 判断是否为 promise 对象
```
// 判断是否是promise对象，只要判断 他的then 和 catch 是方法
function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }
```
- JSON.stringify 三个参数

```
// 如下
JSON.stringify(val, replacer, space)

// val: 目标对象
// replacer: 可以为过滤函数也可以是个数组
// space: 控制字符串里面的间距

let data = {
  name: 'zhang',
  info: {
    age: 22,
    sex: 'male'
  }
}

let string1 = JSON.stringify(data, (key, val) => {
  console.log(`key is ${key}`)
  console.log(`${key} is ${type0f(val)}`)
})

// sex 属性将不会显示
let string2 = JSON.stringify(data, ['name', 'info', 'age'])

// space 不写时字符串为一行, 如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格
let string3 = JSON.stringify(data, null, 2)
```

- Object.isExtensible(value)
```
用于判断对象是否可扩展
```