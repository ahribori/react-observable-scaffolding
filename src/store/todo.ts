import { combineEpics, Epic, ofType } from "redux-observable";
import { catchError, mapTo, switchMap } from "rxjs/operators";
import { createAction, handleActions } from "redux-actions";
import { request } from "../lib/axios";

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

// Action Types
const FETCH_TODO = "todo/FETCH" as const;
const FETCH_TODO_SUCCESS = "todo/FETCH_SUCCESS" as const;
const ADD_TODO = "todo/ADD" as const;
const REMOVE_TODO = "todo/REMOVE" as const;

// Action
export const addTodo = (params: AddTodoParams) =>
  createAction(ADD_TODO)(params);

export const removeTodo = (id: number) => createAction(REMOVE_TODO)({ id });

export const fetchTodo = createAction(FETCH_TODO);

const fetchTodosEpic: Epic = action$ =>
  action$.pipe(
    ofType(FETCH_TODO),
    switchMap(value =>
      request
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .pipe(catchError(() => []))
    ),
    mapTo({ type: FETCH_TODO_SUCCESS })
  );

const initialState: TodoState = {
  todoItems: []
};

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

export const todoEpics = combineEpics(fetchTodosEpic);
