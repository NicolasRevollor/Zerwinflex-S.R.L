# Zerwinflex S.R.L. — Landing Page

## Estructura del proyecto

```
zerwinflex/
├── index.html          ← Página principal
├── css/
│   └── styles.css      ← Todos los estilos
├── js/
│   └── main.js         ← JavaScript (animaciones, nav activo)
├── img/
│   ├── tienda-exterior.jpg     ← Foto fachada / exterior
│   ├── tienda-interior.jpg     ← Foto interior (galería grande)
│   ├── vinil-colores.jpg       ← Rollos de vinil (galería)
│   ├── lonas-exhibicion.jpg    ← Lonas en tienda (galería)
│   └── lonas-gramajes.jpg      ← Foto para sección de gramajes
└── README.md
```

## Cómo usar

1. Abrir la carpeta `zerwinflex/` en VSCode
2. Instalar la extensión **Live Server** (si no la tienes)
3. Clic derecho en `index.html` → **Open with Live Server**

## Agregar las fotos reales

Coloca tus imágenes en la carpeta `img/` con estos nombres exactos:

| Archivo                  | Dónde aparece                         |
|--------------------------|---------------------------------------|
| `tienda-exterior.jpg`    | Banda grande bajo el hero             |
| `tienda-interior.jpg`    | Galería (imagen grande izquierda)     |
| `vinil-colores.jpg`      | Galería (imagen pequeña superior)     |
| `lonas-exhibicion.jpg`   | Galería (imagen pequeña inferior)     |
| `lonas-gramajes.jpg`     | Sección de especificaciones técnicas  |

> Si usas nombres distintos, actualiza el atributo `src` en `index.html`.

## Colores de la marca

Definidos como variables CSS en `css/styles.css`:

```css
--zw-yellow:      #F5A800   /* Amarillo Zerwinflex */
--zw-blue:        #1A2E6B   /* Azul marino Zerwinflex */
--zw-blue-light:  #2540A0   /* Azul hover */
```

## Contacto en el código

Para actualizar teléfonos o WhatsApp, busca en `index.html`:
- `+59173194754` → número de WhatsApp
- `+59133325301` → teléfono fijo
- `Margarita@zerwinflex.com.bo` → email
