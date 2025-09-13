

export class Car {
  model: string;
  brand: string;
  color: string;
  year: number;
  speed: number;
  started: boolean;

  constructor(
    model: string,
    brand: string,
    color: string,
    year: number,
    speed = 0,
    started = false
  ) {
    this.model = model;
    this.brand = brand;
    this.color = color;
    this.year = year;
    this.speed = speed;
    this.started = started;
  }

  start(): void {
    if (!this.started) {
      this.started = true;
      console.log(`${this.brand} ${this.model} démarrée.`);
    } else {
      console.log(`${this.brand} ${this.model} est déjà démarrée.`);
    }
  }

  stop(): void {
    this.speed = 0;
    this.started = false;
    console.log(`${this.brand} ${this.model} arrêtée.`);
  }

  accelerate(amount = 10): void {
    if (!this.started) {
      console.log(`Impossible : démarrez d'abord la voiture (${this.brand} ${this.model}).`);
      return;
    }
    this.speed += amount;
    console.log(`${this.brand} ${this.model} accélère de ${amount} km/h — vitesse actuelle : ${this.speed} km/h.`);
  }

  info(): string {
    return `${this.brand} ${this.model} (${this.year}) — couleur ${this.color} — vitesse ${this.speed} km/h — démarrée: ${this.started}`;
  }
}
