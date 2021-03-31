const removeButton = document.querySelector('.removeButton');
const addButton = document.querySelector('.addButton')
const closeModalButton = document.querySelector('.closeModalButton')
const addElementModalBD = document.querySelector('.addElementModalBD');

addElementModalBD.style.display = 'none';
addButton.addEventListener('click', () => {
    addElementModalBD.style.display = 'inherit';
});
closeModalButton.addEventListener('click', () => {
    addElementModalBD.style.display = 'none';
});
addElementModalBD.style.display = 'none';
//THEME SWAP
const flatCheckbox = document.querySelector('#checkbox');
const darkCheckbox = document.querySelector('#checkbox2');
const cornerCheckbox = document.querySelector('#checkbox3');
const flatTheme = localStorage.getItem('flat');
const darkTheme = localStorage.getItem('dark');
const cornerTheme = localStorage.getItem('corner');

if (flatTheme) {
    document.documentElement.setAttribute('data-theme', flatTheme);
    if (flatTheme === 'enabled') {
        flatCheckbox.checked = true;
        document.body.classList.add('flat');
    }
    if (flatTheme === 'disabled') {
        flatCheckbox.checked = false;
        document.body.classList.remove('flat');
    }
}
function switchThemeFlat(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('flat-theme', 'enabled');
        localStorage.setItem('flat', 'enabled');
        document.body.classList.add('flat');
    } else {
        document.documentElement.setAttribute('flat-theme', 'disabled');
        localStorage.setItem('flat', 'disabled');
        document.body.classList.remove('flat');
    }
}
flatCheckbox.addEventListener('change', switchThemeFlat, false);

if (darkTheme) {
    document.documentElement.setAttribute('data-theme', darkTheme);
    if (darkTheme === 'enabled') {
        darkCheckbox.checked = true;
        document.body.classList.add('dark');
    }
    if (darkTheme === 'disabled') {
        darkCheckbox.checked = false;
        document.body.classList.remove('dark');
    }
}
function switchThemeDark(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('dark-theme', 'enabled');
        localStorage.setItem('dark', 'enabled');
        document.body.classList.add('dark');
    } else {
        document.documentElement.setAttribute('dark-theme', 'disabled');
        localStorage.setItem('dark', 'disabled');
        document.body.classList.remove('dark');
    }
}
darkCheckbox.addEventListener('change', switchThemeDark, false);

if (cornerTheme) {
    document.documentElement.setAttribute('data-theme', cornerTheme);
    if (cornerTheme === 'enabled') {
        cornerCheckbox.checked = true;
        document.body.classList.add('corner');
    }
    if (cornerTheme === 'disabled') {
        cornerCheckbox.checked = false;
        document.body.classList.remove('corner');
    }
}
function switchThemeCorner(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('corner-theme', 'enabled');
        localStorage.setItem('corner', 'enabled');
        document.body.classList.toggle('corner');
    } else {
        document.documentElement.setAttribute('corner-theme', 'disabled');
        localStorage.setItem('corner', 'disabled');
        document.body.classList.toggle('corner');
    }
}
cornerCheckbox.addEventListener('change', switchThemeCorner, false);

//DRAGGING

dragElement(document.getElementById('todoWrap'));
dragElement(document.getElementById('weatherWrap'));
dragElement(document.getElementById('calendarWrap'));
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + 'Header')) {
        document.getElementById(elmnt.id + 'Header').onmousedown = dragMouseDown;
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
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//TODO

const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filterTodo');
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"</i>';
    completedButton.classList.add('completeButton');
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"</i>';
    trashButton.classList.add('trashButton');
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = '';
}
function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === 'trashButton') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    if (item.classList[0] === 'completeButton') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'incomplete':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todoItem');
        todoDiv.appendChild(newTodo);
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check" aria-label="Mark item as done"</i>';
        completedButton.classList.add('completeButton');
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash" aria-label="Delete item"</i>';
        trashButton.classList.add('trashButton');
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//WEATHER

const searchbox = document.querySelector('.searchBox');
const api = {
    key: '09af3877d3b2ade5f8cbcb4c2f01902b',
    base: 'https://api.openweathermap.org/data/2.5/',
};
searchbox.addEventListener('keypress', setQuery);
function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
        searchbox.value = '';
    }
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}
function displayResults(weather) {
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;
    let highlow = document.querySelector('.highLow');
    highlow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
const calendarWrap = document.querySelector('#calendarWrap');

removeButton.addEventListener('click', () => {
    calendarWrap.style.display = 'none';
});
