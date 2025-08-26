import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

 const ItemsMenuMobile = () => {
  return (
<Popover>
    <PopoverTrigger>
        <Menu />
    </PopoverTrigger>
    <PopoverContent>
            <Link href="/contacto" className="block">Contacto</Link>
            <Link href="/categorias" className="block">Categorias</Link>
            <Link href="/podcast"className="block">Café, Ideas y Negocios</Link>
            <Link href="/temporada"className="block">Poductos de Temporada</Link>
            <Link href="/distribuidor"className="block">Se distribuidor</Link>
    </PopoverContent>
</Popover>
  );
}

export default ItemsMenuMobile;