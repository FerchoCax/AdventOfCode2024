const fs = require('fs');
// const filePath = './3/input.txt';
const filePath = './input.txt';
const regexAll =  /mul\(\d+(?:\.\d+)?,\d+(?:\.\d+)?\)/g;
const regexDoNotAll = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don'\w{2}\(\))/g
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const values = fileContent.split('\n').map(e => e.replace(' ', ''))
  let total = 0
  let totalDoDont =0
  values.forEach(e => total += findMul(e))
  console.log(total)
  values.forEach(e => totalDoDont += findMulActive(e))
  console.log(totalDoDont)
} catch (err) {
    console.log(err)
}
function findMul(string){
    let total = 0
    const match = [...string.matchAll(regexAll)];
    match.forEach(element => {
        total += operateMul(element[0])
    });
    return total
}
function findMulActive(string){

    let total = 0
    const match =  [...string.matchAll(regexAll)]
    let Do = true;
    match.forEach(element =>{
        if(element[0] === 'do()'){
            Do = true
        }else if(element[0]=== "don't()"){
            Do = false
        }else{
            total += operateMul(element[0])
        }
    })
    return total
}
function operateMul(mulString){
    mulString = mulString.replace(')','')
    let values = mulString.substring('mul('.length).split(',')
    return Number.parseInt(values[0]) * Number.parseInt(values[1])
}

