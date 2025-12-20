# MICROSPORT - Tienda de Zapatillas de Microfútbol ⚽

![Angular](https://img.shields.io/badge/Angular-21.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan)
![PWA](https://img.shields.io/badge/PWA-Ready-green)

Tienda online de zapatillas de microfútbol con diseño moderno, tema dark/neon yellow y experiencia de usuario optimizada.

## 🚀 Características

- ✅ **PWA (Progressive Web App)** - Instalable como app nativa
- ✅ **Lazy Loading** - Carga optimizada de imágenes y rutas
- ✅ **SEO Optimizado** - Meta tags, Open Graph, Twitter Cards
- ✅ **Skeleton Loaders** - Experiencia de carga fluida
- ✅ **Toast Notifications** - Mensajes elegantes con 4 tipos
- ✅ **Breadcrumbs** - Navegación intuitiva
- ✅ **Carrito de Compras** - Con persistencia en localStorage
- ✅ **Integración WhatsApp** - Checkout directo por WhatsApp
- ✅ **Responsive Design** - Optimizado para mobile y desktop
- ✅ **Service Worker** - Cache inteligente para mejor performance

## 📦 Tecnologías

- **Framework**: Angular 18+ (Standalone Components)
- **Lenguaje**: TypeScript 5.9
- **Estilos**: Tailwind CSS 4.1 + CSS Variables
- **Iconos**: Lucide Angular
- **Fuentes**: Anton (headings), Manrope (body)
- **PWA**: Angular Service Worker
- **Routing**: Lazy Loading con PreloadAllModules

## 🎨 Diseño

- **Tema**: Dark (#000000) con acentos amarillo neón (#CCFF00)
- **Efectos**: Skew transforms (romboide) en botones
- **Animaciones**: Shimmer loaders, slide-in toasts, hover effects

## 🛠️ Instalación

```bash
# Clonar repositorio
git clone <tu-repo>
cd futbolito

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
# Navega a http://localhost:4200/
```

## 📱 Build para Producción

```bash
# Build optimizado
ng build --configuration production

# Archivos generados en: dist/futbolito/browser
# Bundle size: ~88 KB (comprimido)
```

## 🚢 Deployment

Ver [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) para guías de deployment en:

- Netlify (recomendado)
- Vercel
- Firebase Hosting
- GitHub Pages

## 📊 Performance

- **Initial Bundle**: 88 KB (comprimido)
- **Lazy Chunks**: Product detail (5 KB), Cart (3.6 KB)
- **Lighthouse Score**: Aim for 90+
- **FCP**: < 1.5s
- **LCP**: < 2.5s

## 🔧 Configuración

### WhatsApp

Número configurado: **3192575612**  
Ubicaciones: `cart.ts`, `detail-product.ts`, `product-card.ts`

### PWA

Manifest: `public/manifest.webmanifest`  
Service Worker: `ngsw-config.json`  
Iconos: `public/icons/` (72x72 a 512x512)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/        # Componentes UI
│   │   ├── cart/         # Carrito de compras
│   │   ├── detail-product/
│   │   ├── product-card/
│   │   ├── toast/        # Notificaciones
│   │   ├── header/
│   │   └── footer/
│   ├── shared/           # Componentes compartidos
│   │   ├── skeleton/     # Skeleton loaders
│   │   ├── breadcrumb/   # Navegación
│   │   ├── loading-spinner/
│   │   ├── hero-section/
│   │   └── layout-landing/
│   ├── core/
│   │   ├── models/       # Product model
│   │   └── services/     # Cart, Toast, Product services
│   └── landing/
├── assets/               # Imágenes y recursos
└── public/
    ├── icons/           # PWA icons
    ├── manifest.webmanifest
    ├── robots.txt
    └── sitemap.xml
```

## 🎯 Componentes Clave

### SkeletonComponent

```typescript
<app-skeleton type="product-card"></app-skeleton>
<app-skeleton type="product-detail"></app-skeleton>
```

### Toast Service

```typescript
toastService.success('Producto agregado');
toastService.error('Error al cargar');
toastService.warning('Stock limitado');
toastService.info('Envío gratis en compras >$100');
```

### BreadcrumbComponent

```html
<app-breadcrumb></app-breadcrumb>
<!-- Auto-genera: Home > Categoria > Producto -->
```

## 📝 Documentación Adicional

- [OPTIMIZATIONS.md](OPTIMIZATIONS.md) - Detalles técnicos de optimizaciones
- [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) - Lista completa para deploy

## 🔍 SEO

- Meta description y keywords configurados
- Open Graph tags para compartir en redes
- Twitter Cards para mejor preview
- Sitemap.xml básico incluido
- robots.txt configurado

## 🧪 Testing

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
