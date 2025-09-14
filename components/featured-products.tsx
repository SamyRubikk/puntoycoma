// featured-products.tsx
"use client";
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import ImagenProduct from "@/components/shared/imagen"; // <- IMPORTA EL COMPONENTE

const FeaturedProducts = () => {
  const { loading, result } = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem } = useCart();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Ofertas</h3>
      <Carousel>
        <CarouselContent className="ml-2 md:ml-4">
          {loading && <SkeletonSchema grid={3} />}

          {result?.map((product: ProductType) => {
            const { id, slug, nombre, tecnicaImpresion } = product;

            return (
              <CarouselItem
                key={id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3 group"
              >
                <div className="p-1">
                  <Card className="py-4 border border-gray-200 shadow-none max-w-[360px] mx-auto">
                    <CardContent className="relative flex items-center justify-center px-6 py-2">
                      <div className="w-full aspect-[4/3] sm:aspect-rectangle overflow-hidden">
                        <ImagenProduct
                          product={product}
                          imageClassName="w-full h-full object-contain"
                        />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`/product/${slug}`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => addItem(product)}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <div className="flex justify-between gap-4 px-8">
                      <h3 className="text-lg font-bold">{nombre}</h3>
                      <div className="flex items-center gap-3">
                        {tecnicaImpresion && (
                          <p className="px-4 py-0.5 text-white bg-black rounded-2xl dark:bg-white dark:text-black w-fit">
                            {tecnicaImpresion}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
