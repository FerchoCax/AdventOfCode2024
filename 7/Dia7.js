const fs = require('fs');
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let values = fileContent.split('\n').map(e => e.replace('\r', '').split(':'))
  let totalPart1 = 0
  let totalPart2 = 0
  for (const pair of values) {
    let responce = Number.parseInt(pair[0])
    // console.log(pair)
    let vals = pair[1].trim().split(' ').map(function(item) {
      return parseInt(item, 10);
    })
    if(findCalibration(responce, vals)){
      totalPart1 += responce
    }
  }

  for (const pair of values) {
    let responce = Number.parseInt(pair[0])
    // console.log(pair)
    let vals = pair[1].trim().split(' ').map(function(item) {
      return parseInt(item, 10);
    })
    if(findCalibration(responce, vals) || findCalibrationWhitConcatenation(responce, vals)){
      console.log(pair)
      totalPart2 += responce
    }
  }

  console.log(totalPart1)
  console.log(totalPart2)
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

function findCalibrationWhitConcatenation(responce, vals){
  const results = rowPermutations(vals);
  for (const array of results) {
    if(findCalibration(responce, array)){
      return true
    }
  }
  return false
}

function rowPermutations(vals) {
  let results = []
  for (let i = 0; i < vals.length - 1; i++) {
    const newArr = [...vals];
    const newValue = Number.parseInt(newArr[i].toString()+ newArr[i + 1].toString());
    newArr.splice(i, 2, newValue);
    results.push(newArr);
  }
  return results
}
