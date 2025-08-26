"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageSuccess = () => {
    const router = useRouter ()


    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
                 <div className="flex justify-center sm:min-w-[400px]">
                   <Image
  src="/PuntoYComa.jpg"
  alt="Punto y Coma"
  width={500}
  height={500}
  className="rounded-lg w-[400px] h-auto sm:w-[500px] md:w-[600px]"
/>

 
                 </div>

                 <div>
                    <h1 className="text-3xl">Grcias por comprar!</h1>
                    <p className="my-3">Uno de nuestros agentes de ventas se ponda en contacto contigo para dar seguimiento a tu compra ;)</p>
                    <p className="my-3">Uno de nuestros agentes de ventas se ponda en contacto contigo para dar seguimiento a tu compra ;)</p>
                    <p className="my-3">Tus regalos encantaran a todos!</p>

                    <Button onClick={() => router.push("/")}>Volver a la tienda</Button>
                 </div>
            </div>
            
          
        </div>
    );

}

export default PageSuccess;