'use strict'

const STORAGE_KEY = 'todoDB'
var gFilterBy = {
    txt: '',
    status: ''
}
var gTodos

_createTodos()

function getTodosForDisplay() {
    var todos = gTodos

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            (todo.isDone && gFilterBy.status === 'done') ||
            (!todo.isDone && gFilterBy.status === 'active')
        )
    }
    todos = todos.filter(todo => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()))
    return todos
}

function getFilterByStatus() {
    return gFilterBy.status
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt, importance) {
    // const todo = {
    //     id: _makeId(),
    //     txt,
    //     isDone: false
    // }
    // THE SAME
    const todo = _createTodo(txt, importance)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilter(status) {
    gFilterBy.status = status
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function changeSort(sortBy) {
    // can do it shorter with local compare:
    // gSort saves the sort value at the global scope
    // todos.sort((a, b) => {
    //     if (gSort === 'txt') return a.txt.localeCompare(b.txt)
    //     return a[gSort] - b[gSort] 
        
    if (sortBy === 'txt') {
        gTodos.sort((a, b) => {
            const txtA = a.txt.toUpperCase()
            const txtB = b.txt.toUpperCase()

            return txtA - txtB
        })
    }
    
    if (sortBy === 'created') {
        gTodos.sort((a,b) => {
            const createdA = a.createdAt
            const createdB = b.createdAt

            return createdA - createdB
        })
    }
    
    if (sortBy === 'importance') {
        gTodos.sort((a,b) => {
            const importanceA = a.importance
            const importanceB = b.importance

            return importanceA - importanceB
        })
    }

}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    return gTodos.filter(todo => !todo.isDone).length
}


function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || !todos.length) {
        todos = [
            {
                id: 't101',
                txt: 'Learn HTML',
                isDone: true,
                createdAt: Date.now()
            },
            {
                id: 't102',
                txt: 'Master JS',
                isDone: false,
                createdAt: Date.now()
            },
            {
                id: 't103',
                txt: 'Study CSS',
                isDone: false,
                createdAt: Date.now()
            },
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}


function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        importance,
    }
    return todo
}


function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}