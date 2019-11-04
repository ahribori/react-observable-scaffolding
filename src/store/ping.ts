import { combineEpics, Epic, ofType } from "redux-observable";
import { catchError, delay, mapTo, switchMap } from "rxjs/operators";
import { of } from "rxjs";

export interface PingState {
  isPinging: boolean;
}

export type PingAction = ReturnType<typeof ping> | ReturnType<typeof pong>;

const PING = "PING" as const;
const PONG = "PONG" as const;

export const ping = () => ({ type: PING });
export const pong = () => ({ type: PONG });

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

export const pingReducer = (
  state: PingState = initialState,
  action: PingAction
) => {
  switch (action.type) {
    case PING: {
      return { isPinging: true };
    }
    case PONG: {
      return { isPinging: false };
    }
    default:
      return state;
  }
};

export const pingEpics = combineEpics(pingEpic);
