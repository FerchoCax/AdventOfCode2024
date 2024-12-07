const fs = require('fs');
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const values = fileContent.split('\n').map(line => line.split(" ").map(Number))
  console.log(values.filter(row =>
    isSafe(row) || rowPermutations(row).some(isSafe)
  ).length)
} catch (err) {
    console.log(err)
}
function isSafe(vals){
    let previousValue = -1;
    let asendig = null;
    let error = false;
    let count = 0
    for (const value of vals) {
        let val = Number.parseInt(value)
        if(previousValue == -1){
            previousValue = val
        }else{
            let asend = previousValue < val
            let diff = Math.abs(previousValue - val)
            if(asendig == null){
                asendig = previousValue < val
            }else if(asendig != asend){
                error = true;
                // return count
            }
            if(diff > 3 || diff < 1){
                error = true;
                // return count
            }
            previousValue = val
        }
        count++
    }
    return !error
}

function rowPermutations(arr) {
    return arr.map((_, idx) => arr.toSpliced(idx, 1))
  }