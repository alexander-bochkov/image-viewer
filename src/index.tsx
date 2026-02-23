import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Viewer from "features/viewer";

import "./global.css";

const rootEl = document.createElement("viewer-root");
document.body.appendChild(rootEl);

createRoot(rootEl).render(
  <StrictMode>
    <Viewer />
  </StrictMode>,
);
