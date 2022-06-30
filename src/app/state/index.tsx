import { createContext, Dispatch, useContext, useMemo, useReducer } from 'react'
import todoReducer, { todo, TodoState } from './todo'
interface GlobalState {
  todo: TodoState
}

const globalState: GlobalState = {
  todo: todo
}

const reducer = ({ todo }: GlobalState, action: any) => {
  return {
    todo: todoReducer(todo, action)
  }
}

const defaultValue: [GlobalState, Dispatch<any>] = [
  {
    todo: { todoItems: [] }
  },
  () => {
    console.log('set')
  }
]

const GlobalContext = createContext<[GlobalState, Dispatch<any>]>(defaultValue)

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, globalState)
  const value: [GlobalState, Dispatch<any>] = useMemo(() => [state, dispatch], [state])

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useStore = (target: keyof typeof globalState) => {
  const [globalState, dispatch] = useContext(GlobalContext)

  if (!globalState[target]) {
    throw Error('Not found store module')
  }

  return { state: globalState[target], dispatch: dispatch }
}
