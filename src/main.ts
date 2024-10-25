import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Boo!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const booCountDisplay = document.createElement("div");
booCountDisplay.innerHTML = "Boo Count: 0";
app.append(booCountDisplay);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = "Growth Rate: 0.0 units/sec";
app.append(growthRateDisplay);

const itemCountDisplayA = document.createElement("div");
const itemCountDisplayB = document.createElement("div");
const itemCountDisplayC = document.createElement("div");

itemCountDisplayA.innerHTML = "Item A: 0 purchased";
itemCountDisplayB.innerHTML = "Item B: 0 purchased";
itemCountDisplayC.innerHTML = "Item C: 0 purchased";

itemCountDisplayA.style.position = "absolute";
itemCountDisplayA.style.top = "60%";
itemCountDisplayA.style.left = "60%";

itemCountDisplayB.style.position = "absolute";
itemCountDisplayB.style.top = "65%";
itemCountDisplayB.style.left = "60%";

itemCountDisplayC.style.position = "absolute";
itemCountDisplayC.style.top = "70%";
itemCountDisplayC.style.left = "60%";

app.append(itemCountDisplayA, itemCountDisplayB, itemCountDisplayC);

let booCount = 0;
let prevStamp = 0;
let growthRate = 0;
let purchasedA = 0;
let purchasedB = 0;
let purchasedC = 0;

const baseCosts = { A: 10, B: 100, C: 1000 };
const growthRates = { A: 0.1, B: 2.0, C: 50.0 };
let currentCostA = baseCosts.A;
let currentCostB = baseCosts.B;
let currentCostC = baseCosts.C;

const buttonClick = document.createElement("button");
buttonClick.innerHTML = "😨";
app.append(buttonClick);

const buttonUpgradeA = document.createElement("button");
buttonUpgradeA.innerHTML = `Purchase A (Cost: ${currentCostA.toFixed(2)}, +0.1 units/sec)`;
buttonUpgradeA.disabled = true;
app.append(buttonUpgradeA);

const buttonUpgradeB = document.createElement("button");
buttonUpgradeB.innerHTML = `Purchase B (Cost: ${currentCostB.toFixed(2)}, +2.0 units/sec)`;
buttonUpgradeB.disabled = true;
app.append(buttonUpgradeB);

const buttonUpgradeC = document.createElement("button");
buttonUpgradeC.innerHTML = `Purchase C (Cost: ${currentCostC.toFixed(2)}, +50 units/sec)`;
buttonUpgradeC.disabled = true;
app.append(buttonUpgradeC);

function styleButton(button: HTMLElement, top: string, left: string, fontSize: string) {
  button.style.position = "absolute";
  button.style.top = top;
  button.style.left = left;
  button.style.transform = "translate(-50%, -50%)";
  button.style.fontSize = fontSize;
}

styleButton(buttonClick, "60%", "35%", "30px");
styleButton(buttonUpgradeA, "70%", "40%", "20px");
styleButton(buttonUpgradeB, "80%", "40%", "20px");
styleButton(buttonUpgradeC, "90%", "40%", "20px");

booCountDisplay.style.position = "absolute";
booCountDisplay.style.top = "5%";
booCountDisplay.style.left = "10%";
booCountDisplay.style.transform = "translate(-50%, -50%)";
booCountDisplay.style.fontSize = "30px";

buttonClick.addEventListener("click", () => {
  booCount++;
  buttonClick.innerHTML = buttonClick.innerHTML === "😨" ? "😱" : "😨";
  booCountDisplay.innerHTML = `Boo Count: ${booCount}`;

  buttonUpgradeA.disabled = booCount < currentCostA;
  buttonUpgradeB.disabled = booCount < currentCostB;
  buttonUpgradeC.disabled = booCount < currentCostC;
});

function purchaseUpgrade(
  button: HTMLElement,
  currentCost: number,
  growth: number,
  purchased: number,
  itemCountDisplay: HTMLElement,
  itemLabel: string
) {
  booCount -= currentCost;
  growthRate += growth;
  purchased++;
  currentCost *= 1.15;

  booCountDisplay.innerHTML = `Boo Count: ${booCount}`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} units/sec`;
  itemCountDisplay.innerHTML = `${itemLabel}: ${purchased} purchased`;
  button.innerHTML = `Purchase ${itemLabel} (Cost: ${currentCost.toFixed(2)}, +${growth} units/sec)`;

  return { newCost: currentCost, newPurchased: purchased };
}

buttonUpgradeA.addEventListener("click", () => {
  if (booCount >= currentCostA) {
    const { newCost, newPurchased } = purchaseUpgrade(buttonUpgradeA, currentCostA, growthRates.A, purchasedA, itemCountDisplayA, "A");
    currentCostA = newCost;
    purchasedA = newPurchased;
  }
});

buttonUpgradeB.addEventListener("click", () => {
  if (booCount >= currentCostB) {
    const { newCost, newPurchased } = purchaseUpgrade(buttonUpgradeB, currentCostB, growthRates.B, purchasedB, itemCountDisplayB, "B");
    currentCostB = newCost;
    purchasedB = newPurchased;
  }
});

buttonUpgradeC.addEventListener("click", () => {
  if (booCount >= currentCostC) {
    const { newCost, newPurchased } = purchaseUpgrade(buttonUpgradeC, currentCostC, growthRates.C, purchasedC, itemCountDisplayC, "C");
    currentCostC = newCost;
    purchasedC = newPurchased;
  }
});

function updateGrowth(timestamp: number) {
  const elapsed = timestamp - prevStamp;

  if (elapsed >= 1000) {
    booCount += growthRate;
    booCountDisplay.innerHTML = `Boo Count: ${Math.floor(booCount)}`;
    prevStamp = timestamp;
  }

  buttonUpgradeA.disabled = booCount < currentCostA;
  buttonUpgradeB.disabled = booCount < currentCostB;
  buttonUpgradeC.disabled = booCount < currentCostC;

  requestAnimationFrame(updateGrowth);
}

requestAnimationFrame(updateGrowth);
