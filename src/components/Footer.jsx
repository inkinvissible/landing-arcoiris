"use client"
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import useSmoothScroll from "@/hooks/useSmoothScroll";

export default function Footer() {
    const { scrollToElement } = useSmoothScroll();

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={footerVariants}
            className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Footer principal con logo y columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Columna del logo y descripción */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block mb-5">
                            <Image
                                src="/images/logo-principal.png"
                                alt="Logo"
                                width={150}
                                height={60}
                                className="bg-white dark:bg-gray-800 rounded-lg p-2"
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Tu agencia de viajes de confianza, creando experiencias inolvidables desde 2005. Especialistas en viajes a medida y destinos exclusivos.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.instagram.com/travelarcoiris/?hl=es-la" className="p-2 bg-white dark:bg-gray-800 rounded-full text-[#6645AF] hover:bg-[#6645AF] hover:text-white dark:hover:bg-[#6645AF] transition-colors duration-300">
                                <Instagram size={20} />
                            </Link>

                        </div>
                    </motion.div>


                    {/* Destinos populares */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Destinos populares</h3>
                        <ul className="space-y-3">
                            {['Cancún, México', 'París, Francia', 'Tokio, Japón', 'Nueva York, USA', 'Barcelona, España'].map((item, index) => (
                                <li key={index}>
                                    <Link href="https://wa.me/5493541227947" className="text-gray-600 dark:text-gray-400 hover:text-[#6645AF] dark:hover:text-[#9370DB] transition-colors duration-200 flex items-center">
                                        <ChevronRight size={16} className="mr-2" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contacto */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Contáctanos</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="mr-3 text-[#6645AF] flex-shrink-0 mt-1" size={18} />
                                <span className="text-gray-600 dark:text-gray-400">Av. Principal 1234, Ciudad, País</span>
                            </li>
                            <li className="flex items-start">
                                <Phone className="mr-3 text-[#6645AF] flex-shrink-0 mt-1" size={18} />
                                <span className="text-gray-600 dark:text-gray-400">+54 9 3541 227947</span>
                            </li>

                        </ul>
                    </motion.div>
                </div>

                {/* Línea divisoria */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6"></div>

                {/* Copyright y enlaces legales */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
                    <p>© {currentYear} Arcoíris. Todos los derechos reservados.</p>

                </div>
            </div>
        </motion.footer>
    );
}