/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
// var numJewelsInStones = function(J, S) {
//   let jArr = J.split('')
//   let jSting = jArr.join('|')
//   let regText = `${jSting}`
//   let reg = new RegExp(regText, 'g')
//   let n = S.match(reg)
//   return n.length
// };

var numJewelsInStones = function(J, S) {
  let jarr = J.split("");
  let sarr = S.split("");
  return sarr.filter(item=>jarr.includes(item)).length
};

let J = 'aA'
let S = 'aAAbbb'

numJewelsInStones(J, S)