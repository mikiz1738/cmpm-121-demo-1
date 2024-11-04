import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const GAME_NAME = "Boo! Haunted Clicker";
document.title = GAME_NAME;

const header = document.createElement("h1");
header.innerHTML = GAME_NAME;
app.append(header);

// Display elements for ghost count and haunting rate
const ghostCountDisplay = document.createElement("div");
const hauntingRateDisplay = document.createElement("div");

ghostCountDisplay.innerHTML = "Ghost Count: 0";
hauntingRateDisplay.innerHTML = "Haunting Rate: 0.0 ghosts/sec";

app.append(ghostCountDisplay, hauntingRateDisplay);

// Game state
let ghostCount = 0;
let hauntingRate = 0;
let lastUpdateTimestamp = 0;

class GameItem {
  name: string;
  baseCost: number;
  rateIncrease: number;
  currentCost: number;
  purchasedCount: number;
  description: string;
  displayElement: HTMLDivElement;
  buttonElement: HTMLButtonElement;

  constructor(
    name: string,
    cost: number,
    rateIncrease: number,
    description: string,
    index: number,
  ) {
    this.name = name;
    this.baseCost = cost;
    this.rateIncrease = rateIncrease;
    this.currentCost = cost;
    this.purchasedCount = 0;
    this.description = description;

    this.displayElement = this.createDisplayElement(index);
    this.buttonElement = this.createButtonElement(index);
  }

  createDisplayElement(index: number): HTMLDivElement {
    const display = document.createElement("div");
    display.innerHTML = `${this.name}: ${this.purchasedCount} purchased`;
    display.style.position = "absolute";
    display.style.top = `${60 + index * 5}%`;
    display.style.left = "75%";
    app.append(display);
    return display;
  }

  createButtonElement(index: number): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerHTML = this.getButtonText();
    button.style.position = "absolute";
    button.style.top = `${75 + index * 10}%`;
    button.style.left = "40%";
    button.style.transform = "translate(-50%, -50%)";
    button.style.fontSize = "20px";
    button.disabled = true;
    app.append(button);

    button.addEventListener("click", () => this.purchase());
    return button;
  }

  getButtonText(): string {
    return `Summon ${this.name} (Cost: ${this.currentCost.toFixed(2)}, +${this.rateIncrease} ghosts/sec) - ${this.description}`;
  }

  purchase(): void {
    if (ghostCount >= this.currentCost) {
      ghostCount -= this.currentCost;
      hauntingRate += this.rateIncrease;
      this.purchasedCount++;
      this.currentCost *= 1.15;

      updateDisplay();
      this.updateElements();
    }
  }

  updateElements(): void {
    this.displayElement.innerHTML = `${this.name}: ${this.purchasedCount} purchased`;
    this.buttonElement.innerHTML = this.getButtonText();
    this.buttonElement.disabled = ghostCount < this.currentCost;
  }
}

// Initialize available items
const gameItems = [
  new GameItem(
    "Specter",
    10,
    0.1,
    "A fleeting spirit to slowly add to your ghostly numbers.",
    0,
  ),
  new GameItem(
    "Phantom",
    100,
    2.0,
    "An elusive soul that brings a stronger, steady haunt.",
    1,
  ),
  new GameItem(
    "Wraith",
    1000,
    50.0,
    "A powerful apparition that amplifies your haunting power.",
    2,
  ),
  new GameItem(
    "Poltergeist",
    5000,
    200.0,
    "A chaotic spirit that adds an intense haunting presence.",
    3,
  ),
  new GameItem(
    "Banshee",
    20000,
    1000.0,
    "An eerie wailer whose cries bring waves of new ghosts.",
    4,
  ),
];

// Main ghost click button
const ghostClickButton = document.createElement("button");
ghostClickButton.innerHTML = "👻";
ghostClickButton.style.position = "absolute";
ghostClickButton.style.top = "60%";
ghostClickButton.style.left = "35%";
ghostClickButton.style.transform = "translate(-50%, -50%)";
ghostClickButton.style.fontSize = "50px";
app.append(ghostClickButton);

ghostClickButton.addEventListener("click", () => {
  ghostCount++;
  updateDisplay();
  updateButtonStates();
});

function updateDisplay(): void {
  ghostCountDisplay.innerHTML = `Ghost Count: ${Math.floor(ghostCount)}`;
  hauntingRateDisplay.innerHTML = `Haunting Rate: ${hauntingRate.toFixed(1)} ghosts/sec`;
}

function updateButtonStates(): void {
  gameItems.forEach((item) => {
    item.buttonElement.disabled = ghostCount < item.currentCost;
  });
}

// Animation loop to update ghost count with haunting rate
function updateHaunting(timestamp: number): void {
  const elapsed = timestamp - lastUpdateTimestamp;

  if (elapsed >= 1000) {
    ghostCount += hauntingRate;
    updateDisplay();
    lastUpdateTimestamp = timestamp;
  }

  updateButtonStates();
  requestAnimationFrame(updateHaunting);
}

requestAnimationFrame(updateHaunting);
