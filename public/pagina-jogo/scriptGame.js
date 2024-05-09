let canvas = document.getElementById("jogo");
let ctx = canvas.getContext("2d");

var canvasLimit = 0 // Define o limite do canvas

// Função que atualiza o canvas para manter a responsividade
function resizeCanvas(){
    let percent = 0.85;
    canvas.width = window.innerWidth * percent;
    canvasLimit = canvas.width;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

var background = new Image();
background.src = "imagens-pagina-jogo/road.png";

// Objeto do busao
let busao = {
    x:50,
    y:355,
    altura:90,
    largura:240,
    cor_linha: "black",
    cor_preenchimento: "red",

    desenhaBusao:function()
    {
        ctx.beginPath();
        ctx.strokeStyle = this.cor_linha;
        ctx.fillStyle = this.cor_preenchimento;
        ctx.strokeRect(this.x, this.y, this.largura, this.altura);
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
    
}

// Objetos das calçadas
let calcada = {
    x1: 0,
    y1: 0,
    altura:100
}


// Objeto dos carros
class Carros {
    constructor(){
        this.x = canvasLimit;
        this.altura = 50;
        this.largura = 80;
        this.cor_linha = "black";
        this.cor_preenchimento = "grey";
        this.y = 0;
    }

    desenhaCarro(){
        ctx.beginPath();
        ctx.strokeStyle = this.cor_linha;
        ctx.fillStyle = this.cor_preenchimento;
        ctx.strokeRect(this.x, this.y, this.largura, this.altura);
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
}

function geraYCarros(min, max) { // Gera a posição Y dos carros ([Max, Min[)
    // Define a área entre as calçadas como o limite do canva para os carros
    const minCeiled = Math.ceil(min); // Parte de baixo da calçada do topo
    const maxFloored = Math.floor(max); // Parte de cima da calçada de baixo

    let yCarro, numFaixa
    let faixas = [100, 220, 340, 460, 580, 700] // Define o limite das 5 faixas
    
    numFaixa = Math.floor(Math.random() * (6 - 1) + 1); // Escolhe uma faixa aleatória
    yCarro = Math.floor(Math.random() * ((faixas[numFaixa]-60) - (faixas[numFaixa-1]+10)) + (faixas[numFaixa-1]+10)); // Gera uma posição dentro da faixa aleatoriamente, com uma margem de 10px

    return yCarro;
}

let carrosArray = [];
// Gera um objeto de 'carros' na tela e coloca no array de carros
function geraNovoCarro(){
    let novoCarro = new Carros();
    let resultY = geraYCarros(calcada.altura, (canvas.offsetHeight-calcada.altura)-novoCarro.altura);
    novoCarro.y = resultY;
    carrosArray.push(novoCarro);
}

// Função para mover os carros e desenhar eles no canvas
function animacaoCarros() {

    // Desenha e move os carros existentes
    carrosArray.forEach(carro => {
        carro.desenhaCarro();
        carro.x -= 5; // Move o carro para a esquerda
    });
    
    // Remove os carros que sairam do canvas
    carrosArray = carrosArray.filter((carro) => carro.x > 0-carro.largura);

    requestAnimationFrame(animacaoCarros);
}

// Função para criar o carro depois de X quantidade de tempo (em ms)
function generateCarAfterDelay(x) {
    setTimeout(function() {
        geraNovoCarro();
        generateCarAfterDelay(x); // Chama a própria função para gerar novos carros
    }, x);
}

// Começa a gerar os carros
generateCarAfterDelay(500);

// Função de animação do ônibus e das calçadas
function animacaoFundo(){
    
    ctx.clearRect(0,0,canvasLimit,canvas.offsetHeight); // Limpa o canvas
    ctx.drawImage(background, 0, 0, canvasLimit, 800, 0, 0, canvasLimit, 800); // Cria a imagem de fundo
    busao.desenhaBusao(); // Desenha o objeto do ônibus na tela
    
    requestAnimationFrame(animacaoFundo);
}

// Move o objeto do ônibus com base no teclado
document.addEventListener("keyup", function(evento){

    tecla = evento.key;
    console.log(tecla);

    if(tecla == "ArrowUp")
    {
        busao.y -= 120;
        if(busao.y < calcada.altura+15){
            busao.y = calcada.altura+15;
        }
    }
    if(tecla == "ArrowDown")
    {
        busao.y += 120;
        if(busao.y > ((canvas.offsetHeight-busao.altura)-calcada.altura)-15){
            busao.y = ((canvas.offsetHeight-busao.altura)-calcada.altura)-15;
        }
    }
});

animacaoFundo();
animacaoCarros();