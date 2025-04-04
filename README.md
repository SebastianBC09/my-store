# E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-blue)](https://nextjs.org/) 
[![React Query](https://img.shields.io/badge/React_Query-5.70.0-red)](https://tanstack.com/query/latest)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-cyan)](https://tailwindcss.com/)
[![Next Themes](https://img.shields.io/badge/next--themes-0.4.6-green)](https://github.com/pacocoursey/next-themes)

Una aplicación de e-commerce moderna que demuestra la integración de Next.js (con App Router), Tailwind CSS y React Query, con un enfoque en arquitectura modular, rendimiento y experiencia de usuario.

---

## 📚 Tabla de Contenidos

1. [🔍 Descripción del Proyecto](#-descripción-del-proyecto)
2. [🚀 Características](#-características)
3. [📂 Estructura del Proyecto](#-estructura-del-proyecto)
4. [⚙️ Configuración y Ejecución Local](#-configuración-y-ejecución-local)
5. [🛠️ Decisiones Técnicas y Arquitectónicas](#-decisiones-técnicas-y-arquitectónicas)
6. [💡 Desafíos y Soluciones](#-desafíos-y-soluciones)
7. [👨‍💻 Autor](#-autor)
8. [📄 Licencia](#-licencia)

---

## 🔍 Descripción del Proyecto

Esta plataforma de e-commerce ha sido desarrollada para demostrar competencias en tecnologías modernas de frontend. La aplicación muestra un catálogo de productos, detalle de cada producto y un carrito de compras integrado en un Drawer (sidebar), todo ello con soporte para temas claro/oscuro, persistencia en localStorage y manejo avanzado de datos con React Query.

---

## 🚀 Características

- **Next.js con App Router:** Organización moderna de rutas y layouts.
- **Tailwind CSS:** Diseño responsivo y personalizable mediante un sistema de variables CSS semánticas.
- **React Query:** Gestión avanzada de datos asíncronos, con caché, prefetching y mutaciones (con invalidación de caché).
- **Carrito de Compras:** Implementado como un Drawer global, con funcionalidades para agregar, actualizar, eliminar y limpiar productos, y persistencia en localStorage.
- **Enriquecimiento de Datos:** Transformación “on the fly” para combinar la estructura mínima del API (productId y quantity) con los datos completos de cada producto al renderizar la UI.
- **Accesibilidad y Rendimiento:** Transiciones suaves, manejo de estados de carga/error y optimización en consultas para una experiencia de usuario óptima.

---

## 📂 Estructura del Proyecto

La estructura del proyecto está organizada de forma modular, aprovechando el App Router de Next.js:

```
e-commerce/
├── app/
│   ├── layout.tsx         // Layout raíz: incluye Providers y MainLayout
│   ├── page.tsx           // Página principal (Home)
│   ├── productos/         // Catálogo de productos
│   │   ├── page.tsx       // Página de catálogo
│   │   └── [id]/          // Ruta dinámica para detalle del producto
│   │       └── page.tsx   // Página de detalle del producto
│   └── carrito/           // (Opcional) Ruta de carrito, aunque el Drawer se usa globalmente
├── components/            // Componentes reutilizables
│   ├── cart/              // Componentes del carrito (CartItem, CartSummary, ShoppingCart)
│   ├── products/          // Componentes de productos (ProductCard, ProductImage, etc.)
│   └── UI/                // Componentes de interfaz (Header, Footer, Drawer, Skeleton, etc.)
├── context/               // Contextos de la aplicación
│   └── Cart/              // CartContext y CartProvider
├── lib/                   // Funciones auxiliares (API, cartApi, etc.)
├── types/                 // Definiciones de tipos (carts, categories, product, etc.)
└── README.md              // Documentación del proyecto
```

---

## ⚙️ Configuración y Ejecución Local

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
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

4. **Construye y ejecuta en producción:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🛠️ Decisiones Técnicas y Arquitectónicas

- **Next.js App Router:** Facilita la organización modular de rutas y layouts, permitiendo la reutilización de componentes y separación clara de la lógica en cada sección.
- **Tailwind CSS con Variables Semánticas:** Se implementó un sistema de variables en el bloque `@theme` que define la paleta base y las variables semánticas. Luego, en `@layer base` se asignan estas variables a usos funcionales para light y dark mode, lo que garantiza consistencia y facilidad de personalización.
- **React Query:** Se utiliza para gestionar datos asíncronos con características avanzadas como caché, prefetching y mutaciones (con invalidación de caché), lo que mejora el rendimiento y la experiencia de usuario.
- **Carrito de Compras con Context:** Se implementó un `CartContext` y `CartProvider` para centralizar la lógica del carrito, respetando la estructura del API (almacenando productId y quantity) y enriqueciendo la UI de forma “on the fly” para mostrar información completa del producto.
- **Persistencia en localStorage:** El carrito se sincroniza con localStorage, permitiendo que el estado se mantenga entre sesiones.
- **Drawer para el Carrito:** Se implementó el carrito como un Drawer global, evitando rutas dedicadas como `/cart` y proporcionando una experiencia de usuario fluida.

---

## 💡 Desafíos y Soluciones

- **Manejo de Datos del Carrito:**  
  El API devuelve únicamente el productId y la quantity, lo que generaba errores de tipado en la UI. La solución fue enriquecer los datos en la capa de presentación, combinando esos datos mínimos con la información completa de cada producto (obtenida desde un contexto o cache) o definir tipos auxiliares (por ejemplo, usando un type intersection como `Product & { quantity: number }`) para trabajar en la UI sin modificar la estructura del API.

- **Integración de Providers:**  
  Se centralizó la configuración global incluyendo el QueryClientProvider, ThemeProvider y CartProvider en un único componente de Providers, lo que facilita el acceso a todos los contextos en toda la aplicación.

- **Optimización y Rendimiento:**  
  Gracias a React Query (prefetching, mutaciones y caché) se minimizaron las solicitudes redundantes y se mejoró la velocidad de carga, mientras que el diseño modular facilitó la escalabilidad y el mantenimiento del código.

---

## 👨‍💻 Autor

**Sebastian Ballen C** - *Frontend Developer*

* LinkedIn: [Sebastian B.](https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper)
* Email: sebastian.ballenc@gmail.com


## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.

---

⭐️ **Si te resulta útil este proyecto, ¡no olvides darle una estrella en GitHub!** ⭐️