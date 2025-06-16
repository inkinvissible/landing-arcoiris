'use client';

export default function useSmoothScroll() {
    const scrollToElement = (e, id) => {
        e.preventDefault();

        // Si es un enlace interno (comienza con #)
        if (id.startsWith('#')) {
            const targetId = id.substring(1); // Elimina el # inicial
            const element = document.getElementById(targetId);

            if (element) {
                // Obtén la altura del header (ajusta 70 según tu header)
                const headerOffset = 70;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };

    return { scrollToElement };
}