import { useEffect, useState } from "react";
import { ResultFilterTypes } from "@/types/filters";

export function useGetCategoryProductField() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${base}/api/content-type-builder/content-types/api::product.product`;

  const [result, setResult] = useState<ResultFilterTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        const data = json?.data ?? null; // ← aquí viene el schema
        setResult(data);
      } catch (e: any) {
        setError(String(e?.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { result, loading, error };
}
