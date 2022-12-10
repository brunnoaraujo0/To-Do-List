// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");


//funcoes
const saveTodo = (text) => {
    const todo = document.createElement("div"); //cria uma div 
    todo.classList.add("todo"); // adiciona uma class todo 

    const todoTitle = document.createElement("h3"); //cria um h3
    todoTitle.innerHTML = text; //adiciona o valor passado do evento para caixa do h3
    todo.appendChild(todoTitle); // adiciona o h3 dentro da div todo

    const doneBtn = document.createElement("button"); //cria um butao
    doneBtn.classList.add("finish-todo"); //adiciona uma class finish-todo ao botao
    doneBtn.innerHTML = '<span class="material-symbols-outlined">done</span>'; // coloca o icone no botao
    todo.appendChild(doneBtn); // adiciona o botao na div todo

    const editBtn = document.createElement("button"); //repete o de cima
    editBtn.classList.add("edit-todo"); // repete o de cima
    editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>'; //repete o de cima
    todo.appendChild(editBtn); //repete o de cima

    const deleteBtn = document.createElement("button"); //repete o de cima
    deleteBtn.classList.add("remove-todo"); // repete o de cima
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>'; //repete o de cima
    todo.appendChild(deleteBtn); //repete o de cima

    todoList.appendChild(todo); //adiciona uma div todo dentro do todo-list 
    
    todoInput.value = ""; //zera o valor do input
    todoInput.focus();


}



//Eventos 
todoForm.addEventListener("submit", (e) =>{ // esta esperando um evento de submit que no caso vai vim do button dentro do form
    e.preventDefault();
    const inputValue = todoInput.value; //pega o valor dentro do input

    if(inputValue) { //se tiver valor execute a funcao salvar
        saveTodo(inputValue); //
    }
});

document.addEventListener("click", (e) => { //adiciona um evento de click nos botoes
    const targetEl = e.target; //pegue a tag do evento (no caso vai ser o botao)
    const parentEl = targetEl.closest("div"); //pegue a div mais proxima dessa tag, no caso vai ser o todo
    const iconeEl = parentEl.closest("span");

    if(targetEl.classList.contains("finish-todo")) { //se a tag do evento clicado tiver a class finish-todo 
        parentEl.classList.toggle("done"); // adicione o done na div todo
        targetEl.classList.toggle("feito"); //adicione o done no span tbm
    }

    if(targetEl.classList.contains("remove-todo")){ // se a tag do evento clicado tiver a class remove-todo
        parentEl.remove(); //remova a parent el, ou seja remova a div
    }
})