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
    if(findCalibrationWhitConcatenation(responce, vals)){
      // console.log(pair)
      totalPart2 += responce
    }
  }
//32565384255325
//32565397601168

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
  const operatios = vals.length - 1; 
  const trits = 3 ** operatios;      
  for (let count = 0; count < trits; count++) {
    let total = vals[0];
    let currentCount = count; 
    for (let i = 0; i < operatios; i++) {
      const operation = currentCount % 3; 
      currentCount = Math.floor(currentCount / 3); 
      if (operation === 0) {
        total += vals[i + 1]; 
      } else if (operation === 1) {
        total *= vals[i + 1]; 
      } else if (operation === 2) {
        total = Number.parseInt(total.toString()+vals[i + 1].toString()) ; 
      }
    }
    if (total === responce) {
      return true; 
    }
  }
  return false; 
  // const operatios = vals.length - 1;
  // const factorial = 1 << operatios; 
  // let position = 1
  // let total = 0;

  // for (let count = 0; count < factorial; count++) {
  //     for (let j = 0; j < operatios; j++) {
  //     position = j
  //     total = vals[0]
  //     for (let i = 0; i < operatios; i++) {
  //       if(position == i){
          
  //         total = Number.parseInt(total.toString() + vals[i+1].toString())
  //       }else{
  //         const isMultiply = (count & (1 << i)) !== 0; 
  //         total = isMultiply ? total * vals[i + 1] : total + vals[i + 1];
  //         if(i+1 === vals.length-1 && total === responce){
  //           return true
  //         }
  //       }
  //   }
  //   }
   
  //   // console.log(total)
  //   if (total === responce) {
  //     return true;
  //   }
  // }
  // return false;
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
