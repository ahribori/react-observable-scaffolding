import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ping, PingState } from "./store/ping";
import { RootState } from "./store";

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
    </div>
  );
};

export default App;
