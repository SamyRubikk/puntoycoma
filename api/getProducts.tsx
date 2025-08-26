// api/getProducts.tsx
import { useEffect, useState } from "react";
// importa tu normalizador v5→v4
import { v5DataToV4 } from "@/api/strapi-normalize"; // ajusta ruta real

export function useGetCategories() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url =
    `${base}/api/familias` +
    `?fields[0]=Nombre&fields[1]=slug` +
    `&populate[image][fields][0]=url` +
    `&populate[image][fields][1]=formats`;

  const [result, setResult] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        const raw = json?.data ?? [];

        // 🔁 Normaliza v5 → v4 (importante: usa la clave real 'image')
        const normalized = v5DataToV4(raw, ["image"]);
        setResult(normalized);
      } catch (e: any) {
        setError(String(e?.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { result, loading, error };
}
