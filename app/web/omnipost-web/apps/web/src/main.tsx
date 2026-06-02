import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// @ts-ignore
import App from "./App.tsx";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error(
    "[OmniPost] Root element #root not found. Check index.html.",
  );
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
