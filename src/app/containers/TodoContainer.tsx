import React, { useState } from 'react'
import { useStore } from '../state'
import * as todo from '../state/todo'

const TodoContainer = () => {
  const [value, setValue] = useState('')
  const { state, dispatch } = useStore(todo.NAMESPACE)

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setValue(target.value)

  const handleAddClick = () => {
    if (value !== '') {
      dispatch(todo.addTodo(value))
      setValue('')
    }
  }

  const handleTodoDone = (currentItem: todo.TodoItem) => {
    dispatch(todo.udpateTodo({ ...currentItem, done: !currentItem.done }))
  }
  const handleDeleteClick = (id: string) => {
    dispatch(todo.deleteTodo(id))
  }

  return (
    <div>
      <input type="text" value={value} onChange={handleInputChange} />
      <button onClick={handleAddClick}>추가</button>
      <ul>
        {state.todoItems.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'none', marginRight: '10px' }}
              onClick={() => handleTodoDone(todo)}
            >
              {todo.content}
            </span>
            <span onClick={() => handleDeleteClick(todo.id)}>x</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoContainer
