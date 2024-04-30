// Quando o usuário desce a página, executa a função 'fixNav()'
window.onscroll = function() {fixNav()};

// Pega o menu de navegação na variável 'header'
var header = document.getElementById("nav");

// Pega a "offset position" do menu de navegação
var sticky = header.offsetTop;

// Adiciona a classe 'prende' à variável header quando atinge a posição de scroll.
// Remove 'prende' quando sai da posição de scroll
function fixNav() {
  if (window.pageYOffset > sticky) {
    header.classList.add("prende");
  } else {
    header.classList.remove("prende");
  }
}