let minionIds = new Set();

function solution(n, b) {
  let x = n
    .split("")
    .sort((a, b) => b - a)
    .join("");
  let y = n
    .split("")
    .sort((a, b) => a - b)
    .join("");
  let k = n.length;

  let z = `${parseInt(x, b) - parseInt(y, b).toString(b)}`.padStart(k, "0");

  if (minionIds.has(z)) {
    return 0;
  } else {
    minionIds.add(z);
    return solution(z, b) + 1;
  }
}

console.log(solution("222", 10));
