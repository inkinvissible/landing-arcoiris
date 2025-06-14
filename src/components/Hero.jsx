'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Asegúrate que la ruta a tu componente Button de shadcn/ui sea correcta

export default function Hero() {
    // Deberás reemplazar esta URL con la ruta a tu imagen.
        // Coloca tu imagen en la carpeta `public`, por ejemplo: `public/images/hero-background.jpg`
    const heroImageUrl = '/images/hero-img-1.png';
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-white">
            {/* Contenedor para la Imagen de Fondo y Superposición */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImageUrl}
                    alt="Paisaje inspirador de fondo para la sección principal" // Cambia el alt text por uno descriptivo de tu imagen
                    layout="fill"
                    objectFit="cover"
                    quality={85} // Ajusta la calidad de la imagen según necesites (1-100)
                    priority // Carga esta imagen con prioridad ya que es crítica para el LCP
                />
                {/* Superposición Oscura */}
                <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
            </div>

            {/* Contenido Principal del Hero */}
            <div className="relative z-10 mx-auto flex max-w-2xl lg:max-w-3xl flex-col items-center p-4 sm:p-6 md:p-8">
                <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
                    ¿Y si nos vamos?
                </h1>
                <p className="mb-6 max-w-xl text-base sm:text-lg md:mb-8 md:text-xl lg:max-w-2xl">
                    Explora destinos increíbles, encuentra ofertas exclusivas y planifica el viaje de tus sueños con nosotros. La aventura te espera.
                </p>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                    <Button asChild size="lg" variant="glass" className="w-full sm:w-auto">
                        <Link href="/contacto">Contacto</Link>
                    </Button>
                    <Button
                        asChild
                        variant="glass"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        <Link href="/ofertas">Nuestras Ofertas</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}