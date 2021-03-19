//THEME SWAP
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change',()=>{
    document.body.classList.toggle('flat');
});
//DRAGGING
dragElement(document.getElementById("todo"));
dragElement(document.getElementById("weather"));
dragElement(document.getElementById("notes"));
//Functions
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
//TODO
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//Functions
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"</i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"</i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}
function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"</i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"</i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
//Weather
const searchbox = document.querySelector('.search-box');
const api = {
    key: "INSERT_YOUR_KEY_HERE",
    base: "http://api.openweathermap.org/data/2.5/"
}
//Event Listener
searchbox.addEventListener('keypress', setQuery);
//Functions
function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
        searchbox.value = "";
    }
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let highlow = document.querySelector('.high-low');
    highlow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}
//NOTES
let modal = document.querySelector('.modal');
let noteForm = document.querySelector('.note-form');
let noteTable = document.querySelector('.note-table');
let cancel = document. querySelector('.cancel-btn');
let noteDeleteButtons;
let noteList = JSON.parse(localStorage.getItem('notes')) || [];
//Event listener
noteForm.addEventListener('submit', (e)=>{
  addNote(e);
});
//Functions
function addNote(e){
    e.preventDefault();
    let newNote = {};
    let title = document.querySelector('.title');
    let note = document.querySelector('.note');
    if(title.value == '' || note.value == ''){
      return alert('Please enter both fields.');
    } else {
      newNote.title = title.value;
      newNote.note = note.value;
    }
    title.value = '';
    note.value = '';
    noteList.push(newNote);
    appendNotes();
    cancel.click();
}
function appendNotes(){
  noteTable.innerHTML ='';
  noteList.map(note =>{
    let tr = document.createElement('tr');
    tr.classList = 'noteItem';
    let tdTitle = document.createElement('td');
    tdTitle.innerText = note.title;
    let tdNote = document.createElement('td');
    tdNote.innerText = note.note;
    let tdDelete = document.createElement('td');
    tdDelete.innerHTML = '&times';
    tdDelete.classList.add('delete-item');
    tr.appendChild(tdTitle);
    tr.appendChild(tdNote);
    tr.appendChild(tdDelete);
    noteTable.appendChild(tr);
    getDeleteButtons();
    localStorage.setItem('notes', JSON.stringify(noteList));
  })
}
function getDeleteButtons(){
  noteDeleteButtons = Array.from(document.querySelectorAll('.delete-item'))
  noteDeleteButtons.forEach(button =>{
    let noteTitle = button.previousSibling.previousSibling.innerText;
    button.addEventListener('click', () => {
      deleteNote(noteTitle);
    })
  })
}
function deleteNote(noteTitle){
    for(let i = 0; i < noteList.length; i++) {
      if(noteList[i].title == noteTitle){
        noteList.splice(i, 1);
      }
    }
    localStorage.setItem('notes', JSON.stringify(noteList))
    appendNotes()
}
