let todos = getTodos()

renderTodos(todos)

qs('#add-todo').addEventListener('click', () => {
    const title = qs('#todo-title-input').value

    if (!title) return

    const todos = createTodo(title)
    renderTodos(todos)

    qs('#todo-title-input').value = ''
})


function createTodoElement(todo) {
    const alreadyDone = todo.status === STATUS.DONE

    const li = document.createElement('li')
    li.setAttribute('class', alreadyDone ? 'done' : '')
    li.addEventListener('click', () => {
        location.href = `/todo/?id=${encodeURIComponent(todo.id)}`
    })
    
    const p = document.createElement('p')
    p.innerText = todo.title

    const doneButton = document.createElement('button')
    doneButton.setAttribute('class', 'done-button')
    if (alreadyDone) {
        doneButton.setAttribute('disabled', alreadyDone)
    }
    
    doneButton.addEventListener('click', (e) => {
        e.stopPropagation()
        const newTodos = updateTodo(todo.id, { status: STATUS.DONE })
        renderTodos(newTodos)
    })

    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete-button')
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation()
        const newTodos = removeTodo(todo.id)
        renderTodos(newTodos)
    })

    li.appendChild(p)
    li.appendChild(doneButton)
    li.appendChild(deleteButton)

    return li
}

function renderTodos(todos) {
    const list = qs('#todo-list')
    list.innerHTML = ''

    for (const todo of todos) {
        list.appendChild(createTodoElement(todo))
    }
}