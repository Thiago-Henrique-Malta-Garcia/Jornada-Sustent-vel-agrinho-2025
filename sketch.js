// Variáveis globais para o p5.js
let p5Canvas;
let particles = [];
const NUM_PARTICLES = 80; // Número de partículas para a animação

// Cores para representar Campo e Cidade
const campoColor = { r: 78, g: 140, b: 63 }; // Verde escuro
const cidadeColor = { r: 66, g: 133, b: 244 }; // Azul Google
const connectionColor = { r: 255, g: 255, b: 255, a: 150 }; // Branco semi-transparente

// Classe para as partículas que simbolizam a conexão
class Particle {
  constructor() {
    this.reset();
    // Direção inicial aleatória para as partículas
    this.direction = random() > 0.5 ? 'campoToCidade' : 'cidadeToCampo';
  }

  reset() {
    // Redefine a posição e velocidade dependendo da direção
    if (this.direction === 'campoToCidade') {
      this.x = random(width / 2 - 50, width / 2); // Começa na área do campo
      this.y = random(height);
      this.vx = random(0.5, 2); // Velocidade para a direita
      this.vy = random(-0.5, 0.5);
      this.color = color(campoColor.r, campoColor.g, campoColor.b, 180);
    } else {
      this.x = random(width / 2, width / 2 + 50); // Começa na área da cidade
      this.y = random(height);
      this.vx = random(-2, -0.5); // Velocidade para a esquerda
      this.vy = random(-0.5, 0.5);
      this.color = color(cidadeColor.r, cidadeColor.g, cidadeColor.b, 180);
    }
    this.size = random(2, 5);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2; // Desaparece gradualmente

    // Redefine a partícula se ela sair da tela ou desaparecer
    if (this.alpha <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

// Função setup do p5.js - inicializa o canvas e as partículas
function setup() {
  const containerWidth = document.getElementById('p5-canvas-container').offsetWidth;
  // Define uma altura fixa para o canvas, ou pode ser dinâmica se preferir
  p5Canvas = createCanvas(containerWidth, 250); // Altura um pouco maior para a animação
  p5Canvas.parent('p5-canvas-container'); // Anexa o canvas ao div especificado

  // Cria as partículas
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
}

// Função draw do p5.js - desenha a cada frame
function draw() {
  background(240); // Fundo claro para o canvas

  // Desenha o lado do Campo (Esquerda)
  fill(campoColor.r, campoColor.g, campoColor.b, 50); // Verde translúcido
  noStroke();
  rect(0, 0, width / 2, height); // Desenha um retângulo para o campo
  // Efeito de grama/folhas (formas orgânicas)
  for (let i = 0; i < 50; i++) {
    ellipse(random(width / 2), random(height), random(10, 30), random(5, 20));
  }

  // Desenha o lado da Cidade (Direita)
  fill(cidadeColor.r, cidadeColor.g, cidadeColor.b, 50); // Azul translúcido
  noStroke();
  rect(width / 2, 0, width / 2, height); // Desenha um retângulo para a cidade
  // Efeito de edifícios (formas geométricas)
  for (let i = 0; i < 30; i++) {
    rect(random(width / 2, width), random(height / 2, height), random(10, 40), random(30, height / 2));
  }

  // Desenha a linha de conexão central (mais visível)
  stroke(connectionColor.r, connectionColor.g, connectionColor.b, connectionColor.a);
  strokeWeight(3); // Espessura da linha
  line(width / 2, 0, width / 2, height); // Linha divisória/conectora no meio

  // Atualiza e exibe as partículas
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

// Função para lidar com o redimensionamento da janela
function windowResized() {
  const containerWidth = document.getElementById('p5-canvas-container').offsetWidth;
  resizeCanvas(containerWidth, 250); // Mantém a altura fixa, ajusta a largura
  // As partículas se redefinirão na próxima atualização se saírem dos limites
}

// Adiciona uma animação sutil ao cabeçalho principal
document.addEventListener('DOMContentLoaded', () => {
  const headerText = document.querySelector('header h1');
  if (headerText) {
    // Exemplo de animação com Tailwind CSS classes via JS
    headerText.classList.add('transition-all', 'duration-500', 'ease-in-out');
    headerText.addEventListener('mouseover', () => {
      headerText.classList.add('scale-105', 'text-yellow-200');
      headerText.classList.remove('animate-pulse'); // Remove pulsação ao interagir
    });
    headerText.addEventListener('mouseout', () => {
      headerText.classList.remove('scale-105', 'text-yellow-200');
      headerText.classList.add('animate-pulse'); // Retorna pulsação
    });
  }
});
