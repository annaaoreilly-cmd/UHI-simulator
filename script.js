
const grid = document.getElementById("grid");
console.log("JavaScript is running!");
console.log(grid);
// The feature currently selected by the user
let selectedTool = "tree";

// Define each land-cover feature

const features = {
  tree: {
    emoji: "🌳",
    color: "#4f9e60",
    heat: -2
  },

  building: {
    emoji: "🏢",
    color: "#b0a49a",
    heat: 2
  },

  pavement: {
    emoji: "🛣️",
    color: "#777777",
    heat: 3
  },

  grass: {
    emoji: "",
    color: "#90c978",
    heat: 0
  }
};


// Change the selected feature

function selectTool(tool) {
  selectedTool = tool;

  // Remove the highlight from all buttons
  const buttons = document.querySelectorAll("#tools button");

  buttons.forEach(function(button) {
    button.classList.remove("selected");
  });

  // Highlight the button that was clicked
  const selectedButton = document.querySelector(
    `button[onclick="selectTool('${tool}')"]`
  );

  selectedButton.classList.add("selected");
}

// Highlight Tree when the simulator first loads
selectTool("tree");


// Create the 8 x 8 grid
for (let i = 0; i < 64; i++) {

  // Create a new square
  const square = document.createElement("div");

  // Give it the CSS square styling
  square.classList.add("square");

  // Add a feature when clicked
  
square.dataset.type = "grass";

square.addEventListener("click", function() {
  const feature = features[selectedTool];

  // Remember which feature is on this square
  square.dataset.type = selectedTool;

  // Update its appearance
  square.textContent = feature.emoji;
  square.style.backgroundColor = feature.color;

  // Recalculate the neighborhood heat score
  updateHeatScore();
});


  // Add the square to the grid
  grid.appendChild(square);
}

function updateHeatScore() {
  let totalHeat = 0;

  // Look at every square in the neighborhood
  const squares = document.querySelectorAll(".square");

  squares.forEach(function(square) {
    const type = square.dataset.type;

    // Add the heat contribution of that feature
    totalHeat += features[type].heat;
  });

  // Display the total score
  const scoreDisplay = document.getElementById("heat-score");
  const message = document.getElementById("heat-message");

  scoreDisplay.textContent =
    (totalHeat > 0 ? "+" : "") + totalHeat;

  // Change the message and color
  if (totalHeat > 0) {
    scoreDisplay.style.color = "#d9534f";
    message.textContent = "Your neighborhood has a warming effect!";
  } else if (totalHeat < 0) {
    scoreDisplay.style.color = "#2e8b57";
    message.textContent = "Your neighborhood has a cooling effect!";
  } else {
    scoreDisplay.style.color = "#555555";
    message.textContent = "Your neighborhood is at its starting baseline.";
  }
}
