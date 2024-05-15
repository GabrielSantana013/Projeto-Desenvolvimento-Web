var botao = document.getElementById("segredo");
var divImg = document.querySelector(".contImg");

botao.addEventListener("click", function(){

    if(divImg.style.display == "none")
        {
            divImg.style.display="flex";
        }
    else
    {
        divImg.style.display="none";
    }

});