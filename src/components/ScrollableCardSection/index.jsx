'use client';

import {useRef, useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Card from './Card';
import {Button} from "@/components/ui/button";
import Link from 'next/link';

export default function ScrollableCardSection({
                                                  sectionTitle,
                                                  sectionSubtitle,
                                                  cardsData = [],
                                                  cardsToShow = 4,
                                                  buttonText,
                                                  showButtons = false
                                              }) {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollability = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1); // -1 for precision
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container && cardsData.length > cardsToShow) {
            checkScrollability();
            container.addEventListener('scroll', checkScrollability);
            window.addEventListener('resize', checkScrollability); // Re-check on resize
        } else {
            setCanScrollLeft(false);
            setCanScrollRight(false);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollability);
            }
            window.removeEventListener('resize', checkScrollability);
        };
    }, [cardsData.length, cardsToShow]);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.75; // Scroll by 75% of visible width
            container.scrollBy({left: direction * scrollAmount, behavior: 'smooth'});
        }
    };

    const showNavigation = cardsData.length > cardsToShow;

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50  dark:bg-gray-900 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 md:mb-10 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        {sectionTitle}
                    </h2>
                    {sectionSubtitle && (
                        <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {sectionSubtitle}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <AnimatePresence>
                        {showNavigation && canScrollLeft && (
                            <motion.button
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 shadow-md transition-colors duration-300 -ml-4 md:-ml-6"
                                onClick={() => scroll(-1)}
                                aria-label="Desplazar a la izquierda"
                            >
                                <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200"/>
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide" // scrollbar-hide es una clase común para ocultar la barra de scroll, puedes necesitar Tailwind CSS Scrollbar Hide plugin o CSS personalizado
                    >
                        {cardsData.map((card, index) => (
                            <Card
                                key={card.id || index} // Es mejor tener un id único para cada card
                                imageUrl={card.imageUrl}
                                title={card.title}
                                description={card.description}
                                descriptionLong={card.descriptionLong}
                                altText={card.altText}
                                showButton={showButtons}
                            />
                        ))}
                    </div>

                    <AnimatePresence>
                        {showNavigation && canScrollRight && (
                            <motion.button
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 20}}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 shadow-md transition-colors duration-300 -mr-4 md:-mr-6"
                                onClick={() => scroll(1)}
                                aria-label="Desplazar a la derecha"
                            >
                                <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200"/>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

            </div>
            <div className="flex justify-center md:mt-4">
                <Button className="text-xl transition-all duration-400 p-6 dark:text-white text-white dark:hover:text-black dark:hover:bg-white/10 bg-gradient-to-r from-[#6645AF] to-[#5038A0] hover:from-[#7655BF] hover:to-[#6148B0] shadow-lg shadow-purple-500/20 dark:shadow-purple-900/30 rounded-xl">
                    <Link href="https://wa.me/5493541227947" className="cursor-pointer">
                        {buttonText}
                    </Link>
                </Button>
            </div>

        </section>
    );
}