// This allows TypeScript to recognize CSS imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// If you plan on using images later, it's good to add these too
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";