/* ==========================================================================
   Ficha de producto + formulario de compra con métodos de pago.
   Se inyecta un modal y se abre al hacer clic en cualquier .product-card__link.
   No procesa pagos reales: guarda el pedido en localStorage para la demo.
   ========================================================================== */
(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       1. Información ampliada de cada producto (clave = título normalizado)
       ---------------------------------------------------------------------- */
    var CATALOGO = {
        'campera': {
            descripcion: 'Campera ligera de corte holgado con capucha ajustable, cierre frontal y bolsillos laterales. Un básico versátil para media temporada.',
            caracteristicas: ['Tejido rompeviento repelente al agua', 'Puños elásticos y capucha ajustable', 'Bolsillos laterales con cierre'],
            material: '100% poliéster reciclado',
            cuidados: 'Lavar a máquina en frío, no usar secadora',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Camel', 'Verde oliva'],
            stock: 12,
            rating: 4.8,
            reviews: 124,
            etiqueta: 'Más vendido',
            imagen: 'imgcam/Captura de pantalla 2026-09-21 195101.png'
        },
        'zapatillas running air max': {
            descripcion: 'Zapatillas de running con amortiguación Air y upper de malla transpirable. Pensadas para entrenamientos diarios y salidas largas.',
            caracteristicas: ['Amortiguación Air en el talón', 'Malla transpirable de secado rápido', 'Suela de goma con buena tracción'],
            material: 'Malla textil y sintético',
            cuidados: 'Limpiar con paño húmedo, no lavar a máquina',
            tallas: ['36', '37', '38', '39', '40', '41', '42'],
            colores: ['Blanco', 'Negro', 'Rosa'],
            stock: 8,
            rating: 4.9,
            reviews: 208,
            etiqueta: 'Nuevo',
            imagen: 'imgzap/Captura de pantalla 2026-09-21 194534.png'
        },
        'bolso bandolera piel': {
            descripcion: 'Bolso bandolera de piel con cierre magnético, correa ajustable y bolsillo interior. Elegancia y practicidad para todos los días.',
            caracteristicas: ['Piel de vacuno de tacto suave', 'Correa ajustable y desmontable', 'Forro interior con bolsillo con cierre'],
            material: 'Piel vacuna 100%',
            cuidados: 'Limpiar con paño suave y crema para cuero',
            tallas: ['Único'],
            colores: ['Negro', 'Camel', 'Vino'],
            stock: 15,
            rating: 4.7,
            reviews: 86,
            etiqueta: 'Edición limitada',
            imagen: 'imgAccesorios/Captura de pantalla 2026-09-24 215357.png'
        },
        'leggings compresion alta': {
            descripcion: 'Leggings de compresión alta con cintura ancha y bolsillo oculto. Sostienen y acompañan cada movimiento durante el entrenamiento.',
            caracteristicas: ['Tejido elástico de compresión alta', 'Cintura alta que no se mueve', 'Bolsillo oculto para llaves o celular'],
            material: '78% poliamida, 22% elastano',
            cuidados: 'Lavar a máquina en frío con ropa similar',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Azul marino', 'Gris'],
            stock: 20,
            rating: 4.8,
            reviews: 152,
            etiqueta: 'Favorito',
            imagen: 'imgreme/Captura de pantalla 2026-09-13 224949.png'
        },
        'poleron oversize essentials': {
            descripcion: 'Polerón oversize de algodón suave con logo bordado. El equilibrio perfecto entre comodidad y estilo urbano.',
            caracteristicas: ['Algodón peinado de alto gramaje', 'Corte oversize con hombros caídos', 'Puños y cintura acanalados'],
            material: '80% algodón, 20% poliéster',
            cuidados: 'Lavar del revés en frío, secar a la sombra',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Blanco', 'Gris'],
            stock: 14,
            rating: 4.9,
            reviews: 187,
            etiqueta: 'Más vendido'
        },
        'poleron con capucha trefoil': {
            descripcion: 'Polerón con capucha de felpa cepillada y logo Trefoil. Abrigo cómodo para los días fríos con un look deportivo clásico.',
            caracteristicas: ['Felpa cepillada por dentro', 'Capucha con cordón ajustable', 'Bolsillo canguro frontal'],
            material: '70% algodón, 30% poliéster',
            cuidados: 'Lavar a máquina en frío, no usar blanqueador',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Azul marino'],
            stock: 9,
            rating: 4.7,
            reviews: 98,
            etiqueta: ''
        },
        'poleron basico cuello redondo': {
            descripcion: 'Polerón básico de cuello redondo, suave y liviano. Un imprescindible para armar looks simples todos los días.',
            caracteristicas: ['Tejido suave de algodón', 'Cuello redondo reforzado', 'Corte regular unisex'],
            material: '100% algodón',
            cuidados: 'Lavar a máquina en frío, secar a la sombra',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Blanco', 'Negro', 'Beige'],
            stock: 18,
            rating: 4.6,
            reviews: 73,
            etiqueta: ''
        },
        'poleron oversize classic': {
            descripcion: 'Polerón oversize con textura afelpada y logo clásico. Comodidad envolvente para el día a día.',
            caracteristicas: ['Interior afelpado térmico', 'Corte amplio oversize', 'Costuras reforzadas en cuello y puños'],
            material: '75% algodón, 25% poliéster',
            cuidados: 'Lavar a máquina en frío, no usar secadora',
            tallas: ['S', 'M', 'L', 'XL'],
            colores: ['Gris', 'Negro', 'Rosa'],
            stock: 11,
            rating: 4.7,
            reviews: 64,
            etiqueta: ''
        },
        'poleron deportivo con capucha': {
            descripcion: 'Polerón deportivo con capucha y tejido de secado rápido. Ideal para calentar antes o después del entrenamiento.',
            caracteristicas: ['Tejido técnico de secado rápido', 'Capucha ajustable con cordón', 'Bolsillo delantero con cierre'],
            material: '100% poliéster técnico',
            cuidados: 'Lavar a máquina en frío, no planchar',
            tallas: ['S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Verde oliva'],
            stock: 7,
            rating: 4.6,
            reviews: 51,
            etiqueta: ''
        },
        'poleron oversize sportswear': {
            descripcion: 'Polerón oversize de felpa premium con logo bordado. Un clásico streetwear con caída amplia y tacto suave.',
            caracteristicas: ['Felpa premium de alto gramaje', 'Logo bordado en el pecho', 'Corte oversize con caída relajada'],
            material: '80% algodón, 20% poliéster',
            cuidados: 'Lavar del revés en frío, secar a la sombra',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Blanco'],
            stock: 6,
            rating: 4.8,
            reviews: 112,
            etiqueta: 'Nuevo'
        },
        'poleron con capucha fleece': {
            descripcion: 'Polerón con capucha de polar fleece, liviano y muy abrigador. Perfecto para las mañanas frías.',
            caracteristicas: ['Polar fleece de secado rápido', 'Capucha amplia y bolsillo canguro', 'Corte regular cómodo'],
            material: '100% poliéster fleece',
            cuidados: 'Lavar a máquina en frío, no usar suavizante',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Gris', 'Azul marino'],
            stock: 10,
            rating: 4.7,
            reviews: 69,
            etiqueta: ''
        },
        'poleron basico minimal': {
            descripcion: 'Polerón minimalista de corte recto y algodón orgánico. Diseño limpio, sin logos, para combinar con todo.',
            caracteristicas: ['Algodón orgánico certificado', 'Corte recto de caída suave', 'Cuello, puños y cintura acanalados'],
            material: '100% algodón orgánico',
            cuidados: 'Lavar a máquina en frío, secar a la sombra',
            tallas: ['XS', 'S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Beige'],
            stock: 16,
            rating: 4.8,
            reviews: 77,
            etiqueta: 'Sustentable'
        },
        'conjunto sudadera y pantalon': {
            descripcion: 'Conjunto infantil de sudadera y pantalón con cintura elástica. Cómodo y resistente para jugar sin parar.',
            caracteristicas: ['Tejido suave y resistente al lavado', 'Cintura elástica con cordón', 'Puños acanalados en mangas y botas'],
            material: '65% algodón, 35% poliéster',
            cuidados: 'Lavar a máquina en frío con colores similares',
            tallas: ['4', '6', '8', '10', '12'],
            colores: ['Azul', 'Gris', 'Rosa'],
            stock: 13,
            rating: 4.8,
            reviews: 94,
            etiqueta: 'Más vendido'
        },
        'zapatillas infantiles con luces': {
            descripcion: 'Zapatillas infantiles con luces LED en la suela y cierre de velcro. Diversión y comodidad en cada paso.',
            caracteristicas: ['Luces LED al caminar', 'Cierre de velcro fácil de ajustar', 'Plantilla acolchada y suela flexible'],
            material: 'Malla textil y sintético',
            cuidados: 'Limpiar con paño húmedo, no sumergir en agua',
            tallas: ['28', '29', '30', '31', '32', '33', '34'],
            colores: ['Rosa', 'Azul', 'Blanco'],
            stock: 9,
            rating: 4.9,
            reviews: 143,
            etiqueta: 'Nuevo'
        },
        'mochila escolar estampada': {
            descripcion: 'Mochila escolar con estampado divertido, espalda acolchada y varios compartimentos. Liviana y resistente para el colegio.',
            caracteristicas: ['Espalda y tirantes acolchados', 'Compartimento para botella', 'Tejido resistente al agua'],
            material: 'Poliéster resistente al agua',
            cuidados: 'Limpiar con paño húmedo, no lavar a máquina',
            tallas: ['Único'],
            colores: ['Rosa', 'Azul'],
            stock: 22,
            rating: 4.7,
            reviews: 58,
            etiqueta: ''
        },
        'camiseta deportiva junior': {
            descripcion: 'Camiseta deportiva infantil de tejido transpirable. Liviana, fresca y cómoda para entrenar o jugar.',
            caracteristicas: ['Tejido transpirable de secado rápido', 'Cuello redondo elástico', 'Estampado resistente al lavado'],
            material: '100% poliéster reciclado',
            cuidados: 'Lavar a máquina en frío, no usar blanqueador',
            tallas: ['6', '8', '10', '12', '14'],
            colores: ['Blanco', 'Negro', 'Rojo'],
            stock: 25,
            rating: 4.6,
            reviews: 47,
            etiqueta: ''
        },
        'polera manga larga infantil': {
            descripcion: 'Polera de manga larga infantil de algodón suave. Abriga sin irritar la piel y resiste los lavados frecuentes.',
            caracteristicas: ['Algodón suave hipoalergénico', 'Manga larga con puño elástico', 'Corte cómodo para movimiento libre'],
            material: '100% algodón',
            cuidados: 'Lavar a máquina en frío, secar a la sombra',
            tallas: ['4', '6', '8', '10', '12'],
            colores: ['Azul marino', 'Gris'],
            stock: 19,
            rating: 4.7,
            reviews: 39,
            etiqueta: ''
        },
        'zapatillas casual velcro': {
            descripcion: 'Zapatillas casuales con cierre de velcro y suela flexible. Fáciles de poner y muy cómodas para el día a día.',
            caracteristicas: ['Cierre de velcro ajustable', 'Suela flexible antideslizante', 'Plantilla interior acolchada'],
            material: 'Lona textil y goma',
            cuidados: 'Limpiar con paño húmedo y cepillo suave',
            tallas: ['28', '29', '30', '31', '32', '33', '34'],
            colores: ['Blanco', 'Negro'],
            stock: 8,
            rating: 4.5,
            reviews: 31,
            etiqueta: ''
        },
        'pantalon buzo deportivo junior': {
            descripcion: 'Pantalón de buzo deportivo infantil con cintura elástica y bolsillos laterales. Libertad de movimiento para jugar y entrenar.',
            caracteristicas: ['Cintura elástica con cordón', 'Bolsillos laterales amplios', 'Puños acanalados en tobillos'],
            material: '70% algodón, 30% poliéster',
            cuidados: 'Lavar a máquina en frío, no usar secadora',
            tallas: ['6', '8', '10', '12', '14'],
            colores: ['Gris', 'Negro'],
            stock: 17,
            rating: 4.7,
            reviews: 42,
            etiqueta: ''
        },
        'gorro y bufanda de invierno': {
            descripcion: 'Set de gorro y bufanda infantiles de tejido suave. Abrigo cálido y colorido para los días más fríos.',
            caracteristicas: ['Tejido suave que no irrita', 'Set de dos piezas combinables', 'Diseño elástico que se adapta'],
            material: '100% acrílico suave',
            cuidados: 'Lavar a mano en agua fría, secar en plano',
            tallas: ['Único'],
            colores: ['Rojo', 'Gris', 'Azul'],
            stock: 20,
            rating: 4.6,
            reviews: 28,
            etiqueta: ''
        },
        'poleron clasico de hombre': {
            descripcion: 'Polerón clásico de hombre con cuello redondo y algodón de alto gramaje. Un básico atemporal para el día a día.',
            caracteristicas: ['Algodón de alto gramaje', 'Corte regular cómodo', 'Costuras reforzadas de larga duración'],
            material: '85% algodón, 15% poliéster',
            cuidados: 'Lavar del revés en frío, secar a la sombra',
            tallas: ['S', 'M', 'L', 'XL', 'XXL'],
            colores: ['Negro', 'Azul marino', 'Beige'],
            stock: 15,
            rating: 4.8,
            reviews: 105,
            etiqueta: 'Más vendido'
        },
        'zapatillas urbanas de hombre': {
            descripcion: 'Zapatillas urbanas de perfil bajo con suela de goma y acabado premium. Estilo casual para combinar con todo.',
            caracteristicas: ['Upper de cuero sintético premium', 'Suela de goma antideslizante', 'Plantilla acolchada extraíble'],
            material: 'Cuero sintético y textil',
            cuidados: 'Limpiar con paño húmedo, no lavar a máquina',
            tallas: ['39', '40', '41', '42', '43', '44', '45'],
            colores: ['Blanco', 'Negro'],
            stock: 10,
            rating: 4.7,
            reviews: 88,
            etiqueta: ''
        },
        'gorro y mochila urbanos': {
            descripcion: 'Set urbano de gorro de punto y mochila compacta. Práctico y con estilo para moverte por la ciudad.',
            caracteristicas: ['Mochila con compartimento acolchado', 'Gorro de punto elástico', 'Tejidos resistentes al uso diario'],
            material: 'Poliéster y acrílico',
            cuidados: 'Limpiar con paño húmedo, lavar el gorro a mano',
            tallas: ['Único'],
            colores: ['Negro', 'Camel'],
            stock: 12,
            rating: 4.5,
            reviews: 34,
            etiqueta: ''
        },
        'tenis deportivos de running': {
            descripcion: 'Tenis de running con entresuela de espuma reactiva y malla liviana. Impulso y comodidad en cada zancada.',
            caracteristicas: ['Espuma reactiva de alta respuesta', 'Malla liviana y transpirable', 'Refuerzo en talón para mayor estabilidad'],
            material: 'Malla textil y goma',
            cuidados: 'Limpiar con paño húmedo y cepillo suave',
            tallas: ['39', '40', '41', '42', '43', '44', '45'],
            colores: ['Azul', 'Negro', 'Blanco'],
            stock: 9,
            rating: 4.9,
            reviews: 176,
            etiqueta: 'Nuevo'
        },
        'botella deportiva termica': {
            descripcion: 'Botella térmica de acero inoxidable que mantiene las bebidas frías hasta 24 horas y calientes hasta 12. Incluye asa transportadora.',
            caracteristicas: ['Acero inoxidable de doble pared', 'Mantiene frío 24 h / caliente 12 h', 'Tapa hermética con asa'],
            material: 'Acero inoxidable 304',
            cuidados: 'Lavar a mano con agua tibia y jabón suave',
            etiquetaTalla: 'Formato',
            tallas: ['500 ml', '750 ml'],
            colores: ['Acero', 'Negro', 'Azul'],
            stock: 30,
            rating: 4.8,
            reviews: 221,
            etiqueta: 'Más vendido'
        },
        'mochila de entrenamiento': {
            descripcion: 'Mochila de entrenamiento con compartimento para calzado y bolsillo para botella. Organiza todo lo que necesitas para entrenar.',
            caracteristicas: ['Compartimento ventilado para calzado', 'Bolsillo lateral para botella', 'Tirantes acolchados ajustables'],
            material: 'Poliéster 600D resistente al agua',
            cuidados: 'Limpiar con paño húmedo, no lavar a máquina',
            tallas: ['Único'],
            colores: ['Negro', 'Azul'],
            stock: 14,
            rating: 4.7,
            reviews: 67,
            etiqueta: ''
        },
        'gorra deportiva ajustable': {
            descripcion: 'Gorra deportiva ajustable con visera curva y paneles transpirables. Protección y estilo para entrenar al aire libre.',
            caracteristicas: ['Paneles de malla transpirable', 'Cierre ajustable trasero', 'Visera curva con protección solar'],
            material: 'Poliéster y algodón',
            cuidados: 'Lavar a mano en agua fría, secar al aire',
            tallas: ['Único'],
            colores: ['Negro', 'Blanco', 'Rojo'],
            stock: 21,
            rating: 4.6,
            reviews: 54,
            etiqueta: ''
        },
        'set de entrenamiento en casa': {
            descripcion: 'Set de entrenamiento para casa con banda elástica, cuerdas y accesorios básicos. Todo lo necesario para empezar a moverte.',
            caracteristicas: ['Banda elástica de tres resistencias', 'Cuerda de saltar ajustable', 'Bolsa de transporte incluida'],
            material: 'Látex, PVC y poliéster',
            cuidados: 'Limpiar con paño húmedo después de cada uso',
            tallas: ['Único'],
            colores: ['Negro'],
            stock: 5,
            rating: 4.7,
            reviews: 43,
            etiqueta: 'Últimas unidades'
        },
        'munequeras y cinta deportiva': {
            descripcion: 'Set de muñequeras absorbentes y cinta deportiva para mayor soporte y comodidad durante el entrenamiento.',
            caracteristicas: ['Muñequeras de algodón absorbente', 'Cinta elástica de soporte', 'Set de 2 muñequeras + 1 cinta'],
            material: 'Algodón y elastano',
            cuidados: 'Lavar a mano en agua fría, secar al aire',
            tallas: ['Único'],
            colores: ['Negro', 'Blanco'],
            stock: 26,
            rating: 4.5,
            reviews: 36,
            etiqueta: ''
        }
    };

    var METODOS = {
        'tarjeta': 'Tarjeta de crédito/débito',
        'paypal': 'PayPal',
        'mercadopago': 'Mercado Pago',
        'transferencia': 'Transferencia bancaria',
        'contra-entrega': 'Pago contra entrega'
    };

    var PAGOS_POR_DEFECTO = ['tarjeta', 'paypal', 'mercadopago', 'transferencia', 'contra-entrega'];

    var modal = null;
    var productoActual = null;
    var ultimoFoco = null;

    /* ----------------------------------------------------------------------
       2. Utilidades
       ---------------------------------------------------------------------- */
    function normalizar(texto) {
        return String(texto || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function esc(texto) {
        return String(texto == null ? '' : texto).replace(/[&<>"']/g, function (caracter) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[caracter];
        });
    }

    function parsearPrecio(texto) {
        var original = String(texto || '');
        var limpio = original.replace(/[^\d.,]/g, '');
        var simbolo = original.indexOf('$') !== -1 ? '$' : '€';

        if (limpio.indexOf(',') !== -1) {
            limpio = limpio.replace(/\./g, '').replace(',', '.');
        } else {
            var partes = limpio.split('.');
            if (partes.length > 2 || (partes.length === 2 && partes[1].length > 2)) {
                limpio = partes.join('');
            }
        }

        return {
            valor: parseFloat(limpio) || 0,
            symbol: simbolo
        };
    }

    function formatearDinero(valor, simbolo) {
        var numero = Number(valor || 0).toFixed(2);
        if (simbolo === '€') {
            return numero.replace('.', ',') + ' €';
        }
        return '$' + numero;
    }

    function mezclar(base, extra) {
        var resultado = {};
        var clave;

        for (clave in base) {
            if (Object.prototype.hasOwnProperty.call(base, clave)) {
                resultado[clave] = base[clave];
            }
        }
        for (clave in extra) {
            if (Object.prototype.hasOwnProperty.call(extra, clave)) {
                resultado[clave] = extra[clave];
            }
        }

        return resultado;
    }

    function infoPorCategoria(categoria, marca) {
        var cat = normalizar(categoria);
        var base = {
            descripcion: 'Producto de ' + String(categoria || 'moda').toLowerCase() + ' de ' + marca + ', confeccionado con materiales de calidad y un diseño pensado para acompañarte todos los días.',
            caracteristicas: ['Materiales de alta durabilidad', 'Diseño cómodo y versátil', 'Garantía oficial de 12 meses'],
            material: 'Materiales textiles de alta calidad',
            cuidados: 'Lavar a mano o a máquina en ciclo suave',
            tallas: ['S', 'M', 'L', 'XL'],
            colores: ['Negro', 'Blanco', 'Gris'],
            stock: 10,
            rating: 4.7,
            reviews: 64,
            etiqueta: '',
            imagen: '',
            pagos: PAGOS_POR_DEFECTO.slice()
        };

        if (cat.indexOf('zapatilla') !== -1 || cat.indexOf('tenis') !== -1) {
            base.tallas = ['39', '40', '41', '42', '43', '44'];
            base.material = 'Malla textil y goma';
            base.cuidados = 'Limpiar con paño húmedo, no lavar a máquina';
        } else if (cat.indexOf('accesorio') !== -1 || cat.indexOf('equipamiento') !== -1) {
            base.tallas = ['Único'];
        }

        return base;
    }

    function obtenerInfo(titulo, categoria, marca) {
        var base = infoPorCategoria(categoria, marca);
        var extra = CATALOGO[normalizar(titulo)] || {};
        var info = mezclar(base, extra);

        if (!info.pagos || !info.pagos.length) {
            info.pagos = PAGOS_POR_DEFECTO.slice();
        }

        return info;
    }

    function extraerImagen(elemento) {
        if (!elemento) {
            return '';
        }
        var estilo = elemento.style ? elemento.style.backgroundImage : '';
        if (!estilo) {
            return '';
        }
        var coincidencia = estilo.match(/url\(["']?(.+?)["']?\)/);
        return coincidencia ? coincidencia[1] : '';
    }

    function leerProducto(tarjeta) {
        var enlace = tarjeta.querySelector('.product-card__link');
        var tituloEl = tarjeta.querySelector('.product-card__title');
        var categoriaEl = tarjeta.querySelector('.product-card__category');
        var marcaEl = tarjeta.querySelector('.product-card__brand');
        var precioEl = tarjeta.querySelector('.product-card__current');
        var precioAnteriorEl = tarjeta.querySelector('.product-card__original');

        var titulo = tituloEl ? tituloEl.textContent.trim() : 'Producto Valdez';
        var categoria = categoriaEl ? categoriaEl.textContent.trim() : 'Moda';
        var marca = marcaEl ? marcaEl.textContent.trim() : 'Valdez';
        var info = obtenerInfo(titulo, categoria, marca);

        var href = enlace ? enlace.getAttribute('href') : '';
        var coincidenciaId = String(href || '').match(/\/producto\/([^/?#]+)/);
        var id = coincidenciaId ? coincidenciaId[1] : normalizar(titulo).replace(/\s+/g, '-');

        var imagen = extraerImagen(tarjeta.querySelector('.product-card__image')) || info.imagen;
        var precio = parsearPrecio(precioEl ? precioEl.textContent : '0');
        var precioAnterior = precioAnteriorEl ? parsearPrecio(precioAnteriorEl.textContent) : null;

        if (precioAnterior && precioAnterior.valor <= precio.valor) {
            precioAnterior = null;
        }

        return {
            id: id,
            titulo: titulo,
            categoria: categoria,
            marca: marca,
            imagen: imagen,
            precio: precio,
            precioAnterior: precioAnterior,
            info: info
        };
    }

    function opciones(valores) {
        return valores.map(function (valor) {
            return '<option value="' + esc(valor) + '">' + esc(valor) + '</option>';
        }).join('');
    }

    function iconoPago(metodo) {
        if (metodo === 'tarjeta') {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"></rect><path d="M2 10h20"></path></svg>';
        }
        if (metodo === 'paypal') {
            return 'PP';
        }
        if (metodo === 'mercadopago') {
            return 'MP';
        }
        if (metodo === 'transferencia') {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10h18"></path><path d="M5 10V7l7-4 7 4v3"></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8"></path><path d="M3 21h18"></path></svg>';
        }
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2.5"></circle><path d="M6 10v4M18 10v4"></path></svg>';
    }

    function claseIconoPago(metodo) {
        if (metodo === 'paypal') {
            return ' pago-option__icono--pp';
        }
        if (metodo === 'mercadopago') {
            return ' pago-option__icono--mp';
        }
        return '';
    }

    function opcionPago(metodo, activo) {
        var etiquetas = {
            'tarjeta': { titulo: 'Tarjeta', sub: 'Crédito o débito' },
            'paypal': { titulo: 'PayPal', sub: 'Paga con tu cuenta' },
            'mercadopago': { titulo: 'Mercado Pago', sub: 'Saldo o tarjetas' },
            'transferencia': { titulo: 'Transferencia', sub: 'Débito bancario' },
            'contra-entrega': { titulo: 'Contra entrega', sub: 'Paga al recibir' }
        };
        var etiqueta = etiquetas[metodo] || { titulo: metodo, sub: '' };

        return '<label class="pago-option">' +
            '<input class="pago-option__radio" type="radio" name="pf-pago" value="' + esc(metodo) + '"' + (activo ? ' checked' : '') + '>' +
            '<span class="pago-option__caja">' +
                '<span class="pago-option__icono' + claseIconoPago(metodo) + '">' + iconoPago(metodo) + '</span>' +
                '<span class="pago-option__texto">' +
                    '<strong>' + esc(etiqueta.titulo) + '</strong>' +
                    '<small>' + esc(etiqueta.sub) + '</small>' +
                '</span>' +
                '<span class="pago-option__check" aria-hidden="true"></span>' +
            '</span>' +
        '</label>';
    }

    function panelPago(metodo, activo) {
        var contenido = '';

        if (metodo === 'tarjeta') {
            contenido =
                '<div class="producto-form__grid">' +
                    '<div class="producto-form__field producto-form__field--full">' +
                        '<label for="pf-tarjeta">Número de tarjeta</label>' +
                        '<input type="text" id="pf-tarjeta" name="tarjeta" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" maxlength="19" pattern="[0-9 ]{15,19}" title="Ingresa entre 15 y 19 dígitos" data-formato="tarjeta" required>' +
                    '</div>' +
                    '<div class="producto-form__field producto-form__field--full">' +
                        '<label for="pf-titular">Nombre del titular</label>' +
                        '<input type="text" id="pf-titular" name="titular" autocomplete="cc-name" placeholder="Como aparece en la tarjeta" minlength="3" required>' +
                    '</div>' +
                    '<div class="producto-form__field">' +
                        '<label for="pf-vencimiento">Vencimiento</label>' +
                        '<input type="text" id="pf-vencimiento" name="vencimiento" autocomplete="cc-exp" inputmode="numeric" placeholder="MM/AA" maxlength="5" pattern="(0[1-9]|1[0-2])/[0-9]{2}" title="Usa el formato MM/AA" data-formato="vencimiento" required>' +
                    '</div>' +
                    '<div class="producto-form__field">' +
                        '<label for="pf-cvv">CVV</label>' +
                        '<input type="password" id="pf-cvv" name="cvv" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4" minlength="3" pattern="[0-9]{3,4}" title="3 o 4 dígitos de seguridad" required>' +
                    '</div>' +
                    '<div class="producto-form__field producto-form__field--full">' +
                        '<label for="pf-cuotas">Cuotas</label>' +
                        '<select id="pf-cuotas" name="cuotas" required>' +
                            '<option value="1">1 pago sin interés</option>' +
                            '<option value="3">3 cuotas sin interés</option>' +
                            '<option value="6">6 cuotas sin interés</option>' +
                            '<option value="12">12 cuotas sin interés</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<p class="pago-panel__nota">Tus datos se encriptan mediante conexión segura. No almacenamos el número completo de tu tarjeta.</p>';
        } else if (metodo === 'paypal') {
            contenido =
                '<div class="producto-form__field">' +
                    '<label for="pf-paypal-email">Correo de PayPal</label>' +
                    '<input type="email" id="pf-paypal-email" name="paypal-email" autocomplete="email" placeholder="tu@email.com" required>' +
                '</div>' +
                '<p class="pago-panel__nota">Al confirmar, te redirigiremos a <strong>PayPal</strong> para completar el pago de forma segura. No compartimos tus datos bancarios.</p>';
        } else if (metodo === 'mercadopago') {
            contenido =
                '<p class="pago-panel__nota">Paga con tu <strong>saldo de Mercado Pago</strong> o con las tarjetas guardadas en tu cuenta. Te llevaremos a Mercado Pago para finalizar la compra sin costo adicional.</p>';
        } else if (metodo === 'transferencia') {
            contenido =
                '<div class="pago-datos">' +
                    '<div class="pago-datos__fila"><span>Banco</span><strong>Banco Estado</strong></div>' +
                    '<div class="pago-datos__fila"><span>Titular</span><strong>Valdez Retail S.A.</strong></div>' +
                    '<div class="pago-datos__fila"><span>Cuenta RUT</span><strong>12.345.678-9</strong></div>' +
                    '<div class="pago-datos__fila"><span>Correo</span><strong>pagos@valdez.com</strong></div>' +
                '</div>' +
                '<p class="pago-panel__nota">Transfiere el total y envía el comprobante a <strong>pagos@valdez.com</strong>. Tu pedido se prepara al confirmar el pago.</p>';
        } else if (metodo === 'contra-entrega') {
            contenido =
                '<p class="pago-panel__nota">Paga en <strong>efectivo o con tarjeta</strong> al recibir tu pedido. Disponible en zonas urbanas.</p>' +
                '<p class="pago-panel__nota">Ten listo el monto exacto. El repartidor emitirá tu boleta al momento de la entrega.</p>';
        }

        return '<div class="pago-panel" data-panel="' + esc(metodo) + '"' + (activo ? '' : ' hidden') + '>' + contenido + '</div>';
    }

    /* ----------------------------------------------------------------------
       3. Plantilla del modal
       ---------------------------------------------------------------------- */
    function plantilla(producto) {
        var info = producto.info;
        var metodoInicial = info.pagos[0];
        var imagen = producto.imagen || info.imagen || '';
        var precioActual = formatearDinero(producto.precio.valor, producto.precio.symbol);
        var descuento = '';

        if (producto.precioAnterior) {
            var porcentaje = Math.round((1 - producto.precio.valor / producto.precioAnterior.valor) * 100);
            descuento = '<span class="producto-modal__descuento">-' + porcentaje + '%</span>';
        }

        return '<div class="producto-modal__overlay" data-cerrar></div>' +
            '<div class="producto-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="pf-titulo" tabindex="-1">' +
                '<button type="button" class="producto-modal__cerrar" data-cerrar aria-label="Cerrar ficha del producto">&times;</button>' +
                '<div class="producto-modal__grid">' +
                    '<aside class="producto-modal__media">' +
                        '<div class="producto-modal__imagen" role="img" aria-label="' + esc(producto.titulo) + '" style="background-image: url(\'' + esc(imagen) + '\');">' +
                            (info.etiqueta ? '<span class="producto-modal__etiqueta">' + esc(info.etiqueta) + '</span>' : '') +
                        '</div>' +
                        '<ul class="producto-modal__beneficios">' +
                            '<li><span class="producto-modal__beneficio-icono" aria-hidden="true">✓</span>Envío gratis en pedidos superiores a 50</li>' +
                            '<li><span class="producto-modal__beneficio-icono" aria-hidden="true">↺</span>Devoluciones sin costo durante 30 días</li>' +
                            '<li><span class="producto-modal__beneficio-icono" aria-hidden="true">🔒</span>Pago protegido con datos encriptados</li>' +
                        '</ul>' +
                    '</aside>' +
                    '<div class="producto-modal__contenido">' +
                        '<form class="producto-form" id="producto-form" novalidate>' +
                            '<div class="producto-modal__cabecera">' +
                                '<p class="producto-modal__eyebrow">' + esc(producto.categoria) + '</p>' +
                                '<h2 class="producto-modal__titulo" id="pf-titulo">' + esc(producto.titulo) + '</h2>' +
                                '<p class="producto-modal__marca">Marca <strong>' + esc(producto.marca) + '</strong></p>' +
                                '<div class="producto-modal__valoracion">' +
                                    '<span class="producto-modal__estrellas" aria-hidden="true">★★★★★</span>' +
                                    '<strong>' + Number(info.rating).toFixed(1) + '</strong>' +
                                    '<span>(' + info.reviews + ' valoraciones)</span>' +
                                    '<span aria-hidden="true">·</span>' +
                                    '<span>' + info.stock + ' unidades disponibles</span>' +
                                '</div>' +
                                '<div class="producto-modal__precio">' +
                                    '<span class="producto-modal__precio-actual">' + precioActual + '</span>' +
                                    (producto.precioAnterior ? '<span class="producto-modal__precio-antes">' + formatearDinero(producto.precioAnterior.valor, producto.precio.symbol) + '</span>' : '') +
                                    descuento +
                                '</div>' +
                                '<p class="producto-modal__descripcion">' + esc(info.descripcion) + '</p>' +
                                '<ul class="producto-modal__caracteristicas">' +
                                    info.caracteristicas.map(function (item) {
                                        return '<li>' + esc(item) + '</li>';
                                    }).join('') +
                                '</ul>' +
                            '</div>' +

                            '<section class="producto-form__seccion" aria-labelledby="pf-seccion-variante">' +
                                '<h3 class="producto-form__seccion-titulo" id="pf-seccion-variante"><span class="producto-form__paso">1</span>Elige tu variante</h3>' +
                                '<div class="producto-form__grid producto-form__grid--variantes">' +
                                    '<div class="producto-form__field">' +
                                        '<label for="pf-talla">' + esc(info.etiquetaTalla || 'Talla') + '</label>' +
                                        '<select id="pf-talla" name="talla" required>' + opciones(info.tallas) + '</select>' +
                                    '</div>' +
                                    '<div class="producto-form__field">' +
                                        '<label for="pf-color">Color</label>' +
                                        '<select id="pf-color" name="color" required>' + opciones(info.colores) + '</select>' +
                                    '</div>' +
                                    '<div class="producto-form__field">' +
                                        '<label for="pf-cantidad">Cantidad</label>' +
                                        '<div class="producto-cantidad">' +
                                            '<button type="button" class="producto-cantidad__btn" data-cantidad="-1" aria-label="Disminuir cantidad">−</button>' +
                                            '<input type="number" id="pf-cantidad" name="cantidad" value="1" min="1" max="' + info.stock + '" inputmode="numeric" required>' +
                                            '<button type="button" class="producto-cantidad__btn" data-cantidad="1" aria-label="Aumentar cantidad">+</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<p class="producto-form__nota"><strong>Material:</strong> ' + esc(info.material) + ' · <strong>Cuidados:</strong> ' + esc(info.cuidados) + '</p>' +
                            '</section>' +

                            '<section class="producto-form__seccion" aria-labelledby="pf-seccion-entrega">' +
                                '<h3 class="producto-form__seccion-titulo" id="pf-seccion-entrega"><span class="producto-form__paso">2</span>Datos de entrega</h3>' +
                                '<div class="producto-form__grid">' +
                                    '<div class="producto-form__field">' +
                                        '<label for="pf-nombre">Nombre completo</label>' +
                                        '<input type="text" id="pf-nombre" name="nombre" autocomplete="name" placeholder="Tu nombre" minlength="3" required>' +
                                    '</div>' +
                                    '<div class="producto-form__field">' +
                                        '<label for="pf-email">Correo electrónico</label>' +
                                        '<input type="email" id="pf-email" name="email" autocomplete="email" placeholder="tu@email.com" required>' +
                                    '</div>' +
                                    '<div class="producto-form__field">' +
                                        '<label for="pf-telefono">Teléfono</label>' +
                                        '<input type="tel" id="pf-telefono" name="telefono" autocomplete="tel" placeholder="+56 9 1234 5678" minlength="8" pattern="[0-9 +]{8,20}" title="Ingresa un teléfono válido" required>' +
                                    '</div>' +
                                    '<div class="producto-form__field">' +
                                        '<label for="pf-ciudad">Ciudad / Comuna</label>' +
                                        '<input type="text" id="pf-ciudad" name="ciudad" autocomplete="address-level2" placeholder="Tu ciudad" minlength="2" required>' +
                                    '</div>' +
                                    '<div class="producto-form__field producto-form__field--full">' +
                                        '<label for="pf-direccion">Dirección de entrega</label>' +
                                        '<input type="text" id="pf-direccion" name="direccion" autocomplete="street-address" placeholder="Calle, número, departamento" minlength="5" required>' +
                                    '</div>' +
                                '</div>' +
                            '</section>' +

                            '<section class="producto-form__seccion" aria-labelledby="pf-seccion-pago">' +
                                '<h3 class="producto-form__seccion-titulo" id="pf-seccion-pago"><span class="producto-form__paso">3</span>Método de pago</h3>' +
                                '<div class="pago-opciones" role="radiogroup" aria-label="Método de pago">' +
                                    info.pagos.map(function (metodo) {
                                        return opcionPago(metodo, metodo === metodoInicial);
                                    }).join('') +
                                '</div>' +
                                info.pagos.map(function (metodo) {
                                    return panelPago(metodo, metodo === metodoInicial);
                                }).join('') +
                            '</section>' +

                            '<div class="resumen-compra" aria-live="polite">' +
                                '<div class="resumen-compra__fila"><span>Producto (x<span data-resumen-cantidad>1</span>)</span><span id="pf-subtotal">' + precioActual + '</span></div>' +
                                '<div class="resumen-compra__fila"><span>Envío</span><span id="pf-envio">—</span></div>' +
                                '<div class="resumen-compra__fila resumen-compra__fila--total"><span>Total</span><span id="pf-total">' + precioActual + '</span></div>' +
                            '</div>' +
                            '<button type="submit" class="producto-form__submit">Confirmar compra · ' + precioActual + '</button>' +
                            '<p class="producto-form__seguro"><span aria-hidden="true">🔒</span> Pago 100% seguro · Certificado SSL</p>' +
                        '</form>' +

                        '<div class="producto-exito" hidden>' +
                            '<div class="producto-exito__icono" aria-hidden="true">✓</div>' +
                            '<p class="producto-exito__eyebrow">Pedido confirmado</p>' +
                            '<h2 class="producto-exito__titulo" id="pf-exito-titulo">¡Gracias por tu compra!</h2>' +
                            '<p class="producto-exito__texto">Enviamos la confirmación a <strong data-exito-email></strong>.</p>' +
                            '<div class="producto-exito__resumen">' +
                                '<div class="producto-exito__fila"><span>Número de pedido</span><strong data-exito-numero></strong></div>' +
                                '<div class="producto-exito__fila"><span>Producto</span><strong data-exito-producto></strong></div>' +
                                '<div class="producto-exito__fila"><span>Talla / Color</span><strong data-exito-variante></strong></div>' +
                                '<div class="producto-exito__fila"><span>Cantidad</span><strong data-exito-cantidad></strong></div>' +
                                '<div class="producto-exito__fila"><span>Método de pago</span><strong data-exito-pago></strong></div>' +
                                '<div class="producto-exito__fila producto-exito__fila--total"><span>Total</span><strong data-exito-total></strong></div>' +
                            '</div>' +
                            '<div class="producto-exito__acciones">' +
                                '<button type="button" class="btn btn--primary" data-cerrar>Seguir comprando</button>' +
                                '<a href="cart.html" class="producto-btn-secundario">Ver mi carrito</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /* ----------------------------------------------------------------------
       4. Cálculos y comportamiento del formulario
       ---------------------------------------------------------------------- */
    function actualizarPanelesPago() {
        var seleccionado = modal.querySelector('input[name="pf-pago"]:checked');
        var metodo = seleccionado ? seleccionado.value : '';

        modal.querySelectorAll('.pago-panel').forEach(function (panel) {
            var activo = panel.getAttribute('data-panel') === metodo;
            panel.hidden = !activo;

            panel.querySelectorAll('input, select').forEach(function (campo) {
                campo.disabled = !activo;
            });
        });
    }

    function actualizarResumen() {
        if (!productoActual) {
            return;
        }

        var entradaCantidad = modal.querySelector('#pf-cantidad');
        if (!entradaCantidad) {
            return;
        }

        var cantidad = parseInt(entradaCantidad.value, 10);
        if (isNaN(cantidad) || cantidad < 1) {
            cantidad = 1;
        }
        if (cantidad > productoActual.info.stock) {
            cantidad = productoActual.info.stock;
        }

        var simbolo = productoActual.precio.symbol;
        var subtotal = productoActual.precio.valor * cantidad;
        var envio = subtotal >= 50 ? 0 : 4.99;
        var total = subtotal + envio;

        var subtotalEl = modal.querySelector('#pf-subtotal');
        var envioEl = modal.querySelector('#pf-envio');
        var totalEl = modal.querySelector('#pf-total');
        var cantidadEl = modal.querySelector('[data-resumen-cantidad]');
        var boton = modal.querySelector('.producto-form__submit');

        if (subtotalEl) {
            subtotalEl.textContent = formatearDinero(subtotal, simbolo);
        }
        if (envioEl) {
            envioEl.textContent = envio === 0 ? 'Gratis' : formatearDinero(envio, simbolo);
        }
        if (totalEl) {
            totalEl.textContent = formatearDinero(total, simbolo);
        }
        if (cantidadEl) {
            cantidadEl.textContent = cantidad;
        }
        if (boton) {
            boton.textContent = 'Confirmar compra · ' + formatearDinero(total, simbolo);
        }
    }

    function cambiarCantidad(delta) {
        var entrada = modal.querySelector('#pf-cantidad');
        if (!entrada) {
            return;
        }

        var maximo = parseInt(entrada.getAttribute('max'), 10) || 99;
        var cantidad = parseInt(entrada.value, 10) || 1;
        cantidad = Math.min(maximo, Math.max(1, cantidad + delta));
        entrada.value = cantidad;
        actualizarResumen();
    }

    function formatearCampo(campo) {
        var formato = campo.getAttribute('data-formato');

        if (formato === 'tarjeta') {
            var digitos = campo.value.replace(/\D/g, '').slice(0, 19);
            campo.value = digitos.replace(/(.{4})/g, '$1 ').trim();
        } else if (formato === 'vencimiento') {
            var numeros = campo.value.replace(/\D/g, '').slice(0, 4);
            campo.value = numeros.length > 2 ? numeros.slice(0, 2) + '/' + numeros.slice(2) : numeros;
        }
    }

    function detallePago(metodo, formulario) {
        if (metodo === 'tarjeta') {
            var tarjeta = formulario.querySelector('#pf-tarjeta');
            var cuotas = formulario.querySelector('#pf-cuotas');
            var digitos = tarjeta ? tarjeta.value.replace(/\D/g, '') : '';
            var detalle = 'Tarjeta terminada en ' + (digitos.slice(-4) || '****');
            if (cuotas && cuotas.selectedIndex >= 0) {
                detalle += ' · ' + cuotas.options[cuotas.selectedIndex].text;
            }
            return detalle;
        }

        if (metodo === 'paypal') {
            var email = formulario.querySelector('#pf-paypal-email');
            return 'PayPal' + (email && email.value.trim() ? ' · ' + email.value.trim() : '');
        }

        return METODOS[metodo] || metodo;
    }

    function guardarPedido(pedido) {
        try {
            var pedidos = JSON.parse(localStorage.getItem('valdez_pedidos') || '[]');
            if (!Array.isArray(pedidos)) {
                pedidos = [];
            }
            pedidos.push(pedido);
            localStorage.setItem('valdez_pedidos', JSON.stringify(pedidos));

            var carrito = JSON.parse(localStorage.getItem('valdez_carrito') || '[]');
            if (!Array.isArray(carrito)) {
                carrito = [];
            }
            carrito.push({
                id: pedido.producto.id,
                titulo: pedido.producto.titulo,
                marca: pedido.producto.marca,
                imagen: pedido.producto.imagen,
                precio: pedido.producto.precioUnitario,
                moneda: pedido.producto.moneda,
                cantidad: pedido.producto.cantidad,
                talla: pedido.producto.talla,
                color: pedido.producto.color,
                numeroPedido: pedido.numero
            });
            localStorage.setItem('valdez_carrito', JSON.stringify(carrito));
        } catch (error) {
            /* localStorage puede no estar disponible; la confirmación se muestra igual. */
        }

        try {
            document.dispatchEvent(new CustomEvent('valdez:pedido', { detail: pedido }));
        } catch (error) {
            /* CustomEvent no disponible en navegadores muy antiguos. */
        }
    }

    function mostrarExito(pedido) {
        var formulario = modal.querySelector('#producto-form');
        var exito = modal.querySelector('.producto-exito');
        if (!formulario || !exito) {
            return;
        }

        formulario.hidden = true;
        exito.hidden = false;

        var numero = exito.querySelector('[data-exito-numero]');
        var email = exito.querySelector('[data-exito-email]');
        var producto = exito.querySelector('[data-exito-producto]');
        var variante = exito.querySelector('[data-exito-variante]');
        var cantidad = exito.querySelector('[data-exito-cantidad]');
        var pago = exito.querySelector('[data-exito-pago]');
        var total = exito.querySelector('[data-exito-total]');

        if (numero) {
            numero.textContent = pedido.numero;
        }
        if (email) {
            email.textContent = pedido.cliente.email;
        }
        if (producto) {
            producto.textContent = pedido.producto.titulo;
        }
        if (variante) {
            variante.textContent = 'Talla ' + pedido.producto.talla + ' · ' + pedido.producto.color;
        }
        if (cantidad) {
            cantidad.textContent = String(pedido.producto.cantidad);
        }
        if (pago) {
            pago.textContent = pedido.pago.etiqueta;
        }
        if (total) {
            total.textContent = formatearDinero(pedido.pago.total, pedido.producto.moneda);
        }

        var dialogo = modal.querySelector('.producto-modal__dialog');
        if (dialogo) {
            dialogo.scrollTop = 0;
            dialogo.setAttribute('aria-labelledby', 'pf-exito-titulo');
        }

        var primerBoton = exito.querySelector('[data-cerrar]');
        if (primerBoton) {
            window.setTimeout(function () {
                primerBoton.focus();
            }, 40);
        }
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        var formulario = evento.target;
        if (!productoActual || !formulario.reportValidity()) {
            return;
        }

        var entradaCantidad = formulario.querySelector('#pf-cantidad');
        var cantidad = parseInt(entradaCantidad ? entradaCantidad.value : '1', 10) || 1;
        cantidad = Math.min(productoActual.info.stock, Math.max(1, cantidad));

        var metodoEl = formulario.querySelector('input[name="pf-pago"]:checked');
        var metodo = metodoEl ? metodoEl.value : 'tarjeta';

        var subtotal = productoActual.precio.valor * cantidad;
        var envio = subtotal >= 50 ? 0 : 4.99;
        var total = subtotal + envio;

        var tallaEl = formulario.querySelector('#pf-talla');
        var colorEl = formulario.querySelector('#pf-color');
        var nombreEl = formulario.querySelector('#pf-nombre');
        var emailEl = formulario.querySelector('#pf-email');
        var telefonoEl = formulario.querySelector('#pf-telefono');
        var direccionEl = formulario.querySelector('#pf-direccion');
        var ciudadEl = formulario.querySelector('#pf-ciudad');

        var pedido = {
            numero: 'VDZ-' + String(Date.now()).slice(-8),
            fecha: new Date().toISOString(),
            producto: {
                id: productoActual.id,
                titulo: productoActual.titulo,
                marca: productoActual.marca,
                categoria: productoActual.categoria,
                imagen: productoActual.imagen,
                talla: tallaEl ? tallaEl.value : '',
                color: colorEl ? colorEl.value : '',
                cantidad: cantidad,
                precioUnitario: productoActual.precio.valor,
                moneda: productoActual.precio.symbol,
                subtotal: subtotal
            },
            cliente: {
                nombre: nombreEl ? nombreEl.value.trim() : '',
                email: emailEl ? emailEl.value.trim() : '',
                telefono: telefonoEl ? telefonoEl.value.trim() : '',
                direccion: direccionEl ? direccionEl.value.trim() : '',
                ciudad: ciudadEl ? ciudadEl.value.trim() : ''
            },
            pago: {
                metodo: metodo,
                etiqueta: METODOS[metodo] || metodo,
                detalle: detallePago(metodo, formulario),
                envio: envio,
                total: total
            }
        };

        guardarPedido(pedido);
        mostrarExito(pedido);
    }

    /* ----------------------------------------------------------------------
       5. Abrir / cerrar modal
       ---------------------------------------------------------------------- */
    function obtenerEnfocables() {
        var seleccion = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        return Array.prototype.filter.call(modal.querySelectorAll(seleccion), function (elemento) {
            return elemento.offsetParent !== null;
        });
    }

    function bloquearFondo(bloquear) {
        var hijos = document.body.children;

        for (var i = 0; i < hijos.length; i += 1) {
            var elemento = hijos[i];

            if (elemento === modal || elemento.tagName === 'SCRIPT') {
                continue;
            }

            if (bloquear) {
                if (!elemento.hasAttribute('inert')) {
                    elemento.setAttribute('inert', '');
                    elemento.setAttribute('data-inerte-modal', '');
                }
            } else if (elemento.hasAttribute('data-inerte-modal')) {
                elemento.removeAttribute('inert');
                elemento.removeAttribute('data-inerte-modal');
            }
        }
    }

    function abrirModal(tarjeta) {
        productoActual = leerProducto(tarjeta);
        ultimoFoco = document.activeElement;

        modal.innerHTML = plantilla(productoActual);
        modal.hidden = false;
        document.body.classList.add('producto-modal-abierto');
        bloquearFondo(true);

        actualizarPanelesPago();
        actualizarResumen();

        var dialogo = modal.querySelector('.producto-modal__dialog');
        if (dialogo) {
            dialogo.scrollTop = 0;
        }

        window.setTimeout(function () {
            var cerrar = modal.querySelector('.producto-modal__cerrar');
            if (cerrar) {
                cerrar.focus();
            }
        }, 40);
    }

    function cerrarModal() {
        if (!modal || modal.hidden) {
            return;
        }

        modal.hidden = true;
        document.body.classList.remove('producto-modal-abierto');
        bloquearFondo(false);
        productoActual = null;

        if (ultimoFoco && typeof ultimoFoco.focus === 'function') {
            ultimoFoco.focus();
        }
    }

    function inicializar() {
        modal = document.createElement('div');
        modal.className = 'producto-modal';
        modal.id = 'producto-modal';
        modal.hidden = true;
        document.body.appendChild(modal);

        document.querySelectorAll('.product-card__link').forEach(function (enlace) {
            enlace.setAttribute('aria-haspopup', 'dialog');
        });

        /* Abrir ficha al hacer clic en el producto */
        document.addEventListener('click', function (evento) {
            var enlace = evento.target.closest ? evento.target.closest('.product-card__link') : null;
            if (!enlace || evento.defaultPrevented) {
                return;
            }

            /* Respetar la apertura en una pestaña nueva */
            if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) {
                return;
            }

            var tarjeta = enlace.closest('.product-card');
            if (!tarjeta) {
                return;
            }

            evento.preventDefault();
            abrirModal(tarjeta);
        });

        /* Botones y controles del modal */
        modal.addEventListener('click', function (evento) {
            if (evento.target.closest('[data-cerrar]')) {
                evento.preventDefault();
                cerrarModal();
                return;
            }

            var botonCantidad = evento.target.closest('[data-cantidad]');
            if (botonCantidad) {
                evento.preventDefault();
                cambiarCantidad(parseInt(botonCantidad.getAttribute('data-cantidad'), 10) || 0);
            }
        });

        modal.addEventListener('change', function (evento) {
            if (evento.target.name === 'pf-pago') {
                actualizarPanelesPago();
            }
            if (evento.target.id === 'pf-cantidad') {
                actualizarResumen();
            }
        });

        modal.addEventListener('input', function (evento) {
            if (evento.target.hasAttribute && evento.target.hasAttribute('data-formato')) {
                formatearCampo(evento.target);
            }
            if (evento.target.id === 'pf-cantidad') {
                actualizarResumen();
            }
        });

        modal.addEventListener('submit', function (evento) {
            if (evento.target.id === 'producto-form') {
                manejarEnvio(evento);
            }
        });

        /* Cerrar con Escape y mantener el foco dentro del modal */
        document.addEventListener('keydown', function (evento) {
            if (!modal || modal.hidden) {
                return;
            }

            if (evento.key === 'Escape') {
                evento.preventDefault();
                cerrarModal();
                return;
            }

            if (evento.key === 'Tab') {
                var enfocables = obtenerEnfocables();
                if (!enfocables.length) {
                    return;
                }

                var primero = enfocables[0];
                var ultimo = enfocables[enfocables.length - 1];

                if (evento.shiftKey && document.activeElement === primero) {
                    evento.preventDefault();
                    ultimo.focus();
                } else if (!evento.shiftKey && document.activeElement === ultimo) {
                    evento.preventDefault();
                    primero.focus();
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }
})();
