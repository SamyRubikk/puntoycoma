"use client";
import { useGetTechniques } from "@/api/getTechniques";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type FilterPersonalizacionProps = {
    setFilterOrigin:(orgin:string) => void
}

const FilterPersonalizacion = (props: FilterPersonalizacionProps) => {
  const { setFilterOrigin } = props;
  const { data, loading } = useGetTechniques();
  const router = useRouter();
  const search = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selected = search.get("tech") ?? ""; // slug seleccionado o ""

  const onChange = (value: string) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("tech", value);
    else url.searchParams.delete("tech");
    startTransition(() => router.replace(url.toString(), { scroll: false }));
  };

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Tipos de personalización</p>
      {loading && <p>Cargando…</p>}

      <RadioGroup value={selected} onValueChange={(value) => {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set("tech", value);
  else url.searchParams.delete("tech");
  startTransition(() => router.replace(url.toString(), { scroll: false }));
}}>
        {/* Opción para “todas” */}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="" id="all" />
          <Label htmlFor="all">Todas</Label>
        </div>

        {data.map((t: any) => {
          const slug = t?.attributes?.slug || t?.slug;
          const name = t?.attributes?.Nombre || t?.Nombre || slug;
          return (
            <div key={slug} className="flex items-center space-x-2">
              <RadioGroupItem value={slug} id={slug} />
              <Label htmlFor={slug}>{name}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterPersonalizacion;
