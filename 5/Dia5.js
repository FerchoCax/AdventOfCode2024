
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

  let count = 0
  let unorderedCount = 0
  for (const linea of values) {
    let valid = validLine(linea)
    if(valid){
      count +=  getCenterValue(linea)
    }else{
      validOrderLine(linea)
    }
  }

  //Parte 1
  console.log(count)
  //Parte 2
  console.log(unorderedCount)


  function validatePosition(first, second){
    if(first == second){
      return true;
    }
    let vals = rules.filter(e => e[0] == first && e[1] == second).length > 0
    return vals
  }
  function getCenterValue(linea){
    let medium = 0
    if(linea.length%2 == 0){
      medium = (linea.length /2)-1;
      return linea[medium] + linea[medium+1]
    }else{
      medium = ((linea.length -1) /2)
      return linea[medium]
    }
  }

  function validLine(linea){
    let valid = true;
    for (let i = 0; i < linea.length; i++) {
      for(let j = i; j< linea.length; j++){
        valid = validatePosition(linea[i], linea[j])
        if(!valid){
          break;
        }
      } 
      if(!valid){
        break;
      }
    }
    return valid
  }

  function validOrderLine(linea){
    let valid = true;
    for (let i = 0; i < linea.length; i++) {
      for(let j = i; j< linea.length; j++){
        valid = validatePosition(linea[i], linea[j])
        if(!valid){
          tempLine = [...linea];
          tempLine[i] = linea[j];
          tempLine[j] = linea[i]
          if(validOrderLine(tempLine)){
            unorderedCount += getCenterValue(tempLine)
          }
          break;
        }
      } 
      if(!valid){
        break;
      }
    }
    return valid
  }

} catch (err) {
    console.log(err)
}

