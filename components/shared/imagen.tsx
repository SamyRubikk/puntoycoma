import { useCart } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";


interface CartItemProps {
  product: ProductType;
}

function resolveImageUrl(u?: string) {
  if (!u) return undefined;
  if (/^https?:\/\//i.test(u)) return u;                // absoluta
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${u}`;   // relativa
}



const ImagenProduct = ({product}: CartItemProps) => {
   
    const router = useRouter ()
    const fallback = "https://via.placeholder.com/128x128?text=Sin+imagen";

// 1) si el item ya trae miniatura plana (desde favoritos/detalle)
const fromCart = (product as any).thumbnailUrl as string | undefined;

// 2) si `images` viene como ARREGLO plano (Insomnia shape)
const flatImg = Array.isArray((product as any).images)
  ? (
      (product as any).images.find((m: any) =>
        m?.formats?.thumbnail?.url || m?.formats?.small?.url || m?.formats?.medium?.url || m?.url
      )?.formats?.thumbnail?.url
      ?? (product as any).images.find((m: any) => m?.formats?.small?.url || m?.url)?.formats?.small?.url
      ?? (product as any).images.find((m: any) => m?.url)?.url
    )
  : undefined;

// 3) si `images` viene como { data: [...] } (Strapi clásico)
const dataImg = (product as any).images?.data
  ?.map((d: any) =>
    d?.attributes?.formats?.thumbnail?.url
    || d?.attributes?.formats?.small?.url
    || d?.attributes?.url
  )
  .find(Boolean);

const imgSrc = resolveImageUrl(fromCart ?? flatImg ?? dataImg) ?? fallback;

 return (
        <div className="cursor-pointer" onClick={() => router.push(`/product/${product.slug}`)}>
        <img
  src={imgSrc}
  alt={product.nombre ?? "Product"}
  className="w-24 h-24 sm:w-auto sm:h-32 rounded-md object-cover"
  loading="lazy"
/>
      </div>
    )
}
 export default ImagenProduct;