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

// 快速排序之填坑
function quickSort (nums) {
  function recursive(arr, left, right) {
    if (left >= right) return
    let index = partition(arr, left, right)
    recursive(arr, left, index - 1)
    recursive(arr, index + 1, right)
    return arr
  }
  function partition (arr, left, right) {
    let temp = arr[left]
    while (left < right) {
      while (left < right && arr[right] >= temp) right--
      arr[left] = arr[right]
      while(left < right && arr[left] < temp) left++
      arr[right] = arr[left]
    }

    // 修改基数的位置
    arr[left] = temp
    return left
  }

  recursive(nums, 0, nums.length - 1)
}

function quickSort1 (nums) {
  // 递归排序基数左右两边的序列
  function recursive(arr, left, right) {
    if(left >= right)  return;
    let index = partition(arr, left, right);
    recursive(arr, left, index - 1);
    recursive(arr, index + 1, right);
    return arr;
  }
  // 将小于基数的数放到基数左边，大于基数的数放到基数右边，并返回基数的位置
  function partition(arr, left, right) {
    // 取第一个数为基数
    let temp = arr[left];
    let p = left + 1;
    let q = right;
    while(p <= q) {
      while(p <= q && arr[p] < temp)  p++;
      while(p <= q && arr[q] > temp)  q--;
      if(p <= q) {
        [arr[p], arr[q]] = [arr[q], arr[p]];
        // 交换值后两边各向中间推进一位
        p++;
        q--;
      }
    }
    // 修改基数的位置
    [arr[left], arr[q]] = [arr[q], arr[left]];
    return q;
  }
  recursive(nums, 0, nums.length-1);
}

let arr = [2, 3, 5, 4, 1]

quickSort(arr)
console.log(arr)


