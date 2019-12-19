let search = (arr, target) => {
  let begin = 0
  let end = arr.length - 1
  while (begin <= end) {
    let mid = (begin + end) >>> 1 // 同 Math.floor((begin + end) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] > target) {
      end = mid - 1
    } else if (arr[mid] < target) {
      begin = mid + 1
    }
  }
  return -1
}

// 升序数组 查找 目标值的开始和结束位置
// 如 nums = [5, 6, 7, 7, 8, 8, 10], target = 8 输出： [3, 4]

let searchRange = (nums, target) => {
  let left = 0
  let mid
  let right = nums.length
  while (left < right) {
    mid = (left + right) >>> 1
    if (nums[mid] > target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] === target) {
      right = mid
    }
  }

  let leftIndex = - 1
  let rightIndex = -1
  if (left === nums.length) return [-1, -1]
  else leftIndex = nums[left] == target ? left : -1

  left = 0
  right = nums.length
  while(left < right) {
    mid = (left + right) >>> 1;
    if (nums[mid] > target) {
        right = mid;
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else if (nums[mid] == target) {
        left = mid + 1;
    }
  }
  if (left == 0) return [-1, -1];
  else rightIndex = nums[left - 1] == target ? left - 1: -1;

  return [leftIndex, rightIndex];
}

let nums = [5, 6, 7, 7, 8, 8, 10]
let target = 8
let res = searchRange(nums, target)
console.log(res)