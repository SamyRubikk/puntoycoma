// imagen.tsx
import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";

interface ImagenProps {
  product: ProductType;
  imageClassName?: string;      // <- NUEVO
}

function resolveImageUrl(u?: string) {
  if (!u) return undefined;
  const fixed = u.includes(" ") ? u.replace(/ /g, "%20") : u;
  return /^https?:\/\//i.test(fixed)
    ? fixed
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${fixed}`;
}

const ImagenProduct = ({ product, imageClassName }: ImagenProps) => {
  const router = useRouter();
  const fallback = "https://via.placeholder.com/128x128?text=Sin+imagen";

  // 0) miniatura directa (ya lo usabas)
  const fromCart = (product as any).thumbnailUrl as string | undefined;

  // 0.5) NUEVO: URL externa del proveedor
  const external = (() => {
    const ex = (product as any).externalImages as string[] | string | undefined;
    if (!ex) return undefined;
    if (Array.isArray(ex)) return ex.find((s) => typeof s === "string" && s.trim());
    if (typeof ex === "string" && ex.trim()) return ex.trim();
    return undefined;
  })();

  // 1) arreglo plano
  const flatImg = Array.isArray((product as any).images)
    ? (
        (product as any).images.find((m: any) =>
          m?.formats?.thumbnail?.url || m?.formats?.small?.url || m?.formats?.medium?.url || m?.url
        )?.formats?.thumbnail?.url
        ?? (product as any).images.find((m: any) => m?.formats?.small?.url || m?.url)?.formats?.small?.url
        ?? (product as any).images.find((m: any) => m?.url)?.url
      )
    : undefined;

  // 2) { data: [...] } de Strapi
  const dataImg = (product as any).images?.data
    ?.map((d: any) =>
      d?.attributes?.formats?.thumbnail?.url
      || d?.attributes?.formats?.small?.url
      || d?.attributes?.url
    )
    .find(Boolean);

  const imgSrc = resolveImageUrl(fromCart ?? external ?? flatImg ?? dataImg) ?? fallback;

  return (
    <div className="cursor-pointer" onClick={() => router.push(`/product/${product.slug}`)}>
      <img
        src={imgSrc}
        alt={(product as any).nombre ?? "Product"}
        className={imageClassName ?? "w-24 h-24 sm:w-auto sm:h-32 rounded-md object-cover"}
        loading="lazy"
      />
    </div>
  );
};

export default ImagenProduct;
