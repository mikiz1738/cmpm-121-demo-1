import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Boo!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a text element to display the number of clicks
const booCountDisplay = document.createElement("div");
booCountDisplay.innerHTML = "Boo Count: 0"; // Initial click count
app.append(booCountDisplay);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = "Growth Rate: 0.0 units/sec"; // Initial growth rate
app.append(growthRateDisplay);
// Status displays for the number of each item purchased
const itemCountDisplayA = document.createElement("div");
const itemCountDisplayB = document.createElement("div");
const itemCountDisplayC = document.createElement("div");
itemCountDisplayA.innerHTML = "Item A: 0 purchased";
itemCountDisplayB.innerHTML = "Item B: 0 purchased";
itemCountDisplayC.innerHTML = "Item C: 0 purchased";

// Style and position for the item purchase displays
itemCountDisplayA.style.position = "absolute";
itemCountDisplayA.style.top = "60%";  // Adjust this to move vertically
itemCountDisplayA.style.left = "60%"; // Adjust this to move horizontally

itemCountDisplayB.style.position = "absolute";
itemCountDisplayB.style.top = "65%";  // Adjust this to move vertically
itemCountDisplayB.style.left = "60%"; // Adjust this to move horizontally

itemCountDisplayC.style.position = "absolute";
itemCountDisplayC.style.top = "70%";  // Adjust this to move vertically
itemCountDisplayC.style.left = "60%"; // Adjust this to move horizontally

app.append(itemCountDisplayA);
app.append(itemCountDisplayB);
app.append(itemCountDisplayC);

// Boo counter and initial growth rate
let booCount = 0;
let prevStamp = 0;
let growthRate = 0; // Growth rate starts at zero
let purchasedA = 0;
let purchasedB = 0;
let purchasedC = 0;
// Costs and growth values for each upgrade
const upgradeData = {
  A: { cost: 10, growth: 0.1 },
  B: { cost: 100, growth: 2.0 },
  C: { cost: 1000, growth: 50.0 }
};

// Create a buttonClick element
const buttonClick = document.createElement("button");
buttonClick.innerHTML = "😨";
app.append(buttonClick);

// Create purchasable upgrade buttons
const buttonUpgradeA = document.createElement("button");
buttonUpgradeA.innerHTML = "Purchase A (Cost: 10, +0.1 units/sec)";
buttonUpgradeA.disabled = true;
app.append(buttonUpgradeA);

const buttonUpgradeB = document.createElement("button");
buttonUpgradeB.innerHTML = "Purchase B (Cost: 100, +2.0 units/sec)";
buttonUpgradeB.disabled = true;
app.append(buttonUpgradeB);

const buttonUpgradeC = document.createElement("button");
buttonUpgradeC.innerHTML = "Purchase C (Cost: 1000, +50 units/sec)";
buttonUpgradeC.disabled = true;
app.append(buttonUpgradeC);

// Function to style buttons and displays
function styleButton(button: HTMLElement, top: string, left: string, fontSize: string) {
  button.style.position = "absolute";
  button.style.top = top;
  button.style.left = left;
  button.style.transform = "translate(-50%, -50%)";
  button.style.fontSize = fontSize;
}

styleButton(buttonClick, "60%", "35%", "30px");
styleButton(buttonUpgradeA, "70%", "40%", "20px");
styleButton(buttonUpgradeB, "75%", "40%", "20px");
styleButton(buttonUpgradeC, "80%", "40%", "20px");

booCountDisplay.style.position = "absolute";
booCountDisplay.style.top = "5%";
booCountDisplay.style.left = "10%";
booCountDisplay.style.transform = "translate(-50%, -50%)";
booCountDisplay.style.fontSize = "30px";

// Handle buttonClick click event
buttonClick.addEventListener("click", () => {
  booCount++;
  buttonClick.innerHTML = buttonClick.innerHTML === "😨" ? "😱" : "😨";
  booCountDisplay.innerHTML = `Boo Count: ${booCount}`;

  // Enable buttons if the player can afford the upgrade
  buttonUpgradeA.disabled = booCount < upgradeData.A.cost;
  buttonUpgradeB.disabled = booCount < upgradeData.B.cost;
  buttonUpgradeC.disabled = booCount < upgradeData.C.cost;
});

// Handle purchasing of upgrade A
buttonUpgradeA.addEventListener("click", () => {
  if (booCount >= upgradeData.A.cost) {
    booCount -= upgradeData.A.cost;
    purchasedA++;
    growthRate += upgradeData.A.growth;
    booCountDisplay.innerHTML = `Boo Count: ${booCount}`;
    itemCountDisplayA.innerHTML = `Item A: ${purchasedA} purchased`;
    growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} units/sec`;
  }
});

// Handle purchasing of upgrade B
buttonUpgradeB.addEventListener("click", () => {
  if (booCount >= upgradeData.B.cost) {
    booCount -= upgradeData.B.cost;
    purchasedB++;
    growthRate += upgradeData.B.growth;
    booCountDisplay.innerHTML = `Boo Count: ${booCount}`;
    itemCountDisplayB.innerHTML = `Item B: ${purchasedB} purchased`;
    growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} units/sec`;
  }
});

// Handle purchasing of upgrade C
buttonUpgradeC.addEventListener("click", () => {
  if (booCount >= upgradeData.C.cost) {
    booCount -= upgradeData.C.cost;
    purchasedC++;
    growthRate += upgradeData.C.growth;
    booCountDisplay.innerHTML = `Boo Count: ${booCount}`;
    itemCountDisplayC.innerHTML = `Item C: ${purchasedC} purchased`;
    growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} units/sec`;
  }
});

// Animation loop to add growth over time
function updateGrowth(timestamp: number) {
  const elapsed = timestamp - prevStamp;

  if (elapsed >= 1000) {
    booCount += growthRate;
    booCountDisplay.innerHTML = `Boo Count: ${Math.floor(booCount)}`;
    prevStamp = timestamp;
  }

  // Enable or disable buttons based on the player's count
  buttonUpgradeA.disabled = booCount < upgradeData.A.cost;
  buttonUpgradeB.disabled = booCount < upgradeData.B.cost;
  buttonUpgradeC.disabled = booCount < upgradeData.C.cost;


  requestAnimationFrame(updateGrowth);
}

// Start the growth update loop
requestAnimationFrame(updateGrowth);
