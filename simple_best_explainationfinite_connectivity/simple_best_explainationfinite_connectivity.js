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

// Custom row and column indices
let matrixA_rows = [1, 2, 3, 4, 5, 6];
let matrixA_cols = [1, 2, 3, 4, 5, 6];

let matrixB_rows = [1, 2, 3, 4, 5, 6];
let matrixB_cols = [1, 2, 3, 4, 5, 6];

let globalStiffnessMatrix = Array(6).fill().map(() => Array(6).fill(0));
let rowSlider, colSlider;
let gridSize = 6;
let cellSize = 50;

let happyImg, sadImg;

function preload() {
  // Load images
  happyImg = loadImage('happy.png');
  sadImg = loadImage('sad.png');
}

function setup() {
  createCanvas(1000, 600);

  // Row slider (for i)
  rowSlider = createSlider(0, gridSize - 1, 0, 1);
  rowSlider.position(10, height + 10);
  rowSlider.style('width', '250px');

  // Column slider (for j)
  colSlider = createSlider(0, gridSize - 1, 0, 1);
  colSlider.position(300, height + 10);
  colSlider.style('width', '250px');
}

function draw() {
  background(255);

  let row = rowSlider.value(); // Get the row index
  let col = colSlider.value(); // Get the column index

  // Display the matrices
  drawMatrix(matrixA, 0, 0, "Matrix A");
  drawMatrix(matrixB, width / 3, 0, "Matrix B");

  // Display the global stiffness matrix
  drawMatrix(globalStiffnessMatrix, 0, height / 2, "Global Stiffness Matrix");

  // Highlight the selected row and column for Matrix A and Matrix B
  drawHighlight(row, col, 0, 0); // For Matrix A
  drawHighlight(row, col, width / 3, 0); // For Matrix B

  // Update the global stiffness matrix based on row and column selection
  updateGlobalStiffnessMatrix(row, col);

  // Display the emoji only for the selected cell
  drawEmoji(row, col, (2 * width) / 3, height / 4);
}

// Function to draw a matrix
function drawMatrix(matrix, offsetX, offsetY, label) {
  stroke(0);
  noFill();

  // Draw the matrix grid
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      rect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
      textAlign(CENTER, CENTER);
      text(matrix[r][c], offsetX + c * cellSize + cellSize / 2, offsetY + r * cellSize + cellSize / 2);
    }
  }

  // Display label for the matrix
  textAlign(CENTER, TOP);
  text(label, offsetX + gridSize * cellSize / 2, offsetY - 20);
}

// Function to highlight the current row and column
function drawHighlight(row, col, offsetX, offsetY) {
  fill(255, 0, 0, 100); // Red highlight

  // Highlight the row
  for (let c = 0; c < gridSize; c++) {
    rect(offsetX + c * cellSize, offsetY + row * cellSize, cellSize, cellSize);
  }

  // Highlight the column
  for (let r = 0; r < gridSize; r++) {
    rect(offsetX + col * cellSize, offsetY + r * cellSize, cellSize, cellSize);
  }

  // Highlight the selected cell
  fill(255, 0, 0);
  ellipse(offsetX + col * cellSize + cellSize / 2, offsetY + row * cellSize + cellSize / 2, 20, 20);
}

// Function to update the global stiffness matrix based on custom row and column indices
function updateGlobalStiffnessMatrix(row, col) {
  let aRow = matrixA_rows[row] - 1; // Convert to 0-based index
  let aCol = matrixA_cols[col] - 1; // Convert to 0-based index
  let bRow = matrixB_rows[row] - 1; // Convert to 0-based index
  let bCol = matrixB_cols[col] - 1; // Convert to 0-based index

  // Update the global stiffness matrix
  globalStiffnessMatrix[row][col] = matrixA[aRow][aCol] + matrixB[bRow][bCol];
}

// Function to display an emoji at the selected cell
function drawEmoji(row, col, offsetX, offsetY) {
  let x = offsetX + col * cellSize;
  let y = offsetY + row * cellSize;

  // Draw the emoji based on whether it's diagonal or not
  if (row === col) {
    image(happyImg, x + cellSize / .4, y + cellSize / .4, cellSize / .42, cellSize / .42);
  } else {
    image(sadImg, x + cellSize / .4, y + cellSize / 4, cellSize /.42, cellSize / .42);
  }
}
