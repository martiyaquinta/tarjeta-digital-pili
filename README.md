# Tarjeta Digital Pili

Tarjeta de invitación digital para fiesta de XV años.

## Archivos

- `index.html` - Estructura HTML de la tarjeta
- `styles.css` - Estilos y diseño responsive
- `script.js` - Funcionalidad interactiva (contador, formulario, etc.)

## Cómo usar

1. Abre `index.html` en tu navegador
2. Personaliza los textos, fechas e imágenes según necesites
3. Para ver cambios en tiempo real, usa Live Server en VS Code

## Personalización rápida

### Cambiar título y mensaje principal
Edita en `index.html` las líneas:
- Título: `<h1 class="hero-title">MIS XV ICHU</h1>`
- Mensaje: `<p class="hero-message">...</p>`

### Cambiar fecha del evento
Edita en `script.js` la línea:
```javascript
const targetDate = new Date('2026-09-05T21:30:00').getTime();
```

### Cambiar colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --color-blanco: #FFFFFF;
    --color-negro: #c2a990;
    ...
}
```

### Cambiar imagen de fondo
Edita en `styles.css` la propiedad:
```css
background-image: url(TU_IMAGEN_AQUI);
```
