import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <>
        <div className="mt-4 text-center">
           <p>Haciendo realidad tus ideas!</p>
           <h4 className="mt-2 text-5xl font-extrabold uppercase">Productos inolvidables</h4>
           <p className="my-2 text-lg">Encanta a tu personal con cada regalo</p>
           <Link href="/" className={buttonVariants()}>Personalizar</Link> 
        </div>
        <div className="aspect-[21/9] bg-[url('/promocional.jpg')] bg-cover bg-center bg-no-repeat  mt-5" />
    </> 
    );
} 

export default BannerProduct;