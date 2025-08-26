// lib/strapi-normalize.ts
type MediaV5 = { url?: string } & Record<string, any>;

export function v5ItemToV4(item: any, mediaKeys: string[] = []) {
  if (!item) return item;
  const id = item.id ?? item.documentId ?? item?.attributes?.id;

  // si ya viene con attributes (v4), respétalo
  const base = item.attributes ?? (() => {
    const { id: _id, documentId, ...rest } = item;
    return rest;
  })();

  // normaliza medias: array plano -> { data: [{ attributes: { url } }] }
  const attributes: Record<string, any> = { ...base };
  for (const key of mediaKeys) {
    const val = base[key];
    if (Array.isArray(val)) {
      attributes[key] = {
        data: val.map((m: MediaV5) => ({ attributes: { url: m?.url } })),
      };
    } else if (val && typeof val === "object" && "url" in val) {
      attributes[key] = { data: [{ attributes: { url: (val as any).url } }] };
    }
  }

  return { id, attributes };
}

export function v5DataToV4(data: any[], mediaKeys: string[] = []) {
  return (data ?? []).map((it) => v5ItemToV4(it, mediaKeys));
}
