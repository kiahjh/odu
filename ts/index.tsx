/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";
import "@fontsource/roboto";
import { GlobalStateContext, setState, state } from "./lib/state/store";
import reducer from "./lib/state/reducers";

render(
  () => (
    <GlobalStateContext.Provider
      value={{
        state,
        dispatch: (action) => {
          reducer(action, setState);
        },
      }}
    >
      <App />
    </GlobalStateContext.Provider>
  ),
  document.getElementById(`root`) as HTMLElement,
);
