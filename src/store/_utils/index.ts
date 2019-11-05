import { createAction } from "redux-actions";
import { Epic, ofType } from "redux-observable";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Action } from "../index";
import { axios } from "../../lib/axios";

export const createAsyncAction = <T>(actionType: string) => {
  const PENDING = `${actionType}`;
  const SUCCESS = `${actionType}_SUCCESS`;
  const FAILURE = `${actionType}_FAILURE`;
  return {
    PendingActionType: PENDING,
    SuccessActionType: SUCCESS,
    FailureActionType: FAILURE,
    start: () => createAction(PENDING)(),
    success: (data: T) => createAction(SUCCESS)(data),
    failure: (error: AxiosError) => createAction(FAILURE)(error)
  };
};

export const createRequestEpic = <T>(
  type: string,
  requestConfig: AxiosRequestConfig
): Epic => {
  const asyncActions = createAsyncAction<T>(type);
  return action$ =>
    action$.pipe(
      ofType(asyncActions.PendingActionType),
      switchMap((action: Action) => {
        return axios
          .request(Object.assign({}, requestConfig, action.payload))
          .pipe(
            map((response: AxiosResponse) =>
              asyncActions.success(response.data)
            ),
            catchError(err => of(asyncActions.failure(err.response)))
          );
      })
    );
};
