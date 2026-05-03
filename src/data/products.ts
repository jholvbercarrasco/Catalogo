export interface Measurements {
  [size: string]: {
    [label: string]: string;
  };
}

export interface ProductVariant {
  size: string;
  color?: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stockCount?: number;
  inStock?: boolean;
  image?: string;
  colors?: { name: string; hex: string; image?: string; sku?: string; stockCount?: number; inStock?: boolean }[];
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
  variants?: ProductVariant[];
  colors?: { name: string; hex: string; image?: string; sku?: string; stockCount?: number; inStock?: boolean }[];
  measurements?: Measurements;
  originalPrice?: number;
  sku: string;
  inStock?: boolean;
  stockCount?: number;
}

export const products: Product[] = [
  // === ROPA HOMBRE ===
  {
    id: "h-30017",
    title: "Polo Clásico Columbia",
    description: "Lleva nuestros nuevos polos para caballero en Algodón 20/1, diseñados para durar. Gracias a su teñido reactivo, los colores se mantienen intensos lavado tras lavado, sin encogerse ni deformarse. Un polo con cuerpo, excelente caída y la frescura que solo el 100% algodón te ofrece.",
    price: 40.00,
    originalPrice: 55.00,
    category: "Ropa Hombre",
    subcategory: "Polos",
    sku: "30017",
    inStock: true,
    sizes: ["M"],
    variants: [
      {
        size: "M",
        sku: "30017-M",
        price: 40.00,
        originalPrice: 55.00,
        stockCount: 4,
        inStock: true,
        colors: [
          { name: "Gris", hex: "#E8E8E8", image: "https://i.postimg.cc/TwXdhzvw/gris-columbia.jpg", sku: "30017-M-GRI" },
          { name: "Azul oscuro", hex: "#08365E", image: "https://i.postimg.cc/g0hczYQ0/marino-columbia-polo.jpg", sku: "30017-M-AZO" },
          { name: "Azul claro", hex: "#2B70AB", image: "https://i.postimg.cc/4dTfnDRg/electrico-columbia.jpg", sku: "30017-M-AZC" },
          { name: "Verde oscuro", hex: "#517869", image: "https://i.postimg.cc/Xv5NjVmX/verde-oscuro-columbia.jpg", sku: "30017-M-VEO" }
        ]
      }
    ],
    images: [
      "https://i.postimg.cc/fLhzkGQs/columbia-detalle-polo.jpg",
      "https://i.postimg.cc/TwXdhzvw/gris-columbia.jpg",
      "https://i.postimg.cc/g0hczYQ0/marino-columbia-polo.jpg",
      "https://i.postimg.cc/4dTfnDRg/electrico-columbia.jpg",
      "https://i.postimg.cc/Xv5NjVmX/verde-oscuro-columbia.jpg"
    ]
  },
  {
    id: "h-30016",
    title: "Polo hombre en algodón",
    description: "Lleva nuestros nuevos polos para caballero en Algodón 20/1, diseñados para durar. Gracias a su teñido reactivo, los colores se mantienen intensos lavado tras lavado, sin encogerse ni deformarse. Un polo con cuerpo, excelente caída y la frescura que solo el 100% algodón te ofrece.",
    price: 40.00,
    originalPrice: 55.00,
    category: "Ropa Hombre",
    subcategory: "Polos",
    sku: "30016",
    inStock: true,
    sizes: ["L"],
    variants: [
      {
        size: "L",
        sku: "30016-L",
        price: 40.00,
        originalPrice: 55.00,
        stockCount: 4,
        inStock: true,
        colors: [
          { name: "Verde Agua", hex: "#E8F7DF", image: "https://i.postimg.cc/t70Mk5rz/the-nord-verde-agua.jpg", sku: "30016-L-VEA" },
          { name: "Negro", hex: "#212020", image: "https://i.postimg.cc/9z3nbpxL/the-nord-negro.jpg", sku: "30016-L-NEG" },
          { name: "Verde Marrón", hex: "#A6A892", image: "https://i.postimg.cc/yWqbjPfP/the-nord-verde-marron.jpg", sku: "30016-L-VEM" },
          { name: "Lila", hex: "#C2A7C0", image: "https://i.postimg.cc/HjGhz2SN/the-nord-lila.jpg", sku: "30016-L-LIL" }
        ]
      }
    ],
    images: [
      "https://i.postimg.cc/PNGRy466/the-nord-principal.png",
      "https://i.postimg.cc/t70Mk5rz/the-nord-verde-agua.jpg",
      "https://i.postimg.cc/9z3nbpxL/the-nord-negro.jpg",
      "https://i.postimg.cc/yWqbjPfP/the-nord-verde-marron.jpg",
      "https://i.postimg.cc/HjGhz2SN/the-nord-lila.jpg",
      "https://i.postimg.cc/z3mc7jd0/the-nort-detalle-1.jpg",
      "https://i.postimg.cc/gr9TsDMT/the-nord-detalle-2.jpg"
    ]
  },
  {
    id: "h-30015",
    title: "Polo en algodón Clásico",
    description: "Lleva nuestros nuevos polos para caballero en Algodón 20/1, diseñados para durar. Gracias a su teñido reactivo, los colores se mantienen intensos lavado tras lavado, sin encogerse ni deformarse. Un polo con cuerpo, excelente caída y la frescura que solo el 100% algodón te ofrece.",
    price: 40.00,
    originalPrice: 55.00,
    category: "Ropa Hombre",
    subcategory: "Polos",
    sku: "30015",
    inStock: true,
    sizes: ["M", "L"],
    variants: [
      {
        size: "M",
        sku: "30015-M",
        price: 40.00,
        originalPrice: 55.00,
        stockCount: 4,
        inStock: true,
        colors: [
          { name: "Crema", hex: "#E8DAB5", image: "https://i.postimg.cc/XJtkbPcR/tommy-crema.jpg", sku: "30015-M-CRE" },
          { name: "Blanco", hex: "#FCFCFC", image: "https://i.postimg.cc/xCB32Z3r/tommy-blanco-h.jpg", sku: "30015-M-BLA" },
          { name: "Celeste", hex: "#B5E1E8", image: "https://i.postimg.cc/sXb4rL98/tommy-celeste.jpg", sku: "30015-M-CEL" },
          { name: "Verde Oliva", hex: "#BBBDA4", image: "https://postimg.cc/gallery/hPKj4Jt", sku: "30015-M-VER" }
        ]
      },
      {
        size: "L",
        sku: "30015-L",
        price: 40.00,
        originalPrice: 55.00,
        stockCount: 3,
        inStock: true,
        colors: [
          { name: "Crema", hex: "#E8DAB5", image: "https://i.postimg.cc/XJtkbPcR/tommy-crema.jpg", sku: "30015-L-CRE" },
          { name: "Negro", hex: "#0F0F0F", image: "https://i.postimg.cc/HxF9gN4P/Tommy-negro.jpg", sku: "30015-L-NEG" },
          { name: "Blanco", hex: "#FCFCFC", image: "https://i.postimg.cc/xCB32Z3r/tommy-blanco-h.jpg", sku: "30015-L-BLA" }
        ]
      }
    ],
    images: [
      "https://i.postimg.cc/KzCD2WrH/Principal-tommy.jpg",
      "https://i.postimg.cc/XJtkbPcR/tommy-crema.jpg",
      "https://i.postimg.cc/xCB32Z3r/tommy-blanco-h.jpg",
      "https://i.postimg.cc/sXb4rL98/tommy-celeste.jpg",
      "https://i.postimg.cc/HxF9gN4P/Tommy-negro.jpg",
      "https://i.postimg.cc/wjWWr0ZK/detalle-tommy-(1).jpg"
    ]
  },
  {
    id: "h-30014",
    title: "Polo hombre en algodón",
    description: "Lleva nuestros nuevos polos para caballero en Algodón 20/1, diseñados para durar. Gracias a su teñido reactivo, los colores se mantienen intensos lavado tras lavado, sin encogerse ni deformarse. Un polo con cuerpo, excelente caída y la frescura que solo el 100% algodón te ofrece.",
    price: 40.00,
    originalPrice: 55.00,
    category: "Ropa Hombre",
    subcategory: "Polos",
    sku: "30014",
    inStock: true,
    sizes: ["S", "M", "L"],
    variants: [
      {
        size: "S",
        sku: "30014-S",
        price: 40.00,
        originalPrice: 55.00,
        stockCount: 2,
        inStock: true,
        colors: [
          { name: "Celeste", hex: "#7BB8E0", image: "https://i.postimg.cc/xCKjgJCP/polo-celeste-7BB8E0.jpg", sku: "30014-S-CEL" },
          { name: "Verde", hex: "#B1DEC5", image: "https://i.postimg.cc/mDQZVzDy/polo-verde-B1DEC5.jpg", sku: "30014-S-VER" }
        ]
      },
      {
        size: "M",
        sku: "30014-M",
        price: 40.00,
        originalPrice: 55.00,
        stockCount: 4,
        inStock: true,
        colors: [
          { name: "Azul acero", hex: "#45637A", image: "https://i.postimg.cc/qq4JFJhD/polo-azul-acero-45637A.jpg", sku: "30014-M-AZA" },
          { name: "Azul marino", hex: "#2C3B61", image: "https://i.postimg.cc/cHQ1TgHp/polo-azul-marino-2C3B61.jpg", sku: "30014-M-AZM" },
          { name: "Crema", hex: "#F0EDDA", image: "https://i.postimg.cc/RFcCG6F7/Polo-crema-F0EDDA.jpg", sku: "30014-M-CRE" },
          { name: "Blanco", hex: "#FCFCFC", image: "https://i.postimg.cc/9MGX1RMP/polo-blanco-FCFCFC.jpg", sku: "30014-M-BLA" }
        ]
      },
      {
        size: "L",
        sku: "30014-L",
        price: 40.00,
        originalPrice: 55.00,
        stockCount: 1,
        inStock: true,
        colors: [
          { name: "Gris", hex: "#DBDED5", image: "https://i.postimg.cc/MG7gFy7K/Polo-gris-DBDED5.jpg", sku: "30014-L-GRI" }
        ]
      }
    ],
    images: [
      "https://i.postimg.cc/Ssv06m70/Polo-blanco.jpg",
      "https://i.postimg.cc/9MGX1RMP/polo-blanco-FCFCFC.jpg",
      "https://i.postimg.cc/qq4JFJhD/polo-azul-acero-45637A.jpg",
      "https://i.postimg.cc/cHQ1TgHp/polo-azul-marino-2C3B61.jpg",
      "https://i.postimg.cc/xCKjgJCP/polo-celeste-7BB8E0.jpg",
      "https://i.postimg.cc/RFcCG6F7/Polo-crema-F0EDDA.jpg",
      "https://i.postimg.cc/mDQZVzDy/polo-verde-B1DEC5.jpg",
      "https://i.postimg.cc/MG7gFy7K/Polo-gris-DBDED5.jpg",
      "https://i.postimg.cc/QC2Dcjg0/detalle-lacoste-(1).jpg"
    ]
  },
  // === ROPA MUJER ===
  {
    id: "m-30002",
    title: "Blusa camisera de lino",
    description: "Eleva tu estilo cotidiano con esta camisa de alta gama, diseñada para ofrecer un equilibrio perfecto entre sofisticación y frescura.\nDetalle de Lujo: Destaca por sus exclusivos botones de cuatro orificios chapados en oro mate, cocidos con precisión a tono para un acabado impecable.\nDiseño Versátil: Confeccionada en lino de alta calidad con textura detallada, presenta mangas ajustables con trabilla y un corte relajado que favorece cualquier silueta.",
    price: 50.00,
    originalPrice: 65.00,
    category: "Ropa Mujer",
    subcategory: "Tallas Grandes",
    sku: "30002",
    inStock: true,
    sizes: ["XL"],
    variants: [
      {
        size: "XL",
        sku: "30002",
        price: 50.00,
        originalPrice: 65.00,
        stockCount: 2,
        inStock: true,
        colors: [
          { name: "Camel", hex: "#D6BBA1", image: "https://i.postimg.cc/t4JvJXyj/b-LUSA-LINO-CAMEL-(1).jpg", sku: "30002-CAM" },
          { name: "Verde", hex: "#526343", image: "https://i.postimg.cc/Kz0JxVVQ/BLUSA-LINO-VERDE.jpg", sku: "30002-VER" }
        ]
      }
    ],
    images: [
      "https://i.postimg.cc/t4JvJXyj/b-LUSA-LINO-CAMEL-(1).jpg",
      "https://i.postimg.cc/Kz0JxVVQ/BLUSA-LINO-VERDE.jpg",
      "https://i.postimg.cc/9MLJCSSJ/blusa-imagen-referencial-verde.jpg"
    ]
  },
  {
    id: "m-30006",
    title: "Blusa Elsi cuello de lazo",
    description: "Blusa con cuello en \"V\" pronunciado que se transforma en un elegante lazo frontal, acentuado por un delicado broche circular dorado que aporta un toque de lujo.\nMangas cortas con diseño de doble capa tipo pétalo, que añaden volumen sutil y feminidad.\nSilueta ligeramente entallada que favorece la figura, confeccionada en tela ligera de caída impecable.",
    price: 50.00,
    originalPrice: 60.00,
    category: "Ropa Mujer",
    subcategory: "Tallas Grandes",
    sku: "30006",
    inStock: true,
    sizes: ["L"],
    variants: [
      {
        size: "L",
        sku: "30006",
        price: 50.00,
        originalPrice: 60.00,
        stockCount: 2,
        inStock: true,
        colors: [
          { name: "Celeste", hex: "#87CEEB", image: "https://i.postimg.cc/d1Gb4WZW/Blusa-Elsi-cuello-de-lazo.jpg", sku: "30006-CEL" },
          { name: "Verde", hex: "#C5FFDB", image: "https://i.postimg.cc/XJVqbDSX/Generated-Image-May-01-2026-11-14PM.jpg", sku: "30006-VER" },
          { name: "Blanco", hex: "#FFFFFF", image: "https://i.postimg.cc/W3XGLkK4/Generated-Image-May-01-2026-11-33PM.jpg", sku: "30006-BLA" }
        ]
      }
    ],
    images: [
      "https://i.postimg.cc/9FVDtMN9/Generated-Image-May-01-2026-11-43PM.jpg",
      "https://i.postimg.cc/d1Gb4WZW/Blusa-Elsi-cuello-de-lazo.jpg",
      "https://i.postimg.cc/XJVqbDSX/Generated-Image-May-01-2026-11-14PM.jpg",
      "https://i.postimg.cc/W3XGLkK4/Generated-Image-May-01-2026-11-33PM.jpg"
    ]
  },
  {
    id: "m-30008",
    title: "Blusa Gala Lurex",
    description: "Deslumbra con elegancia sutil. Esta blusa de corte fluido presenta un delicado acabado escarchado que captura la luz con cada movimiento. Su diseño de cuello redondo y manga corta relajada la convierten en la pieza perfecta para eventos especiales donde el brillo es el protagonista.",
    price: 48.00,
    category: "Ropa Mujer",
    subcategory: "Tallas Grandes",
    sku: "30008-30009",
    inStock: true,
    sizes: ["L", "XL"],
    variants: [
      {
        size: "L",
        sku: "30009",
        price: 48.00,
        stockCount: 2,
        inStock: true,
        colors: [
          { name: "Negra", hex: "#000000", image: "https://i.postimg.cc/L5m2FdzH/blusa-escarchada-negra.jpg", sku: "30009-NEG" },
          { name: "Nude", hex: "#EEACAA", image: "https://i.postimg.cc/dVR8Br5v/blusa-nude-escarchada-(1).jpg", sku: "30009-NUD" }
        ]
      },
      {
        size: "XL",
        sku: "30008",
        price: 50.00,
        stockCount: 3,
        inStock: true,
        colors: [
          { name: "Negra", hex: "#000000", image: "https://i.postimg.cc/L5m2FdzH/blusa-escarchada-negra.jpg", sku: "30008-NEG" },
          { name: "Blanca", hex: "#FEFDF4", image: "https://i.postimg.cc/MHfbw4x4/blsa-escarchada-blanca.jpg", sku: "30008-BLA" },
          { name: "Rojo Vino", hex: "#760E1F", image: "https://i.postimg.cc/W11mbh24/blusa-escarchada-rojo-vino.jpg", sku: "30008-ROJ" }
        ]
      }
    ],
    images: [
      "https://i.postimg.cc/nL4pMcV2/blusa-blanca-escarchada-principal.jpg",
      "https://i.postimg.cc/L5m2FdzH/blusa-escarchada-negra.jpg",
      "https://i.postimg.cc/MHfbw4x4/blsa-escarchada-blanca.jpg",
      "https://i.postimg.cc/W11mbh24/blusa-escarchada-rojo-vino.jpg",
      "https://i.postimg.cc/dVR8Br5v/blusa-nude-escarchada-(1).jpg"
    ]
  },
  {
    id: "m-30001",
    title: "Blusa Elegante azul marino modelo mari xl",
    description: "blusa camisera en color azul marino, una prenda atemporal diseñada para la mujer moderna que busca equilibrio entre comodidad y estilo. Su corte clásico y fluido la hace perfecta tanto para un evento especial con pantalones de vestir y tacones, como para un look casual elevado con tus jeans favoritos.",
    price: 45.00,
    originalPrice: 50.00,
    category: "Ropa Mujer",
    subcategory: "Tallas Grandes",
    sku: "30001",
    inStock: true,
    stockCount: 1,
    colors: [
      { name: "Azul Marino", hex: "#000080", image: "https://i.postimg.cc/d1DYtQgx/blusa-azul-marino3.jpg", sku: "30001-AZU" }
    ],
    sizes: ["XL"],
    images: [
      "https://i.postimg.cc/QCW00vW9/Blusa-azul-marino.jpg",
      "https://i.postimg.cc/4yhBBjhW/BLUSA-AZUL-MARINO-2.jpg",
      "https://i.postimg.cc/d1DYtQgx/blusa-azul-marino3.jpg"
    ]
  },
  {
    id: "m-30011",
    title: "Blusa camisera Rayas",
    description: "La blusa a rayas es la prenda ideal para lucir elegante y sofisticada en cualquier ocasión. Su detalle en el cuello y en las mangas le da un toque único y versátil, perfecto para adaptarse a diversas situaciones.\nBotón: dorado\nTemporada: Atemporal\nManga 3/4\nComposición: Lino",
    price: 50.00,
    category: "Ropa Mujer",
    subcategory: "Tallas Grandes",
    sku: "30011",
    inStock: true,
    sizes: ["M", "L", "XL"],
    variants: [
      { size: "M", sku: "30018", price: 50.00, stockCount: 1, inStock: true },
      { size: "L", sku: "30012", price: 50.00, stockCount: 1, inStock: true },
      { size: "XL", sku: "30011", price: 50.00, stockCount: 1, inStock: true }
    ],
    images: [
      "https://i.postimg.cc/jjSvkwzJ/PRINCIPAL-BLUSA-RAYADA.jpg",
      "https://i.postimg.cc/1RJdBBGf/Blusa-rayada-mujer.jpg",
      "https://i.postimg.cc/Kv35TDJ8/detalle-blusa-rayada-(1).jpg"
    ]
  },
  {
    id: "m-30005",
    title: "Blusa camisera Dama",
    description: "La blusa rayada camisera con bolsillo es la prenda ideal para lucir elegante y sofisticada en cualquier ocasión. Su detalle en el cuello y en las mangas le da un toque único y versátil, perfecto para adaptarse a diversas situaciones.\nBotón: blanco cálido\nTemporada: Atemporal\nManga 3/4\nComposición: Lino",
    price: 55.00,
    category: "Ropa Mujer",
    subcategory: "Tallas Grandes",
    sku: "30005",
    inStock: true,
    sizes: ["L"],
    variants: [
      { size: "L", sku: "30005", price: 55.00, stockCount: 1, inStock: true }
    ],
    images: [
      "https://i.postimg.cc/L5pxDyvR/Blusa-rayada-blanca.jpg",
      "https://i.postimg.cc/fyfBrxgS/Blusa-rayada-blanca-modelo.jpg",
      "https://i.postimg.cc/x1MyxGJr/Detalle-blusa-rayada-blanca.jpg"
    ]
  },
  {
    id: "m-30007",
    title: "Blusa de Seda para Dama",
    description: "La blusa elegante de seda, con cuello corbata",
    price: 55.00,
    category: "Ropa Mujer",
    subcategory: "Tallas Grandes",
    sku: "30007",
    inStock: true,
    sizes: ["L"],
    colors: [
      { name: "Verde", hex: "#055E3C", image: "https://i.postimg.cc/P50ZjCD9/blusa-verde-modelo.jpg", stockCount: 1, inStock: true },
      { name: "Vino", hex: "#731A09", image: "https://i.postimg.cc/D0hHYf6M/blusa-vino-de-seda-modelo.jpg", stockCount: 1, inStock: true }
    ],
    variants: [
      { size: "L", sku: "30007", price: 55.00, stockCount: 2, inStock: true }
    ],
    images: [
      "https://i.postimg.cc/Vk2M8JtT/blusa-verde.jpg",
      "https://i.postimg.cc/P50ZjCD9/blusa-verde-modelo.jpg",
      "https://i.postimg.cc/D0hHYf6M/blusa-vino-de-seda-modelo.jpg",
      "https://i.postimg.cc/htY8tCkS/Generated-Image-May-03-2026-12-47AM.jpg"
    ]
  },
  // === HOGAR ===
  {
    id: "ho1",
    title: "Aceitero con cepillo de silicona",
    description: "Este pincel recargable es el utensilio ideal para tu cocina. Es súper práctico y fácil de usar, ya sea para pincelar aceite, huevo, salsas o aderezos en tus preparaciones.\n\nFabricado con silicona de grado alimenticio, es seguro, resistente a altas temperaturas y no raya ni daña tus utensilios. Perfecto para usar sobre todo tipo de alimentos y superficies.\nSu diseño ergonómico y su capacidad de recarga lo convierten en una herramienta de cocina esencial, permitiéndote agregar tus ingredientes con precisión.\nLargo: 11.5 cm x 5 cm\nUnidades por envase: 1\nMaterial del mango: silicona.\nMaterial de las cerdas: silicona.\nEs apto para lavavajillas.",
    price: 6.00,
    category: "Hogar",
    sku: "20002",
    inStock: true,
    stockCount: 11,
    colors: [
      { name: "Nude", hex: "#E5D3C8" },
      { name: "Turquesa", hex: "#40e0d0" },
      { name: "Gris", hex: "#808080" }
    ],
    images: [
      "https://i.postimg.cc/WzDhrSgF/Generated-Image-April-30-2026-10-47AM.jpg",
      "https://i.postimg.cc/QtZF5cSk/aceitero2.jpg",
      "https://i.postimg.cc/xjHWtM5K/medidaaceitero.jpg"
    ]
  },
  {
    id: "ho2",
    title: "Picadora manual de verduras",
    description: "Eficiente picador especialmente diseñado para picar cebolla, ajo, otros vegetales.\nFabricado con materiales de alta calidad para una mayor durabilidad, podrás preparar tus comidas en menos tiempo sin mucho esfuerzo. Incluye este accesorio imprescindible en tu cocina. Picador manual resistente: picador de alimentos con una exclusiva cuchilla de acero inoxidable en zigzag de una sola pieza. Preparación de comidas sin complicaciones: la parte superior extraíble del picador manual sirve como tapa para mantener las verduras cortadas y rebanadas en su lugar para una transferencia limpia. Fácil de usar: presiona la palanca del mini picador manual para una preparación de alimentos y recetas súper sencilla. Pica, corta y rebana cualquier cosa, desde cebollas hasta tomates, más rápido que nunca.\nDimensiones del embalaje: 22 x 9 x 9 cm",
    price: 12.00,
    originalPrice: 15.00,
    category: "Hogar",
    sku: "20006",
    inStock: true,
    stockCount: 12,
    colors: [
      { name: "Blanco", hex: "#FFFFFF" }
    ],
    images: [
      "https://i.postimg.cc/52WmmKpd/cortador-de-vegetales-2.jpg",
      "https://i.postimg.cc/QdWdj0rp/Cortador-de-vegetales-3-(1).jpg",
      "https://i.postimg.cc/9QHBBg13/cotador-de-vegetales1.jpg"
    ]
  },
  {
    id: "ho3",
    title: "Set para repostería",
    description: "Set para repostería, 3 piezas de silicona (Espátula, brocha de cocina y batidor de globo).\nFabricado con silicona de grado alimenticio, es seguro, resistente a altas temperaturas y no raya ni daña tus utensilios. Perfecto para usar sobre todo tipo de alimentos y superficies.",
    price: 16.00,
    category: "Hogar",
    sku: "20005",
    inStock: true,
    stockCount: 11,
    colors: [
      { name: "Verde", hex: "#7CCCB8" }
    ],
    images: [
      "https://i.postimg.cc/SK4v1xSf/Set-reposteria-2.jpg",
      "https://i.postimg.cc/yNKbp81p/set-reposteria1.jpg"
    ]
  },
  {
    id: "ho4",
    title: "Colgador decorativo de llave para hogar",
    description: "Colgador decorativo para llaves, ideal para dar un toque cálido y ordenado a tu hogar. Fabricado en MDF de 4 mm de espesor, con diseño impreso y acabado rústico. Incluye una cuerda tipo yute que aporta un estilo natural y elegante.\n\nMedidas: 9.5 x 15 cm.\nPerfecto para colocar en la entrada, cocina o habitación y mantener tus llaves siempre a la mano con estilo.",
    price: 7.00,
    originalPrice: 8.00,
    category: "Hogar",
    sku: "20004",
    inStock: true,
    stockCount: 12,
    images: [
      "https://i.postimg.cc/qRdss1TP/colgador-decorativo1.jpg",
      "https://i.postimg.cc/76y33K48/colgador-decorativo-2.jpg"
    ]
  },
  {
    id: "ho5",
    title: "Espejo negro para pared",
    description: "Espejo de pared funcional y elegante, ideal para el uso diario con marco negro. Perfecto para verte con comodidad, ya sea en dormitorios, salas o recibidores. Cuenta con marco negro de estilo moderno y espaldar rígido que brinda firmeza y durabilidad. Puede instalarse colgado o empotrado según tu espacio.\n\nMedidas: 123.5 x 33.5 cm.",
    price: 45.00,
    category: "Hogar",
    sku: "20001",
    inStock: true,
    stockCount: 5,
    colors: [
      { name: "Negro", hex: "#000000" }
    ],
    images: [
      "https://i.postimg.cc/90XwFSdT/espejo-con-mcaro-negro-2-(1).jpg",
      "https://i.postimg.cc/hvQMMfYy/espejo-con-marco-negro-30x120.jpg",
      "https://i.postimg.cc/8P0Nj3df/espejo-medidas-(1).jpg"
    ]
  },
  {
    id: "ho6",
    title: "Farol Vela Blanco 24cm",
    description: "Farol decorativo con vela blanca con luz led, ideal para crear ambientes cálidos y acogedores en cualquier espacio. Su diseño elegante combina estructura con paneles de vidrio, permitiendo que la luz se difunda suavemente para un efecto relajante y sofisticado.\n\nPerfecto para salas, terrazas, dormitorios o eventos especiales, aportando un toque decorativo moderno y armonioso.\n\nModelo: CC Farol Vela\nMaterial: Vidrio\nAlto: 24 cm\nTipo de iluminación: Farol con vela\n\nUna pieza versátil que ilumina y decora al mismo tiempo.",
    price: 11.00,
    category: "Hogar",
    sku: "20010",
    inStock: true,
    stockCount: 12,
    colors: [
      { name: "Blanco", hex: "#FFFFFF" }
    ],
    images: [
      "https://i.postimg.cc/1tC16M7f/farol-vela-1.jpg",
      "https://i.postimg.cc/4yYk1tj4/farol-vela-2.jpg",
      "https://i.postimg.cc/zBtYWp2y/farol-vela-3.jpg",
      "https://i.postimg.cc/WzdL7rx1/farol-vela-4.jpg"
    ]
  },
  {
    id: "ho7",
    title: "Porta cubierto de metal y madera",
    description: "Soporte para cubiertos de metal con mango de madera – 14 x 10 cm\n\nMantén tus cubiertos organizados con un toque moderno y natural. Este soporte combina la resistencia del metal con la calidez de la madera, logrando un equilibrio perfecto entre funcionalidad y estilo.\n\nEspecificaciones:\n• Material: Metal y madera\n• Medidas: 14 x 10 cm\n\nUna opción funcional y decorativa para mantener tu cocina siempre organizada.",
    price: 20.00,
    category: "Hogar",
    sku: "20009",
    inStock: true,
    stockCount: 3,
    images: [
      "https://i.postimg.cc/KjDqBY8j/porta-cubiertos-1.jpg",
      "https://i.postimg.cc/xjpbT2RF/portacubiertos-2-(1).jpg"
    ]
  },
  {
    id: "ho8",
    title: "Individuales Elegantes x paquete 6 unid.",
    description: "Mantel individual decorativo de excelente calidad, ideal para realzar la presentación de tu mesa con un estilo moderno y elegante. Su diseño tejido con patrones en contraste aporta un toque sofisticado, perfecto para el uso diario o reuniones especiales.\n\nFabricado con material resistente (70% PVC y 30% poliéster), es fácil de limpiar, duradero y protege tu mesa de manchas y calor.\n\nUna opción práctica y decorativa para darle un acabado más ordenado y atractivo a tu comedor.\nMedidas: 45cm x 30 cm\nPaquete de 6 unidades",
    price: 30.00,
    originalPrice: 35.00,
    category: "Hogar",
    sku: "20003",
    inStock: true,
    stockCount: 12,
    colors: [
      { name: "Hueso", hex: "#F3E5D8", image: "https://i.postimg.cc/501vrptX/individual-hueso-oro-2.jpg" },
      { name: "Negro", hex: "#000000", image: "https://i.postimg.cc/GpGW7dMG/individual-negro-(1).jpg" },
      { name: "Blanco", hex: "#FFFFFF", image: "https://i.postimg.cc/Bnk85cyC/individual-blanco-(1).jpg" }
    ],
    images: [
      "https://i.postimg.cc/3xmsx3g9/individuales-modernos.jpg",
      "https://i.postimg.cc/501vrptX/individual-hueso-oro-2.jpg",
      "https://i.postimg.cc/LXRfWvss/individual-hueso-oro.jpg",
      "https://i.postimg.cc/GpGW7dMG/individual-negro-(1).jpg",
      "https://i.postimg.cc/Bnk85cyC/individual-blanco-(1).jpg",
      "https://i.postimg.cc/8kdfMvNt/individual-blanco-2.jpg"
    ]
  },
  {
    id: "ho9",
    title: "Bolsas de Regalo Diseño Floral",
    description: "Bolsa de regalo de papel con diseño elegante y acabado decorativo, ideal para presentar tus obsequios con estilo y buen gusto. Su estampado floral y colores armoniosos la convierten en una opción perfecta para ocasiones especiales como cumpleaños, aniversarios o celebraciones.\n\nCuenta con asas resistentes tipo cuerda que brindan comodidad y firmeza al transportar. Su material de papel grueso ofrece mayor durabilidad y una excelente presentación.\nUna opción práctica y sofisticada para realizar cualquier regalo.",
    price: 2.00,
    category: "Hogar",
    sku: "20007",
    inStock: true,
    stockCount: 50,
    sizes: ["M", "L"],
    variants: [
      { size: "M", sku: "20007", price: 2.00, stockCount: 25, inStock: true, image: "https://i.postimg.cc/P52hbtRP/bolsa-papel-talla-M.jpg" },
      { size: "L", sku: "20008", price: 3.50, stockCount: 25, inStock: true, image: "https://i.postimg.cc/WzjMP668/bolsa-papel-L.jpg" }
    ],
    images: [
      "https://i.postimg.cc/G2zfBQ3S/bolsas-de-papel.jpg",
      "https://i.postimg.cc/WzjMP668/bolsa-papel-L.jpg",
      "https://i.postimg.cc/brWptLCK/bolsa-medidas-L.jpg",
      "https://i.postimg.cc/P52hbtRP/bolsa-papel-talla-M.jpg",
      "https://i.postimg.cc/zDKrtwcQ/Bolsa-papel-talla-m-medidas.jpg"
    ]
  },
  // === JOYERÍA ===
  {
    id: "jo-10016",
    title: "Pulsera con Corazón",
    description: "Pulsera con dije de corazón para la muñeca, elaborada con material de Xuping y doble baño de oro, lo que garantiza una mayor durabilidad, fidelidad y resistencia.",
    price: 30.00,
    originalPrice: 35.00,
    category: "Joyería",
    sku: "10016",
    inStock: true,
    stockCount: 2,
    images: [
      "https://i.postimg.cc/Ghh4sJr6/IMG-5367.png",
      "https://i.postimg.cc/c4mfpL4r/pulsera-con-dije-corazon.jpg",
      "https://i.postimg.cc/PxTXnT59/Generated-Image-May-01-2026-1-18AM-(1).jpg"
    ]
  },
  {
    id: "jo-10028",
    title: "Monedero Unibella elegante",
    description: "Billetera Unibella de diseño elegante y minimalista, ideal para el uso diario. Fabricada con material tipo cuero de acabado suave, brinda un estilo sofisticado y moderno que combina con cualquier outfit.\n\nCuenta con cierre de cremallera que asegura tus pertenencias y un práctico sujetador de mano para mayor comodidad. Su tamaño compacto permite llevarla fácilmente en bolso o mano, manteniendo tus tarjetas, billetes y monedas organizados.\n\nMedidas: alto 9 cm, ancho 12 cm profundidad 3.5 cm",
    price: 40.00,
    originalPrice: 45.00,
    category: "Joyería",
    sku: "10028",
    inStock: true,
    stockCount: 5,
    colors: [
      { name: "Nude", hex: "#E3BC9A", image: "https://i.postimg.cc/59qj6FVb/nude-billetera.jpg", sku: "10028-NUD" },
      { name: "Hueso", hex: "#F5F5DC", image: "https://i.postimg.cc/L4BhnZpp/hueso-billeera.jpg", sku: "10028-HUE" },
      { name: "Negra", hex: "#000000", image: "https://i.postimg.cc/Jhm27g3f/negra-billetera1.jpg", sku: "10028-NEG" },
      { name: "Marrón", hex: "#8B4513", image: "https://i.postimg.cc/7PMbfTk4/marron-billetera.jpg", sku: "10028-MAR" }
    ],
    images: [
      "https://i.postimg.cc/mZNhtFsR/portada-billetera.jpg",
      "https://i.postimg.cc/bwM132dr/billetera-uso-(1).png",
      "https://i.postimg.cc/L4BhnZpp/hueso-billeera.jpg",
      "https://i.postimg.cc/7PMbfTk4/marron-billetera.jpg",
      "https://i.postimg.cc/Jhm27g3f/negra-billetera1.jpg",
      "https://i.postimg.cc/59qj6FVb/nude-billetera.jpg"
    ]
  },
  {
    id: "jo-10000",
    title: "Caja pequeña de joyería",
    description: "Caja de joyería pequeña y elegante, perfecta para guardar aretes y collares. Cuenta con un suave interior alfombrado (tipo almohadilla/esponja) que protege tus joyas de arañazos.\n\nMedidas: alto 3.5 cm, ancho 7 cm, profundidad 7 cm",
    price: 1.50,
    category: "Joyería",
    sku: "10000",
    inStock: true,
    stockCount: 12,
    colors: [
      { name: "Crema", hex: "#FFFDD0", sku: "10000-CRE" }
    ],
    images: [
      "https://i.postimg.cc/1RqwMKqq/cajita-joyeria.jpg"
    ]
  },
  {
    id: "jo-10027",
    title: "Bolsa de Regalo Moderno",
    description: "Bolsa de regalo elegante y moderna, confeccionada en cartón de alto gramaje con un diseño y textura minimalista contemporánea, idónea para obsequios en ocasiones especiales.\n\nMedidas: alto 16 cm, ancho 12 cm, profundidad 6 cm",
    price: 2.00,
    originalPrice: 2.50,
    category: "Joyería",
    sku: "10027",
    inStock: true,
    stockCount: 12,
    colors: [
      { name: "Blanco", hex: "#FFFFFF", image: "https://i.postimg.cc/wv0qQZkY/bolsa-regalo-blanco.jpg", sku: "10027-BLA" },
      { name: "Rosa", hex: "#FFC0CB", image: "https://i.postimg.cc/D002j6xM/bolsa-regalos-rosa.jpg", sku: "10027-ROS" },
      { name: "Plateado", hex: "#C0C0C0", image: "https://i.postimg.cc/k4fJvzyd/bolsa-regalo-gris.jpg", sku: "10027-PLA" },
      { name: "Negra", hex: "#000000", image: "https://i.postimg.cc/V6DfWpF8/bolsa-regalos-negro.jpg", sku: "10027-NEG" },
      { name: "Azul Oscuro", hex: "#00008B", image: "https://i.postimg.cc/MTd6mNYw/bolsa-regalos-azul.jpg", sku: "10027-AZU" }
    ],
    images: [
      "https://i.postimg.cc/G2qLxVjr/bolsas-regalos-portada2.jpg",
      "https://i.postimg.cc/wv0qQZkY/bolsa-regalo-blanco.jpg",
      "https://i.postimg.cc/k4fJvzyd/bolsa-regalo-gris.jpg",
      "https://i.postimg.cc/MTd6mNYw/bolsa-regalos-azul.jpg",
      "https://i.postimg.cc/V6DfWpF8/bolsa-regalos-negro.jpg",
      "https://i.postimg.cc/D002j6xM/bolsa-regalos-rosa.jpg",
      "https://i.postimg.cc/3xXHZzK4/bolsa-regalo-medidas.jpg",
      "https://i.postimg.cc/13kryY6W/bolsa-regalo-referencial.jpg"
    ]
  }
];
