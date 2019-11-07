import { Subject } from "rxjs";
import { EventHandler } from "react";

export const useRxFromEvent = <T>(): [Subject<T>, EventHandler<any>] => {
  const subject$ = new Subject<T>();
  const handler: EventHandler<any> = value => {
    if (value.persist) {
      value.persist();
    }
    subject$.next(value);
  };
  return [subject$, handler];
};
