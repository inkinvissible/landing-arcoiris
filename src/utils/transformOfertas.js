// src/utils/transformOfertas.js

export function mapSanityOfertas(rawOfertas) {
    return rawOfertas.map((oferta) => ({
        id: oferta._id,
        imageUrl: oferta.imageUrl,
        title: oferta.title,
        description: oferta.description,
        altText: oferta.altText,
        href: oferta.href,
        lastMinute: oferta.lastMinute || false,
        validUntil: oferta.validUntil || null,
    }));
}