const fs = require('fs');
//const filePath = './3/input.txt';
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let values = fileContent.split('\n').map(e => e.replace('\r', '').split(''))
  const responce = [...values]
  let direction = 0;
  let maxY = values.length-1;
  let maxX = values[0].length-1
  let diferentPositions = 0
  let usedPositions =[]
  // const counts = {};
  const directions = [
    [-1,0], //arriba
    [0,1], //derecha
    [1,0], //abajo
    [0,-1]  //izquierda
  ]
  let startPosition = findStart()
  let startPosition2 = findStart()
  movePosition(startPosition2)

  for (const res of responce) {
    diferentPositions += res.filter(e => e == 'X').length
  }


  console.log(diferentPositions)
  values = fileContent.split('\n').map(e => e.replace('\r', '').split(''))
  console.log(findValidObstructionPositions().length)


  function findStart(){
    let startPositions;
    values.forEach((e,index) => {
        if(e.indexOf('^') != -1){
            startPositions = [index, e.indexOf('^')]
        }
    })
    return startPositions
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

  function simulateWithObstacle(obstacle) {
    let direction = 0;
    let y = startPosition[0];
    let x = startPosition[1];
    const visited = new Set();
    if (obstacle) {
      values[obstacle[0]][obstacle[1]] = '#'; 
    }

    while (true) {
      const state = `${y},${x},${direction}`;
      if (visited.has(state)) {
        
        if (obstacle) values[obstacle[0]][obstacle[1]] = '.'; 
        return true;
      }
      visited.add(state);

      // Calcula la nueva posición
      const newY = y + directions[direction][0];
      const newX = x + directions[direction][1];

      if (
        newY < 0 || newX < 0 || newY > maxY || newX > maxX || 
        values[newY][newX] === '#'
      ) {
        // Si hay un obstáculo o estamos fuera del mapa, giramos a la derecha
        direction = (direction + 1) % 4;
      } else {
        // De lo contrario, avanzamos
        y = newY;
        x = newX;
      }

      // Si salimos del mapa, no hay bucle
      if (newY < 0 || newX < 0 || newY > maxY || newX > maxX) {
        if (obstacle) values[obstacle[0]][obstacle[1]] = '.'; // Limpia la obstrucción temporal
        return false;
      }
    }
  }

  function findValidObstructionPositions() {
    const validPositions = [];
    for (let y = 0; y <= maxY; y++) {
      for (let x = 0; x <= maxX; x++) {
        // No colocar obstrucción en la posición inicial ni donde ya hay obstáculos
        if ((y !== startPosition[0] || x !== startPosition[1]) && values[y][x] === '.') {
          if (simulateWithObstacle([y, x])) {
            validPositions.push([y, x]);
          }
        }
      }
    }
    return validPositions;
  }




} catch (err) {
    console.log(err)
}