function fazerLogin() {
    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;
  
    if (usuario === '' || senha === '') {
      alert('Preencha todos os campos antes de fazer login!');
      return;
    }
  
    // Verificar se os dados do usuário existem no localStorage
    var usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) {
      var usuarios = JSON.parse(usuariosSalvos);
  
      var usuarioEncontrado = usuarios.find(function(u) {
        return u.usuario === usuario && u.senha === senha;
      });
  
      if (usuarioEncontrado) {
        // Dados de login corretos
        alert('Login realizado com sucesso!');
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        window.location.href = '02-ver.html'; // Redireciona para a página "ver.html"
      } else {
        // Dados de login inválidos
        alert('Usuário ou senha incorretos!');
      }
    } else {
      // Não há usuários cadastrados
      alert('Nenhum usuário cadastrado!');
    }
  }
  