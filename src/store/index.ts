import { applyMiddleware, combineReducers, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { TodoAction, todoEpics, todoReducer, TodoState } from "./module/todo";
import { PingAction, pingEpics, pingReducer, PingState } from "./module/ping";

export interface RootState {
  todoReducer: TodoState;
  pingReducer: PingState;
}

export type Action = TodoAction | PingAction;

const rootReducer = combineReducers({
  todoReducer,
  pingReducer
});

const rootEpic = combineEpics(todoEpics, pingEpics);

const epicMiddleware = createEpicMiddleware();

export default function configurationStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, logger)
  );
  epicMiddleware.run(rootEpic);
  return store;
}
