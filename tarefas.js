let arrayTarefas = [];

function removeOneTask(evento) {
  let confirmado = confirm("Deseja remover?")
  if (!confirmado) {
    return;
  }
  const id= evento.target.id;
  arrayTarefas = arrayTarefas.filter(function filtrar(item) {
    return item.id !== id.split("-")[1];
  });

  localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));
  atualizarDom(arrayTarefas);
}
function finalizarTarefa(evento) {
  const id = evento.target.id;
  const posicaoDaTarefaNoArray = arrayTarefas.findIndex(function encontrar(
    item
  ) {
    return item.id === id.split("-")[1];
  });
  arrayTarefas[posicaoDaTarefaNoArray].status = "done";
  localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));
  atualizarDom(arrayTarefas);
  console.log(arrayTarefas);
}
function adicionar() {
  
  // puxar valor do input
  const input = document.getElementById("todo-input");
  const texto = input.value;
  
  if (!texto) {
    
    return;
  }
  
  const objTarefa = {
    id: Date.now().toString(), // id não pode repetir
    name: texto, // pode repetir
    status: "pending", //(tarefa pendente)
  };
  
  arrayTarefas.push(objTarefa);

  localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));

  console.log(arrayTarefas);
  atualizarDom(arrayTarefas);
  
}



function handleClick(evento) {
  if (evento.target.nodeName === "BUTTON") {
    //verificar quem foi clicado, pra ver se chama a função de remover ou de finalizar
    if (evento.target.classList.contains("trash-btn")) {
      removeOneTask(evento);
    } else if (evento.target.classList.contains("check-btn")) {
      finalizarTarefa(evento);
    }
  }
}

window.addEventListener("load", function () {
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    adicionar();
  })
  const divTarefas = document.getElementById("tarefas");
  const select = document.getElementById("select-filtro");
  select.addEventListener("change", function atualizar() {
    atualizarDom(arrayTarefas);
  });
  divTarefas.addEventListener("click", handleClick);
});

function atualizarDom(arrayTarefas) {

  const selectfiltro = document.getElementById("select-filtro"); //filtrar tarefas 

  let opcaoselecionada =selectfiltro.value;

  let arrayfiltrado = [];

 

  if (opcaoselecionada === "all") {

    arrayfiltrado = arrayTarefas;

  }

  else{

    arrayfiltrado = arrayTarefas.filter(function filtrar(item) {

      return item.status === opcaoselecionada;

    });
}
    const todoList = document.getElementById("tarefas");

    todoList.innerHTML = "";
  
    for (let i = 0; i < arrayfiltrado.length; i++) {
  
      let divTarefa = document.createElement("div");
  
      divTarefa.className = arrayfiltrado[i].status + " todo";
  
   
  
      if (arrayfiltrado[i].status === "done") {
  
        divTarefa.classList.add("completed");
  
      }
  
   
  
      divTarefa.innerHTML = `<li class="todo-item">${arrayfiltrado[i].name}</li>
  
          <button id="finalizar-${arrayfiltrado[i].id}" class="finalizar check-btn"><i class="fas fa-check" aria-hidden="true"></i></button>
  
          <button id="remover-${arrayfiltrado[i].id}" class="remover trash-btn"><i class="fas fa-trash" aria-hidden="true"></i></button>`;
  
   
  
      todoList.appendChild(divTarefa);
  
    }
  
  }

window.addEventListener("load", function () {
  if(this.sessionStorage.getItem("logged")) {
    arrayTarefas = JSON.parse(this.LocalStorage.getItem("tarefas")) || "[]";
    atualizarDom();
  }else {
    window.location.href = "index.html";
  }


})
  