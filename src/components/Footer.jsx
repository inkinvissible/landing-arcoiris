"use client"
import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {Instagram, MapPin, Phone, Mail, ChevronRight, Globe, Building, RotateCcw} from 'lucide-react';
import useSmoothScroll from "@/hooks/useSmoothScroll";

export default function Footer() {
    const {scrollToElement} = useSmoothScroll();

    const footerVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.8, staggerChildren: 0.1}
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 10},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
    };

    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: "-100px"}}
            variants={footerVariants}
            className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Footer principal con logo y columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                    {/* Columna del logo y descripción */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-4">
                        <Link href="/" className="inline-block mb-5">
                            <Image
                                src="/images/logo-principal.png"
                                alt="Logo"
                                width={150}
                                height={60}
                                className="bg-white dark:bg-gray-800 rounded-lg p-2"
                            />
                        </Link>
                        <div className="flex items-start mb-3">
                            <Building className="mr-3 text-[#6645AF] flex-shrink-0 mt-1" size={18}/>
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Arcoiris Travel E.V.T leg 10739</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Tu agencia de viajes de confianza, creando experiencias inolvidables desde 2005.
                            Especialistas en viajes a medida y destinos exclusivos.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.instagram.com/travelarcoiris/?hl=es-la"
                                  className="p-2 bg-white dark:bg-gray-800 rounded-full text-[#6645AF] hover:bg-[#6645AF] hover:text-white dark:hover:bg-[#6645AF] transition-colors duration-300">
                                <Instagram size={20}/>
                            </Link>

                        </div>
                    </motion.div>

                    {/* Destinos populares */}
                    <motion.div variants={itemVariants} className="col-span-1 lg:col-span-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Destinos populares</h3>
                        <ul className="space-y-3">
                            {['Cancún, México', 'París, Francia', 'Tokio, Japón', 'Nueva York, USA', 'Barcelona, España'].map((item, index) => (
                                <li key={index}>
                                    <Link href="https://wa.me/5493541227947"
                                          className="text-gray-600 dark:text-gray-400 hover:text-[#6645AF] dark:hover:text-[#9370DB] transition-colors duration-200 flex items-center">
                                        <ChevronRight size={16} className="mr-2"/>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contacto */}
                    <motion.div variants={itemVariants} className="col-span-1 lg:col-span-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Contáctanos</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="mr-3 text-[#6645AF] flex-shrink-0 mt-1" size={18}/>
                                <span className="text-gray-600 dark:text-gray-400">Dean Fúnes 163, local 7 en galería, Córdoba, Argentina</span>
                            </li>
                            <li className="flex items-start">
                                <Phone className="mr-3 text-[#6645AF] flex-shrink-0 mt-1" size={18}/>
                                <div className="text-gray-600 dark:text-gray-400">
                                    <p>+54 9 3541 227947</p>
                                    <p>+54 9 351 5934919</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Mail className="mr-3 text-[#6645AF] flex-shrink-0 mt-1" size={18}/>
                                <div className="text-gray-600 dark:text-gray-400">
                                    <p>arcoirisviajes.nicolas@gmail.com</p>
                                    <p>guillermo@arcoiristravel.tur.ar</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Mapa */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Ubicación</h3>
                        <div
                            className="w-full h-48 overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.2121302896016!2d-64.18917892428619!3d-31.4118120977587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28e39e132c9%3A0xa7c286e4da4ec1c7!2sDean%20Funes%20163%2C%20X5022%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1716315949362!5m2!1ses!2sar"
                                width="100%"
                                height="100%"
                                style={{border: 0}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter dark:brightness-75 dark:contrast-125 dark:invert-[0.15]"
                                title="Ubicación de Arcoiris Travel"
                            ></iframe>
                        </div>
                        <div className="mt-2 flex items-center justify-center">
                            <Link
                                href="https://maps.app.goo.gl/n9piKMCUCswugmkU7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#6645AF] dark:text-[#9370DB] hover:underline flex items-center"
                            >
                                <Globe size={14} className="mr-1"/>
                                Ver mapa completo
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Línea divisoria */}
                <div
                    className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6"></div>

                {/* Copyright y enlaces legales */}
                <div
                    className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
                    <p>© {currentYear} Arcoíris Travel. Todos los derechos reservados.</p>

                    {/* Botón de Arrepentimiento */}
                    <Link
                        href="https://docs.google.com/forms/d/e/1FAIpQLSexmIdVdZBzTuX6Ir7Wy_NyeH2Ng2QlzQqorrP-IaNv3O_ctQ/viewform?pli=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 md:mt-0 px-4 py-2 bg-white dark:bg-gray-800 border border-[#6645AF] rounded-lg text-[#6645AF] dark:text-[#9370DB] hover:bg-[#6645AF] hover:text-white dark:hover:bg-[#6645AF] transition-all duration-300 flex items-center"
                    >
                        <RotateCcw size={16} className="mr-2"/>
                        Botón de Arrepentimiento
                    </Link>
                </div>

            </div>
        </motion.footer>
    );
}