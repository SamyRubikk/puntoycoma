"use client"
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from 'embla-carousel-autoplay';

export const dataCarouselTop = [
	{
		id: 1,
		title: "Seguridad en cada compra",
		description:
			"Todos nuestros productos cuentan con garantía Punto y Coma que protege tu compra y te brinda tranquilidad.",
		link: "#!",
	},
	{
		id: 2,
		title: "Envíos a todo México",
		description:
			"Recibe tus productos en cualquier parte del país con nuestra cobertura nacional.",
		link: "#!",
	},
	{
		id: 3,
		title: "Personalización exclusiva",
		description:
			"Personaliza tus productos con tu marca o diseño favorito.",
		link: "#!",
	},
	{
		id: 4,
		title: "Atención personalizada",
		description:
			"Nuestro equipo te acompaña en cada paso de tu compra.",
		link: "#!",
	},
];

const CarouselTextBanner = () => {
	const router = useRouter();

	return (
		<div className="bg-gray-200 dark:bg-primary">
			<Carousel className="w-full max-w-4xl mx-auto"
            plugins={[
                Autoplay({
                    delay: 2500 //ms
                })
            ]}
            >
            <CarouselContent>
				{dataCarouselTop.map(({ id, title, link, description }) => (
					<CarouselItem
						key={id} onClick={() => router.push(link)} className="h-12 flex items-center justify-center cursor-pointer">
						<div>
                        <Card className="shadow-none border-none bg-transparent">
							<CardContent className="flex flex-col items-center justify-center p-2 text-center dark:text-secondary">
								<p className="font-bold">{title}</p>
								<span className="font-semibold text-xs text-muted-foreground dark:text-secondary">
									{description}
								</span>
							</CardContent>
						</Card>
                        </div>
					</CarouselItem>
				))}
                </CarouselContent>
			</Carousel>
		</div>
	);
};

export default CarouselTextBanner;
