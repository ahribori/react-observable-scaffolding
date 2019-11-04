import { combineEpics, Epic, ofType } from "redux-observable";
import { delay, mapTo } from "rxjs/operators";

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
const ADD_TODO = "todo/ADD" as const;
const REMOVE_TODO = "todo/REMOVE" as const;

// Action Creator
const addTodo = (params: AddTodoParams) => ({
  type: ADD_TODO,
  payload: {
    ...params
  }
});

const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: {
    id
  }
});

const fetchTodosEpic: Epic = action$ =>
  action$.pipe(
    ofType(FETCH_TODO),
    delay(1000),
    mapTo({ type: "FETCH_DONE" })
  );

const initialState: TodoState = {
  todoItems: []
};

export const todoReducer = (
  state: TodoState = initialState,
  action: TodoAction
) => {
  switch (action.type) {
    case ADD_TODO: {
      return Object.assign({}, state, {
        todoItems: [...state.todoItems, action.payload]
      });
    }
    case REMOVE_TODO: {
      return Object.assign({}, state, {
        todoItems: state.todoItems.filter(item => item.id !== action.payload.id)
      });
    }
    default:
      return state;
  }
};

export const todoEpics = combineEpics(fetchTodosEpic);
