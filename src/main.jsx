// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import "flowbite/dist/flowbite.min.js";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>,
);
