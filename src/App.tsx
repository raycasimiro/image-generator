import { toPng } from "html-to-image";
import { Download, Shuffle } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FocusEvent,
} from "react";
import { Button } from "./components/Button";
import { DarkModeSwitch } from "./components/DarkModeSwitch";
import { ImagePicker } from "./components/ImagePicker";
import { ImageSizeSlider } from "./components/ImageSizeSlider";
import { PalettePicker } from "./components/PalettePicker";
import { QuoteBox } from "./components/QuoteBox";
import { useClearSelection } from "./hooks/useClearSelection";
import { DARK_PALETTES, PASTEL_PALETTES, generateBg } from "./lib/backgrounds";
import { DEFAULT_CANVAS_IMAGE, pickRandomImage } from "./lib/canvasImages";

const DEFAULT_FILENAME = "Untitled";

function App() {
  const boxRef = useRef<HTMLDivElement>(null);
  const filenameRef = useRef<HTMLSpanElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(() =>
    Math.floor(Math.random() * PASTEL_PALETTES.length),
  );
  const [bgUrl, setBgUrl] = useState(() => generateBg(false, paletteIndex));
  const [canvasImage, setCanvasImage] = useState(DEFAULT_CANVAS_IMAGE);
  const [imageHeight, setImageHeight] = useState(220);

  useClearSelection();

  useEffect(() => {
    if (filenameRef.current) filenameRef.current.textContent = DEFAULT_FILENAME;
  }, []);

  const handleFilenamePaste = (e: ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleFilenameBlur = (e: FocusEvent<HTMLSpanElement>) => {
    if (e.currentTarget.textContent?.trim() === "") {
      e.currentTarget.textContent = DEFAULT_FILENAME;
    }
  };

  const toggleDarkMode = (next: boolean) => {
    setDarkMode(next);
    setBgUrl(generateBg(next, paletteIndex));
  };

  const pickPalette = (index: number) => {
    setPaletteIndex(index);
    setBgUrl(generateBg(darkMode, index));
  };

  const handleRandomise = () => {
    const nextDark = Math.random() < 0.5;
    const palettes = nextDark ? DARK_PALETTES : PASTEL_PALETTES;
    const nextPaletteIndex = Math.floor(Math.random() * palettes.length);
    setDarkMode(nextDark);
    setPaletteIndex(nextPaletteIndex);
    setCanvasImage(pickRandomImage(canvasImage));
    setBgUrl(generateBg(nextDark, nextPaletteIndex));
  };

  const handleDownload = async () => {
    if (!boxRef.current) return;
    await document.fonts.ready;
    const dataUrl = await toPng(boxRef.current, { pixelRatio: 3 });
    const link = document.createElement("a");
    const name = filenameRef.current?.textContent?.trim() || DEFAULT_FILENAME;
    link.download = `${name}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-3 bg-neutral-100">
      <div className="flex items-center justify-between min-w-[600px]">
        <span
          ref={filenameRef}
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          spellCheck={false}
          onPaste={handleFilenamePaste}
          onBlur={handleFilenameBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.blur();
            }
          }}
          className="text-xl font-regular text-neutral-600 outline-none"
        />
        <Button variant="primary" onClick={handleDownload}>
          <Download size={16} aria-hidden />
          Save
        </Button>
      </div>
      <QuoteBox
        ref={boxRef}
        darkMode={darkMode}
        bgUrl={bgUrl}
        canvasImage={canvasImage}
        imageHeight={imageHeight}
      />

      <div className="flex items-center gap-3 z-10 min-w-[600px]">
        <DarkModeSwitch checked={darkMode} onChange={toggleDarkMode} />
        <PalettePicker
          darkMode={darkMode}
          value={paletteIndex}
          onChange={pickPalette}
        />
        <ImagePicker value={canvasImage} onChange={setCanvasImage} />
        <ImageSizeSlider value={imageHeight} onChange={setImageHeight} />
        <Button variant="secondary" onClick={handleRandomise}>
          <Shuffle size={16} aria-hidden />
          Randomise
        </Button>
      </div>
    </section>
  );
}

export default App;
