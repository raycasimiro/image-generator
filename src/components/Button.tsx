import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";

type Variant = "primary" | "secondary";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "bg-white text-black hover:bg-gray-50",
};

type ButtonProps = Omit<HeadlessButtonProps, "className"> & {
  variant?: Variant;
  className?: string;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      {...props}
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-md font-medium transition-colors ${variantClasses[variant]} ${className}`}
    />
  );
}
