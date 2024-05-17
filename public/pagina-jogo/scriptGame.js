let canvas = document.getElementById("jogo");
let ctx = canvas.getContext("2d");

var canvasLimit = 0 // Define o limite do canvas
let divMenu = document.getElementById("start"); // Pega a div do menu e configura a altura total e do texto
let divFinal = document.getElementById("end"); // Pega a div do final e configura a altura total e do texto

divMenu.style.height = canvas.height+"px";

divFinal.style.height = canvas.height+"px";

// Função que atualiza o canvas para manter a responsividade
function resizeCanvas(){
    let percent = 0.85;
    canvas.width = window.innerWidth * percent; // Pega o tamanho proporcional da janela do navegador
    canvasLimit = canvas.width; // Passa o novo tamanho para a variável 'canvasLimit'
    divMenu.style.width = canvasLimit+"px"; // Define o novo tamanho da 'divMenu'
    divFinal.style.width = canvasLimit+"px"; // Define o novo tamanho da 'divFinal'
}

window.addEventListener("resize", resizeCanvas); // Chama a função 'resizeCanvas' quando a janela é alterada
resizeCanvas();

var background = new Image(); // Atribui a imagem de fundo pra variável 'background'
background.src = "imagens-pagina-jogo/road.png";

var onibus = new Image(); // Atribui a imagem do ônibus
    onibus.src = "imagens-pagina-jogo/busao.png";

// Crie um objeto para armazenar as imagens dos carros
var carros = {
    carro1: new Image(),
    carro2: new Image(),
    carro3: new Image()
};

// Defina os caminhos das imagens dos carros
carros.carro1.src = "imagens-pagina-jogo/carro1.png";
carros.carro2.src = "imagens-pagina-jogo/carro2.png";
carros.carro3.src = "imagens-pagina-jogo/carro3.png";

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
        ctx.drawImage(onibus, busao.x, busao.y)
    }
    
}

// Objetos das calçadas
let calcada = {
    x1: 0,
    y1: 0,
    altura:100
}

// Classe dos carros
class Carros {
    constructor(){
        this.x = canvasLimit;
        this.y = 0;
        this.altura = 50;
        this.largura = 80;
        this.imagem = "carro";
    }

    desenhaCarro(){
        ctx.drawImage(carros[this.imagem], this.x, this.y)
    }
}

// FUNÇÕES
var request = true;

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

// Gera um objeto de 'carros' na tela e coloca no array de carros
let carrosArray = [];
let numCarro = 0;

function geraNovoCarro(){
    if (request) return
    let novoCarro = new Carros();

    numCarro = Math.floor(Math.random() * 3) + 1; // Escolhe um carro aleatório
    novoCarro.imagem = "carro" + numCarro;
    
    let resultY = geraYCarros(calcada.altura, (canvas.offsetHeight-calcada.altura)-novoCarro.altura);
    novoCarro.y = resultY;
    
    carrosArray.push(novoCarro);
}

// Função para mover os carros e desenhar eles no canvas
function animacaoCarros(altTab) {
    if(!altTab){
        // Desenha e move os carros existentes
        carrosArray.forEach(carro => {
            carro.desenhaCarro();
            carro.x -= velocidadeCarro; // Move o carro para a esquerda
        });

        // Verifica se o busão colidiu
        colisao();
    }
    
    // Remove os carros que sairam do canvas
    carrosArray = carrosArray.filter((carro) => carro.x > 0-carro.largura);

    if(request){
        velocidadeCarro = 5;
        return
    }
    requestAnimationFrame(() => animacaoCarros(altTab)); // Chama novamente o próximo frame da mesma função
}

// Função para criar a caixa de colisão do busão e dos carros e verificar se elas colidiram
function colisao(){
    carrosArray.forEach(carro => {
        // Verifica se houve colisão
        if (busao.x < carro.x + carro.largura &&
            busao.x + busao.largura > carro.x &&
            busao.y < carro.y + carro.altura &&
            busao.y + busao.altura > carro.y) {
            // Colisão detectada, faça o que for necessário, por exemplo, encerrar o jogo ou diminuir a pontuação
            // Aqui você pode adicionar o que deseja fazer em caso de colisão
            divFinal.style.display = "flex";
            divFinal.style.alignItems = "center";
            divFinal.style.justifyContent = "center";

            divFinal.innerHTML = `Você bateu!<br>Clique na tela novamente para recomeçar!<br>Pontuação final: ${pontos}`; // Inicializa a div 'pontuacao'
            // Por exemplo, para reiniciar o jogo após a colisão
            reiniciar();
        }
    });
}

// Função de animação do ônibus e das calçadas
function animacaoFundo(){
    
    ctx.clearRect(0,0,canvasLimit,canvas.offsetHeight); // Limpa o canvas
    ctx.drawImage(background, 0, 0, canvasLimit, 800, 0, 0, canvasLimit, 800); // Cria a imagem de fundo
    busao.desenhaBusao(); // Desenha o objeto do ônibus na tela
    
    requestAnimationFrame(animacaoFundo);
}

function reiniciar(){
    request = true
    busao.x = 50;
    busao.y = 355;
    carrosArray = [];

    // Começa o jogo quando clica na tela;
    document.addEventListener("click", funcaoPrincipal);
}

//========================================================================================================================================================

// FUNCIONAMENTO DO JOGO ('main')
let pontos = 0; // Pontuacao
let velocidadeCarro = 5; // Move 'Xpx' os carros
let delayObstaculos = 1000; // Delay (em ms) para gerar um novo obstáculo

function funcaoPrincipal(){
    request = false
    divMenu.style.display = "none"; // Esconde a 'divMenu'
    divFinal.style.display = "none"; // Esconde a 'divFinal'
    document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontos; // Inicializa a div 'pontuacao'

    // Verifica se a janela foi minimizada ou está em foco
    let altTab = false;
    window.addEventListener("blur", function(){ // Minimizada
        altTab = true;
    })
    window.addEventListener("focus", () => { // Em foco
        altTab = false;
    })
    
    // Aumenta os pontos se a janela não foi minimizada (e a velocidade/delay de aparição dos carros com base nos pontos)
    var aumentoValores = null;
    aumentoValores = setInterval(() => {
        if(request){
            clearInterval(aumentoValores);
            pontos = 0
            return
        }
        if (!altTab) { // Verifica se a janela foi minimizada
            pontos += 5;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontos; // Atualiza os pontos
            if(pontos % 50 == 0){
                velocidadeCarro += 0.25;
                if(delayObstaculos >= 350)
                    delayObstaculos -= 50;
            }
        }
    }, 400);
    
    // Gera um novo carra a cada x ms (x = delayObstaculos)
    var geradorCarro = function() {
        if(request){
            delayObstaculos = 1000;   
            return
        }
        if(!altTab){
            geraNovoCarro();
        }
        setTimeout(geradorCarro, delayObstaculos);
    }
    setTimeout(geradorCarro, delayObstaculos);
    
    // Chama a função de animação dos carros
    animacaoCarros(altTab);

    
    // Remove o evento de 'click' da 'funcaoPrincipal'
    document.removeEventListener("click", funcaoPrincipal);
}

 // Inicia a movimentação quando uma tecla é pressionada
 let movimento = null;
 document.addEventListener("keydown", function(event) {
     let tecla = event.key;
     
     // Limpa o 'setInterval' de 'movimento' para começar uma nova função
     clearInterval(movimento);

     if (tecla === "ArrowUp" || tecla == "w") { // Move pra cima
         movimento = setInterval(() => {
             busao.y -= 5;
             if (busao.y < calcada.altura + 15) {
                 busao.y = calcada.altura + 15;
             }
         }, 10);
     } else if (tecla === "ArrowDown" || tecla == "s") { // Move pra baixo
         movimento = setInterval(() => {
             busao.y += 5;
             if (busao.y > ((canvas.offsetHeight - busao.altura) - calcada.altura) - 15) {
                 busao.y = ((canvas.offsetHeight - busao.altura) - calcada.altura) - 15;
             }
         }, 10);
     } else if (tecla === "ArrowRight" || tecla == "d") { // Move pra direita
         movimento = setInterval(() => {
             busao.x += 3;
             if (busao.x > (canvasLimit - busao.largura) - 10) {
                 busao.x = (canvasLimit - busao.largura) - 10;
             }
         }, 10);
     } else if (tecla === "ArrowLeft" || tecla == "a") { // Move pra esquerda
         movimento = setInterval(() => {
             busao.x -= 3;
             if (busao.x < 10) {
                 busao.x = 10;
             }
         }, 10);
     }

     if(request){
         clearInterval(movimento);
         busao.x = 50;
         busao.y = 355;
     }
 });

 // Para a movimentação quando uma tecla é solta
 document.addEventListener("keyup", function() {
     clearInterval(movimento);
     if(request){
        busao.x = 50;
        busao.y = 355;
     }
 });

// Inicia o jogo
document.addEventListener("click", funcaoPrincipal);

// Chama a função de animação do fundo
animacaoFundo();