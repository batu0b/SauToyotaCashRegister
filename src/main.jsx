import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { worker } from "./mocks/browser.js";
import "./lang/index.js";
import { ThemeContextProvider } from "./context/theme/ThemeContext.jsx";
import axios from "axios";
import { ServerStatusContexProvider } from "./context/server_status/ServerStatusContexProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth/AuthContextProvider.jsx";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
worker.start().then(() =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <ServerStatusContexProvider>
            <App />
          </ServerStatusContexProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  )
);
