import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CANVAS_IMAGES } from "../lib/canvasImages";

type ImagePickerProps = {
  value: string;
  onChange: (image: string) => void;
};

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  return (
    <Popover className="relative">
      <PopoverButton
        aria-label="Pick image"
        className="block size-10 rounded-full overflow-hidden bg-white border border-gray-200 cursor-pointer focus:outline-none"
      >
        <img
          src={value}
          alt=""
          aria-hidden
          className="size-full object-cover"
        />
      </PopoverButton>
      <PopoverPanel
        anchor="top start"
        className="flex gap-4 p-4 bg-white rounded-md shadow [--anchor-gap:8px] z-20 focus:outline-none"
      >
        {CANVAS_IMAGES.map((img) => (
          <button
            key={img}
            type="button"
            onClick={() => onChange(img)}
            className={`block w-24 h-16 rounded-sm overflow-hidden focus:outline-none cursor-pointer ${
              img === value
                ? "shadow-[0_0_0_2px_white,0_0_0_4px_var(--color-primary-500)]"
                : ""
            }`}
          >
            <img
              src={img}
              alt=""
              aria-hidden
              className="size-full object-cover"
            />
          </button>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
