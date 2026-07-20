const modules = import.meta.glob("../assets/images/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const CANVAS_IMAGES = Object.values(modules);

export const DEFAULT_CANVAS_IMAGE =
  Object.entries(modules).find(([path]) =>
    path.endsWith("saas-tiles-isometric.png"),
  )?.[1] ?? CANVAS_IMAGES[0];

export const pickRandomImage = (exclude?: string) => {
  const pool = exclude
    ? CANVAS_IMAGES.filter((img) => img !== exclude)
    : CANVAS_IMAGES;
  return pool[Math.floor(Math.random() * pool.length)];
};
