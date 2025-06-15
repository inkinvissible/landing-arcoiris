"use client"
import {useState, useEffect} from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from "next/link";

export default function About() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Datos de estadísticas
    const stats = [
        { value: '15+', label: 'Años de experiencia' },
        { value: '1200+', label: 'Clientes satisfechos' },
        { value: '98%', label: 'Tasa de satisfacción' },
        { value: '150+', label: 'Destinos cubiertos' },
    ];

    // Datos del equipo
    const teamMembers = [
        {
            name: 'María González',
            role: 'Directora Ejecutiva',
            image: '/images/team/member1.jpg'
        },
        {
            name: 'Carlos Rodríguez',
            role: 'Director de Operaciones',
            image: '/images/team/member2.jpg'
        },
        {
            name: 'Ana Martínez',
            role: 'Asesora de Viajes',
            image: '/images/team/member3.jpg'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const statsVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const statItemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 tracking-tight"
                    >
                        Nuestra Historia
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-24 h-1 bg-[#6645AF] mx-auto mb-8"
                    ></motion.div>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
                    >
                        Transformando sueños en experiencias inolvidables desde 2005
                    </motion.p>
                </motion.div>

                {/* Sección principal sobre nosotros */}
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="flex flex-col lg:flex-row items-center gap-12 mb-24"
                >
                    {/* Imagen principal */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-2/5 relative"
                    >
                        <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/images/sobre-nosotros.png"
                                alt="Nuestra Empresa"
                                layout="fill"
                                objectFit="cover"
                                className="bg-white dark:bg-gray-800"
                            />
                        </div>

                    </motion.div>

                    {/* Contenido de texto */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-3/5"
                    >
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Expertos en Crear Viajes Memorables
                        </h3>
                        <div className="prose prose-lg dark:prose-invert">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Con más de 15 años de experiencia, nuestra empresa se ha consolidado como líder en el sector turístico, ofreciendo experiencias a medida que satisfacen las expectativas más exigentes. Nuestro compromiso con la excelencia y el servicio personalizado nos distingue en un mercado competitivo.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Creemos firmemente que viajar es más que trasladarse de un lugar a otro; es una oportunidad para descubrir, aprender y crecer. Por eso, cada itinerario que diseñamos está pensado para maximizar las experiencias significativas.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Nuestro equipo está formado por asesores apasionados por los viajes, con conocimiento directo de los destinos que recomendamos. Con nosotros, no sólo reservas un viaje, sino que adquieres una experiencia transformadora respaldada por expertos en el sector.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Estadísticas */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={statsVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={statItemVariants}
                            className="text-center p-4"
                        >
                            <h4 className="text-4xl md:text-5xl font-bold text-[#6645AF] mb-2">{stat.value}</h4>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>



                {/* CTA Final */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#6645AF] to-[#432a75] rounded-2xl p-10 text-center text-white"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para comenzar tu próxima aventura?</h3>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">Nuestro equipo de expertos está disponible para ayudarte a diseñar la experiencia de viaje perfecta.</p>
                    <Link href={"https://wa.me/5493541227947"} className={"cursor-pointer"}>
                        <button className="cursor-pointer px-8 py-3 bg-white text-[#6645AF] font-medium rounded-full hover:bg-gray-100 transition-colors">
                            Contacta con nosotros
                        </button>
                    </Link>

                </motion.div>
            </div>
        </section>
    );
}