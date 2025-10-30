// Memorias Sintéticas - Álvaro Daniel Varela Santana


let mic;         // micrófono
let colores = []; // partículas de color

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();

  // Fondo inicial
  background(10, 10, 30);
}

function draw() {
  // Suaviza el fondo como una memoria que se desvanece
  noStroke();
  fill(10, 10, 30, 20);
  rect(0, 0, width, height);

  // Detecta el nivel del micrófono
  let vol = mic.getLevel();
  let tam = map(vol, 0, 0.5, 10, 200); // tamaño según volumen

  // Cada vez que se mueve el mouse se crean partículas nuevas
  if (mouseIsPressed) {
    let c = color(random(100,255), random(100,255), random(100,255), 200);
    colores.push(new Particula(mouseX, mouseY, c, tam));
  }

  // Dibuja y actualiza todas las partículas
  for (let i = colores.length - 1; i >= 0; i--) {
    colores[i].mover();
    colores[i].mostrar();
    if (colores[i].desaparecer()) {
      colores.splice(i, 1);
    }
  }
}

// Clase Partícula
class Particula {
  constructor(x, y, c, tam) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.tam = tam;
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.transparencia = 255;
  }

  mover() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.transparencia -= 1.5; // se desvanece lentamente
  }

  mostrar() {
    noStroke();
    fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.transparencia);
    ellipse(this.x, this.y, this.tam);
  }

  desaparecer() {
    return this.transparencia < 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
