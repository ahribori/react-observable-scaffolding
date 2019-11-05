import { combineEpics, Epic, ofType } from "redux-observable";
import { catchError, delay, mapTo, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { createAction, handleActions } from "redux-actions";

export interface PingState {
  isPinging: boolean;
}

export type PingAction = ReturnType<typeof ping> | ReturnType<typeof pong>;

const PING = "PING" as const;
const PONG = "PONG" as const;

export const ping = () => createAction(PING)();
export const pong = () => createAction(PONG)();

const pingEpic: Epic = $action =>
  $action.pipe(
    ofType(PING),
    switchMap(item => {
      return of(item).pipe(
        delay(1000),
        catchError(() => []),
        mapTo({ type: PONG })
      );
    })
  );

const initialState: PingState = {
  isPinging: false
};

const reducer = {
  [PING]: (state: PingState, action: PingAction): PingState => ({
    ...state,
    isPinging: true
  }),
  [PONG]: (state: PingState, action: PingAction): PingState => ({
    ...state,
    isPinging: false
  })
};

export const pingReducer = handleActions(reducer, initialState);

export const pingEpics = combineEpics(pingEpic);
