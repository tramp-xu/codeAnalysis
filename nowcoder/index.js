function jude (val) {
  let ten = Math.floor(val / 10)
  let sig = val % 10
  if (ten > 0) {
    return '1'
  } else {
    return '0'
  }
}

let arr = str.split(' ').map(v => parseInt(v))
let result = ''
let resultArr = []
arr.map(item => {
  result += jude(item)
  resultArr.push(item)
})
let bool = false
let start = ''
let end = ''
resultArr.forEach((item, index) => {
 
  if (index === 0) {
    start = jude(item)
  }
  if (index === resultArr.length - 1) {
    end = jude(item)
    if (end === start) {
      bool = true
    } else {
      bool = false
    }
  }
  if (jude(item) === start) {
    bool = false
    return
  }
})
let a = result.replace(/10/g, '')
let b =result.replace(/01/g,'')
let bool2 = false
let bool3 = false
if (!a) {
  bool2 = true
} else {
  bool2 = false
}
if (!b){
  bool3 = true
} else {
  bool3 = false
}
if (bool || bool2 || bool3) {
    console.log('true')
} else {
    console.log('false')
}
