'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Asegúrate que esta ruta sea correcta
import { Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import useSmoothScroll from "@/hooks/useSmoothScroll";

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '#destino', label: 'Destino' },
    { href: '#galeria', label: 'Galería' },
    { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
    { href: '#novedades', label: 'Novedades' },
    { href: '#ofertas', label: 'Ofertas' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollToElement } = useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Opcional: Cierra el menú móvil si la pantalla se agranda
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const headerVariants = {
        transparent: {
            backgroundColor: 'rgba(0,0,0,0)', // Totalmente transparente
            boxShadow: 'none',
        },
        solid: {
            // Usamos variables CSS para que Tailwind maneje el modo oscuro
            backgroundColor: 'var(--header-bg-color, rgba(255, 255, 255, 1))',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
    };

    // Clases dinámicas para texto y logo
    const logoTextClass = isScrolled
        ? 'text-black dark:text-white'
        : 'text-white'; // Asume que el fondo transparente inicial es oscuro o tiene contraste

    const navLinkTextClass = isScrolled
        ? 'text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white'
        : 'text-white hover:text-gray-300';

    // Clases dinámicas para el botón de contacto
    const contactButtonVariant = isScrolled ? 'default' : 'glass';
    const contactButtonClasses = isScrolled
        ? 'transition-colors duration-300'
        : 'border-white text-white hover:bg-white hover:text-black dark:hover:bg-white/10 dark:hover:text-white transition-colors duration-300';
    const logoVariant = isScrolled ? "/images/logo-principal.png" : '/images/logo-blanco.png';

    return (
        <>
            <style>{`
        :root {
          --header-bg-color: rgba(255, 255, 255, 1);
        }
        .dark {
          --header-bg-color: rgba(17, 24, 39, 1); /* bg-gray-900 */
        }
      `}</style>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 lg:px-8"
                initial="transparent"
                animate={isScrolled ? 'solid' : 'transparent'}
                variants={headerVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <Link href="/" className={`text-2xl font-bold transition-colors duration-300 ${logoTextClass}`}>
                            <Image
                                src={logoVariant}
                                alt="Logo de Arcoiris Viajes"
                                width={220}
                                height={58}
                                quality={100}
                            >
                            </Image>
                        </Link>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-medium transition-colors duration-300 ${navLinkTextClass}`}
                                onClick={(e) => scrollToElement(e, link.href)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Contact Button - Desktop */}
                    <div className="hidden md:block">
                        <Button
                            variant={contactButtonVariant}
                            className={contactButtonClasses}
                        >
                            <Phone />  Contacto
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-md focus:outline-none transition-colors duration-300 ${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}
                            aria-label="Abrir menú"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="fixed top-[60px] left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-900 shadow-lg p-4"
                        // Ajusta top-[60px] según la altura de tu header
                    >
                        <nav className="flex flex-col space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white py-2 text-sm font-medium"
                                    onClick={(e) => {
                                        scrollToElement(e, link.href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button
                                variant="default" // O el que prefieras para el menú móvil
                                className="w-full mt-3"
                                onClick={() => setIsMobileMenuOpen(false)} // Cierra el menú al hacer clic
                            >
                                Contacto
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}