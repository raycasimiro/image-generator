import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  DARK_PALETTES,
  PASTEL_PALETTES,
  paletteThumbnailBackground,
} from "../lib/backgrounds";

type PalettePickerProps = {
  darkMode: boolean;
  value: number;
  onChange: (index: number) => void;
};

export function PalettePicker({
  darkMode,
  value,
  onChange,
}: PalettePickerProps) {
  const palettes = darkMode ? DARK_PALETTES : PASTEL_PALETTES;
  const current = palettes[value % palettes.length];
  const [rotation, setRotation] = useState(0);

  const handleClick = (i: number) => {
    if (i === value) setRotation((r) => r + 360);
    onChange(i);
  };

  return (
    <Popover className="relative">
      <PopoverButton
        aria-label="Pick palette"
        className="block size-10 rounded-full overflow-hidden bg-white border border-gray-200 cursor-pointer focus:outline-none"
      >
        <div
          className="size-full"
          style={{ background: paletteThumbnailBackground(current, darkMode) }}
        />
      </PopoverButton>
      <PopoverPanel
        anchor="top start"
        className="grid grid-cols-5 gap-2 p-3 bg-white rounded-2xl shadow [--anchor-gap:8px] z-20 focus:outline-none"
      >
        {palettes.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            className={`group relative block size-12 rounded-md overflow-hidden focus:outline-none cursor-pointer ${
              i === value
                ? "shadow-[0_0_0_2px_white,0_0_0_4px_var(--color-primary-500)]"
                : ""
            }`}
          >
            <div
              className="size-full"
              style={{ background: paletteThumbnailBackground(p, darkMode) }}
            />
            {i === value && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition">
                <RefreshCw
                  size={20}
                  className={darkMode ? "text-white" : "text-black"}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: "transform 400ms ease-out",
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
