"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import useSmoothScroll from '@/hooks/useSmoothScroll';

const navLinks = [
    { href: '#inicio', label: 'Inicio' },
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
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const logoSrc = isScrolled
        ? '/images/logo-principal.png'
        : '/images/logo-blanco.png';

    const headerBgClass = isScrolled
        ? 'bg-white shadow-md dark:bg-gray-900'
        : 'bg-transparent';
    const linkTextClass = isScrolled
        ? 'text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white'
        : 'text-white hover:text-gray-300';

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 lg:px-8 transition-colors duration-300 ${headerBgClass}`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="transition-colors duration-300">
                        <Image
                            src={logoSrc}
                            alt="Logo de Arcoiris Viajes"
                            width={190}
                            height={60}
                            priority
                            className="h-auto w-auto"
                        />
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={(e) => scrollToElement(e, href)}
                                className={`font-medium transition-colors duration-300 ${linkTextClass}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <Button
                            variant={isScrolled ? 'default' : 'glass'}
                            className={`transition-colors duration-300 ${
                                isScrolled
                                    ? ''
                                    : 'border-white text-white hover:bg-white hover:text-black dark:hover:bg-white/10 dark:hover:text-white'
                            }`}
                        >
                            <Phone className="mr-1" /> Contacto
                        </Button>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
                            isScrolled ? 'text-black dark:text-white' : 'text-white'
                        }`}
                        aria-label="Abrir menú"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="fixed top-[70px] left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-900 shadow-lg p-4"
                    >
                        <nav className="flex flex-col space-y-3">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={(e) => {
                                        scrollToElement(e, href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white py-2 text-sm font-medium"
                                >
                                    {label}
                                </Link>
                            ))}
                            <Button
                                variant="default"
                                className="w-full mt-3"
                                onClick={() => setIsMobileMenuOpen(false)}
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