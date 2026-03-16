// Fuente única de datos para todos los lugares turísticos
export const lugares = [
  {
    id: 1,
    nombre: "Centro Histórico",
    tipo: "Zona",
    info: "Hoteles boutique, restaurantes típicos y arquitectura colonial.",
    descripcion: "El corazón cultural de Santa Marta. Calles empedradas, edificios coloniales del siglo XVII y una vibrante vida nocturna rodeada de gastronomía local.",
    coords: [-74.2100, 11.2430],
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Santa_Marta_Centro_Historico.jpg",
    reseña: "Un lugar lleno de historia y cultura imperdible.",
    seguridad: "seguro",
    precio: "$200.000 COP",
    activo: true,
    url: "https://santamarta.gov.co"
  },
  {
    id: 2,
    nombre: "El Rodadero",
    tipo: "Playa",
    info: "Playas populares y hoteles familiares frente al mar.",
    descripcion: "La playa más visitada de Santa Marta. Ideal para familias, con una gran oferta hotelera, deportes acuáticos y restaurantes de mariscos.",
    coords: [-74.2250, 11.2070],
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Rodadero_Santa_Marta.jpg",
    reseña: "La playa más visitada de Santa Marta.",
    seguridad: "seguro",
    precio: "$180.000 COP",
    activo: true,
    url: null
  },
  {
    id: 3,
    nombre: "Taganga",
    tipo: "Bahía",
    info: "Buceo y hospedajes económicos en una bahía pintoresca.",
    descripcion: "Perfecta para mochileros y amantes del buceo. Bahía tranquila con aguas cristalinas, escuelas de buceo y hostales económicos.",
    coords: [-74.1900, 11.2680],
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Taganga_Bay.jpg",
    reseña: "Perfecta para mochileros y buceo.",
    seguridad: "poco-seguro",
    precio: "$100.000 COP",
    activo: true,
    url: null
  },
  {
    id: 4,
    nombre: "Barrio Pescaíto",
    tipo: "Barrio",
    info: "Área tradicional de pescadores, zona local auténtica.",
    descripcion: "Barrio popular y auténtico. No recomendado para turistas solos. Mejor visitarlo con guía local y durante el día.",
    coords: [-74.2130, 11.2510],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Santa_Marta_-_Colombia.jpg/640px-Santa_Marta_-_Colombia.jpg",
    reseña: "Zona local auténtica, visitar con precaución.",
    seguridad: "inseguro",
    precio: "$80.000 COP",
    activo: false,
    url: null
  },
  {
    id: 5,
    nombre: "Quinta de San Pedro Alejandrino",
    tipo: "Museo",
    info: "Museo histórico donde murió Simón Bolívar.",
    descripcion: "Sitio histórico de gran importancia: aquí falleció el Libertador Simón Bolívar en 1830. Jardines botánicos, museo y hacienda colonial perfectamente conservada.",
    coords: [-74.1860, 11.2300],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Quinta_de_San_Pedro_Alejandrino.jpg/640px-Quinta_de_San_Pedro_Alejandrino.jpg",
    reseña: "Imprescindible para los amantes de la historia.",
    seguridad: "seguro",
    precio: "$20.000 COP entrada",
    activo: true,
    url: null
  },
  {
    id: 6,
    nombre: "Parque de los Novios",
    tipo: "Parque",
    info: "Espacio público en el corazón del centro histórico.",
    descripcion: "Plaza principal del centro histórico. Rodeada de restaurantes, bares y cafés. El punto de encuentro favorito de locales y turistas, especialmente en las noches.",
    coords: [-74.2110, 11.2440],
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Parque_de_los_Novios_Santa_Marta.jpg",
    reseña: "Ideal para disfrutar la vida nocturna samaria.",
    seguridad: "seguro",
    precio: "Gratis",
    activo: true,
    url: null
  }
]

export const getLugarById = (id) => lugares.find(l => l.id == id)
