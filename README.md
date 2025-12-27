# 🌦️ Dashboard Meteorológico - Clima Chile

![Status](https://img.shields.io/badge/Status-Active-success)
![Technology](https://img.shields.io/badge/Tech-HTML%20%7C%20SASS%20%7C%20JS-blue)
![API](https://img.shields.io/badge/API-Open--Meteo-orange)

Aplicación web de monitoreo climático en tiempo real para las principales ciudades de Chile. Desarrollada con un enfoque "Vanilla" optimizado, utilizando metodologías modernas de CSS y consumo asíncrono de APIs.

## 🚀 Stack Tecnológico

*   **Frontend**: HTML5 Semántico.
*   **Estilos**: SASS (SCSS) con metodología **BEM** (Block Element Modifier).
*   **Lógica**: JavaScript (ES6+) Moderno.
*   **API Externa**: [Open-Meteo](https://open-meteo.com/) (Free, No-Key).
*   **Diseño**: Responsive (Mobile-First approach con Flexbox/Grid).

## 🛠️ Arquitectura y Funcionamiento

### 1. Modelo de Datos y API
El sistema prescinde de un backend propio, consumiendo datos directamente del cliente.
*   **Fuente de Verdad**: Array `ciudadesBase` en `script.js` con coordenadas geodésicas (Lat/Lon) de 10 ciudades estratégicas.
*   **Fetching**: Se utiliza `Promise.all` para realizar peticiones paralelas a la API de Open-Meteo, optimizando el tiempo de carga inicial.
*   **Normalización**: Se mapean los códigos WMO (World Meteorological Organization) numéricos devueltos por la API a iconos visuales (emojis) mediante un diccionario de estados (`weatherCodes`).

### 2. Estilos (SASS/BEM)
El proyecto utiliza SASS para potenciar CSS:
*   **Variables**: Paleta de colores corporativa y tokens de diseño.
*   **Mixins**: Para reutilización de patrones (ej. tablas, sombras).
*   **BEM**: Estructura de clases (`.block__element--modifier`) para asegurar escalabilidad y evitar especificidad cruzada.
*   **Tematización Dinámica**: Clases de estado (ej. `.theme-sunny`, `.theme-rainy`) inyectadas vía JS según la respuesta de la API.

### 3. Estructura de Carpetas

```bash
/
├── assets/
│   ├── img/          # AsSets gráficos (JPG, PNG, WebP)
│   ├── script.js     # Lógica de negocio y control del DOM
│   └── styles.scss   # Fuente de estilos SASS
├── index.html        # Punto de entrada (Single Page Application)
└── README.md         # Documentación técnica
```

## 🔧 Instalación y Despliegue

Este proyecto es estático, por lo que no requiere build steps complejos para despliegue básico, aunque requiere compilación de SASS para desarrollo.

### Prerrequisitos
*   Node.js (Opcional, solo para compilador SASS via NPM)
*   SASS Compiler

### Compilación de Estilos
Si modificas el archivo `.scss`, compílalo con:

```bash
# Usando npx (si tienes Node instalado)
npx sass assets/styles.scss assets/styles.css

# O modo escucha para desarrollo
npx sass --watch assets/styles.scss assets/styles.css
```

### Ejecución Local
Simplemente abre el archivo `index.html` en tu navegador o usa una extensión como *Live Server*.

## 🌟 Features Clave
1.  **Datos en Vivo**: Temperatura, códigos de clima y pronóstico a 7 días actualizados al instante.
2.  **Imágenes Dinámicas**: Renderizado de imágenes de fondo específicas por ciudad con superposición de gradientes para legibilidad.
3.  **Gráficos CSS**: El pronóstico semanal utiliza barras de rango renderizadas dinámicamente con CSS (`width` y `left` calculados porcentualmente según el range semanal).
4.  **Resumen Inteligente**: Generación de texto descriptivo (NLP básico) basado en las estadísticas semanales calculadas.

## 📄 Licencia y Derechos
© 2025 **Inversiones San Benito**. Todos los derechos reservados.
Desarrollado por el equipo de ingeniería para uso interno y demostrativo.
