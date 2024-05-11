let canvas = document.getElementById("jogo");
let ctx = canvas.getContext("2d");

var canvasLimit = 0 // Define o limite do canvas
let divMenu = document.getElementById("start"); // Pega a div do menu e configura a altura total e do texto
divMenu.style.height = canvas.height+"px";
divMenu.style.lineHeight = canvas.height+"px";

// Função que atualiza o canvas para manter a responsividade
function resizeCanvas(){
    let percent = 0.85;
    canvas.width = window.innerWidth * percent; // Pega o tamanho proporcional da janela do navegador
    canvasLimit = canvas.width; // Passa o novo tamanho para a variável 'canvasLimit'
    divMenu.style.width = canvasLimit+"px"; // Define o novo tamanho da 'divMenu'
}

window.addEventListener("resize", resizeCanvas); // Chama a função 'resizeCanvas' quando a janela é alterada
resizeCanvas();

var background = new Image(); // Atribui a imagem de fundo pra variável 'background'
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
function animacaoCarros(altTab, velocidadeCarro) {
    if(!altTab){
        // Desenha e move os carros existentes
        carrosArray.forEach(carro => {
            carro.desenhaCarro();
            carro.x -= velocidadeCarro; // Move o carro para a esquerda
        });
    }
    
    // Remove os carros que sairam do canvas
    carrosArray = carrosArray.filter((carro) => carro.x > 0-carro.largura);

    requestAnimationFrame(() => animacaoCarros(altTab, velocidadeCarro));
}

// Função para criar o carro depois de X quantidade de tempo (em ms)
function geraCarroAposDelay(x, altTab) {
    if(altTab == false){
        setTimeout(function() {
            geraNovoCarro();
            geraCarroAposDelay(x); // Chama a própria função para gerar novos carros
        }, x);
    }
}

// Função de animação do ônibus e das calçadas
function animacaoFundo(){
    
    ctx.clearRect(0,0,canvasLimit,canvas.offsetHeight); // Limpa o canvas
    ctx.drawImage(background, 0, 0, canvasLimit, 800, 0, 0, canvasLimit, 800); // Cria a imagem de fundo
    busao.desenhaBusao(); // Desenha o objeto do ônibus na tela
    
    requestAnimationFrame(animacaoFundo);
}

//========================================================================================================================================================

// FUNCIONAMENTO DO JOGO ('main')
let pontos = 0;

function funcaoPrincipal(){
    let delayObstaculos = 500; // Cria um novo carro a cada x ms
    let velocidadeCarro = 5; // Move 'Xpx' os carros

    divMenu.style.display = "none"; // Esconde a 'divMenu'
    document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontos; // Inicializa a div 'pontuacao'
    
    let movimento = null;

    document.addEventListener("keydown", function(event) { // Inicia a movimentação quando uma tecla é pressionada
        let tecla = event.key;
        
        clearInterval(movimento); // Limpa o 'setInterval' de 'movimento' para começar uma nova função

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
    });

    document.addEventListener("keyup", function() { // Para a movimentação quando uma tecla é solta
        clearInterval(movimento);
    });

    let altTab = false;
    window.addEventListener("blur", function(){ // Verifica se a janela foi minimizada
        altTab = true;
    })
    window.addEventListener("focus", () => { // Verifica se a janela está em foco
        altTab = false;
    })

    setInterval(() => {
        geraCarroAposDelay(delayObstaculos, altTab);
    }, delayObstaculos);
    
    animacaoCarros(altTab, velocidadeCarro);

    // Aumenta os pontos se a janela não foi minimizada
    setInterval(() => {
        if (!altTab) { // Verifica se a janela foi minimizada
            pontos += 1;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontos; // Update points
        }
    }, 375);


    document.removeEventListener("click", funcaoPrincipal);
}

document.addEventListener("click", funcaoPrincipal) // Começa o jogo quando clica na tela;

animacaoFundo();