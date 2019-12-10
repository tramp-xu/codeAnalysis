// 防抖 debounce
function debounce (fn, delay, immediate) {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    } else {
     timer =  setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

// 节流 throttle
function throttle (fn, delay) {
  let timer
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}