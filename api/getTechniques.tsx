// /api/getTechniques.tsx
"use client";
import { useEffect, useState } from "react";

export function useGetTechniques() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL!;
    const params = new URLSearchParams();
    params.append("fields[0]", "Nombre");
    params.append("fields[1]", "slug");
    params.append("pagination[pageSize]", "200");
    params.append("filters[active][$eq]", "true"); // opcional

    fetch(`${base}/api/tecnica-de-personalizacions?${params.toString()}`)
      .then(r => r.json())
      .then(j => setData(j?.data ?? []))
      .catch(e => setError(String(e?.message || e)))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
