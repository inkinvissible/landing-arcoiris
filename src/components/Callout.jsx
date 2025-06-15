"use client"
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PhoneIcon, MessageSquareText } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';

export default function Callout({
                                    title = "¿Buscas algo totalmente personalizado?",
                                    description = "Podemos crear el viaje perfecto para vos. Nuestro equipo está listo para diseñar y desarrollar el viaje que siempre soñaste.",
                                    buttonText = "Contáctanos",
                                    href = "https://wa.me/5493541227947",
                                }) {
    const controls = useAnimation();

    useEffect(() => {
        controls.start("visible");
    }, [controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-[#221643] dark:to-gray-900 z-0"></div>

            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6645AF] via-purple-500 to-indigo-600"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40"></div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto"
                >
                    {/* Patrón decorativo */}
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 dark:opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236645AF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            backgroundSize: "24px 24px"
                        }}></div>
                    </div>

                    <div className="relative p-8 md:p-12 lg:p-16">
                        {/* Línea decorativa superior */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6645AF] to-indigo-600"></div>

                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Contenido principal */}
                            <div className="w-full md:w-2/3 text-center md:text-left">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                                >
                                    {title}
                                </motion.h2>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
                                >
                                    {description}
                                </motion.p>

                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link href={href} passHref>
                                        <Button
                                            size="lg"
                                            className="px-8 py-6 text-lg bg-gradient-to-r from-[#6645AF] to-[#5038A0] hover:from-[#7655BF] hover:to-[#6148B0] text-white shadow-lg shadow-purple-500/20 dark:shadow-purple-900/30 transition-all duration-300 rounded-xl"
                                        >
                                            <MessageSquareText className="w-5 h-5 mr-2" />
                                            {buttonText}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Elemento visual decorativo */}
                            <motion.div
                                variants={itemVariants}
                                className="hidden md:block w-1/3"
                            >
                                <div className="relative w-full aspect-square rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 p-1">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 animate-pulse"></div>
                                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
                                    <div className="absolute inset-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PhoneIcon className="w-12 h-12 text-gray-200 dark:text-purple-400" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}