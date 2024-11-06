import "./style.css";

// Configuration constants
const GAME_NAME = "Boo! Haunted Clicker";
const GHOST_CLICK_BUTTON_SIZE = "50px";
const GHOST_CLICK_BUTTON_POSITION = { top: "60%", left: "35%" };
const ITEM_DISPLAY_START_TOP = 60; // Starting top position for item display elements
const ITEM_BUTTON_START_TOP = 75; // Starting top position for item button elements
const ITEM_POSITION_LEFT = { display: "75%", button: "40%" };
const ITEM_VERTICAL_SPACING = { display: 5, button: 10 }; // Vertical spacing between items
const HAUNTING_RATE_MULTIPLIER = 1.15; // Increase in cost after each purchase
const FRAME_UPDATE_INTERVAL = 1000; // Interval for haunting rate update in milliseconds

class HauntedClickerGame {
  private app: HTMLDivElement;
  private ghostCount: number = 0;
  private hauntingRate: number = 0;
  private lastUpdateTimestamp: number = 0;

  private ghostCountDisplay: HTMLDivElement | undefined;
  private hauntingRateDisplay: HTMLDivElement | undefined;
  private ghostClickButton: HTMLButtonElement | undefined;
  private gameItems: GameItem[] = [];

  private titleElement: HTMLTitleElement = document.querySelector("title")!; // Title element for wobble effect
  private angle: number = 0;

  constructor(appId: string) {
    this.app = document.querySelector(appId)!;

    this.initUI();
    this.createItems();
    this.startAnimation();
    this.startWobbleAnimation(); // Start wobble effect for the title
    this.startBackgroundColorChange();
  }

  private initUI() {
    document.title = GAME_NAME;

    const header = document.createElement("h1");
    header.innerHTML = GAME_NAME;
    this.app.append(header);

    header.classList.add("title-wobble");

    // Initialize display elements for ghost count and haunting rate
    this.ghostCountDisplay = document.createElement("div");
    this.hauntingRateDisplay = document.createElement("div");
    this.ghostCountDisplay.innerHTML = "Ghost Count: 0";
    this.hauntingRateDisplay.innerHTML = "Haunting Rate: 0.0 ghosts/sec";
    this.app.append(this.ghostCountDisplay, this.hauntingRateDisplay);

    // Main ghost click button
    this.ghostClickButton = document.createElement("button");
    this.ghostClickButton.innerHTML = "👻";
    this.ghostClickButton.style.position = "absolute";
    this.ghostClickButton.style.top = GHOST_CLICK_BUTTON_POSITION.top;
    this.ghostClickButton.style.left = GHOST_CLICK_BUTTON_POSITION.left;
    this.ghostClickButton.style.transform = "translate(-50%, -50%)";
    this.ghostClickButton.style.fontSize = GHOST_CLICK_BUTTON_SIZE;
    this.app.append(this.ghostClickButton);

    // Event listener for the ghost click button
    this.ghostClickButton.addEventListener("click", () => this.onGhostClick());
  }

  private createItems() {
    const itemsConfig = [
      {
        name: "Specter",
        cost: 10,
        rateIncrease: 0.1,
        description: "A fleeting spirit to slowly add to your ghostly numbers.",
      },
      {
        name: "Phantom",
        cost: 100,
        rateIncrease: 2.0,
        description: "An elusive soul that brings a stronger, steady haunt.",
      },
      {
        name: "Wraith",
        cost: 1000,
        rateIncrease: 50.0,
        description:
          "A powerful apparition that amplifies your haunting power.",
      },
      {
        name: "Poltergeist",
        cost: 5000,
        rateIncrease: 200.0,
        description: "A chaotic spirit that adds an intense haunting presence.",
      },
      {
        name: "Banshee",
        cost: 20000,
        rateIncrease: 1000.0,
        description: "An eerie wailer whose cries bring waves of new ghosts.",
      },
    ];

    itemsConfig.forEach((config, index) => {
      const item = new GameItem(config, index, this);
      this.gameItems.push(item);
    });
  }

  private onGhostClick() {
    this.ghostCount++;
    this.updateDisplay();
    this.updateButtonStates();
  }

  private updateDisplay() {
    this.ghostCountDisplay!.innerHTML = `Ghost Count: ${Math.floor(this.ghostCount)}`;
    this.hauntingRateDisplay!.innerHTML = `Haunting Rate: ${this.hauntingRate.toFixed(1)} ghosts/sec`;
  }

  private updateButtonStates() {
    this.gameItems.forEach((item) => {
      item.updateButtonState(this.ghostCount);
    });
  }

  public increaseGhostCount(amount: number) {
    this.ghostCount += amount;
    this.updateDisplay();
  }

  public increaseHauntingRate(rate: number) {
    this.hauntingRate += rate;
    this.updateDisplay();
  }

  private startAnimation() {
    const updateHaunting = (timestamp: number) => {
      const elapsed = timestamp - this.lastUpdateTimestamp;
      if (elapsed >= FRAME_UPDATE_INTERVAL) {
        this.increaseGhostCount(this.hauntingRate);
        this.lastUpdateTimestamp = timestamp;
      }

      this.updateButtonStates();
      requestAnimationFrame(updateHaunting);
    };

    requestAnimationFrame(updateHaunting);
  }

  private startWobbleAnimation() {
    const wobbleTitle = () => {
      this.angle += 0.1; // Adjust speed of the wobble
      this.titleElement.classList.add("title-wobble"); // Add wobble effect
      requestAnimationFrame(wobbleTitle); // Continue the wobble animation
    };

    wobbleTitle(); // Start wobble animation for the title
  }

  private startBackgroundColorChange() {
    let isDarkMode = true;
    setInterval(() => {
      if (isDarkMode) {
        document.body.style.backgroundColor = "#242424"; // Dark background
      } else {
        document.body.style.backgroundColor = "#ffffff"; // Light background
      }
      isDarkMode = !isDarkMode; // Toggle the background color
    }, 3000); // Change color every 3 seconds
  }

}

class GameItem {
  private name: string;
  private rateIncrease: number;
  private currentCost: number;
  private purchasedCount: number;
  private description: string;
  private displayElement: HTMLDivElement;
  private buttonElement: HTMLButtonElement;

  constructor(
    config: {
      name: string;
      cost: number;
      rateIncrease: number;
      description: string;
    },
    index: number,
    private game: HauntedClickerGame,
  ) {
    this.name = config.name;
    this.rateIncrease = config.rateIncrease;
    this.currentCost = config.cost;
    this.purchasedCount = 0;
    this.description = config.description;

    this.displayElement = this.createDisplayElement(index);
    this.buttonElement = this.createButtonElement(index);
  }

  private createDisplayElement(index: number): HTMLDivElement {
    const display = document.createElement("div");
    display.innerHTML = `${this.name}: ${this.purchasedCount} purchased`;
    display.style.position = "absolute";
    display.style.top = `${ITEM_DISPLAY_START_TOP + index * ITEM_VERTICAL_SPACING.display}%`;
    display.style.left = ITEM_POSITION_LEFT.display;
    this.game["app"].append(display); // Accessing app via the game instance
    return display;
  }

  private createButtonElement(index: number): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerHTML = this.getButtonText();
    button.style.position = "absolute";
    button.style.top = `${ITEM_BUTTON_START_TOP + index * ITEM_VERTICAL_SPACING.button}%`;
    button.style.left = ITEM_POSITION_LEFT.button;
    button.style.transform = "translate(-50%, -50%)";
    button.style.fontSize = "20px";
    button.disabled = true;
    this.game["app"].append(button);

    button.addEventListener("click", () => this.purchase());
    return button;
  }

  private getButtonText(): string {
    return `Summon ${this.name} (Cost: ${this.currentCost.toFixed(2)}, +${this.rateIncrease} ghosts/sec) - ${this.description}`;
  }

  public updateButtonState(ghostCount: number) {
    this.buttonElement.disabled = ghostCount < this.currentCost;
  }

  private purchase() {
    if (this.game["ghostCount"] >= this.currentCost) {
      this.game.increaseGhostCount(-this.currentCost);
      this.game.increaseHauntingRate(this.rateIncrease);
      this.purchasedCount++;
      this.currentCost *= HAUNTING_RATE_MULTIPLIER;
      this.updateElements();
    }
  }

  private updateElements() {
    this.displayElement.innerHTML = `${this.name}: ${this.purchasedCount} purchased`;
    this.buttonElement.innerHTML = this.getButtonText();
  }
}

// Start the game
new HauntedClickerGame("#app");
