//All Element Selected
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners()

function eventListeners(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click",deleteTodo)
    filter.addEventListener("keyup",filterTodos)
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase()
    const listItems = document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase()
        if (text.indexOf(filterValue) === -1){
            listItem.setAttribute("style", "display : none !important")
        }
        else{
            listItem.setAttribute("style", "display : block")
        }
    })
}

function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Todo başarıyla silindi")
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage()

    todos.forEach(function(todo, index){
        if (todo === deletetodo){
            todos.splice(index,1) //Arrayden değer silme
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos))
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}

function addTodo(e){

    const newTodo = todoInput.value.trim()

    if (newTodo === ""){
        showAlert("danger","Lütfen bir todo girin");
    }
    else{
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo)
        showAlert("success","Todo başarıyla eklendi...")
    }

    // console.log(newTodo);
    e.preventDefault()
}

function getTodosFromStorage(){
    let todos
    
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage()

    todos.push(newTodo)

    localStorage.setItem("todos", JSON.stringify(todos)) //Todos arrayi json.stringfy ile stringe çevrilerek local storage'a eklendi
}

function showAlert(type,message){
    const alert = document.createElement("div")

    alert.className = `alert alert-${type}`
    alert.textContent = message

    firstCardBody.appendChild(alert)

    //setTimeout
    setTimeout(function(){
        alert.remove()
    },1000)
}

function addTodoToUI(newTodo){
    /*
    <!-- <li class="list-group-item d-flex justify-content-between">
    Todo 1
    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>

    </li>-->
    */

    //List Item oluşturma
   const listItem = document.createElement("li")

   //Link Oluşturma
   const link = document.createElement("a")
   link.href = "#"
   link.className = "delete-item"
   link.innerHTML = "<i class = 'fa fa-remove'></i>"

   listItem.className = "list-group-item d-flex justify-content-between"

   //Text Node Ekleme

   listItem.appendChild(document.createTextNode(newTodo))
   listItem.appendChild(link)

   //Todo List'e List Item'ı ekleme
    todoList.appendChild(listItem)
    todoInput.value = ""




}