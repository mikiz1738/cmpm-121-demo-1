import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Boo! Haunted Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Display for ghost count
const ghostCountDisplay = document.createElement("div");
ghostCountDisplay.innerHTML = "Ghost Count: 0"; // Initial count
app.append(ghostCountDisplay);

const hauntingRateDisplay = document.createElement("div");
hauntingRateDisplay.innerHTML = "Haunting Rate: 0.0 ghosts/sec"; // Initial haunting rate
app.append(hauntingRateDisplay);

// Status displays for each purchased item
const itemCountDisplaySpecter = document.createElement("div");
const itemCountDisplayPhantom = document.createElement("div");
const itemCountDisplayWraith = document.createElement("div");

itemCountDisplaySpecter.innerHTML = "Specter: 0 purchased";
itemCountDisplayPhantom.innerHTML = "Phantom: 0 purchased";
itemCountDisplayWraith.innerHTML = "Wraith: 0 purchased";

itemCountDisplaySpecter.style.position = "absolute";
itemCountDisplaySpecter.style.top = "60%";
itemCountDisplaySpecter.style.left = "60%";

itemCountDisplayPhantom.style.position = "absolute";
itemCountDisplayPhantom.style.top = "65%";
itemCountDisplayPhantom.style.left = "60%";

itemCountDisplayWraith.style.position = "absolute";
itemCountDisplayWraith.style.top = "70%";
itemCountDisplayWraith.style.left = "60%";

app.append(itemCountDisplaySpecter, itemCountDisplayPhantom, itemCountDisplayWraith);

let ghostCount = 0;
let prevStamp = 0;
let hauntingRate = 0;
let purchasedSpecter = 0;
let purchasedPhantom = 0;
let purchasedWraith = 0;

const baseCosts = { Specter: 10, Phantom: 100, Wraith: 1000 };
const growthRates = { Specter: 0.1, Phantom: 2.0, Wraith: 50.0 };
let currentCostSpecter = baseCosts.Specter;
let currentCostPhantom = baseCosts.Phantom;
let currentCostWraith = baseCosts.Wraith;

const buttonClick = document.createElement("button");
buttonClick.innerHTML = "👻";
app.append(buttonClick);

const buttonUpgradeSpecter = document.createElement("button");
buttonUpgradeSpecter.innerHTML = `Summon Specter (Cost: ${currentCostSpecter.toFixed(2)}, +0.1 ghosts/sec)`;
buttonUpgradeSpecter.disabled = true;
app.append(buttonUpgradeSpecter);

const buttonUpgradePhantom = document.createElement("button");
buttonUpgradePhantom.innerHTML = `Summon Phantom (Cost: ${currentCostPhantom.toFixed(2)}, +2.0 ghosts/sec)`;
buttonUpgradePhantom.disabled = true;
app.append(buttonUpgradePhantom);

const buttonUpgradeWraith = document.createElement("button");
buttonUpgradeWraith.innerHTML = `Summon Wraith (Cost: ${currentCostWraith.toFixed(2)}, +50 ghosts/sec)`;
buttonUpgradeWraith.disabled = true;
app.append(buttonUpgradeWraith);

function styleButton(button: HTMLElement, top: string, left: string, fontSize: string) {
  button.style.position = "absolute";
  button.style.top = top;
  button.style.left = left;
  button.style.transform = "translate(-50%, -50%)";
  button.style.fontSize = fontSize;
}

styleButton(buttonClick, "60%", "35%", "50px");
styleButton(buttonUpgradeSpecter, "70%", "40%", "20px");
styleButton(buttonUpgradePhantom, "80%", "40%", "20px");
styleButton(buttonUpgradeWraith, "90%", "40%", "20px");

ghostCountDisplay.style.position = "absolute";
ghostCountDisplay.style.top = "5%";
ghostCountDisplay.style.left = "10%";
ghostCountDisplay.style.transform = "translate(-50%, -50%)";
ghostCountDisplay.style.fontSize = "30px";

// Main button click event
buttonClick.addEventListener("click", () => {
  ghostCount++;
  buttonClick.innerHTML = buttonClick.innerHTML === "👻" ? "👺" : "👻";
  ghostCountDisplay.innerHTML = `Ghost Count: ${ghostCount}`;

  buttonUpgradeSpecter.disabled = ghostCount < currentCostSpecter;
  buttonUpgradePhantom.disabled = ghostCount < currentCostPhantom;
  buttonUpgradeWraith.disabled = ghostCount < currentCostWraith;
});

// Upgrade purchase function
function purchaseUpgrade(
  button: HTMLElement,
  currentCost: number,
  growth: number,
  purchased: number,
  itemCountDisplay: HTMLElement,
  itemLabel: string
) {
  ghostCount -= currentCost;
  hauntingRate += growth;
  purchased++;
  currentCost *= 1.15;

  ghostCountDisplay.innerHTML = `Ghost Count: ${ghostCount}`;
  hauntingRateDisplay.innerHTML = `Haunting Rate: ${hauntingRate.toFixed(1)} ghosts/sec`;
  itemCountDisplay.innerHTML = `${itemLabel}: ${purchased} purchased`;
  button.innerHTML = `Summon ${itemLabel} (Cost: ${currentCost.toFixed(2)}, +${growth} ghosts/sec)`;

  return { newCost: currentCost, newPurchased: purchased };
}

buttonUpgradeSpecter.addEventListener("click", () => {
  if (ghostCount >= currentCostSpecter) {
    const { newCost, newPurchased } = purchaseUpgrade(buttonUpgradeSpecter, currentCostSpecter, growthRates.Specter, purchasedSpecter, itemCountDisplaySpecter, "Specter");
    currentCostSpecter = newCost;
    purchasedSpecter = newPurchased;
  }
});

buttonUpgradePhantom.addEventListener("click", () => {
  if (ghostCount >= currentCostPhantom) {
    const { newCost, newPurchased } = purchaseUpgrade(buttonUpgradePhantom, currentCostPhantom, growthRates.Phantom, purchasedPhantom, itemCountDisplayPhantom, "Phantom");
    currentCostPhantom = newCost;
    purchasedPhantom = newPurchased;
  }
});

buttonUpgradeWraith.addEventListener("click", () => {
  if (ghostCount >= currentCostWraith) {
    const { newCost, newPurchased } = purchaseUpgrade(buttonUpgradeWraith, currentCostWraith, growthRates.Wraith, purchasedWraith, itemCountDisplayWraith, "Wraith");
    currentCostWraith = newCost;
    purchasedWraith = newPurchased;
  }
});

// Animation loop for haunting rate
function updateHaunting(timestamp: number) {
  const elapsed = timestamp - prevStamp;

  if (elapsed >= 1000) {
    ghostCount += hauntingRate;
    ghostCountDisplay.innerHTML = `Ghost Count: ${Math.floor(ghostCount)}`;
    prevStamp = timestamp;
  }

  buttonUpgradeSpecter.disabled = ghostCount < currentCostSpecter;
  buttonUpgradePhantom.disabled = ghostCount < currentCostPhantom;
  buttonUpgradeWraith.disabled = ghostCount < currentCostWraith;

  requestAnimationFrame(updateHaunting);
}

requestAnimationFrame(updateHaunting);
