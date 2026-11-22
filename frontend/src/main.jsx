import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "./app/providers/app-providers.jsx";
import { App } from "./app/app.jsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  );
}
