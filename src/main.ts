import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "What a Wonderful Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button element
const button = document.createElement('button');

// Set the inner HTML of the button
button.innerHTML = "Click Me";  // You can also include HTML tags here if needed

// Append the button to the body
document.body.append(button);

// Handle button click event
button.addEventListener('click', () => {
    // Change the innerHTML of the button when clicked
    button.innerHTML = "Clicked!";
});

