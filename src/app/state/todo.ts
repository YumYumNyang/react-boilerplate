import { timeEnd } from 'console'
import { Update } from 'history'

export interface TodoItem {
  id: string
  content: string
  done: boolean
  dueDate?: Date
}

export interface TodoState {
  todoItems: TodoItem[] | []
}

export const todo: TodoState = { todoItems: [] }

export const NAMESPACE = 'todo'
const ADD = `${NAMESPACE}/ADD`
const DELETE = `${NAMESPACE}/DELETE`
const UPDATE = `${NAMESPACE}/UPDATE`

interface AddActionType {
  type: typeof ADD
  todoItem: TodoItem
}

interface DeleteActionType {
  type: typeof DELETE
  id: string
}

interface UpdateActionType {
  type: typeof UPDATE
  todoItem: TodoItem
}

export type TodoActionTypes = AddActionType | DeleteActionType

export const addTodo = (content: string, dueDate?: Date): TodoActionTypes => ({
  type: ADD,
  todoItem: { id: '1', content: content, dueDate: dueDate ? dueDate : undefined, done: false }
})

export const deleteTodo = (id: string): TodoActionTypes => ({
  type: DELETE,
  id: id
})

export const udpateTodo = ({ id, content, dueDate, done }: TodoItem) => ({
  type: UPDATE,
  todoItem: { id: id, content: content, dueDate: dueDate, done: done }
})

export default function (state: TodoState, action: TodoActionTypes): TodoState {
  const { todoItems } = state

  switch (action.type) {
    case ADD: {
      const addedTodoItems = [...todoItems, (action as AddActionType).todoItem]
      return {
        ...state,
        todoItems: addedTodoItems
      }
    }
    case DELETE: {
      const deletedTodoItems = todoItems.filter(
        (item) => item.id !== (action as DeleteActionType).id
      )
      return {
        ...state,
        todoItems: deletedTodoItems
      }
    }
    case UPDATE: {
      const updatedTodoItems = [
        ...todoItems.filter((item) => item.id === (action as DeleteActionType).id),
        (action as UpdateActionType).todoItem
      ]
      return {
        ...state,
        todoItems: updatedTodoItems
      }
    }
    default: {
      return state
    }
  }
}
