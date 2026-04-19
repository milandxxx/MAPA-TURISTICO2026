export const validateLugar = (data) => {
  if (!data.nombre) return 'Nombre requerido'
  if (data.precio <= 0) return 'Precio inválido'
  if (!data.categoria) return 'Categoría requerida'
  if (!data.lat || !data.lng) return 'Coordenadas requeridas'
  return null
}