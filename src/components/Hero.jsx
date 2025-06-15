'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const heroImageUrls = [
    '/images/hero-img-5.png',
    '/images/hero-img-2.jpg',
    '/images/hero-img-3.jpg',
    '/images/hero-img-4.jpg',
    '/images/hero-img-1.jpg',
];

export default function Hero() {
    const [currentHeroImageUrl, setCurrentHeroImageUrl] = useState('');
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Cambio automático de imagen cada 8 segundos
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * heroImageUrls.length);
        setCurrentImageIndex(randomIndex);
        setCurrentHeroImageUrl(heroImageUrls[randomIndex]);
        setIsLoadingImage(true);

        // Intervalo para cambio de imágenes
        const interval = setInterval(() => {
            setIsLoadingImage(true);
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImageUrls.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    // Actualizar la URL cuando cambia el índice
    useEffect(() => {
        setCurrentHeroImageUrl(heroImageUrls[currentImageIndex]);
    }, [currentImageIndex]);

    const handleImageLoad = () => {
        setIsLoadingImage(false);
    };

    // Variantes de animación para los elementos
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: custom * 0.2,
                ease: [0.24, 0.6, 0.32, 0.9] // Curva de animación elegante
            }
        })
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-white">
            {/* Contenedor para la Imagen de Fondo y Superposición */}
            <div className="absolute inset-0 z-0">
                {isLoadingImage && (
                    <Skeleton className="h-full w-full" />
                )}
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.2 }}
                    animate={{
                        scale: 1,
                        transition: { duration: 10, ease: "easeOut" }
                    }}
                >
                    {currentHeroImageUrl && (
                        <Image
                            src={currentHeroImageUrl}
                            alt="Paisaje inspirador de fondo para la sección principal"
                            layout="fill"
                            objectFit="cover"
                            quality={85}
                            priority
                            onLoadingComplete={handleImageLoad}
                            className={`${isLoadingImage ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}
                        />
                    )}
                </motion.div>

                {/* Superposición con degradado para mejor contraste */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75 dark:from-black/60 dark:via-black/70 dark:to-black/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1 } }}
                ></motion.div>

                {/* Partículas de luz sutiles */}
                <div className="absolute inset-0 opacity-30">
                    <div className="stars-container">
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                    </div>
                </div>
            </div>

            {/* Contenido Principal del Hero con animaciones */}
            <motion.div
                className="relative z-10 mx-auto flex max-w-2xl lg:max-w-3xl flex-col items-center p-4 sm:p-6 md:p-8"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
            >
                <motion.h1
                    className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200"
                    variants={fadeInUp}
                    custom={0}
                >
                    ¿Y si nos vamos?
                </motion.h1>

                <motion.p
                    className="mb-6 max-w-xl text-base sm:text-lg md:mb-8 md:text-xl lg:max-w-2xl"
                    variants={fadeInUp}
                    custom={1}
                >
                    Explora destinos increíbles, encuentra ofertas exclusivas y planifica el viaje de tus sueños con nosotros. La aventura te espera.
                </motion.p>

                <motion.div
                    className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
                    variants={fadeInUp}
                    custom={2}
                >
                    <Button
                        asChild
                        size="lg"
                        variant="glass"
                        className="w-full sm:w-auto relative group overflow-hidden"
                    >
                        <Link href="/contacto">
                            <span className="relative z-10">Contacto</span>
                            <motion.span
                                className="absolute inset-0 bg-white/20 rounded-md"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="glass"
                        size="lg"
                        className="w-full sm:w-auto relative group overflow-hidden"
                    >
                        <Link href="/ofertas">
                            <span className="relative z-10">Nuestras Ofertas</span>
                            <motion.span
                                className="absolute inset-0 bg-white/20 rounded-md"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </Link>
                    </Button>
                </motion.div>


            </motion.div>


        </section>
    );
}