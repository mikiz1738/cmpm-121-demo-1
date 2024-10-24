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

// Boo counter and initial growth rate
let booCount = 0;
let prevStamp = 0;
let growthRate = 0; // Growth rate starts at zero

// Create a buttonClick element
const buttonClick = document.createElement("button");
buttonClick.innerHTML = "😨";
app.append(buttonClick);

// Create a purchasable upgrade button
const purchasableUpgrade = document.createElement("button");
purchasableUpgrade.innerHTML = "Purchase Growth +1 (Cost: 10)";
purchasableUpgrade.disabled = true; // Starts disabled
app.append(purchasableUpgrade);

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

  // Enable the purchasable upgrade button if the player has 10 or more units
  if (booCount >= 10) {
    purchasableUpgrade.disabled = false;
  }
});

// Handle purchasable upgrade button click event
purchasableUpgrade.addEventListener("click", () => {
  if (booCount >= 10) {
    booCount -= 10; // Deduct 10 units from the counter
    growthRate++;    // Increment growth rate by 1
    purchasableUpgrade.disabled = true; // Disable after purchase if they can't afford again
    booCountDisplay.innerHTML = `Boo Count: ${booCount}`;
  }
});

// Animation loop to add growth over time
function updateGrowth(timestamp: number) {
  const elapsed = timestamp - prevStamp;

  if (elapsed >= 1000) {
    booCount += growthRate;
    booCountDisplay.innerHTML = `Boo Count: ${booCount}`;
    prevStamp = timestamp;
  }

  // Enable the purchasable upgrade button if the player has 10 or more units
  if (booCount >= 10) {
    purchasableUpgrade.disabled = false;
  } else {
    purchasableUpgrade.disabled = true;
  }

  requestAnimationFrame(updateGrowth);
}

// Start the growth update loop
requestAnimationFrame(updateGrowth);
  