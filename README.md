# E-commerce Platform

Este proyecto es una aplicación de e-commerce desarrollada para demostrar habilidades en Next.js (v15 con App Router), Tailwind CSS y React Query (TanStack Query). La aplicación muestra un catálogo de productos, detalles individuales y un carrito de compras, con un diseño responsivo y soporte para temas oscuros/claro.

## Características

- **Next.js 15 con App Router:** Organización moderna de rutas y layouts.
- **Tailwind CSS:** Estilos personalizados, diseño responsivo y soporte para temas oscuros/claro.
- **React Query:** Manejo avanzado de carga, caché, paginación, prefetching y actualizaciones optimistas.
- **Estructura modular:** Componentes reutilizables para Header, Footer, Skeleton, ThemeSwitch y más.
- **Carrito de Compras:** Funcionalidad para agregar, actualizar y eliminar productos, con persistencia en localStorage.
- **Rendimiento y accesibilidad:** Transiciones suaves, optimización en consultas y compatibilidad con ARIA.

## Instalación y Ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu_usuario/e-commerce.git
   cd e-commerce
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construye y ejecuta en producción:**
   ```bash
   npm run build
   npm run start
   ```

## Estructura del Proyecto

La estructura aprovecha el App Router de Next.js. Ejemplo:

```
e-commerce/
├── app/
│   ├── layout.tsx         // Layout raíz (incluye Providers y MainLayout)
│   ├── page.tsx           // Página principal (Home)
│   ├── productos/         // Ruta para el catálogo de productos
│   │   ├── page.tsx       // Página de catálogo de productos
│   │   └── [id]/          // Ruta dinámica para detalle del producto
│   │       └── page.tsx   // Página de detalle del producto
│   └── carrito/           // Ruta para el carrito de compras
│       └── page.tsx       // Página del carrito (o componente drawer integrado)
├── components/            // Componentes reutilizables (Header, Footer, Skeleton, ThemeSwitch, etc.)
├── hooks/                 // Custom hooks (por ejemplo, para autenticación o manejo del carrito)
├── lib/                   // Funciones/utilidades compartidas (llamadas a APIs, helpers, etc.)
├── styles/                // Archivos de estilos globales y configuraciones de Tailwind CSS
├── public/                // Recursos públicos (imágenes, favicon, etc.)
├── .eslintrc.json         // Configuración de ESLint
├── tailwind.config.js     // Configuración de Tailwind CSS
├── package.json
└── README.md
```

### Rutas Clave

- **Página principal (`/`):**  
  Archivo: `app/page.tsx`  
  Contenido: Bienvenida y enlaces a las secciones principales.

- **Catálogo de productos (`/productos`):**  
  Archivo: `app/productos/page.tsx`  
  Contenido: Cuadrícula de productos, paginación y filtros por categoría. Se consumen datos mediante React Query.

- **Detalle del producto (`/productos/[id]`):**  
  Archivo: `app/productos/[id]/page.tsx`  
  Contenido: Detalle completo del producto, imágenes, descripción, precio y variantes. Se implementa prefetching y se muestran productos relacionados.

- **Carrito de Compras (`/carrito`):**  
  Archivo: `app/carrito/page.tsx`  
  Contenido: Lista de productos agregados, resumen de compra y acciones para modificar el carrito. Se utiliza React Query para mutaciones y se persiste en localStorage.

## Decisiones Técnicas y Arquitectónicas

- **Next.js App Router:** Facilita la organización de rutas y layouts, permitiendo la reutilización de componentes (Header, Footer, etc.).
- **Tailwind CSS:** Permite crear un diseño consistente, responsivo y personalizable mediante variables CSS para temas.
- **React Query:** Optimiza la gestión de datos asíncronos, minimizando solicitudes innecesarias y mejorando la experiencia del usuario con estados de carga y error.
- **Persistencia en localStorage:** Mantiene el estado del carrito de compras entre sesiones.

## Despliegue

1. **Repositorio GitHub:**  
   Sube el código a un repositorio para control de versiones.

2. **Despliegue:**  
   Despliega la aplicación en Vercel u otra plataforma similar para hacerla accesible online.

## Contribuciones

Cualquier mejora o sugerencia es bienvenida. Siéntete libre de abrir issues o enviar pull requests.