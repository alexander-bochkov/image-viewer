import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "App";

const rootEl = document.createElement("image-viewer-root");

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

document.querySelector("body")?.appendChild(rootEl);
