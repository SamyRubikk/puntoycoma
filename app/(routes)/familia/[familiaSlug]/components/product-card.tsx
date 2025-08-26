import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ProductType } from "@/types/product";
import IconButton from "@/components/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";

type FlatImg = {
  id: number;
  url?: string;
  alternativeText?: string | null;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    thumbnail?: { url: string };
  };
};

type RelImg = {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string | null;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  };
};

type ProductCardProps = { product: ProductType | any };

const ProductCard = ({ product }: ProductCardProps) => {
  // Soporta plano y attributes
  const slug =
    product?.slug ?? product?.attributes?.slug;
  const nombre =
    product?.nombre ?? product?.attributes?.Nombre ?? "—";
  const price =
    product?.price ?? product?.attributes?.price ?? "—";    
  const material =
    product?.material ?? product?.attributes?.material ?? "—";  
  const tecnicaImpresion =
    product?.tecnicaImpresion ?? product?.attributes?.tecnicaImpresion ?? "—";
    

  if (!slug) return null;

  // 1) Tomamos posibles fuentes de imágenes
  const relImages: RelImg[] =
    (product?.images?.data ?? product?.attributes?.images?.data ?? []) as RelImg[];

  const flatImages: FlatImg[] =
    Array.isArray(product?.images) ? (product.images as FlatImg[]) : [];

  // 2) Normalizamos a una sola forma { id, url, alt }
  const normalized = (relImages.length > 0 ? relImages : flatImages).map((img: any) => {
    // si viene con attributes
    const a = img?.attributes ?? img;
    const urlPreferred =
      a?.formats?.small?.url ||
      a?.formats?.medium?.url ||
      a?.url ||
      "";

    return {
      id: img.id,
      url: urlPreferred,
      alt: a?.alternativeText ?? material,
    };
  }).filter((x: any) => !!x.url);

  // 3) Armamos la URL absoluta con el backend
  const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "");

  const router = useRouter()
  const {addItem} = useCart ()
  return (
    <Link
      href={`/product/${slug}`}
      className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md"
    >
      <div className="absolute top-4 z-[1] flex items-center justify-between gap-3 px-2">
        <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
          {material}
        </p>
        <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full dark:bg-white dark:text-black w-fit">
          {tecnicaImpresion}
        </p>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {normalized.map((image: any) => (
            <CarouselItem key={image.id} className="group">
              <img
                src={`${BASE}${image.url.startsWith("/") ? image.url : `/${image.url}`}`}
                alt={image.alt}
                className="rounded-xl"
              />
              <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                 <div className="flex justify-center gap-x-6">
                    <IconButton onClick={() => router.push(`/product/${product.attributes.slug}`)} icon={<Expand size={20} className="text-gray-600"/>} />
                    <IconButton onClick={() => addItem(product)} icon={<ShoppingCart size={20} className="text-gray-600"/> } />
                 </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="text-2xl align-text-bottom">{nombre}</p>
      <p className="font-bold text-bottom">{formatPrice(price)}</p>
    </Link>
  );
};

export default ProductCard;
