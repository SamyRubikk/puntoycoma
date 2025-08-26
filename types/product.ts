// types/product.ts
export type ImageAttributes = { url?: string };
export type ImagesField = { data?: Array<{ attributes?: ImageAttributes }> };

export type Tecnica = { id: number; Nombre: string; slug?: string; active?: boolean };

export type ProductType = {
  thumbnailUrl?: string;
  id: number;
  slug: string;
  nombre: string;
  price: number;
  marca?: string;
  material?: string;
  tecnicaImpresion?: string;
  // Rich text (puede ser string o bloques)
  descripcion?: string | Array<{ type: string; children?: Array<{ text?: string }> }>;
  images?: ImagesField;
  tecnicas?: Tecnica[];   // si no siempre viene, márcalo opcional
  // ...otros campos que uses (sku, familia, etc.)
};
