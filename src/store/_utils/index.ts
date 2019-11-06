import { createAction } from "redux-actions";
import { Epic, ofType } from "redux-observable";
import { AxiosError, AxiosResponse } from "axios";
import { AxiosObservable } from "axios-observable/lib/axios-observable.interface";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Action } from "../index";

export interface AsyncActionTypes {
  START: string;
  SUCCESS: string;
  FAILURE: string;
}

export const createAsyncActionTypes = (
  actionType: string
): AsyncActionTypes => ({
  START: `${actionType}`,
  SUCCESS: `${actionType}_SUCCESS`,
  FAILURE: `${actionType}_FAILURE`
});

export const createAsyncAction = <T>(asyncActionTypes: AsyncActionTypes) => {
  return {
    start: () => createAction(asyncActionTypes.START)(),
    success: (data: T) => createAction(asyncActionTypes.SUCCESS)(data),
    failure: (error: AxiosError) =>
      createAction(asyncActionTypes.FAILURE)(error)
  };
};

export const createRequestAction = <T>(
  actionType: string,
  request: AxiosObservable<T>
) => {
  return createAction(actionType)({
    request
  });
};

export const createRequestEpic = <T>(asyncActionTypes: AsyncActionTypes): Epic => {
  const asyncActions = createAsyncAction<T>(asyncActionTypes);
  return action$ =>
    action$.pipe(
      ofType(asyncActionTypes.START),
      switchMap((action: Action) => {
        const { request } = action.payload;
        if (!request) {
          throw new Error("request instance required!");
        }
        return request.pipe(
          map((response: AxiosResponse) => asyncActions.success(response.data)),
          catchError(err => {
            return of(asyncActions.failure(err))
          })
        );
      })
    );
};
