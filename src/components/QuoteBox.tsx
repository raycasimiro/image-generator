import {
  useEffect,
  useRef,
  type ClipboardEvent,
  type FocusEvent,
  type RefObject,
} from "react";
import noiseSvg from "../assets/noise.svg";
import {
  ATTRIBUTION_PLACEHOLDER,
  CONTEXT_PLACEHOLDER,
  QUOTE_PLACEHOLDER,
} from "../constants/placeholders";
import { SubbleLogo } from "./SubbleLogo";

type QuoteBoxProps = {
  ref?: RefObject<HTMLDivElement | null>;
  darkMode: boolean;
  bgUrl: string;
  canvasImage: string;
  imageHeight: number;
};

export function QuoteBox({
  ref,
  darkMode,
  bgUrl,
  canvasImage,
  imageHeight,
}: QuoteBoxProps) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
  const contextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (quoteRef.current) quoteRef.current.innerHTML = QUOTE_PLACEHOLDER;
    if (attributionRef.current)
      attributionRef.current.textContent = ATTRIBUTION_PLACEHOLDER;
    if (contextRef.current)
      contextRef.current.textContent = CONTEXT_PLACEHOLDER;
  }, []);

  const handlePaste = (e: ClipboardEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleBlur = (e: FocusEvent<HTMLParagraphElement>) => {
    const el = e.currentTarget;
    if (el.textContent?.trim() !== "") return;
    if (el === quoteRef.current) el.innerHTML = QUOTE_PLACEHOLDER;
    else if (el === attributionRef.current)
      el.textContent = ATTRIBUTION_PLACEHOLDER;
    else if (el === contextRef.current) el.textContent = CONTEXT_PLACEHOLDER;
  };

  return (
    <div
      ref={ref}
      className={`relative size-[600px] p-14 flex flex-col gap-14 overflow-hidden shadow-2xl shadow-slate-300 ${darkMode ? "text-white" : ""}`}
    >
      <img
        src={bgUrl}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!darkMode && (
        <img
          src={noiseSvg}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light pointer-events-none"
        />
      )}
      <img
        src={canvasImage}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute bottom-0 right-0 w-auto pointer-events-none"
        style={{ height: `${imageHeight}px` }}
      />
      <SubbleLogo
        textColor={darkMode ? "#ffffff" : "#141827"}
        className="relative h-8 w-auto self-start"
      />
      <div className="relative flex flex-col gap-14">
        <p
          ref={quoteRef}
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onPaste={handlePaste}
          onBlur={handleBlur}
          className="text-[30px] leading-10 whitespace-pre-wrap wrap-break-word outline-none w-full"
        />
        <div className="flex flex-col">
          <p
            ref={attributionRef}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onPaste={handlePaste}
            onBlur={handleBlur}
            className="text-lg font-bold whitespace-pre-wrap wrap-break-word outline-none w-full"
          />
          <p
            ref={contextRef}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onPaste={handlePaste}
            onBlur={handleBlur}
            className="text-sm whitespace-pre-wrap wrap-break-word outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}
