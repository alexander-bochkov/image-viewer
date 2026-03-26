import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ImageViewer from "features/image-viewer";

import type { Root } from "react-dom/client";
import type { Nullable } from "shared/types";

export class Injector {
  private root: HTMLElement;
  private shadowRoot: ShadowRoot;
  private reactRoot: Nullable<Root> = null;

  constructor() {
    this.root = document.createElement("swiftview-root");
    document.body.appendChild(this.root);

    this.shadowRoot = this.root.attachShadow({ mode: "closed" });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("content.css");
    this.shadowRoot.appendChild(link);

    this.startObserver();
  }

  startObserver() {
    const observer = new MutationObserver(() => {
      if (!document.body.contains(this.root)) {
        this.unmount();
        document.body.appendChild(this.root);
      }
    });

    observer.observe(document.body, { childList: true });
  }

  mount(src: string, onClose: () => void) {
    const handleUnmount = () => {
      onClose();
      this.unmount();
    };

    this.reactRoot = createRoot(this.shadowRoot);
    this.reactRoot.render(
      <StrictMode>
        <ImageViewer onClose={handleUnmount} src={src} />
      </StrictMode>,
    );
  }

  unmount() {
    this.reactRoot?.unmount();
  }
}
