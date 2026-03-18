export interface Todo {
  id: string
  name: string
  complete: boolean
}

export function Todo({ todo, toggleTodo }:
  { todo: Todo, toggleTodo: (id: string) => void })
{
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
        {todo.name}
      </label>
    </div>
  )
};