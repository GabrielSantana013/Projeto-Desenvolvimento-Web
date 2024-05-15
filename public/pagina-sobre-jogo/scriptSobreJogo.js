// FUNÇÃO busAnimation
var bus = document.getElementById("busDiv").getElementsByClassName("bus")[0]; // Pega apenas o GIF do ônibus
var busDiv = document.getElementById("busDiv"); // Pega a div pai do ônibus
var change = -200; // Posição do ônibus (tem 200 de width, logo ele começa fora da tela)
var pageLimit = busDiv.offsetWidth // Define o comprimento total da div 'busDiv' (limite da página)

if (pageLimit % 2 != 0){ // Transforma o limite da página em um número par
  pageLimit += 1;
}

bus.addEventListener("click", function(){ // Aumenta a posição em 2 quando clica na imagem do ônibus
  change += 2;
});

function busAnimation(){
  bus.style.right = change+"px"; // Muda a propriedade 'right' no css de 'busDiv'

  if(change == (pageLimit-200)){ // Se a imagem do ônibus chegar no limite da página, a posição fica estática
    change = (pageLimit-200);
  }
  else{
    change += 2;
    if(change == pageLimit){
      change = -200;
    }
  }
  requestAnimationFrame(busAnimation);

  
}

busAnimation();
