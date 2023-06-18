function salvarDadoscod() {
  
  var usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    alert('Você precisa estar logado para fazer uma postagem!');
    return;
  }
  var nome = '';

    var usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        usuarioLogado = JSON.parse(usuarioLogado);
        nome = usuarioLogado.usuario;
    }

    var titulo = document.getElementById('nomeprojeto').value;
  var dataCriacao = document.getElementById('dataCriacao').value;
  var link = document.getElementById('link').value;
  var linguagem = document.getElementById('Linguagem').value;
  var codigo = document.getElementById('Codigo').value;

  if (nome === '' || titulo === '' || dataCriacao === '' || link === '' || linguagem === '' || codigo === '') {
    alert('Preencha todos os campos antes de salvar!');
    return;
  }

  var foto = '';
  if (usuarioLogado && usuarioLogado.imagem) {
    foto = usuarioLogado.imagem;
  }
  var dadosSalvos = localStorage.getItem('dados');
  var dados = [];

  if (dadosSalvos) {
    dados = JSON.parse(dadosSalvos);
  }

  var novoDado = {
    nome: nome,
    titulo: titulo,
    dataCriacao: dataCriacao,
    link: link,
    linguagem: linguagem,
    codigo: codigo,
    foto: foto
  };

  dados.push(novoDado);

  localStorage.setItem('dados', JSON.stringify(dados));

  alert('Dados salvos com sucesso!');

  document.getElementById('nomeprojeto').value = '';
  document.getElementById('nomeprojeto').value = '';
  document.getElementById('dataCriacao').value = '';
  document.getElementById('link').value = '';
  document.getElementById('Linguagem').value = '';
  document.getElementById('Codigo').value = '';


}


function exibirDados() {
  var dadosSalvos = localStorage.getItem('dados');

  if (dadosSalvos) {
    var dados = JSON.parse(dadosSalvos);

    var listaDados = document.getElementById('listaDados');
    listaDados.innerHTML = '';

    var usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      usuarioLogado = JSON.parse(usuarioLogado);

    dados.forEach(function (dado) {
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

      var link = document.createElement('div');
      link.classList.add('titulo');
      link.textContent = dado.link;
      postagem.appendChild(link);

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
          var novoTitulo = prompt('Digite o novo título da publicação:');
          var novoTipoCodigo = prompt('Digite o novo tipo de código:');
          var novoLink = prompt('Digite o novo link de código:');
          var novoCodigo = prompt('Digite o novo código:');
          if (novoTitulo && novoTipoCodigo && novoCodigo) {
            dado.titulo = novoTitulo;
            dado.tipoCodigo = novoTipoCodigo;
            dado.codigo = novoCodigo;
            dado.link = novoLink;
            localStorage.setItem('dados', JSON.stringify(dados));
            console.log('Publicação editada:', dado.id);
            exibirDados();
          }
        });
        postagem.appendChild(editarBtn);
      //***************************************************************** */

      //***************************************************************** */
        var apagarBtn = document.createElement('button');
        apagarBtn.textContent = 'Apagar';
        apagarBtn.addEventListener('click', function () {
          var index = dados.findIndex(function (item) {
            return item.id === dado.id && item.nome === usuarioLogado.usuario;
          });
          if (index !== -1) {
            dados.splice(index, 1);
            localStorage.setItem('dados', JSON.stringify(dados));
            console.log('Publicação removida:', dado.id);
            exibirDados();
          }
        });
        postagem.appendChild(apagarBtn);
      }
      //***************************************************************** */


      listaDados.appendChild(postagem);
    });
    
  }
}
}

exibirDados();



function salvarProjeto() {
 
  var usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    alert('Você precisa estar logado para fazer uma postagem!');
    return;
  }
  var nome = '';
  var usuarioLogado = localStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    usuarioLogado = JSON.parse(usuarioLogado);
    nome = usuarioLogado.usuario;
  }
  

  var nomeProjeto = document.getElementById('nomeprojeto').value;
  var titulo = document.getElementById('titulofoto').value;
  var descricao = document.getElementById('descricao').value;
  var imagemInput = document.getElementById('imagem');
  var imagem = imagemInput.files[0];
  

  if (!nome || !nomeProjeto || !titulo || !descricao || !imagem) {
    alert('Preencha todos os campos antes de salvar o projeto!');
    return;
  }

  var foto = '';
  if (usuarioLogado && usuarioLogado.imagem) {
    foto = usuarioLogado.imagem;
  }

  var reader = new FileReader();
  reader.onload = function (event) {
    var imagemData = event.target.result;

    var projetosSalvos = localStorage.getItem('projetos');
    var projetos = [];

    if (projetosSalvos) {
      projetos = JSON.parse(projetosSalvos);
    }

    var novoProjeto = {
      nome: nome,
      nomeProjeto: nomeProjeto,
      titulo: titulo,
      descricao: descricao,
      imagemData: imagemData,
      foto: foto

    };

    projetos.push(novoProjeto);
    localStorage.setItem('projetos', JSON.stringify(projetos));

    exibirProjetos();
    limparFormulario();
    alert('Projeto salvo com sucesso!');
  };

  reader.readAsDataURL(imagem);
}


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

        var postagem = document.createElement('div');
        postagem.classList.add('postagem');

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


        //***************************************************************** */
        if (projeto.nome === usuarioLogado.usuario) {
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
         //***************************************************************** */

         //***************************************************************** */
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
        }
        //***************************************************************** */

        postagensContainer.appendChild(postagem);
      });
    }
  }
}

function limparFormulario() {
  document.getElementById('nomeprojeto').value = '';
  document.getElementById('titulo').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('imagem').value = '';
}

exibirProjetos();


function sairDoPerfil() {
  localStorage.removeItem('usuarioLogado');

  window.location.href = '05-index.html';

}


function salvarDadosTEXT() {
  var usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    alert('Você precisa estar logado para fazer uma postagem!');
    return;
  }

  var nome = '';

  var usuarioLogado = localStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    usuarioLogado = JSON.parse(usuarioLogado);
    nome = usuarioLogado.usuario;
  }

  var nomeProjeto = document.getElementById('nomeprojeto').value;
  var dataCriacao = document.getElementById('dataCriacao').value;
  var tema = document.getElementById('tema').value;
  var texto = document.getElementById('texto').value;

  if (nomeProjeto === '' || dataCriacao === '' || tema === '' || texto === '') {
    alert('Preencha todos os campos antes de salvar!');
    return;
  }

  var foto = '';
  if (usuarioLogado && usuarioLogado.imagem) {
    foto = usuarioLogado.imagem;
  }

  var meusDadosSalvos = localStorage.getItem('meusDados');
  var meusDados = [];

  if (meusDadosSalvos) {
    meusDados = JSON.parse(meusDadosSalvos);
  }

  var novoDado = {
    nome: nome,
    nomeProjeto: nomeProjeto,
    dataCriacao: dataCriacao,
    tema: tema,
    texto: texto,
    foto: foto
  };

  meusDados.push(novoDado);

  localStorage.setItem('meusDados', JSON.stringify(meusDados));

  alert('Dados salvos com sucesso!');

  document.getElementById('nomeprojeto').value = '';
  document.getElementById('dataCriacao').value = '';
  document.getElementById('tema').value = '';
  document.getElementById('texto').value = '';
}



function exibirDadosTEXT() {
  var dadosSalvos = localStorage.getItem('meusDados');

  if (dadosSalvos) {
    var dados = JSON.parse(dadosSalvos);

    var listaDadostext = document.getElementById('novaListaDados');
    listaDadostext.innerHTML = '';

    var usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      usuarioLogado = JSON.parse(usuarioLogado);

      dados.forEach(function (dado) {
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

        if (dado.nome === usuarioLogado.usuario) {
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
              exibirDados();
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
              exibirDados();
            }
          });
          postagem.appendChild(apagarBtn);
        }

        listaDadostext.appendChild(postagem);
      });
    }
  }
}

exibirDadosTEXT();

