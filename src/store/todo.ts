export interface Todo {
  id: string
  title: string
  done: boolean
}

export interface TodoState {
  todoList: Todo[]
}

const initialState: TodoState = {
  todoList: []
};

const reducer = {};

export const todoReducer = {};
export const todoEpic = {};
