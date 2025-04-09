import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

function createWrapperandAppendtoBody(wrapperId: string) {
  const element = document.createElement("div");
  element.setAttribute("id", wrapperId);
  document.body.appendChild(element);
  return element;
}

export default function ReactPortal({
  children,
  wrapperId = "react-portal-wrapper",
}: {
  children: React.ReactNode;
  wrapperId?: string;
}) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperandAppendtoBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
}
