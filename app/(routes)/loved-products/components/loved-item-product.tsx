import ImagenProduct from "@/components/shared/imagen";
import ProductMaterial from "@/components/shared/product-material";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/used-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LovedItemProductProps {
    product: ProductType
}

// helpers


const LovedItemProduct = ({ product }: { product: any }) => {
  const { removeLovedItem, addLoveItem } = UseLovedProducts();
  const {addItem} = useCart ()


  
  
   const addToCheckout = () => {
         // ya la tienes arriba
  

  addItem({
    id: product.id,
    slug: product.slug ?? product.attributes?.slug,
    nombre: product.nombre ?? product.attributes?.nombre,
    price: product.price ?? product.attributes?.price ?? 0,             // ← plano y estable
  });

  removeLovedItem(product.id);
};


  return (
    <li className="flex py-6 border-b">
      <ImagenProduct product={product}/>
      <div className="flex justify-between flex-1 px-6">
            <div>
                <h2 className="text-lg font-bold">{product.nombre}</h2>
                <p className="font-bold">{formatPrice(product.price)}</p>
                <ProductMaterial marca={product.marca} material={product.material}/>
                <Button className="mt-5 rounded-full" onClick={addToCheckout}>Añadir al carrito</Button>
            </div>
            <div>
                <button className={cn("rounded-full flex items-center justify-center bg-white border sahdow-md p-1 hover:scale-110 transition")}>
                   <X size={20} onClick={() => removeLovedItem (product.id)} />
                </button>
          </div>
      </div>
    </li>
  );
};



export default LovedItemProduct;