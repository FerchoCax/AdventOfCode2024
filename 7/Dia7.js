const fs = require('fs');
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let values = fileContent.split('\n').map(e => e.replace('\r', '').split(':'))
  let total = 0
  let activeWorkers = 0
  for (const pair of values) {
    let responce = Number.parseInt(pair[0])
    console.log(pair)
    let vals = pair[1].trim().split(' ').map(function(item) {
      return parseInt(item, 10);
    })
    if(findCalibration(responce, vals)){
      total += responce
    }
    // break
  }
  console.log(total)
} catch (err) {
    console.log(err)
}

function findCalibration(responce, vals) {
  const operatios = vals.length - 1;
  const factorial = 1 << operatios; 
  for (let count = 0; count < factorial; count++) {
    let total = vals[0];
    for (let i = 0; i < operatios; i++) {
      const isMultiply = (count & (1 << i)) !== 0; 
      total = isMultiply ? total * vals[i + 1] : total + vals[i + 1];
    }
    if (total === responce) {
      return true;
    }
  }
  return false;
}