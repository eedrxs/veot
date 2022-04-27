// function solution(L) {
//   let digits = [...new Set(L)].sort((a, b) => b - a);
//   for (let i = 0; i < digits.length; i++) {
//     let tempDigits = [...digits];
//     let leading = tempDigits.splice(i, 1).concat(tempDigits);
//     for (let j = 1; j < digits.length; j++) {
//       if (!(leading.join("") % 3)) return leading.join("") % 3;
//     }
//   }
// }

function solution(L) {
  let digits = L.sort((a, b) => b - a);
}

solution([2, 4, 2, 4, 2, 6, 7]);
