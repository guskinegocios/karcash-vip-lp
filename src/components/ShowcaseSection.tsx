import { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { CarCard } from "./CarCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import fiorinoImg from "@/assets/KARCASH_MODELOS/FIORINO_ENDURANCE/FIORINO_ENDURANCE.jpeg";
import nivusImg from "@/assets/KARCASH_MODELOS/NIVUS_2024/NIVUS_2024.jpeg";
import poloImg from "@/assets/KARCASH_MODELOS/POLO_2024/POLO_2024.jpeg";
import betoneiraImg from "@/assets/KARCASH_MODELOS/VW26.2602023_BETONEIRA/VW26.2602023_BETONEIRA.jpeg";

const cars = [
    {
        name: "Fiorino Endurance",
        year: "2023",
        fipePrice: 84208,
        ourPrice: 54997,
        image: fiorinoImg,
    },
    {
        name: "Nivus Confortline TSI",
        year: "2024",
        fipePrice: 106665,
        ourPrice: 76997,
        image: nivusImg,
    },
    {
        name: "Polo Track 1.0",
        year: "2024",
        fipePrice: 69906,
        ourPrice: 47997,
        image: poloImg,
    },
    {
        name: "VW 26.260 E Const 8x4",
        year: "2023",
        fipePrice: 680000,
        ourPrice: 250997,
        image: betoneiraImg,
    },
];

export const ShowcaseSection = () => {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [api]);

    return (
        <section className="py-16 bg-background relative z-10">
            <div className="container mx-auto px-4 max-w-7xl">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
                            Acesso a <span className="text-primary">Lucro Real</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Veja alguns exemplos reais de carros disponíveis recentemente para nossos membros.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="w-full relative px-2 md:px-0">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {cars.map((car, index) => (
                                <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div className="h-full">
                                        <CarCard {...car} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};
