const fs = require('fs');
// const filePath = './3/input.txt';
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const values = fileContent.split('\n').map(e => e.replace('\r', '').split(''))
  const responce = [...values]
  let direction = 0;
  let maxY = values.length-1;
  let maxX = values[0].length-1
  let diferentPositions = 0
  let usedPositions =[]
  // const counts = {};
  let loopCount = 0
  const directions = [
    [-1,0], //arriba
    [0,1], //derecha
    [1,0], //abajo
    [0,-1]  //izquierda
  ]
  let startPosition = findStart()
  movePosition(startPosition)

  for (const res of responce) {
    diferentPositions += res.filter(e => e == 'X').length
  }

  for (const position of usedPositions) {
    if(validateLoop(position)){
      loopCount+=1
    } 
  }

  console.log(loopCount)

  // console.log(usedPositions)
  // console.log(diferentPositions)


  function findStart(){
    let startPosition;
    values.forEach((e,index) => {
        if(e.indexOf('^') != -1){
            startPosition = [index, e.indexOf('^')]
        }
    })
    return startPosition
  }

  function movePosition(postion){
    let x = postion[1]
    let y = postion[0]
    let newPosition = [(y+(directions[direction][0])),x+(directions[direction][1])]
    usedPositions.push({
      direction: direction,
      y:postion[0],
      x:postion[1]
    })
    // usedPositions.push( postion)
    if(newPosition[0] > maxY || newPosition[1] > maxX || newPosition[0] < 0 || newPosition[1] < 0){
        responce[postion[0]][postion[1]] = 'X'
        return;
    }
    if(values[newPosition[0]][newPosition[1]] == "#"){
        direction +=1;
        if(direction == 4){
            direction = 0
        }
        newPosition = [(y+(directions[direction][0])),x+(directions[direction][1])]
    }else{
        newPosition = [(y+(directions[direction][0])),x+(directions[direction][1])]
    }
    responce[postion[0]][postion[1]] = 'X'
    movePosition(newPosition)
  }

  function validateLoop(position){
    let positions = usedPositions.filter(e => e.x == position.x && e.y == position.y)

    if(positions.length <2){
      return false;
    }
    for (const pos of positions) {
      if(position.direction == 0 && pos.direction == 1 || 
         position.direction == 1 && pos.direction == 2 ||
         position.direction == 2 && pos.direction == 3 ||
         position.direction == 3 && pos.direction == 0
      ){
        console.log(responce[(position.y+(position.direction))][position.x+(position.direction)])
        if(responce[(position.y+(position.direction))][position.x+(position.direction)] != "#"){
          return true
        }
      }
    }
  }

} catch (err) {
    console.log(err)
}