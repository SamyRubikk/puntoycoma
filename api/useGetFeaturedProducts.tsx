import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";

type ImgFlat = { url?: string } & Record<string, any>;

/** Normaliza el campo images: si viene como array plano [{url}], lo convierte a {data:[{attributes:{url}}]} */
function normalizeImages(images: any): ProductType["images"] {
  if (Array.isArray(images)) {
    return {
      data: images.map((img: ImgFlat) => ({
        attributes: { url: img?.url },
      })),
    };
  }
  // si ya viene en forma {data:[{attributes:{url}}]} o null/undefined, lo regresamos tal cual
  return images;
}

export function useGetFeaturedProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;

  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        const json = await res.json();

        // Strapi v4/v5: a veces viene { data:[...] }
        const raw = Array.isArray(json) ? json : json?.data ?? [];

        // 🔽 APLANAR: { id, ...attributes } y normalizar images
        const normalized: ProductType[] = raw.map((item: any) => {
          const base = item.attributes ?? item;
          const id = item.id ?? base.id;
          return {
            id,
            ...base,
            images: normalizeImages(base.images),
          } as ProductType;
        });

        setResult(normalized);
      } catch (err: any) {
        setError(err?.message ?? "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { result, loading, error };
}
