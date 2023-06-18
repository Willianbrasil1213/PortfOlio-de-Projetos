
 // Função para abrir o modal 01
 function abrirModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

function fecharModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}
//*************************************** */

 // Função para abrir o modal 02
 function abrirModal2() {
  var modal = document.getElementById("modal2");
  modal.style.display = "block";
}

function fecharModal2() {
  var modal = document.getElementById("modal2");
  modal.style.display = "none";
}
//*************************************** */

 // Função para abrir o modal 03
 function abrirModal3() {
  var modal = document.getElementById("modal3");
  modal.style.display = "block";
}

function fecharModal3() {
  var modal = document.getElementById("modal3");
  modal.style.display = "none";
}
//*************************************** */

 // Função para abrir o modal 04
 function abrirModal4() {
  var modal = document.getElementById("modal4");
  modal.style.display = "block";
}

function fecharModal4() {
  var modal = document.getElementById("modal4");
  modal.style.display = "none";
}
//*************************************** */

 // Função para abrir o modal 05
 function abrirModal5() {
  var modal = document.getElementById("modal5");
  modal.style.display = "block";
}

function fecharModal5() {
  var modal = document.getElementById("modal5");
  modal.style.display = "none";
}
//*************************************** */

function irParaOutraPagina() {
  window.location.href = "04-perfil.html";
}

function salvarProjeto() {
  var usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    alert('Faça login para salvar projetos!');
    return;
  }

  // Restante do código para salvar o projeto
  // ...
}
