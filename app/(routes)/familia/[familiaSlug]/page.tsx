// page.tsx
"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams, useSearchParams } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState } from "react";

export default function Page() {
  const { familiaSlug } = useParams<{ familiaSlug: string }>();
  const search = useSearchParams();
  const tech = search.get("tech") ?? "";     // si filtras en backend por URL
  const [filterOrigin, setFilterOrigin] = useState(""); // si filtras en cliente

  const { result, loading, error } = useGetCategoryProduct(familiaSlug, tech);

  // --- Normalizador de técnicas (acepta arreglo plano o {data:[]}) ---
  const getTechList = (p: any) => {
    const raw = p?.attributes?.tecnicas;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.data)) return raw.data.map((t: any) => t?.attributes ?? t);
    return [];
  };

  // --- Filtro en cliente (si filterOrigin != "") ---
  const filteredProducts = Array.isArray(result)
    ? result.filter((product: ProductType) => {
        if (!filterOrigin) return true;
        const list = getTechList(product);
        return list.some((t: any) => (t?.slug ?? t?.attributes?.slug) === filterOrigin);
      })
    : [];

  // --- Título seguro ---
  const familyName =
    Array.isArray(result) && result.length > 0
      ? (result[0]?.familia?.Nombre ??
         result[0]?.attributes?.familia?.data?.attributes?.Nombre ??
         "Productos")
      : "Productos";

  if (loading) return <>Cargando…</>;
  if (error) return <>Error: {error}</>;

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-medium">{familyName}</h1>
      <Separator/>

      <div className="sm:flex sm:justify-between font-semibold">
        <FiltersControlsCategory setFilterOrigin={setFilterOrigin} />
      </div>

      <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
        {loading && <SkeletonSchema grid={3} />}
        {!loading &&
          filteredProducts.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts !== null && !loading && filteredProducts.length === 0 && (
            <p>Esta categoria no cuenta con ese tipo de personalizacion </p>
          )}
      </div>
    </div>
  );
}
