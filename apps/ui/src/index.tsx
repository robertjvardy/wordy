import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { initializeHttp } from "./module/http.ts";
import App from "./App.tsx";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

initializeHttp();
