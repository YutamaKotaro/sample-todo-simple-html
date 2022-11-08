function qs(selector) {
    return document.querySelector(selector)
}

const STATUS = {
    TODO: 'todo',
    DONE: 'done'
}

function createTodo(title) {
    const todo = {
        id: `${Date.now()}`,
        title,
        description: '',
        status: STATUS.TODO
    }

    const todos = getTodos()
    todos.push(todo)
    saveTodos(todos)

    return todos
}


const TODO_KEY = 'todos'

function getTodos() {
    const todos = localStorage.getItem(TODO_KEY)

    return todos ? JSON.parse(todos) : []
}

function saveTodos(todos) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos))
}


function getTodoById(id) {
    const todos = getTodos()
    const index = todos.findIndex((el) => id === el.id)

    return {
        todo: todos[index],
        todos,
        index
    }
}


function updateTodo(id, { status, description, title }) {
    const {
        todos,
        index,
        todo,
    } = getTodoById(id)

    todos[index].status = status || todo.status
    todos[index].title  = title || todo.title
    todos[index].description = description || todo.description

    saveTodos(todos)

    return todos
}




function removeTodo(id) {
    const {
        index,
        todos,
    } = getTodoById(id)
    todos.splice(index, 1)

    saveTodos(todos)

    return todos
}




