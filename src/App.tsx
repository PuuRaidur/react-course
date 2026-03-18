import { useState, useRef, useEffect } from 'react'
import { TodoList } from './TodoList'
import { Todo } from './Todo'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const todoNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedTodos) setTodos(JSON.parse(storedTodos))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id: string) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    if (todo) todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo() {
    if (!todoNameRef.current) return
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name, complete: false }]
    })
    todoNameRef.current.value = ''
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} Todos left</div>
    </>
  )
}

export default App
