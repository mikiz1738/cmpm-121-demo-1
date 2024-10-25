import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Boo! Haunted Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Display for ghost count and haunting rate
const ghostCountDisplay = document.createElement("div");
ghostCountDisplay.innerHTML = "Ghost Count: 0"; // Initial count
app.append(ghostCountDisplay);

const hauntingRateDisplay = document.createElement("div");
hauntingRateDisplay.innerHTML = "Haunting Rate: 0.0 ghosts/sec"; // Initial haunting rate
app.append(hauntingRateDisplay);

// Ghost game variables
let ghostCount = 0;
let hauntingRate = 0;
let prevStamp = 0;

// Define available items as an array of objects for flexibility
const availableItems = [
  {
    name: "Specter",
    cost: 10,
    rateIncrease: 0.1,
    currentCost: 10,
    purchased: 0,
    displayElement: document.createElement("div"),
    buttonElement: document.createElement("button"),
  },
  {
    name: "Phantom",
    cost: 100,
    rateIncrease: 2.0,
    currentCost: 100,
    purchased: 0,
    displayElement: document.createElement("div"),
    buttonElement: document.createElement("button"),
  },
  {
    name: "Wraith",
    cost: 1000,
    rateIncrease: 50.0,
    currentCost: 1000,
    purchased: 0,
    displayElement: document.createElement("div"),
    buttonElement: document.createElement("button"),
  },
];

// Display each item’s information and button on the page
availableItems.forEach((item, index) => {
  // Configure and display item purchase status
  item.displayElement.innerHTML = `${item.name}: ${item.purchased} purchased`;
  item.displayElement.style.position = "absolute";
  item.displayElement.style.top = `${60 + index * 5}%`;
  item.displayElement.style.left = "60%";
  app.append(item.displayElement);

  // Configure and display item purchase button
  item.buttonElement.innerHTML = `Summon ${item.name} (Cost: ${item.currentCost.toFixed(2)}, +${item.rateIncrease} ghosts/sec)`;
  item.buttonElement.style.position = "absolute";
  item.buttonElement.style.top = `${70 + index * 10}%`;
  item.buttonElement.style.left = "40%";
  item.buttonElement.style.transform = "translate(-50%, -50%)";
  item.buttonElement.style.fontSize = "20px";
  item.buttonElement.disabled = true;
  app.append(item.buttonElement);

  // Add click event for purchasing items
  item.buttonElement.addEventListener("click", () => {
    if (ghostCount >= item.currentCost) {
      ghostCount -= item.currentCost;
      hauntingRate += item.rateIncrease;
      item.purchased++;
      item.currentCost *= 1.15;

      // Update displays after purchase
      ghostCountDisplay.innerHTML = `Ghost Count: ${ghostCount}`;
      hauntingRateDisplay.innerHTML = `Haunting Rate: ${hauntingRate.toFixed(1)} ghosts/sec`;
      item.displayElement.innerHTML = `${item.name}: ${item.purchased} purchased`;
      item.buttonElement.innerHTML = `Summon ${item.name} (Cost: ${item.currentCost.toFixed(2)}, +${item.rateIncrease} ghosts/sec)`;
    }
  });
});

// Main ghost click button
const buttonClick = document.createElement("button");
buttonClick.innerHTML = "👻";
buttonClick.style.position = "absolute";
buttonClick.style.top = "60%";
buttonClick.style.left = "35%";
buttonClick.style.transform = "translate(-50%, -50%)";
buttonClick.style.fontSize = "50px";
app.append(buttonClick);

// Update ghost count and item availability on main click
buttonClick.addEventListener("click", () => {
  ghostCount++;
  ghostCountDisplay.innerHTML = `Ghost Count: ${ghostCount}`;
  availableItems.forEach((item) => {
    item.buttonElement.disabled = ghostCount < item.currentCost;
  });
});

// Animation loop to update ghost count with haunting rate
function updateHaunting(timestamp: number) {
  const elapsed = timestamp - prevStamp;

  if (elapsed >= 1000) {
    ghostCount += hauntingRate;
    ghostCountDisplay.innerHTML = `Ghost Count: ${Math.floor(ghostCount)}`;
    prevStamp = timestamp;
  }

  // Enable or disable item buttons based on current ghost count
  availableItems.forEach((item) => {
    item.buttonElement.disabled = ghostCount < item.currentCost;
  });

  requestAnimationFrame(updateHaunting);
}

requestAnimationFrame(updateHaunting);
