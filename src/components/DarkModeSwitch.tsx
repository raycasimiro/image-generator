import { Switch } from "@headlessui/react";
import { Moon, Sun } from "lucide-react";

type DarkModeSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function DarkModeSwitch({ checked, onChange }: DarkModeSwitchProps) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className="group relative h-10 w-16 rounded-full bg-neutral-300 transition data-checked:bg-neutral-800"
    >
      <span
        aria-hidden
        className="absolute top-1 left-1 size-8 rounded-full bg-white transition group-data-checked:translate-x-6"
      />
      <Sun
        aria-hidden
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-700 transition group-data-checked:opacity-0"
      />
      <Moon
        aria-hidden
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-700 opacity-0 transition group-data-checked:opacity-100"
      />
    </Switch>
  );
}
