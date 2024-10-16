import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Boo!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button element
const button = document.createElement("button");

// Set the inner HTML of the button
button.innerHTML = "😨"; 

// Append the button to the body
document.body.append(button);

button.style.position = 'absolute';
button.style.top = '60%';        // Moves the button 50% from the top of the viewport
button.style.left = '50%';       // Moves the button 50% from the left of the viewport
button.style.transform = 'translate(-50%, -50%)';  // Moves the button to perfectly center
button.style.fontSize = '30px'; 

// Handle button click event
button.addEventListener("click", () => {
  // Change the innerHTML of the button when clicked
  if(button.innerHTML == "😨"){
    button.innerHTML = "😱";
  } else{
    button.innerHTML = "😨";
  }
});
