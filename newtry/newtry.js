let matrixA = [
  [1, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0],
  [0, 0, 3, 0, 0, 0],
  [0, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 5, 0],
  [0, 0, 0, 0, 0, 6]
];

let matrixB = [
  [7, 0, 0, 0, 0, 0],
  [0, 8, 0, 0, 0, 0],
  [0, 0, 9, 0, 0, 0],
  [0, 0, 0, 10, 0, 0],
  [0, 0, 0, 0, 11, 0],
  [0, 0, 0, 0, 0, 12]
];

let matrixC = [
  [13, 0, 0, 0, 0, 0],
  [0, 14, 0, 0, 0, 0],
  [0, 0, 15, 0, 0, 0],
  [0, 0, 0, 16, 0, 0],
  [0, 0, 0, 0, 17, 0],
  [0, 0, 0, 0, 0, 18]
];

let matrixD = [
  [19, 0, 0, 0, 0, 0],
  [0, 20, 0, 0, 0, 0],
  [0, 0, 21, 0, 0, 0],
  [0, 0, 0, 22, 0, 0],
  [0, 0, 0, 0, 23, 0],
  [0, 0, 0, 0, 0, 24]
];

let globalStiffnessMatrix = Array(8).fill().map(() => Array(8).fill(0));

let happyImg, sadImg;
let rowSliderA, colSliderA, rowSliderB, colSliderB, rowSliderC, colSliderC, rowSliderD, colSliderD;

let cellSize = 50;
let gridSize = 8; // Size of global stiffness matrix (8x8)

function preload() {
  // Load images for happy and sad states
  happyImg = loadImage('happy.png');
  sadImg = loadImage('sad.png');
}

function setup() {
  createCanvas(1600, 800);

  // Create sliders for Matrix A (6x6)
  rowSliderA = createSlider(1, 6, 1, 1);
  rowSliderA.position(10, height + 10);
  rowSliderA.style('width', '250px');
  
  colSliderA = createSlider(1, 6, 1, 1);
  colSliderA.position(300, height + 10);
  colSliderA.style('width', '250px');

  // Create sliders for Matrix B (6x6)
  rowSliderB = createSlider(1, 6, 1, 1);
  rowSliderB.position(10, height + 50);
  rowSliderB.style('width', '250px');
  
  colSliderB = createSlider(1, 6, 1, 1);
  colSliderB.position(300, height + 50);
  colSliderB.style('width', '250px');

  // Create sliders for Matrix C (6x6)
  rowSliderC = createSlider(1, 6, 1, 1);
  rowSliderC.position(10, height + 90);
  rowSliderC.style('width', '250px');
  
  colSliderC = createSlider(1, 6, 1, 1);
  colSliderC.position(300, height + 90);
  colSliderC.style('width', '250px');

  // Create sliders for Matrix D (6x6)
  rowSliderD = createSlider(1, 6, 1, 1);
  rowSliderD.position(10, height + 130);
  rowSliderD.style('width', '250px');
  
  colSliderD = createSlider(1, 6, 1, 1);
  colSliderD.position(300, height + 130);
  colSliderD.style('width', '250px');
}

function draw() {
  background(255);

  // Get the selected row and column indices for each matrix
  let rowA = rowSliderA.value() - 1;
  let colA = colSliderA.value() - 1;
  let rowB = rowSliderB.value() - 1;
  let colB = colSliderB.value() - 1;
  let rowC = rowSliderC.value() - 1;
  let colC = colSliderC.value() - 1;
  let rowD = rowSliderD.value() - 1;
  let colD = colSliderD.value() - 1;

  // Display matrices
  drawMatrix(matrixA, 0, 0, "Matrix A");
  drawMatrix(matrixB, 0, 300, "Matrix B");
  drawMatrix(matrixC, 0, 600, "Matrix C");
  drawMatrix(matrixD, 0, 900, "Matrix D");

  // Display the global stiffness matrix on the right side
  drawGlobalStiffnessMatrix(globalStiffnessMatrix, width - 450, 0);

  // Highlight the selected row and column for each matrix
  drawHighlight(rowA, colA, 0, 0);  // Matrix A
  drawHighlight(rowB, colB, 0, 300);  // Matrix B
  drawHighlight(rowC, colC, 0, 600);  // Matrix C
  drawHighlight(rowD, colD, 0, 900);  // Matrix D

  // Clear the global stiffness matrix
  globalStiffnessMatrix = Array(8).fill().map(() => Array(8).fill(0));

  // Update the global stiffness matrix based on the selected row and column
  updateGlobalStiffnessMatrix(rowA, colA, matrixA, 0, 0);
  updateGlobalStiffnessMatrix(rowB, colB, matrixB, 0, 2);
  updateGlobalStiffnessMatrix(rowC, colC, matrixC, 2, 0);
  updateGlobalStiffnessMatrix(rowD, colD, matrixD, 2, 2);

  // Display the images (happy and sad) based on the current slider selections
  drawImages(matrixA, rowA, colA, 0, 0);
  drawImages(matrixB, rowB, colB, 0, 300);
  drawImages(matrixC, rowC, colC, 0, 600);
  drawImages(matrixD, rowD, colD, 0, 900);
}

// Function to draw the global stiffness matrix (8x8)
function drawGlobalStiffnessMatrix(matrix, offsetX, offsetY) {
  stroke(0);
  noFill();

  // Draw the matrix grid (8x8)
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      rect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
      textAlign(CENTER, CENTER);
      text(matrix[r][c], offsetX + c * cellSize + cellSize / 2, offsetY + r * cellSize + cellSize / 2);
    }
  }

  // Display label for the matrix
  textAlign(CENTER, TOP);
  text("Global Stiffness Matrix", offsetX + gridSize * cellSize / 2, offsetY - 20);
}

// Function to draw a matrix (6x6)
function drawMatrix(matrix, offsetX, offsetY, label) {
  stroke(0);
  noFill();

  // Draw the matrix grid (6x6 for the element stiffness matrix)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      rect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
      textAlign(CENTER, CENTER);
      text(matrix[r][c], offsetX + c * cellSize + cellSize / 2, offsetY + r * cellSize + cellSize / 2);
    }
  }

  // Display label for the matrix
  textAlign(CENTER, TOP);
  text(label, offsetX + 6 * cellSize / 2, offsetY - 20);
}

// Function to highlight the current row and column for the element matrix
function drawHighlight(row, col, offsetX, offsetY) {
  fill(255, 0, 0, 100); // Red highlight

  // Highlight the row
  for (let c = 0; c < 6; c++) {
    rect(offsetX + c * cellSize, offsetY + row * cellSize, cellSize, cellSize);
  }

  // Highlight the column
  for (let r = 0; r < 6; r++) {
    rect(offsetX + col * cellSize, offsetY + r * cellSize, cellSize, cellSize);
  }
}

// Function to update the global stiffness matrix
function updateGlobalStiffnessMatrix(row, col, matrix, globalRowOffset, globalColOffset) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      let globalRow = globalRowOffset + r;
      let globalCol = globalColOffset + c;
      globalStiffnessMatrix[globalRow][globalCol] = matrix[r][c];
    }
  }
}

// Function to draw images based on the matrix values
function drawImages(matrix, row, col, offsetX, offsetY) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      let img = (r === row && c === col) ? happyImg : sadImg;
      image(img, offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
    }
  }
}
