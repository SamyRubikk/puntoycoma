import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type StrapiImageFormat = {
  url: string;
  width?: number;
  height?: number;
};

type StrapiImage = {
  id: number;
  url: string; // Strapi suele traerla al nivel raíz (relativa)
  alternativeText?: string;
  formats?: Record<string, StrapiImageFormat>;
};

interface CarouselProductProps {
  images: StrapiImage[];
}

const CarouselProduct = ({ images }: CarouselProductProps) => {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

  return (
    <div className="sm:px-16">
      <Carousel>
        <CarouselContent>
          {images?.map((image) => {
            // Si Strapi devolviera absoluta, no dupliques el host
            const src = image.url.startsWith("http")
              ? image.url
              : `${base}${image.url}`;

            return (
              <CarouselItem key={image.id}>
                <img
                  src={src}
                  alt={image.alternativeText || "image product"}
                  className="rounded-lg"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;
