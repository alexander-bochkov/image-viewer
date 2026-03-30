import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ImageViewer from "features/image-viewer";

import type { Root } from "react-dom/client";

export class Injector {
  private root: HTMLElement;
  private shadowRoot: ShadowRoot;
  private reactRoot: Root;

  constructor() {
    this.root = document.createElement("swiftview-root");
    document.body.appendChild(this.root);

    this.shadowRoot = this.root.attachShadow({ mode: "closed" });
    this.linkStylesToShadowRoot();

    this.reactRoot = createRoot(this.shadowRoot);

    this.startObserver();
  }

  private linkStylesToShadowRoot() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    // biome-ignore lint/suspicious/noTsIgnore: TS6 cannot find type from @types/chrome
    // @ts-ignore
    link.href = chrome.runtime.getURL("content.css");
    this.shadowRoot.appendChild(link);
  }

  private startObserver() {
    const observer = new MutationObserver(() => {
      if (!document.body.contains(this.root)) {
        document.body.appendChild(this.root);

        this.unmount();
        this.reactRoot = createRoot(this.shadowRoot);
      }
    });

    observer.observe(document.body, { childList: true });
  }

  mount(src: string, onClose: () => void) {
    const handleClose = () => {
      onClose();

      this.unmount();
      this.reactRoot = createRoot(this.shadowRoot);
    };

    this.reactRoot.render(
      <StrictMode>
        <ImageViewer onClose={handleClose} src={src} />
      </StrictMode>,
    );
  }

  unmount() {
    this.reactRoot?.unmount();
  }
}
