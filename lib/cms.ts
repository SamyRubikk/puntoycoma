// lib/cms.ts
export type NavItem = { title: string; href: string; description?: string; iconKey?: string };
const CMS = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

function pickAttr(obj: any, candidates: string[]) {
  for (const k of candidates) {
    if (obj && obj[k] != null) return obj[k];
    const lk = k.toLowerCase();
    if (obj && obj[lk] != null) return obj[lk];
  }
}

async function sfetch<T>(path: string) {
  const url = `${CMS}${path}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`[CMS] ${res.status} ${url}`); // 👈 sin error duro
      return { data: [] } as any as T;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`[CMS] fetch failed ${url}`);     // 👈 sin error duro
    return { data: [] } as any as T;
  }
}

export async function getNavData(): Promise<{ familias: NavItem[]; tecnicas: NavItem[] }> {
  const [fam, tec] = await Promise.all([
    sfetch<{ data: any[] }>(`/api/familias?sort=orden:asc&pagination[pageSize]=100`),
    sfetch<{ data: any[] }>(`/api/tecnica-de-personalizacions?sort=orden:asc&pagination[pageSize]=100`),
  ]);

  const familias = (fam.data ?? [])
    .filter((f) => {
      const v = pickAttr(f.attributes, ["visibleEnMenu"]);
      return v === undefined ? true : !!v;
    })
    .map((f) => {
      const a = f.attributes ?? {};
      return {
        title: pickAttr(a, ["Nombre", "nombre", "name"]) ?? "Familia",
        href: `/familia/${pickAttr(a, ["slug", "Slug"]) ?? ""}`,
        description: pickAttr(a, ["Descripcion", "descripcion", "description"]) ?? "",
        iconKey: pickAttr(a, ["iconKey", "IconKey"]) ?? "",
      };
    });

  const tecnicas = (tec.data ?? [])
    .filter((t) => {
      const v = pickAttr(t.attributes, ["visibleEnMenu"]);
      return v === undefined ? true : !!v;
    })
    .map((t) => {
      const a = t.attributes ?? {};
      return {
        title: pickAttr(a, ["Nombre", "nombre", "name"]) ?? "Técnica",
        href: `/personalizacion/${pickAttr(a, ["slug", "Slug"]) ?? ""}`,
        description: pickAttr(a, ["Descpricion", "Descripcion", "descripcion", "description"]) ?? "",
      };
    });

  console.log(`[nav] familias=${familias.length} tecnicas=${tecnicas.length}`);
  return { familias, tecnicas };
}
