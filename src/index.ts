import { Car } from './car';


const clio = new Car('Clio', 'Renault', 'bleu', 2016);
console.log(clio.info());


clio.start();
clio.accelerate(30);
console.log(`Vitesse après accélération : ${clio.speed} km/h`);


clio.accelerate(); // +10 par défaut


clio.stop();
console.log(clio.info());