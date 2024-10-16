import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Boo!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a text element to display the number of clicks
const booCountDisplay = document.createElement("div");
booCountDisplay.innerHTML = "Clicks: 0"; // Initial click count
booCountDisplay.innerHTML = "Boo Count: 0";

//boo counter
let booCount = 0;

// Create a button element
const button = document.createElement("button");

// Set the inner HTML of the button
button.innerHTML = "😨";

// Append the button and booCountDisplay to the body
document.body.append(button);
document.body.append(booCountDisplay);

//change the formatting on button
button.style.position = "absolute";
button.style.top = "60%"; // Moves the button 60% from the top of the viewport
button.style.left = "50%"; // Moves the button 50% from the left of the viewport
button.style.transform = "translate(-50%, -50%)"; // Moves the button to perfectly center
button.style.fontSize = "30px";

//change the formatting on booCountDisplay
booCountDisplay.style.position = "absolute";
booCountDisplay.style.top = "5%";
booCountDisplay.style.left = "10%";
booCountDisplay.style.transform = "translate(-50%, -50%)";
booCountDisplay.style.fontSize = "30px";

//anonymous function call that increments booCount 
setInterval(() => {
    booCount++;
    //display current Boo count
    booCountDisplay.innerHTML = `Boo Count: ${booCount}`; 
}, 1000);

// Handle button click event
button.addEventListener("click", () => {
  // Change the innerHTML of the button when clicked
  booCount++;
  if (button.innerHTML == "😨") {
    button.innerHTML = "😱";
  } else {
    button.innerHTML = "😨";
  }
  booCountDisplay.innerHTML = `Boo Count: ${booCount}`;
});
