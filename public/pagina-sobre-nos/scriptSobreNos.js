//Div Secreta

let botao = document.getElementById("segredo");
let divImg = document.querySelector(".contImg");

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

    //Modo escuro

    let trilho = document.getElementById("trilho");
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let topoDoSite = document.querySelector(".topoDoSite");
    let sobreGabriel = document.querySelector(".sobreGabriel");
    let sobrePedro = document.querySelector(".sobrePedro");
    let linhaRodape2 = document.querySelector(".linhaRodape2");
    let contImg = document.querySelector('.contImg');
    

    trilho.addEventListener('click', function(){
        trilho.classList.toggle('dark'); //assim que clicar ele muda pra dark
        body.classList.toggle('dark');
        header.classList.toggle('dark');
        topoDoSite.classList.toggle('dark');
        sobreGabriel.classList.toggle('dark');
        sobrePedro.classList.toggle('dark');
        linhaRodape2.classList.toggle('dark');
        contImg.classList.toggle('dark');
    });