import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Viewer from "features/viewer";

import "./global.css";

const root = document.createElement("swiftview-root");
document.body.appendChild(root);

const shadowRoot = root.attachShadow({ mode: "closed" });

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("content.css");
shadowRoot.appendChild(link);

createRoot(shadowRoot).render(
  <StrictMode>
    <Viewer />
  </StrictMode>,
);
