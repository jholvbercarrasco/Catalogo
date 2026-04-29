/**
 * GUÍA PARA EDITAR TUS PRODUCTOS
 * ------------------------------
 * Este es el archivo central de tu catálogo. Aquí puedes cambiar precios, stock y fotos.
 * 
 * REGLAS IMPORTANTES:
 * 1. No borres las comas (,) ni las llaves ({ }).
 * 2. Los textos deben ir entre comillas " ".
 * 3. Los números (precios) NO llevan comillas.
 * 4. Para que un producto aparezca en OFERTA: 'originalPrice' debe ser mayor que 'price'.
 */

export interface Measurements {
  [size: string]: {
    [label: string]: string;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  measurements?: Measurements;
  originalPrice?: number;
  sku: string;
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Camisa Casual Plus Size",
    description: "Camisa de algodón premium diseñada para brindar comodidad y estilo. Corte amplio que se adapta perfectamente.",
    price: 39.90, // PRECIO ACTUAL (El que paga el cliente)
    originalPrice: 49.90, // PRECIO ANTES (Para mostrar descuento)
    category: "Plus Size",
    subcategory: "Hombre",
    sku: "1001",
    inStock: false, // CAMBIA A 'true' SI TIENES STOCK, 'false' SI ESTÁ AGOTADO
    sizes: ["XL", "XXL", "3XL", "4XL"],
    colors: [
      { name: "Azul Marino", hex: "#1e3a8a" },
      { name: "Blanco", hex: "#ffffff" },
      { name: "Gris", hex: "#6b7280" }
    ],
    measurements: {
      "XL": { "Hombro": "52 cm", "Pecho": "120 cm", "Largo": "78 cm", "Manga": "65 cm" },
      "XXL": { "Hombro": "54 cm", "Pecho": "128 cm", "Largo": "80 cm", "Manga": "66 cm" },
      "3XL": { "Hombro": "56 cm", "Pecho": "136 cm", "Largo": "82 cm", "Manga": "67 cm" },
      "4XL": { "Hombro": "58 cm", "Pecho": "144 cm", "Largo": "84 cm", "Manga": "68 cm" }
    },
    images: [
      "https://picsum.photos/seed/shirt-plus1/800/800",
      "https://picsum.photos/seed/shirt-plus2/800/800"
    ]
  },
  {
    id: "8",
    title: "Pantalón Jean Stretch Plus",
    description: "Jean con tecnología stretch que se adapta a tu cuerpo brindando máxima movilidad. Tiro alto y corte recto.",
    price: 49.90,
    originalPrice: 59.90,
    category: "Plus Size",
    subcategory: "Mujeres",
    sku: "1002",
    inStock: true,
    sizes: ["40", "42", "44", "46"],
    measurements: {
      "40": { "Cintura": "88 cm", "Cadera": "108 cm", "Largo": "102 cm" },
      "42": { "Cintura": "94 cm", "Cadera": "114 cm", "Largo": "103 cm" },
      "44": { "Cintura": "100 cm", "Cadera": "120 cm", "Largo": "104 cm" },
      "46": { "Cintura": "106 cm", "Cadera": "126 cm", "Largo": "105 cm" }
    },
    images: [
      "https://picsum.photos/seed/jean-plus1/800/800",
      "https://picsum.photos/seed/jean-plus2/800/800"
    ]
  },
  {
    id: "9",
    title: "Polo Box Básico Algodón",
    description: "Polo tipo box en algodón pima. Fresco, duradero y con un ajuste perfecto para el día a día.",
    price: 35.00,
    category: "Plus Size",
    subcategory: "Hombre",
    sku: "1003",
    inStock: true,
    sizes: ["XL", "XXL", "3XL"],
    measurements: {
      "XL": { "Pecho": "118 cm", "Largo": "76 cm" },
      "XXL": { "Pecho": "126 cm", "Largo": "78 cm" },
      "3XL": { "Pecho": "134 cm", "Largo": "80 cm" }
    },
    images: [
      "https://picsum.photos/seed/polo-box1/800/800",
      "https://picsum.photos/seed/polo-box2/800/800"
    ]
  },
  {
    id: "10",
    title: "Vestido Midi Estampado",
    description: "Vestido corte midi con estampado exclusivo. Ideal para salidas casuales o reuniones de tarde.",
    price: 55.90,
    originalPrice: 69.90,
    category: "Vestidos",
    sku: "1004",
    inStock: true,
    sizes: ["M", "L", "XL"],
    measurements: {
      "M": { "Busto": "94 cm", "Largo": "115 cm" },
      "L": { "Busto": "100 cm", "Largo": "117 cm" },
      "XL": { "Busto": "106 cm", "Largo": "119 cm" }
    },
    images: [
      "https://picsum.photos/seed/dress-midi1/800/800",
      "https://picsum.photos/seed/dress-midi2/800/800"
    ]
  },
  {
    id: "11",
    title: "Zapatillas Urbanas Confort",
    description: "Zapatillas con plantilla acolchada para caminar largas distancias sin cansancio. Estilo moderno.",
    price: 85.00,
    category: "Zapatos",
    subcategory: "Mujeres",
    sku: "1005",
    inStock: true,
    sizes: ["36", "37", "38", "39"],
    measurements: {
      "36": { "Largo": "23.5 cm" },
      "37": { "Largo": "24.2 cm" },
      "38": { "Largo": "25.0 cm" },
      "39": { "Largo": "25.7 cm" }
    },
    images: [
      "https://picsum.photos/seed/sneakers1/800/800",
      "https://picsum.photos/seed/sneakers2/800/800"
    ]
  },
  {
    id: "12",
    title: "Reloj Elegante Cuero",
    description: "Reloj analógico con correa de cuero genuino. Un toque de distinción para tu muñeca.",
    price: 60.00, // 50% de descuento aplicado
    originalPrice: 120.00,
    category: "Joyería",
    sku: "1006",
    inStock: true,
    images: [
      "https://picsum.photos/seed/watch1/800/800",
      "https://picsum.photos/seed/watch2/800/800"
    ]
  },
  {
    id: "13",
    title: "Cartera de Cuero Vegano",
    description: "Cartera espaciosa y elegante, fabricada con materiales eco-amigables de alta calidad.",
    price: 71.25, // 25% de descuento aplicado
    originalPrice: 95.00,
    category: "Joyería",
    sku: "1007",
    inStock: true,
    images: [
      "https://picsum.photos/seed/bag1/800/800",
      "https://picsum.photos/seed/bag2/800/800"
    ]
  },
  {
    id: "14",
    title: "Caja de Regalo 'Relax'",
    description: "Incluye velas aromáticas, sales de baño y una bata de algodón. El regalo perfecto para consentir.",
    price: 110.00,
    category: "Regalos",
    sku: "1008",
    inStock: true,
    images: [
      "https://picsum.photos/seed/gift-box1/800/800",
      "https://picsum.photos/seed/gift-box2/800/800"
    ]
  },
  {
    id: "15",
    title: "Blusa de Seda Soft",
    description: "Blusa de seda con caída elegante y tacto ultra suave. Perfecta para la oficina o eventos formales.",
    price: 42.40, // 15% de descuento aplicado
    originalPrice: 49.90,
    category: "Plus Size",
    subcategory: "Mujeres",
    sku: "1009",
    inStock: true,
    sizes: ["L", "XL", "XXL"],
    measurements: {
      "L": { "Busto": "112 cm", "Largo": "65 cm" },
      "XL": { "Busto": "120 cm", "Largo": "67 cm" },
      "XXL": { "Busto": "128 cm", "Largo": "69 cm" }
    },
    images: [
      "https://picsum.photos/seed/silk-blouse1/800/800",
      "https://picsum.photos/seed/silk-blouse2/800/800"
    ]
  },
  {
    id: "16",
    title: "Pantalón Chino Slim Fit",
    description: "Pantalón de gabardina con corte moderno. Ideal para un look casual-elegante.",
    price: 65.00,
    category: "Plus Size",
    subcategory: "Hombre",
    sku: "1010",
    inStock: true,
    sizes: ["38", "40", "42"],
    measurements: {
      "38": { "Cintura": "98 cm", "Largo": "104 cm" },
      "40": { "Cintura": "104 cm", "Largo": "105 cm" },
      "42": { "Cintura": "110 cm", "Largo": "106 cm" }
    },
    images: [
      "https://picsum.photos/seed/chino1/800/800",
      "https://picsum.photos/seed/chino2/800/800"
    ]
  },
  {
    id: "17",
    title: "Vestido de Verano Boho",
    description: "Vestido suelto con estilo bohemio. Fresco y cómodo para los días calurosos.",
    price: 55.00,
    category: "Vestidos",
    sku: "1011",
    inStock: true,
    sizes: ["S", "M", "L"],
    measurements: {
      "S": { "Busto": "90 cm", "Largo": "90 cm" },
      "M": { "Busto": "96 cm", "Largo": "92 cm" },
      "L": { "Busto": "102 cm", "Largo": "94 cm" }
    },
    images: [
      "https://picsum.photos/seed/boho1/800/800",
      "https://picsum.photos/seed/boho2/800/800"
    ]
  },
  {
    id: "18",
    title: "Mocasines de Gamuza",
    description: "Mocasines clásicos en gamuza suave. Comodidad y estilo sin esfuerzo.",
    price: 79.00,
    category: "Zapatos",
    subcategory: "Hombre",
    sku: "1012",
    inStock: true,
    sizes: ["40", "41", "42"],
    measurements: {
      "40": { "Largo": "26.5 cm" },
      "41": { "Largo": "27.2 cm" },
      "42": { "Largo": "28.0 cm" }
    },
    images: [
      "https://picsum.photos/seed/loafers1/800/800",
      "https://picsum.photos/seed/loafers2/800/800"
    ]
  },
  {
    id: "19",
    title: "Lentes de Sol Aviador",
    description: "Lentes de sol clásicos con protección UV400. Estilo atemporal.",
    price: 45.00,
    category: "Joyería",
    sku: "1013",
    inStock: true,
    images: [
      "https://picsum.photos/seed/sunglasses1/800/800",
      "https://picsum.photos/seed/sunglasses2/800/800"
    ]
  },
  {
    id: "20",
    title: "Pack de Medias de Algodón",
    description: "Pack de 3 pares de medias de algodón peinado. Máximo confort.",
    price: 15.00,
    category: "Regalos",
    sku: "1014",
    inStock: true,
    images: [
      "https://picsum.photos/seed/socks1/800/800",
      "https://picsum.photos/seed/socks2/800/800"
    ]
  },
  {
    id: "2",
    title: "Vestido de Noche Elegante",
    description: "Vestido largo con detalles de encaje, ideal para eventos especiales. Tela suave y caída espectacular.",
    price: 89.50,
    category: "Vestidos",
    sku: "1015",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Negro", hex: "#000000" },
      { name: "Rojo Vino", hex: "#7f1d1d" },
      { name: "Verde Esmeralda", hex: "#064e3b" }
    ],
    measurements: {
      "S": { "Busto": "88 cm", "Cintura": "68 cm", "Cadera": "92 cm", "Largo": "145 cm" },
      "M": { "Busto": "92 cm", "Cintura": "72 cm", "Cadera": "96 cm", "Largo": "147 cm" },
      "L": { "Busto": "96 cm", "Cintura": "76 cm", "Cadera": "100 cm", "Largo": "149 cm" },
      "XL": { "Busto": "100 cm", "Cintura": "80 cm", "Cadera": "104 cm", "Largo": "151 cm" }
    },
    images: [
      "https://picsum.photos/seed/dress1/800/800",
      "https://picsum.photos/seed/dress2/800/800"
    ]
  },
  {
    id: "3",
    title: "Zapatos de Cuero Formal",
    description: "Zapatos clásicos de cuero genuino. Durabilidad y elegancia para el caballero moderno.",
    price: 75.00,
    category: "Zapatos",
    subcategory: "Hombre",
    sku: "1016",
    inStock: true,
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      { name: "Marrón", hex: "#451a03" },
      { name: "Negro", hex: "#000000" }
    ],
    measurements: {
      "38": { "Largo Interior": "24.5 cm", "Ancho": "8.5 cm" },
      "39": { "Largo Interior": "25.2 cm", "Ancho": "8.7 cm" },
      "40": { "Largo Interior": "26.0 cm", "Ancho": "9.0 cm" },
      "41": { "Largo Interior": "26.8 cm", "Ancho": "9.2 cm" },
      "42": { "Largo Interior": "27.5 cm", "Ancho": "9.5 cm" }
    },
    images: [
      "https://picsum.photos/seed/shoes-men1/800/800",
      "https://picsum.photos/seed/shoes-men2/800/800"
    ]
  },
  {
    id: "4",
    title: "Collar de Perlas Artesanal",
    description: "Accesorio delicado hecho a mano. El complemento perfecto para cualquier outfit.",
    price: 29.99,
    category: "Joyería",
    sku: "1017",
    inStock: true,
    images: [
      "https://picsum.photos/seed/acc1/800/800",
      "https://picsum.photos/seed/acc2/800/800"
    ]
  },
  {
    id: "5",
    title: "Set de Regalo Gourmet",
    description: "Una selección premium de chocolates y café artesanal. El regalo ideal para cualquier ocasión.",
    price: 40.00,
    category: "Regalos",
    sku: "1018",
    inStock: true,
    images: [
      "https://picsum.photos/seed/gift1/800/800",
      "https://picsum.photos/seed/gift2/800/800"
    ]
  },
  {
    id: "6",
    title: "Blusa Floral Curvy",
    description: "Blusa fresca con estampado floral, diseñada especialmente para resaltar la figura con comodidad.",
    price: 34.99,
    category: "Plus Size",
    subcategory: "Mujeres",
    sku: "1019",
    inStock: true,
    sizes: ["L", "XL", "XXL"],
    colors: [
      { name: "Rosa", hex: "#f472b6" },
      { name: "Celeste", hex: "#60a5fa" }
    ],
    measurements: {
      "L": { "Hombro": "44 cm", "Busto": "110 cm", "Largo": "68 cm", "Manga": "22 cm" },
      "XL": { "Hombro": "46 cm", "Busto": "118 cm", "Largo": "70 cm", "Manga": "23 cm" },
      "XXL": { "Hombro": "48 cm", "Busto": "126 cm", "Largo": "72 cm", "Manga": "24 cm" }
    },
    images: [
      "https://picsum.photos/seed/curvy1/800/800",
      "https://picsum.photos/seed/curvy2/800/800"
    ]
  },
  {
    id: "7",
    title: "Tacones de Fiesta",
    description: "Tacones elegantes y cómodos para bailar toda la noche. Disponibles en varios colores.",
    price: 65.00,
    category: "Zapatos",
    subcategory: "Mujeres",
    sku: "1020",
    inStock: true,
    sizes: ["35", "36", "37", "38"],
    colors: [
      { name: "Dorado", hex: "#fbbf24" },
      { name: "Plata", hex: "#e5e7eb" },
      { name: "Rojo", hex: "#dc2626" }
    ],
    images: [
      "https://picsum.photos/seed/heels1/800/800",
      "https://picsum.photos/seed/heels2/800/800"
    ]
  },
  {
    id: "21",
    title: "Casaca de Invierno Plus",
    description: "Casaca térmica con forro polar, ideal para climas fríos. Diseño robusto y funcional.",
    price: 120.00,
    category: "Plus Size",
    subcategory: "Hombre",
    sku: "1021",
    inStock: true,
    sizes: ["XL", "XXL", "3XL"],
    measurements: {
      "XL": { "Hombro": "54 cm", "Pecho": "124 cm", "Largo": "80 cm" },
      "XXL": { "Hombro": "56 cm", "Pecho": "132 cm", "Largo": "82 cm" },
      "3XL": { "Hombro": "58 cm", "Pecho": "140 cm", "Largo": "84 cm" }
    },
    images: ["https://picsum.photos/seed/jacket-plus1/800/800", "https://picsum.photos/seed/jacket-plus2/800/800"]
  },
  {
    id: "22",
    title: "Falda Denim Curvy",
    description: "Falda de jean con tiro alto y botones frontales. Estilo clásico que nunca pasa de moda.",
    price: 45.00,
    category: "Plus Size",
    subcategory: "Mujeres",
    sku: "1022",
    inStock: true,
    sizes: ["40", "42", "44"],
    measurements: {
      "40": { "Cintura": "90 cm", "Cadera": "110 cm", "Largo": "50 cm" },
      "42": { "Cintura": "96 cm", "Cadera": "116 cm", "Largo": "52 cm" },
      "44": { "Cintura": "102 cm", "Cadera": "122 cm", "Largo": "54 cm" }
    },
    images: ["https://picsum.photos/seed/skirt-curvy1/800/800", "https://picsum.photos/seed/skirt-curvy2/800/800"]
  },
  {
    id: "23",
    title: "Chaleco Acolchado Plus",
    description: "Chaleco ligero pero abrigador. Perfecto para usar sobre camisas o poleras.",
    price: 65.00,
    category: "Plus Size",
    subcategory: "Hombre",
    sku: "1023",
    inStock: true,
    sizes: ["XL", "XXL", "3XL"],
    measurements: {
      "XL": { "Pecho": "122 cm", "Largo": "75 cm" },
      "XXL": { "Pecho": "130 cm", "Largo": "77 cm" },
      "3XL": { "Pecho": "138 cm", "Largo": "79 cm" }
    },
    images: ["https://picsum.photos/seed/vest-plus1/800/800", "https://picsum.photos/seed/vest-plus2/800/800"]
  },
  {
    id: "24",
    title: "Vestido de Gala Satinado",
    description: "Vestido largo de satén con espalda descubierta. Elegancia pura para eventos nocturnos.",
    price: 150.00,
    category: "Vestidos",
    sku: "1024",
    inStock: false,
    sizes: ["S", "M", "L"],
    measurements: {
      "S": { "Busto": "86 cm", "Cintura": "66 cm", "Largo": "155 cm" },
      "M": { "Busto": "90 cm", "Cintura": "70 cm", "Largo": "157 cm" },
      "L": { "Busto": "94 cm", "Cintura": "74 cm", "Largo": "159 cm" }
    },
    images: ["https://picsum.photos/seed/gala-dress1/800/800", "https://picsum.photos/seed/gala-dress2/800/800"]
  },
  {
    id: "25",
    title: "Vestido Casual de Lino",
    description: "Vestido corto de lino, fresco y transpirable. Ideal para paseos de fin de semana.",
    price: 55.00,
    category: "Vestidos",
    sku: "1025",
    inStock: true,
    sizes: ["M", "L", "XL"],
    measurements: {
      "M": { "Busto": "92 cm", "Largo": "95 cm" },
      "L": { "Busto": "98 cm", "Largo": "97 cm" },
      "XL": { "Busto": "104 cm", "Largo": "99 cm" }
    },
    images: ["https://picsum.photos/seed/linen-dress1/800/800", "https://picsum.photos/seed/linen-dress2/800/800"]
  },
  {
    id: "26",
    title: "Vestido de Cóctel Encaje",
    description: "Vestido a la rodilla con detalles de encaje floral. Un clásico para cualquier celebración.",
    price: 85.00,
    category: "Vestidos",
    sku: "1026",
    inStock: true,
    sizes: ["S", "M", "L"],
    measurements: {
      "S": { "Busto": "88 cm", "Cintura": "70 cm", "Largo": "100 cm" },
      "M": { "Busto": "92 cm", "Cintura": "74 cm", "Largo": "102 cm" },
      "L": { "Busto": "96 cm", "Cintura": "78 cm", "Largo": "104 cm" }
    },
    images: ["https://picsum.photos/seed/cocktail-dress1/800/800", "https://picsum.photos/seed/cocktail-dress2/800/800"]
  },
  {
    id: "27",
    title: "Botines de Cuero",
    description: "Botines de cuero con tacón medio. Estilo y comodidad para el día a día.",
    price: 110.00,
    category: "Zapatos",
    subcategory: "Mujeres",
    sku: "1027",
    inStock: true,
    sizes: ["36", "37", "38"],
    measurements: {
      "36": { "Largo": "23.5 cm" },
      "37": { "Largo": "24.2 cm" },
      "38": { "Largo": "25.0 cm" }
    },
    images: ["https://picsum.photos/seed/boots1/800/800", "https://picsum.photos/seed/boots2/800/800"]
  },
  {
    id: "28",
    title: "Sandalias de Verano",
    description: "Sandalias planas con tiras de cuero. Frescura y ligereza para tus pies.",
    price: 40.00,
    category: "Zapatos",
    subcategory: "Mujeres",
    sku: "1028",
    inStock: true,
    sizes: ["35", "36", "37", "38"],
    measurements: {
      "35": { "Largo": "22.8 cm" },
      "36": { "Largo": "23.5 cm" },
      "37": { "Largo": "24.2 cm" },
      "38": { "Largo": "25.0 cm" }
    },
    images: ["https://picsum.photos/seed/sandals1/800/800", "https://picsum.photos/seed/sandals2/800/800"]
  },
  {
    id: "29",
    title: "Zapatillas Deportivas",
    description: "Zapatillas con tecnología de amortiguación. Ideales para correr o ir al gimnasio.",
    price: 95.00,
    category: "Zapatos",
    subcategory: "Hombre",
    sku: "1029",
    inStock: true,
    sizes: ["40", "41", "42", "43"],
    measurements: {
      "40": { "Largo": "26.0 cm" },
      "41": { "Largo": "26.8 cm" },
      "42": { "Largo": "27.5 cm" },
      "43": { "Largo": "28.2 cm" }
    },
    images: ["https://picsum.photos/seed/sport-shoes1/800/800", "https://picsum.photos/seed/sport-shoes2/800/800"]
  },
  {
    id: "30",
    title: "Cinturón de Cuero Genuino",
    description: "Cinturón clásico de cuero con hebilla metálica. Durabilidad y estilo.",
    price: 35.00,
    category: "Joyería",
    sku: "1030",
    inStock: true,
    images: ["https://picsum.photos/seed/belt1/800/800", "https://picsum.photos/seed/belt2/800/800"]
  },
  {
    id: "31",
    title: "Billetera Minimalista",
    description: "Billetera delgada de cuero, ideal para llevar lo esencial sin bultos.",
    price: 25.00,
    category: "Joyería",
    sku: "1031",
    inStock: true,
    images: ["https://picsum.photos/seed/wallet1/800/800", "https://picsum.photos/seed/wallet2/800/800"]
  },
  {
    id: "32",
    title: "Pañuelo de Seda Estampado",
    description: "Pañuelo de seda con diseño artístico. Un toque de color para tu outfit.",
    price: 20.00,
    category: "Joyería",
    sku: "1032",
    inStock: true,
    images: ["https://picsum.photos/seed/scarf1/800/800", "https://picsum.photos/seed/scarf2/800/800"]
  },
  {
    id: "33",
    title: "Taza Personalizada 'Super Mamá'",
    description: "Taza de cerámica de alta calidad con diseño especial para mamá.",
    price: 15.00,
    category: "Regalos",
    sku: "1033",
    inStock: true,
    images: ["https://picsum.photos/seed/mug1/800/800", "https://picsum.photos/seed/mug2/800/800"]
  },
  {
    id: "34",
    title: "Kit de Cuidado Facial",
    description: "Incluye limpiador, tónico y crema hidratante. Todo lo necesario para una piel radiante.",
    price: 60.00,
    category: "Regalos",
    sku: "1034",
    inStock: true,
    images: ["https://picsum.photos/seed/skincare1/800/800", "https://picsum.photos/seed/skincare2/800/800"]
  },
  {
    id: "35",
    title: "Agenda 2026 Cuero",
    description: "Agenda elegante con tapa de cuero. Organiza tu año con estilo.",
    price: 40.00,
    category: "Regalos",
    sku: "1035",
    inStock: true,
    images: ["https://picsum.photos/seed/planner1/800/800", "https://picsum.photos/seed/planner2/800/800"]
  }
];
