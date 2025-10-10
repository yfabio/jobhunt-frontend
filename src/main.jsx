import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { JobsProvider } from "./context/JobsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <JobsProvider>
          <App />
        </JobsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
