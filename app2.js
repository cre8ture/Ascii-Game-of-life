// Get the ASCII container element from the document
const container = document.getElementById("asciiContainer");

// Define the characters used for ASCII shading
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

// Set the number of rows and columns for the ASCII grid
const rows = 30;
const cols = 80;

// Loop to initialize the ASCII grid with spans and line breaks
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    // Create a new span element for each ASCII character
    const span = document.createElement("span");
    // Append the span to the container
    container.appendChild(span);
  }
  // After each row, append a line break to start a new line
  container.appendChild(document.createElement("br"));
}

// Select all span elements in the container (representing each ASCII character)
const chars = container.querySelectorAll("span");

// Initialize a frame counter for animation
let frame = 0;

// Function to calculate which character to display based on x, y position and frame
function main(x, y, state) {
  const alive = state[y][x];
  return alive ? density[Math.floor(Math.random() * density.length)] : ' ';
}

// Initialize game state with random values based on density
let currentState = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => Math.random() < 0.2)
);

// Function to count live neighbors for a cell
function countNeighbors(x, y, state) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        count += state[ny][nx] ? 1 : 0;
      }
    }
  }
  return count;
}

// Function to update each frame of the animation
function updateFrame() {
  // Initialize the next state of the game
  let nextState = currentState.map((row) => [...row]);

  // Update the next state based on the current state
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const neighbors = countNeighbors(x, y, currentState);
      const alive = currentState[y][x];
      nextState[y][x] = neighbors === 3 || (alive && neighbors === 2);
    }
  }

  // Update the ASCII characters
  let i = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      chars[i++].textContent = main(x, y, nextState);
    }
  }

  // Update the current state for the next iteration
  currentState = nextState;

  // Increment the frame counter
  frame++;
  // Request the next frame of the animation
  requestAnimationFrame(updateFrame);
}

// Start the animation
updateFrame();