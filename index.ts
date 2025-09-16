import { Car } from "./car.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;


const carImage = new Image();
carImage.src = "./car.jpg";
const fuelImage = new Image();
fuelImage.src = "./fuel.png";

// Classe Car
const car = new Car("Model S", "Tesla", "blue", 2022);
car.start();

// Position et taille
let x = 50;
let y = 50;
let width = 40;
let height = 20;
let speed = 2; // vitesse graphique
let direction: "up" | "down" | "left" | "right" = "right";

// Pièce (essence)
let fuel = { x: 200, y: 150, size: 20 };

let gameOver = false;

// Contrôles clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") direction = "up";
  if (e.key === "ArrowDown") direction = "down";
  if (e.key === "ArrowLeft") direction = "left";
  if (e.key === "ArrowRight") direction = "right";
});


function update() {
  if (gameOver) return;

  if (direction === "up") y -= speed;
  if (direction === "down") y += speed;
  if (direction === "left") x -= speed;
  if (direction === "right") x += speed;

  // Collision murs
  if (x < 0 || y < 0 || x > canvas.width - width || y > canvas.height - height) {
    console.log("💥 Game Over : la voiture a touché le mur !");
    car.stop();
    gameOver = true;
  }

  // Collision fuel
  if (
    x < fuel.x + fuel.size &&
    x + width > fuel.x &&
    y < fuel.y + fuel.size &&
    y + height > fuel.y
  ) {
    car.accelerate(); // boost
    speed += 1; // vitesse graphique
    console.log("⛽ Essence ramassée ! Vitesse +1");

    // Nouvelle pièce aléatoire
    fuel.x = Math.random() * (canvas.width - fuel.size);
    fuel.y = Math.random() * (canvas.height - fuel.size);
  }
}

// Dessin du jeu avec images
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Voiture
  if (carImage.complete) {
    ctx.drawImage(carImage, x, y, width, height);
  } else {
    ctx.fillStyle = car.color;
    ctx.fillRect(x, y, width, height);
  }

  // Fuel
  if (fuelImage.complete) {
    ctx.drawImage(fuelImage, fuel.x, fuel.y, fuel.size, fuel.size);
  } else {
    ctx.fillStyle = "orange";
    ctx.fillRect(fuel.x, fuel.y, fuel.size, fuel.size);
  }

  // Game Over
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2);
  }
}

// Boucle du jeu
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// ⚡ Lancer seulement quand images chargées
Promise.all([
  new Promise<void>((resolve) => { carImage.onload = () => resolve(); }),
  new Promise<void>((resolve) => { fuelImage.onload = () => resolve(); })
]).then(() => {
  loop();
});
