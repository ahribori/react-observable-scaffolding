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

const initialState: TodoState = {
  todoItems: []
};

export const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todoItems: [...state.todoItems, action.payload]
      };
    }
    case REMOVE_TODO: {
      return {
        todoItems: state.todoItems.filter(item => item.id !== action.payload.id)
      };
    }
  }
};

export const todoEpic = {};
