"use client";

import { useParams } from "next/navigation";
import { useGetProductBySlug } from "@/api/getProductBySlug";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";

export default function Page() {
  // Tipar el parámetro evita el 'undefined'
  const { productSlug } = useParams<{ productSlug: string }>();

  // Si tu ruta es [...productSlug], puedes normalizar así:
  // const raw = useParams().productSlug;
  // const productSlug = Array.isArray(raw) ? raw[0] : raw ?? "";

  const { result, loading, error } = useGetProductBySlug(productSlug);

  console.log(result)

  if (loading) return <SkeletonProduct />;
  if (error) return <p>Error: {error}</p>;
  if (!result.length) return <p>Producto no encontrado.</p>;

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div>
          <CarouselProduct images={result[0].images}/>
        </div>
        <div className="sm:px-12">
            <InfoProduct product={result[0]} />
        </div>
      </div>
    </div>
  )
}
 