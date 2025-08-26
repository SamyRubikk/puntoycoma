
import ImagenProduct from "@/components/shared/imagen";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";


interface CartItemProps {
  product: ProductType;
}

const CartItem = ({ product }: CartItemProps) => {

  const {removeItem} = useCart ()

  return (
    <li className="flex py-6 border-b">
      <ImagenProduct product={product}/>
      <div className="flex justify-between flex-1 px-6">
        <div>
            <h2 className="text-lg font-bold">{product.nombre}</h2>
            <p className="font-bold">{formatPrice (product.price)}</p>
            <div className="flex items-center justify-between gap-3">
               <p className="px-2 py-2 text-white bg-black rounded-2xl dark:bg-white dark:text-black w-fit">
                {product.material}
               </p>
                <div className="flex flex-wrap items-center gap-2">
  {product.tecnicas && product.tecnicas.length > 0 ? (
    product.tecnicas.map((t: any, idx: number) => {
      const label = typeof t === "string" ? t : (t?.Nombre ?? t?.name ?? t?.label ?? "Técnica");
      const key   = typeof t === "string" ? t : (t?.id ?? t?.slug ?? idx);
      return (
        <span
          key={key}
          className="px-2 py-0.5 text-xs rounded-full bg-amber-500 text-white dark:bg-white dark:text-black"
        >
          {label}
        </span>
      );
    })
  ) : (
    <span className="text-xs text-neutral-500">Sin técnicas</span>
  )}
</div>
            <div>
                <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition")}>
                    <X size={20} onClick={() => removeItem(product.id)} />
                </button>
            </div>
            </div>
        </div>
      </div>
    </li>
  );
};


export default CartItem;
