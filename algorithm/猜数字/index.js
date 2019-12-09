var game = function (guess, answer) {
  let count = 0
  guess.forEach((val, index) => {
    if (val === answer[index]) count++
  });
  return count
}

let guess = [3, 2, 3]
let answer = [3, 2, 1]

let count = game(guess, answer)
console.log(count)