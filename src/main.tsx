import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import WithMockServer from "./mocks/WithMockServer.tsx";
import "./index.css";
import setupLocatorUI from "@locator/runtime";

if (
  import.meta.env.VITE_APP_ENV === "development" &&
  import.meta.env.VITE_ENABLE_LOCATOR === "true"
) {
  setupLocatorUI();
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WithMockServer />
    <App />
  </React.StrictMode>,
);
