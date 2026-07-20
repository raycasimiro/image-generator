import { ImageUpscale } from "lucide-react";
import type { CSSProperties } from "react";

type ImageSizeSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function ImageSizeSlider({
  value,
  onChange,
  min = 150,
  max = 300,
}: ImageSizeSliderProps) {
  const fillPercent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-1 items-center gap-2 py-3 pl-4 pr-5 bg-white rounded-full">
      <ImageUpscale size={16} className="text-neutral-500" aria-hidden />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Image size"
        style={{ "--fill": `${fillPercent}%` } as CSSProperties}
        className="flex-1 appearance-none bg-transparent focus:outline-none cursor-pointer [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-primary-400)_var(--fill),#e5e7eb_var(--fill))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-primary-400)_var(--fill),#e5e7eb_var(--fill))] [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary-500"
      />
    </div>
  );
}
