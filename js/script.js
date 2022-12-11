// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const toolbar = document.querySelector("#toolbar");
const search = document.querySelector("#search");
const searchInput = document.querySelector("#search-input");
const filtro = document.querySelector("#filter-select");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;


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


};

const toggleForms = () => {
    editForm.classList.toggle("hide"); //oculta 
    todoForm.classList.toggle("hide"); //oculta
    todoList.classList.toggle("hide"); //oculta
    toolbar.style.display = 'none'; //oculta
}

const updateTodo = (text) => { // funcao atualizar
    const todos = document.querySelectorAll(".todo"); //cria um away com todo as div .todo

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}


const pesquisar = (pesquisa) => {

    const todos = document.querySelectorAll(".todo"); //cria um away com todos as tarefas
    todoList.innerHTML = ""; //esvazia a lista
    todos.forEach((todo) => { 
        let todoTitle = todo.querySelector("h3"); //pega o elemento h3 de todo
        let palavra = todoTitle.innerText; //pega o conteudo de h3
        if(palavra.indexOf(pesquisa) > -1){ //compara pra ver se tem a palavra igual (se nao tiver mostra -1);
            todoList.appendChild(todo); //se tiver coloca na lista

        }
    })
    if( todoList.innerHTML === ""){
        const semTarefa = document.createElement("div"); //cria uma div
        semTarefa.innerHTML = 'Sem Tarefa'; // coloca um texto dentro da div
        todoList.appendChild(semTarefa); // adiciona a div na div todoList
    }
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
    let todoTitle;
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")) { //se a tag do evento clicado tiver a class finish-todo 
        parentEl.classList.toggle("done"); // adicione o done na div todo
        targetEl.classList.toggle("feito"); //adicione o done no span tbm
    }

    if(targetEl.classList.contains("remove-todo")){ // se a tag do evento clicado tiver a class remove-todo
        parentEl.remove(); //remova a parent el, ou seja remova a div
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})



editForm.addEventListener("submit", (e) => { //esperando um evento de submit no editform
    e.preventDefault();

    const editInputValue = editInput.value; //pega o valor que ta no edit

    if(editInputValue){ //se tiver valor
        updateTodo(editInputValue); //manda para funcao atualizar
    }
    toggleForms(); //volta o hide
    toolbar.style.display = 'flex'; //desoculta toolbar
})

search.addEventListener("submit", (e) => { //esperando o evento de submit do botao pesquisar
    e.preventDefault();

    const pesquisa = searchInput.value; //pega o valor da pesquisa, ou seja oq quer pesquisar
    

    pesquisar(pesquisa); //chama a funcao que pesquisa as palavras

})

filtro.addEventListener("click", (e) => {
    const todos = document.querySelectorAll(".todo"); //cria um away com todos as tarefas
    var opcaoValor = filtro.options[filtro.selectedIndex].value;
    if(opcaoValor == "done"){ // se a opcao do select for "feita"
        todos.forEach((todo) => { 
            if(!todo.classList.contains("done")){ //procura ver se todo nao tem a classe done, ou seja todos aqeueles que nao foram feitos;
                todoList.removeChild(todo); //se tiver coloca na lista
    
            }
        }) 
    }
    else if(opcaoValor == "todo"){ //se a opcao do select for "falta fazer"
        todos.forEach((todo) => { 
            if(todo.classList.contains("done")){ //procura ver se todo tem a classe done, ou seja todos aqeueles que ja tao feitos;
                todoList.removeChild(todo); //se tiver coloca na lista
    
            }
        })
    }

})