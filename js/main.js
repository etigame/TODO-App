'use strict'



function onInit() {
    renderTodos()
}

function getTodoStrHTML(todo) {
    return `
    <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
    ${todo.txt}
    <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
    </li>
    `
}

function renderTodos() {

    const todos = getTodosForDisplay()
    
    const strHTMLs = todos.length ?
        todos.map(todo => getTodoStrHTML(todo)).join('') :
        `No ${getFilterByStatus()} todos`

    
    document.querySelector('ul').innerHTML = strHTMLs
    document.querySelector('span.total').innerText = getTotalCount()
    document.querySelector('span.active').innerText = getActiveCount()
}


function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    console.log('Removing:', todoId)
    if (!confirm('Are you sure you want to delete this Todo?')) return
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value
    const elImportance = document.querySelector('[name=importance]')
    const importance = elImportance.value

    if (elTxt.value === '' || elImportance.value === '') {
        alert('You should insert a Todo and its importance')
        return
    }

    addTodo(txt, importance)
    renderTodos()
    elTxt.value = ''
    elImportance.value = ''
}

function onSetFilter(filterBy) {
    console.log('filterBy:', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSort(sortBy) {
    changeSort(sortBy)
    renderTodos()
}


function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderTodos()
}
