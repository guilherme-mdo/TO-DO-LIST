const formularioTarefa = document.querySelector('#formulario-tarefa');
const campoTarefa = document.querySelector('#campo-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const mensagemVazia = document.querySelector('#mensagem-vazia');
const quantidadeTarefas = document.querySelector('#quantidade-tarefas');
const modal = document.getElementById("modal-editar");
const inputEditar = document.getElementById("input-editar");

let tarefas = [];
let indiceEditando = null;

formularioTarefa.addEventListener('submit', adicionarTarefa);

function adicionarTarefa(evento) {
  evento.preventDefault();

  const texto = campoTarefa.value.trim();

  if (texto === '') {
    return;
  }

  const novaTarefa = {
    texto: texto,
    concluida: false
  };

  tarefas.push(novaTarefa);
  campoTarefa.value = '';
  mostrarTarefas();
  campoTarefa.focus();
}

function mostrarTarefas() {
  listaTarefas.innerHTML = '';

  if (tarefas.length === 0) {
    mensagemVazia.style.display = 'block';
  } else {
    mensagemVazia.style.display = 'none';
  }

  if (tarefas.length === 1) {
    quantidadeTarefas.textContent = '1 tarefa';
  } else {
    quantidadeTarefas.textContent = `${tarefas.length} tarefas`;
  }

  tarefas.forEach(function (tarefa, indice) {
    const item = document.createElement('li');
    item.className = 'tarefa';

    if (tarefa.concluida === true) {
      item.classList.add('tarefa-concluida');
    }

    const caixaConclusao = document.createElement('input');
    caixaConclusao.type = 'checkbox';
    caixaConclusao.checked = tarefa.concluida;
    caixaConclusao.setAttribute('aria-label', 'Concluir tarefa');
    caixaConclusao.addEventListener('change', function () {
      concluirTarefa(indice);
    });

    const texto = document.createElement('p');
    texto.className = 'texto-tarefa';
    texto.textContent = tarefa.texto;

    const botoes = document.createElement('div');
    botoes.className = 'botoes-tarefa';

    const botaoEditar = document.createElement('button');
    botaoEditar.className = 'botao-tarefa';
    botaoEditar.textContent = 'Editar';
    botaoEditar.type = 'button';
    botaoEditar.addEventListener('click', function () {
      editarTarefa(indice);
    });

    const botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'botao-tarefa botao-excluir';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.type = 'button';
    botaoExcluir.addEventListener('click', function () {
      excluirTarefa(indice);
    });

    botoes.append(botaoEditar, botaoExcluir);
    item.append(caixaConclusao, texto, botoes);
    listaTarefas.appendChild(item);
  });
}

function concluirTarefa(indice) {
  tarefas[indice].concluida = !tarefas[indice].concluida;
  mostrarTarefas();
}

function editarTarefa(indice) {
  indiceEditando = indice;
  inputEditar.value = tarefas[indice].texto;
  modal.classList.add("ativo");
  inputEditar.focus();
}

function excluirTarefa(indice) {
  tarefas.splice(indice, 1);
  mostrarTarefas();
}

document.getElementById("btn-salvar").addEventListener("click", () => {  // Pega o texto novo e salva no array
  if (inputEditar.value.trim() !== '') {
    tarefas[indiceEditando].texto = inputEditar.value.trim();
    mostrarTarefas(); //Atualiza a tela
  }
  modal.classList.remove("ativo"); // Fecha o modal
});

document.getElementById("btn-cancelar").addEventListener("click", () => { modal.classList.remove("ativo"); });

modal.addEventListener("click", (e) => {
  if (e.target === modal) { // se clicar no fundo escuro
    modal.classList.remove("ativo");
  }
});

mostrarTarefas();
