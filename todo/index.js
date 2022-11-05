const search = location.search
const splitedQuery = search.split('=')

if (splitedQuery.length !== 2 || !splitedQuery[1]) {
    location.replace('/')
}

const id = splitedQuery[1]
const { todo } = getTodoById(id)

if (!todo) {
    location.replace('/')
}

renderTodoInfo(todo)

qs('#update-button').addEventListener('click', () => {
    updateTodoInfo(id)
    location.href = '/'
})
qs('#delete-button').addEventListener('click', () => {
    removeTodo(id)
    location.replace('/')
})


function renderTodoInfo(todo) {
    const { title, status, description } = todo

    qs('#title').value = title
    qs('#description').value = description

    if (status === STATUS.DONE) qs('#status-done').checked = true
    else qs('#status-todo').checked = true
}

function updateTodoInfo(id) {
    const title = qs('#title').value
    const description = qs('#description').value
    const status = qs('#status-done').checked ? STATUS.DONE : STATUS.TODO
    console.log({title, description, status})
    updateTodo(id, {
        title,
        description,
        status
    })
}







