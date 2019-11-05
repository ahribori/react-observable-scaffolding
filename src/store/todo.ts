import { combineEpics, Epic } from "redux-observable";
import { createAction, handleActions } from "redux-actions";
import { createRequestEpic } from "./_utils";

/*************************************
 * Typings
 *************************************/
export interface AddTodoParams {
  title: string;
}

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface TodoState {
  todoItems: Todo[];
}

export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof removeTodo>;

/*************************************
 * Action Types
 *************************************/
const FETCH_TODO = "todo/FETCH" as const;
const ADD_TODO = "todo/ADD" as const;
const REMOVE_TODO = "todo/REMOVE" as const;

/*************************************
 * Actions
 *************************************/
export const addTodo = (params: AddTodoParams) =>
  createAction(ADD_TODO)(params);

export const removeTodo = (id: number) => createAction(REMOVE_TODO)({ id });

export const fetchTodo = (id: string) =>
  createAction(FETCH_TODO)({
    url: `https://jsonplaceholder.typicode.com/todos/${id}`
  });

/*************************************
 * Epics
 *************************************/
const fetchTodosEpic: Epic = createRequestEpic(FETCH_TODO, {
  method: "GET"
});

export const todoEpics = combineEpics(fetchTodosEpic);

/*************************************
 * State
 *************************************/
const initialState: TodoState = {
  todoItems: []
};

/*************************************
 * Reducer
 *************************************/
const reducer = {
  [ADD_TODO]: (state: TodoState, action: TodoAction): TodoState => ({
    ...state,
    todoItems: [...state.todoItems, action.payload]
  }),
  [REMOVE_TODO]: (state: TodoState, action: TodoAction): TodoState => ({
    ...state,
    todoItems: state.todoItems.filter(item => item.id !== action.payload.id)
  })
};

export const todoReducer = handleActions(reducer, initialState);
