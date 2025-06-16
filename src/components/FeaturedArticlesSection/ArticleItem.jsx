"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ArticleItem({
                                        imageUrl,
                                        title,
                                        description,
                                        altText,
                                        href = '#',
                                        isFeatured = false,
                                    }) {
    return (
        <div className={`block ${isFeatured ? 'w-full' : 'w-full'}`}>
            <motion.div
                className={`
                    flex flex-col flex-1 relative
                    bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-md dark:shadow-neutral-700/20
                    hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-neutral-600/30
                    transition-all duration-500 overflow-hidden group
                    ${isFeatured
                    ? ''
                    : 'md:flex-row md:h-40 lg:h-36 xl:h-48'
                }
                `}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {/* Borde decorativo */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                {/* Contenedor principal (para elevarlo por encima del borde) */}
                <div className={`
                    relative z-10 flex flex-col flex-1 bg-white dark:bg-gray-800 rounded-xl overflow-hidden
                    ${isFeatured ? '' : 'md:flex-row md:h-40 lg:h-36 xl:h-48'}
                `}>
                    {/* Contenedor de la Imagen */}
                    <div className={`
                        relative shrink-0 overflow-hidden
                        ${isFeatured
                        ? 'w-full h-60 flex-1 min-h-115'
                        : 'w-full h-48 md:w-2/5 md:h-full'
                    }
                    `}>
                        <Image
                            src={imageUrl}
                            alt={altText || title}
                            fill
                            style={{objectFit: "cover"}}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {isFeatured && (
                            <div className="absolute top-4 left-4 bg-purple-500/90 text-white text-xs uppercase tracking-wider py-1 px-2 rounded-md backdrop-blur-sm">
                                Destacado
                            </div>
                        )}
                    </div>

                    {/* Contenedor del Contenido */}
                    <div className={`
                        p-5 flex flex-col relative
                        ${isFeatured
                        ? 'flex-1 justify-start pt-5 md:pt-6'
                        : 'md:w-3/5 justify-center'
                    }
                    `}>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>

                        <h3 className={`
                            font-semibold text-gray-900 dark:text-white mb-2
                            group-hover:text-purple-800 dark:group-hover:text-purple-400 transition-colors
                            ${isFeatured ? 'text-xl md:text-2xl lg:text-3xl' : 'text-lg md:text-xl'}
                        `}>
                            {title}
                        </h3>

                        <p className={`
                            text-sm text-gray-600 dark:text-gray-300 mb-3
                            ${isFeatured ? 'line-clamp-3 sm:line-clamp-4 md:line-clamp-5' : 'line-clamp-2 md:line-clamp-3'}
                        `}>
                            {description}
                        </p>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}