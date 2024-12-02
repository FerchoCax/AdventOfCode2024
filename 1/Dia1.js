const fs = require('fs');
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const values = fileContent.split('\n')
  var leftValues = []
  var rigthValues = []
  let count = 0
  for (let line of values) {
    let splitted = line.split("  ")
    leftValues.push(Number.parseInt(splitted[0].trim()))
    rigthValues.push(Number.parseInt(splitted[1].trim()))
    count++
  }
  leftValues =  sortArray(leftValues)
  rigthValues = sortArray(rigthValues)
  var distance = 0
  var distance2 = 0
  for (let index = 0; index < count; index++) {
    distance += Math.abs(leftValues[index]-rigthValues[index])
    distance2 += (leftValues[index] * rigthValues.filter(e => e == leftValues[index]).length);
  }
  //Parte 1
  console.log(distance)
  //Parte 2
  console.log(distance2)
} catch (err) {
}

function sortArray(array){
  return array.sort(function(a, b){return a - b})
}
