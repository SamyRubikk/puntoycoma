import { useEffect, useState } from "react";

export function useGetProductBySlug(slug: string, techSlug?: string) {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const params = new URLSearchParams();

  // populate explícito (puedes usar "populate=*" si prefieres)
  params.set("populate[0]", "tecnicas");
  params.set("populate[1]", "familia");
  params.set("populate[2]", "images");

  // ✅ filtrar por slug (la KEY es el filtro; el VALUE es el slug)
  params.set("filters[slug][$eq]", slug);

  // opcional: filtrar por técnica usando su slug
  if (techSlug) {
    params.set("filters[tecnicas][slug][$eq]", techSlug);
  }

  const url = `${base}/api/products?${params.toString()}`;

  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        const json = await res.json();
        if (!isMounted) return;
        setResult(Array.isArray(json?.data) ? json.data : []);
      } catch (e: any) {
        if (!isMounted) return;
        setError(String(e?.message || e));
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { result, loading, error };
}
