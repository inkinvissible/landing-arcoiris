
export function mapSanityNovedades(rawNovedades) {
    return rawNovedades.map((novedad, i) => ({
        id: novedad._id, // o podrías usar novedad._id directamente
        imageUrl: novedad.imageUrl,
        title: novedad.title,
        description: novedad.description,
        altText: novedad.altText,
        date: new Date(novedad._createdAt).toLocaleDateString('es-AR'), // o ISO string
    }))
}
