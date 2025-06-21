'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import useSmoothScroll from "@/hooks/useSmoothScroll";

const heroImageUrls = [
    '/images/hero-img-5.png',
    '/images/hero-img-2.jpg',
    '/images/hero-img-3.jpg',
    '/images/hero-img-4.jpg',
    '/images/hero-img-1.jpg',
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const { scrollToElement } = useSmoothScroll();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * heroImageUrls.length);
        setCurrentImageIndex(randomIndex);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                setIsInitialLoad(false);

                const interval = setInterval(() => {
                    setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImageUrls.length);
                }, 8000);

                return () => clearInterval(interval);
            }, 8000);

            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    useEffect(() => {
        if (heroImageUrls.length > 1 && !isInitialLoad) {
            const nextIndex = (currentImageIndex + 1) % heroImageUrls.length;
            const nextImageUrl = heroImageUrls[nextIndex];

            const img = new window.Image();
            img.src = nextImageUrl;
        }
    }, [currentImageIndex, isInitialLoad]);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const imageVariants = {
        initial: { opacity: 0, scale: 1.05 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 2, ease: [0.42, 0, 0.58, 1] },
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            transition: { duration: 2, ease: [0.42, 0, 0.58, 1] },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: custom * 0.2,
                ease: [0.24, 0.6, 0.32, 0.9],
            },
        }),
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-white">
            {/* Contenedor de la imagen y el overlay */}
            <div className="absolute inset-0 z-0 bg-black"> {/* Añadido bg-black como fallback */}
                {isLoading && <Skeleton className="h-full w-full" />}

                {/* --- ¡ARREGLO PRINCIPAL! Se ha quitado `mode="wait"` --- */}
                {/* Esto permite que la nueva imagen entre MIENTRAS la vieja sale (cross-fade) */}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0"
                        variants={imageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <Image
                            src={heroImageUrls[currentImageIndex]}
                            alt="Paisaje inspirador de fondo para la sección principal"
                            fill
                            quality={85}
                            priority={true}
                            onLoad={handleImageLoad}
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Overlay oscuro */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75 dark:from-black/60 dark:via-black/70 dark:to-black/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1 } }}
                />
            </div>

            {/* Contenido Principal del Hero */}
            <motion.div
                className="relative z-10 mx-auto flex max-w-2xl lg:max-w-3xl flex-col items-center p-4 sm:p-6 md:p-8"
                initial="hidden"
                animate={!isLoading ? 'visible' : 'hidden'}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.2 } },
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
                    Explora destinos increíbles, encuentra ofertas exclusivas y planifica el viaje de tus sueños con
                    nosotros. La aventura te espera.
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
                        className="group border-none bg-white/20 backdrop-blur-md hover:bg-white/30"
                        onClick={() => scrollToElement('explorar')}
                    >
                        <Link href="#explorar">
                            Explorar destinos{' '}
                            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="glass"
                        className="group border-none bg-white/10 backdrop-blur-md hover:bg-white/20"
                        onClick={() => scrollToElement('contact')}
                    >
                        <Link href="#contact">
                            Contáctanos{' '}
                            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}