import { applyMiddleware, combineReducers, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";

const rootReducer = combineReducers({});
const rootEpic = combineEpics();

const epicMiddleware = createEpicMiddleware();

export default function configurationStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, logger)
  );
  epicMiddleware.run(rootEpic);
  return store;
}
