// components/navbar.tsx
"use client";
import Link from "next/link";
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import Menulist from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { UseLovedProducts } from "@/hooks/used-loved-products";

const Navbar = () => {
  const cart = useCart () 
  const router = useRouter ()
  const {lovedItems} = UseLovedProducts ()

  return (
    <header className="
      sticky top-0 z-50
      border-b
      bg-white/80 dark:bg-neutral-950/80
      backdrop-blur supports-[backdrop-filter]:bg-white/60
    ">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-3xl cursor-pointer">
          Punto y <span className="font-bold">Coma</span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <Menulist />
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden">
          <ItemsMenuMobile />
        </div>

        <div className="flex items-center gap-2 sm:gap-7">
        <Link href="/cart" aria-label="Carrito">
          {cart.items.length == 0 ? 
          <ShoppingCart strokeWidth={1} />  : (
             <div className="flex gap-1" onClick={() =>  router.push("/cart")}>
                <BaggageClaim strokeWidth={1} className="cursor-pointer" />
                <span>{cart.items.length}</span>
             </div>
          )}
          
        </Link>
          <Link href="/loved-products" aria-label="Favoritos">
             <Heart strokeWidth={1} className={`cursor-pointer ${lovedItems.length > 0 && 'fill-black dark:fill-white'}`} />
          </Link>
          <User strokeWidth={1} className="cursor-pointer" />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
