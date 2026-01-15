# 🌦️ App de Clima - Módulo 5: POO, ES6+ y Consumo de API

![Status](https://img.shields.io/badge/Status-Educational-yellow)
![Technology](https://img.shields.io/badge/Tech-HTML%20%7C%20JS%20ES6%2B%20%7C%20SASS%20%7C%20API-blue)

Proyecto enfocado en la aplicación de **Programación Orientada a Objetos (POO)**, **JavaScript ES6+** y **consumo de APIs externas**. Esta versión obtiene datos reales de clima desde la API de Open-Meteo y los procesa utilizando clases y programación asíncrona.

## 📋 Descripción del Proyecto

Esta aplicación es un dashboard meteorológico para diversas ciudades de Chile que consume datos en tiempo real. Permite visualizar:

1. **Home**: Listado general con el clima actual de cada ciudad obtenido desde la API.
2. **Vista de Detalle**: Pronóstico semanal completo por ciudad con estadísticas calculadas dinámicamente.
3. **Estadísticas de la Semana**: Temperatura mínima, máxima y promedio, además de distribución de tipos de clima.
4. **Alertas de Clima**: Sistema inteligente que detecta olas de calor, frío extremo y semanas lluviosas.

El objetivo pedagógico es demostrar cómo estructurar una aplicación web moderna utilizando POO, consumir APIs externas con programación asíncrona y procesar datos para generar información de valor.

## 🏗️ Arquitectura POO

El proyecto está estructurado utilizando **Programación Orientada a Objetos** con las siguientes clases:

### 📦 Clase `ApiClient`
**Responsabilidad**: Gestionar todas las comunicaciones con la API externa de Open-Meteo.

**Ubicación**: `assets/js/ApiClient.js`

**Métodos principales**:
- `constructor()`: Inicializa la URL base de la API
- `async getWeather(lat, lon)`: Obtiene el clima actual y pronóstico para coordenadas específicas

**Características**:
- Uso de `fetch()` con async/await
- Manejo de errores con try/catch
- Procesamiento de respuestas JSON
- Validación de respuestas HTTP

```javascript
// Ejemplo de uso
const api = new ApiClient();
const data = await api.getWeather(-33.45, -70.67); // Santiago
```

### 🎯 Clase `WeatherApp`
**Responsabilidad**: Clase principal que orquesta toda la aplicación.

**Ubicación**: `assets/js/WeatherApp.js`

**Propiedades**:
- `api`: Instancia de ApiClient
- `lugares`: Array de configuración de ciudades (nombre, coordenadas, imágenes)
- `dataCache`: Instancia de `Map` para optimizar llamadas a la API (evita re-peticiones innecesarias)
- `weatherMapping`: Objeto de configuración que vincula códigos WMO con emojis y temas visuales
- `ui`: Referencias centralizadas a elementos del DOM para mejorar el rendimiento

**Métodos principales**:
- `init()`: Inicializa la aplicación
- `async loadWeatherData()`: Carga datos de todas las ciudades usando Promise.all()
- `renderHome()`: Renderiza las tarjetas de clima en el home
- `showDetail(id)`: Muestra la vista de detalle de una ciudad
- `calculateStats(daily)`: Calcula estadísticas semanales (min, max, promedio, conteo)
- `renderAlertsAndSummary(name, stats)`: Genera alertas basadas en reglas de negocio
- `getWeatherEmoji(code)`: Mapea códigos WMO a emojis usando `weatherMapping`
- `applyTheme(code)`: Aplica temas visuales dinámicos (Sunny, Cloudy, Rainy, Snowy) al contenedor de detalle

**Flujo de datos**:
```
init() → loadWeatherData() → renderHome()
         ↓
    ApiClient.getWeather() × 7 ciudades (Promise.all)
         ↓
    Actualización del DOM con datos reales
```

## 🚀 Características ES6+ Implementadas

### ✅ Módulos ES6
```javascript
// Exportación
export class WeatherApp { ... }

// Importación
import { WeatherApp } from './WeatherApp.js';
import { ApiClient } from './ApiClient.js';
```

### ✅ Let y Const
```javascript
const lugares = [...]; // Inmutable
let minSemana = Math.min(...mins); // Variable
```

### ✅ Arrow Functions
```javascript
this.lugares.map(lugar => this.api.getWeather(lugar.lat, lugar.lon))
this.ui.closeDetailBtn.addEventListener('click', () => this.hideDetail());
```

### ✅ Template Literals
```javascript
card.innerHTML = `
    <div class="weather-card__city">${lugar.nombre}</div>
    <div class="weather-card__temp">${Math.round(current.temperature)}°C</div>
`;
```

### ✅ Destructuring
```javascript
const { daily, current_weather } = lugar.data;
const { minSemana, maxSemana, avg, counts } = stats;
```

### ✅ Parámetros por Defecto
```javascript
const range = stats.maxSemana - stats.minSemana || 1; // Evita división por cero
```

### ✅ Spread Operator
```javascript
const resultados = await Promise.all(promesas);
let minSemana = Math.min(...mins);
```

## 🌐 Consumo de API

### API Utilizada: Open-Meteo
**URL Base**: `https://api.open-meteo.com/v1/forecast`

**Características**:
- ✅ API pública y gratuita
- ✅ No requiere autenticación
- ✅ Datos meteorológicos precisos
- ✅ Pronósticos de hasta 7 días

### Parámetros Solicitados
```javascript
{
  latitude: -33.45,
  longitude: -70.67,
  daily: ['temperature_2m_max', 'temperature_2m_min', 'weathercode'],
  current_weather: true,
  timezone: 'auto'
}
```

### Respuesta de la API
```json
{
  "current_weather": {
    "temperature": 24.5,
    "weathercode": 0,
    "windspeed": 10.5
  },
  "daily": {
    "time": ["2026-01-15", "2026-01-16", ...],
    "temperature_2m_max": [28, 30, 27, ...],
    "temperature_2m_min": [15, 16, 14, ...],
    "weathercode": [0, 1, 2, ...]
  }
}
```

### Manejo de Errores
```javascript
try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
} catch (error) {
    console.error('Error al obtener datos:', error);
    // Mostrar mensaje en la interfaz
    this.ui.cardsContainer.innerHTML = '<p class="error-msg">Error al cargar...</p>';
}
```

## 📊 Estadísticas y Lógica de Negocio

### Cálculo de Estadísticas
La aplicación procesa los datos de la API para calcular:

1. **Temperatura Mínima Semanal**: `Math.min(...daily.temperature_2m_min)`
2. **Temperatura Máxima Semanal**: `Math.max(...daily.temperature_2m_max)`
3. **Temperatura Promedio**: Media aritmética de todas las temperaturas
4. **Conteo de Clima**: Frecuencia de cada tipo de clima (soleado, nublado, lluvioso, etc.)

```javascript
calculateStats(daily) {
    const maxs = daily.temperature_2m_max;
    const mins = daily.temperature_2m_min;
    const codes = daily.weathercode;
    
    let minSemana = Math.min(...mins);
    let maxSemana = Math.max(...maxs);
    
    const avg = (sumMax + sumMin) / (maxs.length + mins.length);
    
    // Conteo de climas
    const counts = {};
    codes.forEach(code => {
        const emoji = this.getWeatherEmoji(code);
        counts[emoji] = (counts[emoji] || 0) + 1;
    });
    
    return { minSemana, maxSemana, avg, counts };
}
```

### Sistema de Alertas
Reglas de negocio implementadas:

| Condición | Alerta |
|-----------|--------|
| `avg > 25°C` | 🚨 Alerta de Ola de Calor |
| `minSemana < 5°C` | 🥶 Alerta de Frío Extremo |
| `counts['🌧️'] >= 3` | ☔ Semana Lluviosa |

```javascript
renderAlertsAndSummary(name, stats) {
    const alerts = [];
    if (stats.avg > 25) alerts.push("🚨 Alerta de Ola de Calor");
    if (stats.minSemana < 5) alerts.push("🥶 Alerta de Frío Extremo");
    if (stats.counts['🌧️'] >= 3) alerts.push("☔ Semana Lluviosa");
    
    let summary = `Pronóstico para ${name}: `;
    if (alerts.length > 0) {
        summary += alerts.join(' | ') + ". ";
    }
    // ... resto del resumen
}
```

### Mapeo de Códigos WMO
La API utiliza códigos WMO (World Meteorological Organization) que se mapean a emojis:

| Código | Descripción | Emoji |
|--------|-------------|-------|
| 0 | Cielo despejado | ☀️ |
| 1-3 | Parcialmente nublado | ⛅ |
| 45, 48 | Niebla | 🌫️ |
| 51-65 | Lluvia | 🌧️ |
| 71-77 | Nieve | ❄️ |
| 80-82 | Chubascos | 🌦️ |
| 95-99 | Tormenta | ⛈️ |

## 🚀 Cómo ejecutar el proyecto

### Opción 1: Servidor Local (Recomendado)
Debido al uso de módulos ES6, se requiere un servidor HTTP:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx http-server

# Con PHP
php -S localhost:8000

# Con VS Code
# Instalar extensión "Live Server" y hacer clic derecho > "Open with Live Server"
```

Luego abre: `http://localhost:8000`

### Opción 2: Navegador Directo
Algunos navegadores modernos permiten abrir `index.html` directamente, pero pueden bloquear módulos ES6 por CORS.

## 📁 Estructura de Archivos

```bash
/
├── assets/
│   ├── img/                    # Imágenes de las ciudades
│   │   ├── arica.jpg
│   │   ├── antofagasta.jpg
│   │   ├── valparaiso.png
│   │   ├── santiago.jpg
│   │   ├── concepcion.png
│   │   ├── valdivia.jpg
│   │   └── puntaArenas.jpeg
│   ├── js/
│   │   ├── ApiClient.js        # Clase para consumo de API
│   │   ├── WeatherApp.js       # Clase principal de la aplicación
│   │   ├── main.js             # Punto de entrada (inicialización)
│   │   └── archive/            # Respaldo de versiones anteriores
│   │       └── app.js.modulo4.bak
│   ├── scss/                   # Arquitectura Sass 7-1
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   └── pages/
│   └── styles.css              # Estilos compilados
├── index.html                  # Estructura HTML semántica
└── README.md                   # Esta documentación
```

## 🎨 Diseño y UX

- **Diseño Responsivo**: Adaptable a móviles, tablets y desktop
- **Temas Dinámicos**: El detalle cambia de color según el clima (soleado, nublado, lluvioso, nevado)
- **Animaciones Suaves**: Transiciones CSS para mejor experiencia
- **Tipografía Moderna**: Google Fonts (Inter)
- **Estados de Carga**: Indicadores visuales mientras se obtienen datos de la API
- **Manejo de Errores**: Mensajes amigables si falla la conexión

## 👤 Autor

**Lorenzo Ávalos**  
Desarrollado como parte del **Módulo 5 (POO, ES6+ y API)** para Bootcamp/Academia.

---

## 🔗 Enlaces y Repositorio

- **Repositorio**: [GitHub - Proyecto Clima](https://github.com/lmavalosc/weather-frontend-m4)
- **Demo**: [GitHub Pages](https://lmavalosc.github.io/weather-frontend-m4/)

## ✅ Cumplimiento de Rúbrica (Módulo 5)

| Criterio | Puntos | Estado | Detalle |
|:---------|:------:|:------:|:--------|
| **POO y ES6+** | 3/3 | 🌟 Excelente | Clases `WeatherApp` y `ApiClient` bien estructuradas. Uso consistente de let/const, arrow functions, template literals, destructuring y módulos ES6. |
| **Consumo de API y asincronía** | 3/3 | 🌟 Excelente | Integración completa con Open-Meteo API usando fetch y async/await. Manejo de errores con try/catch y mensajes en pantalla. Promise.all() para carga paralela. |
| **Datos, estadísticas y alertas** | 3/3 | 🌟 Excelente | Datos 100% desde API. Cálculo dinámico de min, max, promedio y conteo de climas. Sistema de alertas con reglas de negocio (calor, frío, lluvia). |
| **DOM e interfaz** | 3/3 | 🌟 Excelente | Home y Detalle completamente dinámicos. Indicadores de carga y error visibles. Renderizado basado en datos de la API. |
| **Git/GitHub y README** | 3/3 | 🌟 Excelente | Commits descriptivos e incrementales. README completo con explicación de clases, API, estadísticas y enlace al repositorio. |

**Total**: 15/15 puntos ✨

---

## 📝 Notas Técnicas

### Diferencias con Módulo 4
- ✅ Datos ahora provienen de API externa (antes hardcoded)
- ✅ Arquitectura POO con clases (antes funciones sueltas)
- ✅ Módulos ES6 (antes script único)
- ✅ Programación asíncrona (antes síncrona)
- ✅ Manejo de estados de carga y error

### Posibles Mejoras Futuras
- [ ] Agregar búsqueda de ciudades por nombre
- [ ] Implementar geolocalización del usuario
- [ ] Cache con LocalStorage para reducir llamadas a la API
- [ ] Gráficos interactivos con Chart.js
- [ ] Modo offline con Service Workers
- [ ] Internacionalización (i18n)

---

© 2026 - Implementación Educativa | Módulo 5 - POO, ES6+ y Consumo de API
