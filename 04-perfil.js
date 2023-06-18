function exibirImagemUsuarioLogado() {
    var usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        usuarioLogado = JSON.parse(usuarioLogado);

        var imagemContainer = document.getElementById('imagemUsuario');
        imagemContainer.innerHTML = '';

        var imagem = document.createElement('img');
        imagem.src = usuarioLogado.imagem;
        imagemContainer.appendChild(imagem);

        var informaContainer = document.querySelector('.informa');
        informaContainer.innerHTML = '';

        var nomeUsuario = document.createElement('p');
        nomeUsuario.textContent = 'Usuário: ' + usuarioLogado.usuario;
        informaContainer.appendChild(nomeUsuario);

        var emailUsuario = document.createElement('p');
        emailUsuario.textContent = 'Email: ' + usuarioLogado.email;
        informaContainer.appendChild(emailUsuario);

        var statusUsuario = document.createElement('p');
        statusUsuario.textContent = 'Status: ' + (usuarioLogado.online ? 'Online' : 'Offline');
        informaContainer.appendChild(statusUsuario);
    }
}

exibirImagemUsuarioLogado();


function exibirDados() {
  var dadosSalvos = localStorage.getItem('dados');

  if (dadosSalvos) {
    var dados = JSON.parse(dadosSalvos);

    var listaDados = document.getElementById('listatexto');
    listaDados.innerHTML = '';

    var usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      usuarioLogado = JSON.parse(usuarioLogado);

      dados.forEach(function (dado) {
        if (dado.nome === usuarioLogado.usuario) {
          var postagem = document.createElement('div');
          postagem.classList.add('postagem');

          var info = document.createElement('div');
          info.classList.add('info');

          var nome = document.createElement('div');
          nome.classList.add('nome');
          nome.textContent = dado.nome;
          info.appendChild(nome);

          postagem.appendChild(info);

          var titulo = document.createElement('div');
          titulo.classList.add('titulo');
          titulo.textContent = dado.titulo;
          postagem.appendChild(titulo);

          var data = document.createElement('div');
          data.classList.add('data');
          data.textContent = dado.dataCriacao;
          postagem.appendChild(data);

          var codigo = document.createElement('div');
          codigo.classList.add('codigo');
          codigo.textContent = dado.codigo;
          postagem.appendChild(codigo);

          postagem.addEventListener('click', function () {
            postagem.classList.toggle('expandir');
          });

          //***************************************************************** */
        if (dado.nome === usuarioLogado.usuario) {
          var editarBtn = document.createElement('button');
          editarBtn.textContent = 'Editar';
          editarBtn.addEventListener('click', function () {
            // Lógica para editar a publicação
            var novoTitulo = prompt('Digite o novo título da publicação:');
            var novoTipoCodigo = prompt('Digite o novo tipo de código:');
            var novoCodigo = prompt('Digite o novo código:');
            if (novoTitulo && novoTipoCodigo && novoCodigo) {
              dado.titulo = novoTitulo;
              dado.tipoCodigo = novoTipoCodigo;
              dado.codigo = novoCodigo;
              localStorage.setItem('dados', JSON.stringify(dados));
              console.log('Publicação editada:', dado.id);
              // Atualize a exibição dos dados novamente após a edição
              exibirDados();
            }
          });
          postagem.appendChild(editarBtn);
        //***************************************************************** */

        //***************************************************************** */
          var apagarBtn = document.createElement('button');
          apagarBtn.textContent = 'Apagar';
          apagarBtn.addEventListener('click', function () {
            // Lógica para apagar a publicação do localStorage
            var index = dados.findIndex(function (item) {
              return item.id === dado.id && item.nome === usuarioLogado.usuario;
            });
            if (index !== -1) {
              dados.splice(index, 1);
              localStorage.setItem('dados', JSON.stringify(dados));
              console.log('Publicação removida:', dado.id);
              // Atualize a exibição dos dados novamente após a remoção
              exibirDados();
            }
          });
          postagem.appendChild(apagarBtn);
        }
        //***************************************************************** */



          listaDados.appendChild(postagem);
        }
      });
    }
  }
}

exibirDados();


function exibirProjetos() {
  var projetosSalvos = localStorage.getItem('projetos');
  var postagensContainer = document.getElementById('postagens');
  postagensContainer.innerHTML = '';

  if (projetosSalvos) {
    var projetos = JSON.parse(projetosSalvos);

    var usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      usuarioLogado = JSON.parse(usuarioLogado);

      projetos.forEach(function (projeto) {
        if (projeto.nome === usuarioLogado.usuario) {
          var postagem = document.createElement('div');
          postagem.classList.add('galeria-item');

          var nome = document.createElement('div');
          nome.classList.add('nome');
          nome.textContent = projeto.nome;
          postagem.appendChild(nome);

          var imagem = document.createElement('img');
          imagem.src = projeto.imagemData;
          postagem.appendChild(imagem);

          var titulo = document.createElement('h3');
          titulo.textContent = projeto.titulo;
          postagem.appendChild(titulo);

          var descricao = document.createElement('p');
          descricao.textContent = projeto.descricao;
          postagem.appendChild(descricao);

          var editarBtn = document.createElement('button');
          editarBtn.textContent = 'Editar';
          editarBtn.addEventListener('click', function () {
            var novoTitulo = prompt('Digite o novo título do projeto:');
            var novaDescricao = prompt('Digite a nova descrição do projeto:');
            if (novoTitulo && novaDescricao) {
              projeto.titulo = novoTitulo;
              projeto.descricao = novaDescricao;
              localStorage.setItem('projetos', JSON.stringify(projetos));
              console.log('Projeto editado:', projeto.id);
              exibirProjetos();
            }
          });
          postagem.appendChild(editarBtn);

          var apagarBtn = document.createElement('button');
          apagarBtn.textContent = 'Apagar';
          apagarBtn.addEventListener('click', function () {
            var index = projetos.findIndex(function (item) {
              return item.id === projeto.id && item.nome === usuarioLogado.usuario;
            });
            if (index !== -1) {
              projetos.splice(index, 1);
              localStorage.setItem('projetos', JSON.stringify(projetos));
              console.log('Projeto removido:', projeto.id);
              exibirProjetos();
            }
          });
          postagem.appendChild(apagarBtn);

          postagensContainer.appendChild(postagem);
        }
      });
    }
  }
}

exibirProjetos();

function exibirDadosTEXT() {
  var dadosSalvos = localStorage.getItem('meusDados');

  if (dadosSalvos) {
    var dados = JSON.parse(dadosSalvos);

    var listaDados = document.getElementById('novaListaDados');
    listaDados.innerHTML = '';

    var usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      usuarioLogado = JSON.parse(usuarioLogado);

      dados.forEach(function (dado) {
        if (dado.nome === usuarioLogado.usuario) {
          var postagem = document.createElement('div');
          postagem.classList.add('postagem');

          var info = document.createElement('div');
          info.classList.add('info');

          var nome = document.createElement('div');
          nome.classList.add('nome');
          nome.textContent = dado.nome;
          info.appendChild(nome);

          postagem.appendChild(info);

          var titulo = document.createElement('div');
          titulo.classList.add('titulo');
          titulo.textContent = dado.nomeProjeto;
          postagem.appendChild(titulo);

          var data = document.createElement('div');
          data.classList.add('data');
          data.textContent = dado.dataCriacao;
          postagem.appendChild(data);

          var tema = document.createElement('div');
          tema.classList.add('tema');
          tema.textContent = dado.tema;
          postagem.appendChild(tema);

          var texto = document.createElement('div');
          texto.classList.add('texto');
          texto.textContent = dado.texto;
          postagem.appendChild(texto);

          postagem.addEventListener('click', function () {
            postagem.classList.toggle('expandir');
          });

          var editarBtn = document.createElement('button');
          editarBtn.textContent = 'Editar';
          editarBtn.addEventListener('click', function () {
            var novoTitulo = prompt('Digite o novo título da publicação:');
            var novoTexto = prompt('Digite o novo texto da publicação:');
            if (novoTitulo && novoTexto) {
              dado.nomeProjeto = novoTitulo;
              dado.texto = novoTexto;
              localStorage.setItem('meusDados', JSON.stringify(dados));
              console.log('Publicação editada:', dado.id);
              exibirDadosTEXT();
            }
          });
          postagem.appendChild(editarBtn);

          var apagarBtn = document.createElement('button');
          apagarBtn.textContent = 'Apagar';
          apagarBtn.addEventListener('click', function () {
            var index = dados.findIndex(function (item) {
              return item.id === dado.id && item.nome === usuarioLogado.usuario;
            });
            if (index !== -1) {
              dados.splice(index, 1);
              localStorage.setItem('meusDados', JSON.stringify(dados));
              console.log('Publicação removida:', dado.id);
              exibirDadosTEXT();
            }
          });
          postagem.appendChild(apagarBtn);

          listaDados.appendChild(postagem);
        }
      });
    }
  }
}

exibirDadosTEXT();
