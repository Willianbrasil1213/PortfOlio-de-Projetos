function criarUsuario() {
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;
  var usuario = document.getElementById('usuario').value;
  var nivelAcesso = document.getElementById('nivelAcesso').value;

  if (email === '' || senha === '' || usuario === '' || nivelAcesso === '') {
    alert('Preencha todos os campos antes de criar o usuário!');
    return;
  }

  var usuariosSalvos = localStorage.getItem('usuarios');
  var usuarios = [];

  if (usuariosSalvos) {
    usuarios = JSON.parse(usuariosSalvos);
  }

  var imagemInput = document.getElementById('imagem');
  var imagem = imagemInput.files[0];

  var reader = new FileReader();
  reader.onload = function(event) {
    var imagemData = event.target.result;

    var novoUsuario = {
      email: email,
      senha: senha,
      usuario: usuario,
      nivelAcesso: nivelAcesso,
      imagem: imagemData
    };

    usuarios.push(novoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário criado com sucesso!');
    window.location.href = '03-usu.html'; 
  };

  reader.readAsDataURL(imagem);
}
