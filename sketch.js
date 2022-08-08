//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variaveis da RaqueteOponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

let colidiu = false;

//Pontos
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

const velocidadeMovimentoRaquete = 10;
const limiteTelaParaRaquete = 1;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
    createCanvas(600, 400);
  trilha.loop();
  
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    desenhaPlacar(meusPontos, pontosOponente);
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha - raio < 0) {
      pontosOponente += 1;
    }
    if (xBolinha + raio > width){
      meusPontos += 1;
    }
  
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
      ponto.play();
    }
  
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    
    }
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    //SUBINDO A RAQUETE
    if (keyIsDown(UP_ARROW) && !(yRaquete - velocidadeMovimentoRaquete < limiteTelaParaRaquete)) {
        yRaquete -= velocidadeMovimentoRaquete;
    }
  
    if (keyIsDown(DOWN_ARROW) && !(yRaquete + velocidadeMovimentoRaquete > height - raqueteAltura - limiteTelaParaRaquete)) {
        yRaquete += velocidadeMovimentoRaquete;
    }
}

function movimentaRaqueteOponente(){
    //SUBINDO A RAQUETE
    if (keyIsDown(87)) {
        //RESOLVENDO BUG DA RAQUETE ANDAR ALEM DO TABULEIRO
        if(!(yRaqueteOponente - velocidadeMovimentoRaquete < limiteTelaParaRaquete))
          yRaqueteOponente -= velocidadeMovimentoRaquete;
    }
    
    //DESCENDO A RAQUETE
    if (keyIsDown(83)) {
        if(!(yRaqueteOponente + velocidadeMovimentoRaquete > height - raqueteAltura - limiteTelaParaRaquete))
          yRaqueteOponente += velocidadeMovimentoRaquete;
    }
}

function verificaColisaoRaquete(x,y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);

  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }

  //RESOLVENDO BUG DA BOLA PRESA
  if(xBolinha - raio < 0){
    xBolinha = diametro + 2;
  }
  if(xBolinha + raio > width){
    xBolinha = width - diametro - 2;
  }
}

function desenhaPlacar(mPontos, pontosO){
  textAlign(CENTER);
  textSize(20);
  //fill('rgb(255, 100, 100)');
  const posicaoCaixaPontos = 26;
  const alturaCaixaPontos = 6;
  const larguraCaixaPontos = 40;
  const posicaoCaixaMeusPontos = 150;
  const posicaoCaixaPontosOponente = width - posicaoCaixaMeusPontos;

  stroke(255);
  fill('rgb(255,136,13)');
  rect(posicaoCaixaMeusPontos - (larguraCaixaPontos / 2), alturaCaixaPontos, larguraCaixaPontos, posicaoCaixaPontos);
  rect(posicaoCaixaPontosOponente - (larguraCaixaPontos / 2), alturaCaixaPontos, larguraCaixaPontos, posicaoCaixaPontos);
  fill(255);
  text(mPontos, posicaoCaixaMeusPontos, posicaoCaixaPontos);
  text(pontosO, posicaoCaixaPontosOponente, posicaoCaixaPontos);
  fill(255);
  stroke(0);
}

