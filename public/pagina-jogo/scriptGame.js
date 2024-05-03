let canvas = document.getElementById("jogo");
let ctx = canvas.getContext("2d");




//objeto do busao (trocar por sprite dps)
let busao = {

    x:50,
    y:50,
    altura:30,
    largura:80,
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


let calcada = {

    x1: 0,
    y1: 0,
    altura:100,
    largura: canvas.width,
    cor_linha: "black",
    cor_preenchimento: "gray",
    
    desenhaCalcada:function()
    {
        ctx.beginPath();
        ctx.strokeStyle = this.cor_linha;
        ctx.fillStyle = this.cor_preenchimento;
        ctx.strokeRect(this.x1, this.y1, this.largura, this.altura);
        ctx.fillRect(this.x1, this.y1, this.largura, this.altura);
        ctx.closePath();
    }

}


//função para animar o canva
function animacao(){
    
    ctx.clearRect(0,0,800,canvas.width);
    busao.desenhaBusao();
    calcada.desenhaCalcada();
    requestAnimationFrame(animacao);
}

//função que atualiza o canva para manter a responsividade
function resizeCanvas(){
    let percent = 0.85;
    canvas.width = window.innerWidth * percent;
    console.log(canvas.width);
    calcada.desenhaCalcada();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.addEventListener("keyup", function(evento){

    tecla = evento.key;
    console.log(tecla);

    if(tecla == "ArrowUp")
    {
        busao.y-=50;
    }
    if(tecla == "ArrowDown")
    {
        busao.y += 50;
    }

});







animacao();