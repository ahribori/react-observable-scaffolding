import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchTodo } from "./store/todo";
import { ping } from "./store/ping";

const App: React.FC = () => {
  const isPinging = useSelector<RootState, boolean>(
    state => state.pingReducer.isPinging
  );
  console.log(isPinging);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(ping());
        }}
      >
        PING
      </button>
      <input
        type="text"
        onChange={e => {
          const { value } = e.target;
          if (value.length > 0) {
            dispatch(fetchTodo(value));
          }
        }}
      />
    </div>
  );
};

export default App;
