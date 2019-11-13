import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { ping } from "./store/module/ping";
import { debounceTime, filter, map, switchMap, takeUntil } from "rxjs/operators";
import { useRxFromEvent } from "./hook/useRx";
import TodoService from "./service/TodoService";

const App: React.FC = () => {
  const isPinging = useSelector<RootState, boolean>(state => state.pingReducer.isPinging);
  console.log(isPinging);
  const dispatch = useDispatch();

  const [click$, clickEventToSubject] = useRxFromEvent<React.MouseEvent>();
  const [change$, changeEventToSubject] = useRxFromEvent<React.ChangeEvent<HTMLInputElement>>();
  const [mouse$, mouseEventToSubject] = useRxFromEvent<MouseEvent>();

  change$
    .pipe(
      debounceTime(1000),
      switchMap(e => {
        console.log(e.target.value);
        return TodoService.fetchTodo(1);
      })
    )
    .subscribe();

  click$
    .pipe(
      debounceTime(1000),
      switchMap(e => {
        return TodoService.fetchTodo(1);
      })
    )
    .subscribe();

  const up$ = mouse$.pipe(filter(e => e.type === "mouseup"));
  const down$ = mouse$.pipe(filter(e => e.type === "mousedown"));
  const move$ = mouse$.pipe(filter(e => e.type === "mousemove"));
  const drag$ = down$.pipe(switchMap(down => move$.pipe(takeUntil(up$))));

  drag$
    .pipe(
      map(value => {
        console.log(value);
      })
    )
    .subscribe();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(ping());
        }}
      >
        PING
      </button>
      <input type="text" onChange={changeEventToSubject} />
      <button onClick={clickEventToSubject}>서비스</button>
      <div
        style={{ border: "1px solid black", width: 500, height: 500 }}
        onMouseMove={mouseEventToSubject}
        onMouseDown={mouseEventToSubject}
        onMouseUp={mouseEventToSubject}
      >
        Draggable Zone
      </div>
    </div>
  );
};

export default App;
