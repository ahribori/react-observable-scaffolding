import { applyMiddleware, combineReducers, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { todoEpics, todoReducer, TodoState } from './todo';
import { pingEpics, pingReducer, PingState } from './ping';

export interface RootState {
  todoReducer: TodoState;
  pingReducer: PingState;
}

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
