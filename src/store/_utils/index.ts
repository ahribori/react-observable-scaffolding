export const createAsyncAction = <T>(actionType: string) => {
  const DEFAULT = actionType;
  const PENDING = `${actionType}_PENDING`;
  const SUCCESS = `${actionType}_SUCCESS`;
  const FAILURE = `${actionType}_FAILURE`;
  return {
    DefaultActionType: DEFAULT,
    PendingActionType: PENDING,
    SuccessActionType: SUCCESS,
    FailureActionType: FAILURE
  };
};
