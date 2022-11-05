function qs(selector) {
    return document.querySelector(selector)
}

const STATUS = {
    TODO: 'todo',
    DONE: 'done'
}

function createTodo(title) {
    const todos = getTodos()
    const todo = {
        id: `${Date.now()}`,
        title,
        description: '',
        status: STATUS.TODO
    }

    todos.push(todo)
    saveTodos(todos)

    return todos
}

const TODO_KEY = 'todos'

function getTodos() {
    const todos = localStorage.getItem(TODO_KEY)

    return todos ? JSON.parse(todos) : []
}

function getTodoById(id) {
    const todos = getTodos()
    const index = todos.findIndex((el) => id === el.id)

    return {
        todos,
        todo: todos[index],
        index,
    }
}

function saveTodos(todos) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos))
}

function updateTodo(id, { status, description, title }) {
    const {
        todos,
        todo,
        index,
    } = getTodoById(id)

    todos[index].title = title
    todos[index].status = status || todo.status
    todos[index].description = description || todo.description

    saveTodos(todos)

    return todos
}

function removeTodo(id) {
    const todos = getTodos()
    const deltedTodoIndex = todos.findIndex((el) => el.id === id)
    todos.splice(deltedTodoIndex, 1)

    saveTodos(todos)

    return todos
}




