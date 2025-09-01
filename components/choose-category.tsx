// components/choose-category.tsx
"use client";
import Link from "next/link";
import { useGetCategories } from "@/api/getProducts";
import { CategoryType } from "@/types/category";

function getMediaUrl(attr?: any): string | null {
  const d = attr?.data;
  if (d?.attributes?.url) return d.attributes.url;                // single
  if (Array.isArray(d) && d[0]?.attributes?.url) return d[0].attributes.url; // multiple
  if (attr?.url) return attr.url; // por si tu normalizador lo deja así
  return null;
}

interface FamiliaV4 {
  id: number;
  attributes: {
    Nombre?: string;
    slug?: string;
    image?: { data: any[] | any | null };
  };
}

const ChooseCategory = () => {
  const { result, loading, error } = useGetCategories();
console.log(result);

  if (loading) return null;
  if (error) return <p className="px-6 py-8 text-red-500">{error}</p>;
  if (!result?.length) return <p className="px-6 py-8">Sin categorías.</p>;

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">Explora nuestros productos</h3>

      <div className="grid gap-5 sm:grid-cols-3">
        {result.map((familia: CategoryType) => {
          const { id, attributes } = familia;
          const name = attributes?.Nombre ?? "Familia";
          const slug = attributes?.slug ?? String(id);

          const imgUrl = getMediaUrl(attributes?.image);

          return (
            <Link
              key={id}
              href={`/familia/${slug}`}
              className="relative max-w-xs mx-auto overflow-hidden rounded-lg"
            >
              <div className="w-full aspect-square overflow-hidden rounded-lg">
                {imgUrl ? (
                  <img
                    src={`${imgUrl}`}
                    alt={name}
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm opacity-60">
                    Sin imagen
                  </div>
                )}
              </div>
              <p className="absolute w-full py-2 text-lg mt-2 px-1 text-center font-bold text-white bottom-5 backdrop-blur-lg">{name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseCategory;
