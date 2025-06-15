"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Maximize2, Filter, Heart, Download } from 'lucide-react';
import Image from 'next/image';
import {galleryImages} from "@/utils/gallery-utils";

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [likedImages, setLikedImages] = useState([]);
    const [isHovering, setIsHovering] = useState(null);
    const controls = useAnimation();
    const galleryRef = useRef(null);

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'destinos', label: 'Destinos' },
        { id: 'experiencias', label: 'Experiencias' },
        { id: 'gastronomia', label: 'Gastronomía' },
        { id: 'alojamiento', label: 'Alojamiento' }
    ];



    // Filtrar imágenes según categoría
    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    // Para navegación en el lightbox
    const getNextImage = () => {
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
    };

    const getPrevImage = () => {
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[prevIndex]);
    };

    const toggleLikeImage = (id) => {
        if (likedImages.includes(id)) {
            setLikedImages(prev => prev.filter(imgId => imgId !== id));
        } else {
            setLikedImages(prev => [...prev, id]);
        }
    };

    // Configuración de animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 }
        }
    };

    useEffect(() => {
        controls.start("visible");
    }, [activeCategory, controls]);

    // Efecto para cerrar lightbox con tecla escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Nuestra Galería
                    </h2>
                    <div className="w-24 h-1 bg-[#6645AF] mx-auto mb-8"></div>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
                        Explora nuestra colección de destinos y experiencias extraordinarias alrededor del mundo
                    </p>
                </motion.div>

                {/* Filtros de categoría */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6645AF]/10 to-transparent dark:via-[#6645AF]/20 blur-xl h-10 opacity-50"></div>
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {categories.map(category => (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                                    activeCategory === category.id
                                        ? 'bg-[#6645AF] text-white shadow-lg shadow-purple-500/20'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                <span className="flex items-center">
                  {category.id === 'all' && <Filter className="w-4 h-4 mr-2" />}
                    {category.label}
                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>

                {/* Galería de imágenes */}
                <motion.div
                    ref={galleryRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image) => (
                            <motion.div
                                layout
                                key={image.id}
                                variants={imageVariants}
                                whileHover="hover"
                                onHoverStart={() => setIsHovering(image.id)}
                                onHoverEnd={() => setIsHovering(null)}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                            >
                                <div className="absolute inset-0 group">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAI/QJ/utyTJAAAAABJRU5ErkJggg=="
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Botones de acción */}
                                    <div className={`absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedImage(image)}
                                            className="p-3 rounded-full bg-white/80 text-[#6645AF] hover:bg-white transition-colors"
                                        >
                                            <Maximize2 size={20} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => toggleLikeImage(image.id)}
                                            className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors"
                                            aria-label="Me gusta"
                                        >
                                            <Heart
                                                size={20}
                                                className={likedImages.includes(image.id) ? "text-red-500 fill-red-500" : "text-gray-700"}
                                            />
                                        </motion.button>
                                    </div>

                                    {/* Título de imagen */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                                        <p className="text-gray-200 text-sm">{image.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Modal de vista ampliada */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 md:p-12"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="relative w-full max-w-5xl h-[70vh] flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Botones de acción */}
                                <div className="absolute top-4 right-4 z-20 flex gap-4">
                                    <button
                                        onClick={() => toggleLikeImage(selectedImage.id)}
                                        className="bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors"
                                    >
                                        <Heart
                                            size={20}
                                            className={likedImages.includes(selectedImage.id) ? "text-red-500 fill-red-500" : "text-white"}
                                        />
                                    </button>
                                    <button onClick={() => setSelectedImage(null)} className="bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors">
                                        <X size={20} className="text-white" />
                                    </button>
                                </div>

                                {/* Imagen */}
                                <div className="relative w-full h-full overflow-hidden rounded-xl">
                                    <Image
                                        src={selectedImage.src}
                                        alt={selectedImage.alt}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        sizes="(max-width: 1200px) 100vw, 1200px"
                                        priority
                                        className="z-10"
                                    />

                                    {/* Overlay de información */}
                                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                        <h3 className="text-white text-xl font-bold">{selectedImage.alt}</h3>
                                        <p className="text-gray-200 mt-1">{selectedImage.description}</p>
                                    </div>

                                    {/* Controles de navegación */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                getPrevImage();
                                            }}
                                            className="bg-white/20 hover:bg-white/40 p-4 rounded-r-lg transition-colors focus:outline-none ml-2"
                                        >
                                            <ArrowLeft size={24} className="text-white" />
                                        </button>
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                getNextImage();
                                            }}
                                            className="bg-white/20 hover:bg-white/40 p-4 rounded-l-lg transition-colors focus:outline-none mr-2"
                                        >
                                            <ArrowRight size={24} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}