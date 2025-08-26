"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


const  Menulist = () => {
  return (
    <NavigationMenu viewport={false} className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Conocenos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Punto y Coma
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                        Taller creativo especializado en hacer realidad tus ideas
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/tiendas-fisicas" title="Tiendas Fisicas">
                Contamos con un showroom completo en Morelia Mich. Visitanos!
              </ListItem>
              <ListItem href="/Grupo-Feervick" title="Grupo Feervick">
                Punto y Coma es parte de Grupo Feervick, un grupo con varios giros comerciales
              </ListItem>
              <ListItem href="/contacto" title="Contacto">
                Cotizaciones, bolsa de trabajo, ventas y mas
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Prodcutos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/podcast">Café, Ideas y Negocios</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos de Temporada</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Regalos para Navidad
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    Regalos para año nuevo
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Regalos de Aniversario Emp
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Menulist;


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Bebidas",
    href: "/familia/bebidas",
    description:
      "Originales y modernos envases para bebidas calientes y frias",
  },
  {
    title: "Electronica",
    href: "/familia/electronica",
    description:
      "Articulos de electronica personalizados con tu marca",
  },
  {
    title: "Agrendas",
    href: "/familia/agendas",
    description:  
      "Agendas innovadoras y personalizables para tus necesidades",
  },
  {
    title: "Texttiles",
    href: "/familia/textiles",
    description: "Playeras, gorras, chamaaras y mas",
  },
  {
    title: "Sets de Regalo",
    href: "/familia/sets-de-regalo",
    description:
      "Paquetes de regalo personalizados para cualquier ocasion",
  },
  {
    title: "Escrituras",
    href: "/familia/escrituras",
    description:
      "Boligrafos de metal, madera y plastico, personalizables",
  },
   {
    title: "Mas categorias",
    href: "/familia",
    description:
      "Todas las categorias de productos que ofrecemos",
  },
]

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

