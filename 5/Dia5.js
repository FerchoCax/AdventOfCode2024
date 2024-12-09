
const fs = require('fs');
const filePath = './input.txt';
const rulePattern = /\d+\|\d+/g
const valuesPattern = /(\d+,*)+/g
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const rules =  Array.from(fileContent.matchAll(rulePattern)).map(e => {
    let element = e[0].split("|")
    return [Number.parseInt(element[0]), Number.parseInt(element[1])]
  })
  const values = Array.from(fileContent.matchAll(valuesPattern)).map(e =>{
    return e[0].split(',').map(v => {return Number.parseInt(v)})
  }).filter(e => e.length > 1)

  for (const linea of values) {
    console.log(linea)
  }


} catch (err) {
    console.log(err)
}