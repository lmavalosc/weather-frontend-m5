import { ApiClient } from './ApiClient.js';

/**
 * Clase Principal WeatherApp
 * Módulo 5: Implementación de POO y lógica de control.
 * Se encarga de la gestión del estado, orquestación de llamadas a API
 * y actualización del DOM.
 */
export class WeatherApp {
    constructor() {
        // Inyección de dependencia: ApiClient
        this.api = new ApiClient();

        // Estado de la aplicación: Configuración de ciudades
        // Módulo 5: Datos de ubicación definidos, clima se trae de API
        this.lugares = [
            { id: 1, nombre: 'Arica', lat: -18.47, lon: -70.30, imagen: 'assets/img/arica.jpg' },
            { id: 2, nombre: 'Antofagasta', lat: -23.65, lon: -70.40, imagen: 'assets/img/antofagasta.jpg' },
            { id: 3, nombre: 'Valparaíso', lat: -33.04, lon: -71.61, imagen: 'assets/img/valparaiso.png' },
            { id: 4, nombre: 'Santiago', lat: -33.45, lon: -70.67, imagen: 'assets/img/santiago.jpg' },
            { id: 5, nombre: 'Concepción', lat: -36.82, lon: -73.04, imagen: 'assets/img/concepcion.png' },
            { id: 6, nombre: 'Valdivia', lat: -39.81, lon: -73.25, imagen: 'assets/img/valdivia.jpg' },
            { id: 7, nombre: 'Punta Arenas', lat: -53.16, lon: -70.92, imagen: 'assets/img/puntaArenas.jpeg' }
        ];

        // Cache de datos para evitar llamadas innecesarias a la API (Módulo 5 Excellence)
        this.dataCache = new Map();

        // Mapeo de códigos WMO a Emojis y Temas
        this.weatherMapping = {
            0: { emoji: '☀️', theme: 'theme-sunny' },
            1: { emoji: '🌤️', theme: 'theme-sunny' },
            2: { emoji: '⛅', theme: 'theme-cloudy' },
            3: { emoji: '☁️', theme: 'theme-cloudy' },
            45: { emoji: '🌫️', theme: 'theme-cloudy' },
            48: { emoji: '🌫️', theme: 'theme-cloudy' },
            51: { emoji: '🌦️', theme: 'theme-rainy' },
            53: { emoji: '🌦️', theme: 'theme-rainy' },
            55: { emoji: '🌦️', theme: 'theme-rainy' },
            61: { emoji: '🌧️', theme: 'theme-rainy' },
            63: { emoji: '🌧️', theme: 'theme-rainy' },
            65: { emoji: '🌧️', theme: 'theme-rainy' },
            71: { emoji: '❄️', theme: 'theme-snowy' },
            73: { emoji: '❄️', theme: 'theme-snowy' },
            75: { emoji: '❄️', theme: 'theme-snowy' },
            80: { emoji: '🌦️', theme: 'theme-rainy' },
            81: { emoji: '🌦️', theme: 'theme-rainy' },
            82: { emoji: '🌦️', theme: 'theme-rainy' },
            95: { emoji: '⛈️', theme: 'theme-rainy' },
            96: { emoji: '⛈️', theme: 'theme-rainy' },
            99: { emoji: '⛈️', theme: 'theme-rainy' }
        };

        // Cache de referencias al DOM
        this.ui = {
            cardsContainer: document.getElementById('weatherCards'),
            detailSection: document.getElementById('detailSection'),
            closeDetailBtn: document.getElementById('closeDetail'),
            detailCityName: document.getElementById('detailCityName'),
            detailTemp: document.getElementById('detailTemp'),
            detailStatus: document.getElementById('detailStatus'),
            detailHeader: document.querySelector('.detail-header'),
            detailContainer: document.querySelector('.detail-section__container'),
            forecastGrid: document.getElementById('forecastGrid'),
            statsGrid: document.getElementById('statsGrid'),
            climateGrid: document.getElementById('climateGrid'),
            summaryText: document.getElementById('summaryText')
        };
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('🚀 Iniciando WeatherApp (POO + ES6 + API)');
        this.renderLoading();
        this.loadWeatherData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // ES6: Arrow functions preservan el contexto 'this'
        this.ui.closeDetailBtn.addEventListener('click', () => this.hideDetail());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideDetail();
        });
    }

    /**
     * Carga datos meteorológicos desde la API
     * Módulo 5: Async/Await y Promise.all para concurrencia
     */
    async loadWeatherData() {
        try {
            // Verificamos si ya tenemos datos en cache para evitar re-peticiones si se re-inicializa
            if (this.dataCache.size > 0 && this.lugares.every(l => l.data)) {
                this.renderHome();
                return;
            }

            // Generamos un array de promesas para pedir datos de todas las ciudades en paralelo
            const promesas = this.lugares.map(async (lugar) => {
                const data = await this.api.getWeather(lugar.lat, lugar.lon);
                // ES6: Map set para cachear
                this.dataCache.set(lugar.id, data);
                return { ...lugar, data };
            });

            this.lugares = await Promise.all(promesas);
            this.renderHome();
        } catch (error) {
            console.error('Error crítico al cargar datos:', error);
            this.ui.cardsContainer.innerHTML = `
                <div class="error-msg">
                    <p>⚠️ Error al conectar con el servicio meteorológico.</p>
                    <button onclick="location.reload()" class="btn-retry">Reintentar</button>
                </div>
            `;
        }
    }

    /* =========================================
       SECCIÓN DE RENDERIZADO (UI)
       ========================================= */

    renderLoading() {
        this.ui.cardsContainer.innerHTML = '<div class="loading">Cargando pronóstico en tiempo real...</div>';
    }

    renderHome() {
        this.ui.cardsContainer.innerHTML = '';

        this.lugares.forEach(lugar => {
            // ES6: Destructuring
            const { current_weather } = lugar.data;
            const emoji = this.getWeatherEmoji(current_weather.weathercode);

            const card = document.createElement('div');
            card.className = 'weather-card';
            // Template Literals para estilos dinámicos
            card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${lugar.imagen}')`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            card.onclick = () => this.showDetail(lugar.id);

            card.innerHTML = `
                <div class="weather-card__header">
                    <h3 class="weather-card__city">${lugar.nombre}</h3>
                </div>
                <div class="weather-card__current">
                    <div class="weather-card__temp">${Math.round(current_weather.temperature)}°C</div>
                    <div class="weather-card__status">${emoji}</div>
                </div>
                <div class="weather-card__footer">
                    📊 Ver Detalle y Pronóstico
                </div>
            `;
            this.ui.cardsContainer.appendChild(card);
        });
    }

    showDetail(id) {
        // ES6: Array.find
        const lugar = this.lugares.find(l => l.id === id);
        if (!lugar) return;

        const { daily, current_weather } = lugar.data;
        const currentEmoji = this.getWeatherEmoji(current_weather.weathercode);

        // 1. Actualizar datos básicos
        this.ui.detailCityName.textContent = lugar.nombre;
        this.ui.detailTemp.textContent = `${Math.round(current_weather.temperature)}°C`;
        this.ui.detailStatus.textContent = currentEmoji;

        this.ui.detailHeader.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${lugar.imagen}')`;
        this.applyTheme(current_weather.weathercode);

        // 2. Lógica de Negocio: Calcular Estadísticas
        const stats = this.calculateStats(daily);

        // 3. Renderizar Componentes
        this.renderForecast(daily, stats);
        this.renderStats(stats);
        this.renderAlertsAndSummary(lugar.nombre, stats);

        this.ui.detailSection.style.display = 'block';
    }

    hideDetail() {
        this.ui.detailSection.style.display = 'none';
    }

    renderForecast(daily, stats) {
        this.ui.forecastGrid.innerHTML = '';
        const range = stats.maxSemana - stats.minSemana || 1;

        // Iteramos sobre daily.time (fechas) y accedemos a los índices correspondientes
        daily.time.forEach((time, index) => {
            const date = new Date(time);
            // Formateo de fecha nativo
            const dayName = date.toLocaleDateString('es-CL', { weekday: 'long', timeZone: 'UTC' });

            const max = daily.temperature_2m_max[index];
            const min = daily.temperature_2m_min[index];
            const code = daily.weathercode[index];
            const emoji = this.getWeatherEmoji(code);

            // Gráfico de barras simple (CSS in JS)
            const left = ((min - stats.minSemana) / range) * 100;
            const width = ((max - min) / range) * 100;

            const div = document.createElement('div');
            div.className = 'forecast-day';
            div.innerHTML = `
                <div class="forecast-day__name">${dayName}</div>
                <div class="forecast-day__icon">${emoji}</div>
                <div class="forecast-day__temp">
                    <span class="min">${Math.round(min)}°</span>
                    <span class="max">${Math.round(max)}°</span>
                </div>
                <div class="forecast-day__bar-container">
                    <div class="forecast-day__bar" style="left: ${left}%; width: ${Math.max(width, 5)}%"></div>
                </div>
            `;
            this.ui.forecastGrid.appendChild(div);
        });
    }

    renderStats(stats) {
        this.ui.statsGrid.innerHTML = `
            <div class="stat-card">
                <div class="stat-card__label">Mínima</div>
                <div class="stat-card__value">${Math.round(stats.minSemana)}°C</div>
            </div>
            <div class="stat-card">
                <div class="stat-card__label">Máxima</div>
                <div class="stat-card__value">${Math.round(stats.maxSemana)}°C</div>
            </div>
            <div class="stat-card">
                <div class="stat-card__label">Promedio</div>
                <div class="stat-card__value">${stats.avg.toFixed(1)}°C</div>
            </div>
        `;

        this.ui.climateGrid.innerHTML = '';
        // Object.entries para iterar sobre el mapa de conteo
        Object.entries(stats.counts).forEach(([emoji, count]) => {
            const div = document.createElement('div');
            div.className = 'stat-card';
            div.innerHTML = `
                <div class="stat-card__label">Días</div>
                <div class="stat-card__value" style="font-size: 1.5rem">${emoji} <span style="font-size: 1rem; color: #cbd5e1;">x${count}</span></div>
            `;
            this.ui.climateGrid.appendChild(div);
        });
    }

    /* =========================================
       LÓGICA DE NEGOCIO (Estadísticas y Alertas)
       ========================================= */

    /**
     * Calcula estadísticas semanales basadas en datos de la API
     * @param {Object} daily - Objeto con arrays de datos diarios
     */
    calculateStats(daily) {
        const maxs = daily.temperature_2m_max;
        const mins = daily.temperature_2m_min;
        const codes = daily.weathercode;

        // Cálculos matemáticos básicos
        const minSemana = Math.min(...mins); // Spread operator
        const maxSemana = Math.max(...maxs);

        const sumMax = maxs.reduce((acc, curr) => acc + curr, 0);
        const sumMin = mins.reduce((acc, curr) => acc + curr, 0);
        const avg = (sumMax + sumMin) / (maxs.length + mins.length);

        // Conteo de tipos de clima
        const counts = {};
        let rainDays = 0; // Contador específico para lógica de alertas

        codes.forEach(code => {
            const emoji = this.getWeatherEmoji(code);
            counts[emoji] = (counts[emoji] || 0) + 1;

            // Lógica basada en códigos WMO para lluvia (51-67, 80-82, 95-99)
            if ((code >= 51 && code <= 67) || (code >= 80 && code <= 99)) {
                rainDays++;
            }
        });

        return { minSemana, maxSemana, avg, counts, rainDays };
    }

    renderAlertsAndSummary(cityName, stats) {
        const alerts = [];

        // Reglas de negocio para alertas
        if (stats.maxSemana > 30) alerts.push("🚨 Alerta de Ola de Calor");
        if (stats.minSemana < 5) alerts.push("🥶 Alerta de Frío Extremo");
        if (stats.rainDays >= 3) alerts.push("☔ Semana Lluviosa");

        // Construcción del resumen
        let summary = `<strong>${cityName}:</strong> `;

        if (alerts.length > 0) {
            summary += `<span style="color: #ef4444">${alerts.join(' | ')}</span>. `;
        } else {
            summary += "Semana con condiciones normales. ";
        }

        const condition = stats.avg > 20 ? "agradable" : (stats.avg < 12 ? "frío" : "templado");
        summary += `Temperatura promedio de ${stats.avg.toFixed(1)}°C (${condition}).`;

        this.ui.summaryText.innerHTML = summary;
    }

    /* =========================================
       HELPERS (Mapeo de Códigos WMO)
       ========================================= */

    getWeatherEmoji(code) {
        return this.weatherMapping[code]?.emoji || '❓';
    }

    applyTheme(code) {
        const theme = this.weatherMapping[code]?.theme || 'theme-cloudy';
        const container = this.ui.detailContainer;

        // Limpiar temas anteriores sin borrar la clase base
        const currentThemes = ['theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy'];
        container.classList.remove(...currentThemes);
        container.classList.add(theme);
    }
}
