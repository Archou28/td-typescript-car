export class Car {
  model: string;
  brand: string;
  color: string;
  year: number;
  speed: number;
  started: boolean;
  angle: number;

  constructor(model: string, brand: string, color: string, year: number) {
    this.model = model;
    this.brand = brand;
    this.color = color;
    this.year = year;
    this.speed = 0;
    this.started = false;
    this.angle = 0; // départ vers la droite
  }

  start() {
    this.started = true;
    console.log(`${this.brand} ${this.model} démarre 🚗`);
  }

  stop() {
    this.started = false;
    this.speed = 0;
    console.log(`${this.brand} ${this.model} s'arrête 🛑`);
  }

  accelerate() {
    if (this.started) {
      this.speed += 1; // vitesse progressive
      if (this.speed > 10) this.speed = 10; // vitesse max
      console.log(`${this.brand} ${this.model} accélère → ${this.speed} km/h`);
    } else {
      console.log("Démarre d'abord la voiture !");
    }
  }

  brake() {
    if (this.speed > 0) this.speed -= 0.5;
    if (this.speed < 0) this.speed = 0;
  }
}
