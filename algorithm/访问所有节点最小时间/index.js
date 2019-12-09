/**
 * @param {number[][]} points
 * @return {number}
 */

var minTimeToVisitAllPoints = function(points) {
  let time = 0
  points.reduce((pre, cur) => {
    let xp = Math.abs(cur[0] - pre[0])
    let yp = Math.abs(cur[1] - pre[1])
    let maxp = Math.max(xp, yp)
    time += maxp
    return cur
  })
  return time
};
// var minTimeToVisitAllPoints = function(points) {
//   let time = 0
//   points.reduce((pre, cur, index, arr) => {
//     debugger
//     let xp = Math.abs(cur[0] - pre[0])
//     let yp = Math.abs(cur[1] - pre[1])
//     let minp = Math.min(xp, yp)
//     let step = minp + Math.abs(xp - yp)
//     time += step
//     return cur
//   })
//   console.log(time)
// };

let points = [[1, 1], [3, 4], [-1, 0]]

minTimeToVisitAllPoints(points)