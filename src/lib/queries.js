export const novedadesQuery = `
*[_type == "novedad"] | order(_createdAt desc){
  _id,
  title,
  description,
  "imageUrl": image.asset->url,
  altText,
  _createdAt,
}
`

export const ofertasQuery = `
*[_type == "oferta"] | order(_createdAt desc){
  _id,
  title,
  description,
  "imageUrl": image.asset->url,
  altText,
  href,
  lastMinute
}
`
