import Link from "next/link";
import { buttonVariants } from "./ui/button";


const BannerDiscount = () => {
  return (
    <div className="p-5 sm:p-20 text-center">
      <h2 className="uppercase font-black text-2x1 text-primary">Precios de mayoreo por cantidad de piezas</h2>
      <h3 className="mt-3 font-semibolds">-5% en tu primera compra</h3>
    
      <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
        <Link href="#" className={buttonVariants()}>Comprar</Link>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>Contactar</Link>
      </div>
    </div>
  );
}

export default BannerDiscount;  