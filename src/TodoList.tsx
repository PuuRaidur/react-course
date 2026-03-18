import { Todo } from './Todo'

export function TodoList({ todos, toggleTodo }:
  { todos: Todo[], toggleTodo: (id: string) => void })
{
  return (
    <>
      {todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
      })}
    </>
  )
};