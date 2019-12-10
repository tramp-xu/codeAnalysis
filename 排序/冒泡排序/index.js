// 单向冒泡 (找出最大值放在最后)
function bubbleSort(nums) {
  for (let i=0, len = nums.length; i <len - 1; i++) {

    let mark = true
    // 这里倒序可以将最小值放在最前两种方式
    for (let j=0; j < len - i - 1; j++) {
      if (nums[j] > nums[j+1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        mark = false
      }
    }
    console.log(nums + '\n')
    if (mark) return
  }
}

// 双向冒泡
function bubbleSort_twoWays (nums) {
  let low  = 0
  let high = nums.length - 1
  while (low < high) {
    let mark = true
    for (let i = low; i < high; i++) {
      if (nums[i] > nums[i + 1]) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
        mark = false
      }
    }
    high--
    for (let j=high; j>low; j--) {
      if (nums[j] < nums[j-1]) {
        [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]]
        mark = false
      }
    }
    low++
    if (mark) return
  }
}

// 选择排序
function selectSort (nums) {
  for (let i=0, len=nums.length; i < len; i++) {
    for (let j=i+1; j<len; j++) {
      if (nums[i] > nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
      }
    }
    console.log(nums + '\n')
  }
}

// 插入排序
function insertSort (nums) {
  for (let i=1,len=nums.length;i<len;i++) {
    let temp = nums[i]
    let j = i
    while (j >= 0 && temp < nums[j - 1]) {
      nums[j] = nums[j - 1]
      j--
    }
    nums[j] = temp
  }
}

let arr = [2, 3, 5, 4, 1]

selectSort(arr)
console.log(arr)


