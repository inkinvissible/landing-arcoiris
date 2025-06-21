/**
 * Genera un enlace para compartir contenido por WhatsApp
 * @param {Object} options - Opciones de configuración
 * @param {string} options.phone - Número de teléfono sin el signo + (ej: "5491123456789")
 * @param {string} options.title - Título del contenido a compartir
 * @param {string} options.description - Descripción del contenido
 * @param {string} options.validUntil - Fecha límite de validez (opcional)
 * @param {string} options.price - Precio (opcional)
 * @param {string} options.type - Tipo de contenido: "oferta", "paquete", "consulta", etc.
 * @returns {Object} Objeto con el enlace y función para abrir en nueva ventana
 */
export function createWhatsappLink(options) {
    const {
        phone="5493541227947",
        title,
        description,
        validUntil,
        price,
        type = "oferta"
    } = options;

    // Construir mensaje según el tipo
    let message = `👋 ¡Hola! ¿Cómo estás? Me interesa *${title}*\n\n`;

    if (description) {
        message += `📝 Descripción: ${description}\n\n`;
    }

    if (price) {
        message += `💰 Precio: ${price}\n`;
    }

    if (validUntil) {
        const date = new Date(validUntil);
        const formattedDate = date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        message += `⏳ Válido hasta: ${formattedDate}\n`;
    }


    message += `\nQuisiera más detalles sobre esta ${type.toLowerCase()}. ¡Gracias!`;

    // Codificar para URL
    const encodedMessage = encodeURIComponent(message);

    // Crear enlace de WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

    // Función para abrir en nueva ventana
    const openWhatsapp = () => {
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    };

    return {
        url: whatsappLink,
        openWhatsapp
    };
}