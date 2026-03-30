const inputElement = document.querySelector("#area input");
const buttonElement = document.querySelector("#area button");
const listElement = document.querySelector("#list-task");

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

function renderizarTarefas() {
    listElement.innerHTML = '';
    tarefas.map((todo) => {
        let liElement = document.createElement("li");
        let pElement = document.createElement("p");
        let pText = document.createTextNode(todo);
        let btnElement = document.createElement("button");
        let spanElement = document.createElement("span");

        let position = tarefas.indexOf(todo);
        btnElement.addEventListener("click", () => deletarTarefa(position));

        listElement.appendChild(liElement);
        liElement.classList.add("task");
        liElement.appendChild(pElement);
        pElement.appendChild(pText);
        liElement.appendChild(btnElement);
        btnElement.appendChild(spanElement);
        spanElement.classList.add("fa-solid", "fa-trash");
    });
}

renderizarTarefas();

function registrarTarefa() {
    if (inputElement.value === '') {
        window.alert("!ERRO Nenhuma tarefa foi registrada!");
        return
    } else {
        // window.alert("Tarefa adicionada com sucesso!");
        let novaTarefa = inputElement.value;
        tarefas.push(novaTarefa);
        renderizarTarefas();
        salvarTarefa();
        inputElement.value = '';
    }
}

buttonElement.addEventListener("click", () => registrarTarefa());

inputElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        buttonElement.click();
    }
});

function deletarTarefa(position) {
    tarefas.splice(position, 1);
    renderizarTarefas();
    salvarTarefa();
}

function salvarTarefa() {
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
}