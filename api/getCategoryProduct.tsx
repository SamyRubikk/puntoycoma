// getCategoryProduct.tsx
"use client";
import { useEffect, useState } from "react";

export function useGetCategoryProduct(
 slug: string | string[],
  techSlug?: string 
) {
  const safeSlug = Array.isArray(slug) ? slug[0] : slug;
  const base = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const params = new URLSearchParams();

  // populate explícito (mejor que "*")
  params.set("populate[0]", "tecnicas");
  params.set("populate[1]", "familia");
  params.set("populate[2]", "images");
  params.set("filters[familia][slug][$eq]", String(safeSlug));

  // Filtrado en backend (si usas tech por URL)
  if (techSlug) {
    params.set("filters[tecnicas][slug][$eq]", techSlug);
  }

  const url = `${base}/api/products?${params.toString()}`;

  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(Array.isArray(json?.data) ? json.data : []);
      } catch (e: any) {
        setError(String(e?.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { result, loading, error };
}
