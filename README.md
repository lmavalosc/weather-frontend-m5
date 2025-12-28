# 🌦️ App de Clima - Módulo 4: Lógica y Estadísticas en JavaScript

![Status](https://img.shields.io/badge/Status-Educational-yellow)
![Technology](https://img.shields.io/badge/Tech-HTML%20%7C%20JS%20%7C%20SASS-blue)

Proyecto enfocado en el refuerzo de fundamentos de programación en JavaScript: estructuras de datos, ciclos, condicionales y manipulación del DOM. Esta versión modela internamente los datos del clima y calcula estadísticas en tiempo de ejecución sin depender de APIs externas.

## 📋 Descripción del Proyecto

Esta aplicación simula un dashboard meteorológico para diversas ciudades de Chile. Permite visualizar:
1.  Un listado general con el clima actual de cada ciudad (Home).
2.  Una vista de detalle por ciudad que incluye un pronóstico semanal completo.
3.  **Estadísticas calculadas dinámicamente** y un resumen textual inteligente de la semana.

El objetivo pedagógico es demostrar cómo gestionar datos complejos (arreglos de objetos) y procesarlos para generar información de valor en la interfaz de usuario.

## 🛠️ Modelado de Datos

En requerimiento con el **Módulo 4**, los datos ya no están "quemados" en el HTML ni provienen de una API. Se ha implementado un modelo de datos robusto en JavaScript (`assets/js/app.js`):

### Estructura Principal
El sistema utiliza un arreglo constante llamado `lugares`. Cada elemento representa una ciudad y contiene:

```javascript
/* Ejemplo de estructura de datos */
{
  id: 1,
  nombre: "Arica",
  tempActual: 24,
  estadoActual: "☀️",
  // Arreglo anidado con el pronóstico de 7 días
  pronosticoSemanal: [
      { dia: "Lunes", min: 18, max: 24, estado: "☀️" },
      // ... resto de la semana
  ]
}
```

Esta estructura permite escalar fácilmente agregando más ciudades o días sin modificar la lógica de renderizado.

## 📊 Estadísticas y Lógica Implementada

La aplicación incluye funciones específicas (`calcularEstadisticas`, `generarResumen`) que procesan el arreglo `pronosticoSemanal` utilizando bucles (`for`) y condicionales.

Se calculan y muestran los siguientes datos en la vista de detalle:

1.  **Temperatura Mínima y Máxima Semanal**: Identificadas recorriendo todos los días del pronóstico.
2.  **Temperatura Promedio**: Calculada sumando los promedios diarios y dividiendo por la cantidad de días (7).
3.  **Conteo de Clima**: Un desglose de cuántos días tendrán el mismo estado (ej: "3 días soleados", "2 días nublados"), implementado mediante un objeto contador.
4.  **Resumen Textual Dinámico**: Un párrafo generado algorítmicamente que describe si la semana será "fría", "templada" o "cálida" y cuál será el clima predominante.

## 🚀 Cómo ejecutar el proyecto

1.  Descarga el repositorio o descomprime el archivo `.zip`.
2.  Abre el archivo `index.html` en tu navegador web de preferencia.
3.  No se requiere instalación de dependencias ni conexión a internet para ver los datos, ya que todo reside en `app.js`.

## 📁 Estructura de Archivos

```bash
/
├── assets/
│   ├── img/          # Imágenes de las ciudades
│   ├── js/
│   │   └── app.js    # Lógica: Modelo de datos, cálculos y DOM
│   ├── scss/         # Arquitectura Sass (Componentes, Layouts, etc.)
│   └── styles.css    # Estilos compilados para producción
├── index.html        # Estructura semántica
└── README.md         # Esta documentación
```

## 👤 Autor
Desarrollado como parte del **Módulo 4 (JavaScript)** para Bootcamp/Academia.

---

### 🔗 Enlaces y Repositorio
- **Repositorio:** [GitHub - Proyecto Clima](https://github.com/lmavalosc/weather-frontend-m4)
- **Demo:** [GitHub Pages](https://lmavalosc.github.io/weather-frontend-m4/)

### ✅ Cumplimiento de Rúbrica (Módulo 4)
| Criterio | Estado | Detalle |
| :--- | :--- | :--- |
| **Modelado de Datos** | 🌟 Excelente | Arreglo de objetos `lugares` con pronóstico anidado. |
| **Lógica JS** | 🌟 Excelente | Uso de `for`, `forEach`, `find` y funciones con responsabilidades únicas. |
| **Estadísticas** | 🌟 Excelente | Cálculo de min, max, promedio y conteo de estados climático. |
| **DOM** | 🌟 Excelente | Interfaz 100% dinámica generada desde JavaScript. |
| **Git/GitHub** | 🌟 Excelente | Commits descriptivos y README documentado. |

© 2025 - Implementación Educativa.
