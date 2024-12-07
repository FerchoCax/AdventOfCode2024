const fs = require('fs');
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const values = fileContent.split('\n')
  let contador =0;
  let contador2 =0;

  for (let line of values) {
    let splited = line.trim().split(" ")
    let first = true;
    let second = true;
    let prevousValue
    let error = false;
    let asendente = false;
    for (let value of splited) {
        if(first){
            prevousValue = Number.parseInt(value)
        }else{
            if(second){
                asendente =  Number.parseInt(value) > prevousValue 
                second= false
            }
            let diferencia = Math.abs(prevousValue - Number.parseInt(value))
            let asend = Number.parseInt(value) > prevousValue 
            if(asend != asendente){
                error = true;
                break;
            }
            if(!(diferencia < 4 && diferencia >0)){
                error = true;
                break;
            }
            prevousValue = Number.parseInt(value)
        }
        first = false
    }
    if(!error)
        contador++
  }
  console.log(contador)

//   for (let line of values) {
//     let splited = line.trim().split(" ")
//     let first = true;
//     let second = true;
//     let prevousValue
//     let error = false;
//     let eliminado = false;
//     let asendente = false;
//     console.log(splited)

//     for (let value of splited) {
//         let eliminadoEsta = false;
//         if(first){
//             prevousValue = Number.parseInt(value)
//         }else{
//             if(second){
//                 asendente =  Number.parseInt(value) > prevousValue 
//                 second= false
//             }
//             let diferencia = Math.abs(prevousValue - Number.parseInt(value))
//             let asend = Number.parseInt(value) > prevousValue 
            
//             if(asend != asendente){
//                 if(!eliminado){
//                     eliminado = true;
//                     eliminadoEsta = true;
//                     console.log(value)
//                     // prevousValue = Number.parseInt(prevousValue)
//                 }else{
//                     console.log('ER '+ value)
//                     error = true;
//                     break;
//                 }
                
//             }
//             if(eliminado && !eliminadoEsta && (diferencia > 3 || diferencia < 1)){
//                 console.log('ER '+ value)
//                         error = true;
//                         break;
//             }
//             if(diferencia > 3 || diferencia < 1){
//                 if(!eliminado){
//                     eliminado = true;
//                     eliminadoEsta = true;
//                     console.log(value)
//                     // prevousValue = Number.parseInt(prevousValue)
//                 }else{
//                     if(!eliminado){
//                         console.log('ER '+ value)
//                         error = true;
//                         break;
//                     }
                    
//                 }
//             }
//             if(value == '16'){
//                 console.log(eliminadoEsta)
//                 console.log(eliminado)
//             }
//             if(!eliminado){
//                 if(!eliminadoEsta){
//                     console.log('prev A ' + prevousValue)
//                 prevousValue = Number.parseInt(value)
//                 console.log('prev D ' +prevousValue)
//                 }else{
//                     console.log('El '+ prevousValue)
//                     prevousValue = prevousValue
    
//                 }
                
//             }else{
//                 if(!eliminadoEsta){
//                     console.log('prev A ' + prevousValue)
//                 prevousValue = Number.parseInt(value)
//                 console.log('prev D ' +prevousValue)
//                 }else{
//                     console.log('El '+ prevousValue)
//                     prevousValue = prevousValue
    
//                 }

//             }
//         }
//         first = false
//     }
//     if(!error){
//         console.log('No ')
//         contador++
//     }
//     else{
//         console.log('Previos' + prevousValue)
//         console.log('Error')
//     }
//     console.log('----------')
        

//   }
//   console.log(contador)
  
} catch (err) {
}

function sortArray(array){
  return array.sort(function(a, b){return a - b})
}
