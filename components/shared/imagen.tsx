import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";

interface CartItemProps {
  product: ProductType;
}

// Codifica espacios si vienen en la URL y resuelve relativas vs absolutas
function resolveImageUrl(u?: string) {
  if (!u) return undefined;
  const withSpacesEncoded = u.includes(" ") ? u.replace(/ /g, "%20") : u;
  if (/^https?:\/\//i.test(withSpacesEncoded)) return withSpacesEncoded; // absoluta
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${withSpacesEncoded}`;   // relativa
}

const ImagenProduct = ({ product }: CartItemProps) => {
  const router = useRouter();
  const fallback = "https://via.placeholder.com/128x128?text=Sin+imagen";

  // 0) si el item ya trae miniatura plana (favoritos/detalle)
  const fromCart = (product as any).thumbnailUrl as string | undefined;

  // NEW: 0.5) si viene de proveedor en `externalImages` (string | string[])
  const external = (() => {
    const ex = (product as any).externalImages as string[] | string | undefined;
    if (!ex) return undefined;
    if (Array.isArray(ex)) return ex.find((s) => typeof s === "string" && s.trim());
    if (typeof ex === "string" && ex.trim()) return ex.trim();
    return undefined;
  })();

  // 1) si `images` viene como ARREGLO plano (Insomnia shape)
  const flatImg = Array.isArray((product as any).images)
    ? (
        (product as any).images.find((m: any) =>
          m?.formats?.thumbnail?.url || m?.formats?.small?.url || m?.formats?.medium?.url || m?.url
        )?.formats?.thumbnail?.url
        ?? (product as any).images.find((m: any) => m?.formats?.small?.url || m?.url)?.formats?.small?.url
        ?? (product as any).images.find((m: any) => m?.url)?.url
      )
    : undefined;

  // 2) si `images` viene como { data: [...] } (Strapi clásico)
  const dataImg = (product as any).images?.data
    ?.map((d: any) =>
      d?.attributes?.formats?.thumbnail?.url
      || d?.attributes?.formats?.small?.url
      || d?.attributes?.url
    )
    .find(Boolean);

  // Orden de prioridad: miniatura directa -> URL externa -> imágenes Strapi
  const imgSrc = resolveImageUrl(fromCart ?? external ?? flatImg ?? dataImg) ?? fallback;

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(`/product/${(product as any).slug}`)}
    >
      <img
        src={imgSrc}
        alt={(product as any).nombre ?? (product as any).name ?? "Product"}
        className="w-24 h-24 sm:w-auto sm:h-32 rounded-md object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default ImagenProduct;
