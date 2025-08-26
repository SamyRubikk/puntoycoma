import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/used-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = { product: ProductType };

const toPlainText = (desc?: string | any[]): string => {
  if (!desc) return "";
  if (typeof desc === "string") return desc;
  if (Array.isArray(desc)) {
    // Une cada párrafo; cada bloque puede tener varios children con "text"
    return desc
      .map((block) =>
        Array.isArray(block?.children)
          ? block.children.map((c: any) => c?.text ?? "").join("")
          : ""
      )
      .join("\n\n");
  }
  return "";
};

const InfoProduct = ({ product }: InfoProductProps) => {
  const descripcionPlano = toPlainText(product.descripcion);
  const {addItem} = useCart ()
  const {addLoveItem} = UseLovedProducts ()

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product.nombre}</h1>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          {product.material && (
            <p className="px-2 py-1 text-xs text-white bg-black rounded-2xl dark:bg-white dark:text-black w-fit">
              {product.material}
            </p>
          )}

          {Array.isArray(product.tecnicas) && product.tecnicas.length > 0 ? (
            product.tecnicas.map((t) => (
              <span
                key={t.id}
                className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit"
              >
                {t.Nombre}
              </span>
            ))
          ) : (
            <span className="text-xs text-neutral-500">
              Sin técnicas disponibles
            </span>
          )}
        </div>
      </div>

      <Separator className="my-4" />

      {descripcionPlano ? (
        <p className="whitespace-pre-line">{descripcionPlano}</p>
      ) : (
        <p className="text-sm text-neutral-500">Sin descripción.</p>
      )}
     <Separator className="my-4" />
     <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
     <div className="flex items-center gap-5">
       <Button className="flex-1" onClick ={()=>addItem(product)}>Comprar</Button>
       <Heart width ={30} strokeWidth={1} className="transition duration-300 cursor-pointer hover:fill-black"
       onClick={() => addLoveItem(product)} />
     </div>
    </div>    
  );
};

export default InfoProduct;
