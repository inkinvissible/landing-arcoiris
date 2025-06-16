import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Card({ imageUrl, title, description, altText }) {
    return (
        <motion.div
            className="flex-shrink-0 w-64 md:w-72 lg:w-80 rounded-xl overflow-hidden group relative"
            whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300 }
            }}
        >
            {/* Efecto de sombra base y hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-70 blur-md transition-all duration-500 group-hover:duration-200"></div>

            {/* Contenedor principal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-900/40 z-10 h-full flex flex-col">
                {/* Contenedor de la imagen */}
                <div className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden">
                    <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={imageUrl}
                            alt={altText || title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="transition-all duration-700 ease-in-out object-cover"
                        />
                    </motion.div>

                    {/* Overlay con gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Contenido de texto */}
                <motion.div
                    className="p-5 md:p-6 flex-grow flex flex-col"
                    initial={{ y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Línea decorativa */}
                    <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mb-4 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                        {description}
                    </p>


                </motion.div>
            </div>
        </motion.div>
    );
}