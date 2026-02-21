import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./global.css";

(() => {
  const bodyEl = document.body;

  if (!bodyEl) return;

  const rootEl = document.createElement("image-viewer-root");
  bodyEl.appendChild(rootEl);

  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();
