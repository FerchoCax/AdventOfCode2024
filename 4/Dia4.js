
const fs = require('fs');
// const filePath = './3/input.txt';
const filePath = './input.txt';
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const values = fileContent.replaceAll('\r','').split('\n')
  const word = 'XMAS'
  const word2 = 'MAS'
  const rows = values.length;
  const cols = values[0].length;
  const wordLength = word.length;
  const wordLength2 = word2.length;
  let count = 0;
  let count2 = 0;
  const diagonalCoordinates = []
  const directions = [
        [0, 1],  // Derecha
        [1, 0],  // Abajo
        [0, -1], // Izquierda
        [-1, 0], // Arriba
        [1, 1],  // Diagonal abajo-derecha
        [1, -1], // Diagonal abajo-izquierda
        [-1, 1], // Diagonal arriba-derecha
        [-1, -1] // Diagonal arriba-izquierda
  ];

  const directions2 = [
    [1, 1],  // Diagonal abajo-derecha
    [1, -1], // Diagonal abajo-izquierda
    [-1, 1], // Diagonal arriba-derecha
    [-1, -1] // Diagonal arriba-izquierda
];
  function isWordAt(x, y, dx, dy, wordLength, words) {
    for (let i = 0; i < wordLength; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;
        if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || values[nx][ny] !== words[i]) {
            return false;
        }
    }
    return true;
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dx,dy ] of directions) {
        if (isWordAt(row, col, dx, dy, wordLength, word)) {
            count++;
        }
    }
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dx, dy ] of directions2) {
        if (isWordAt(row, col, dx, dy, wordLength2, word2)) {
            const aX = row + dx * 1;
            const aY = col + dy * 1;
            diagonalCoordinates.push({ x: aX, y: aY });
              
        }
    }
    }
  }

  let frequencyMap = diagonalCoordinates.reduce((acc, item) => {
    const key = JSON.stringify(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  
  let objectsWithTwoOccurrences = Object.entries(frequencyMap)
    .filter(([key, count]) => count === 2)
    .map(([key]) => JSON.parse(key));

  console.log(count)
  console.log(objectsWithTwoOccurrences.length)
} catch (err) {
    console.log(err)
}







