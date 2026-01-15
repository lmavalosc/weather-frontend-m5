import { ApiClient } from './ApiClient.js';

export class WeatherApp {
    constructor() {
        this.api = new ApiClient();

        // Configuración de lugares (Lat/Lon aproximados)
        this.lugares = [
            { id: 1, nombre: 'Arica', lat: -18.47, lon: -70.30, imagen: 'assets/img/arica.jpg' },
            { id: 2, nombre: 'Antofagasta', lat: -23.65, lon: -70.40, imagen: 'assets/img/antofagasta.jpg' },
            { id: 3, nombre: 'Valparaíso', lat: -33.04, lon: -71.61, imagen: 'assets/img/valparaiso.png' },
            { id: 4, nombre: 'Santiago', lat: -33.45, lon: -70.67, imagen: 'assets/img/santiago.jpg' },
            { id: 5, nombre: 'Concepción', lat: -36.82, lon: -73.04, imagen: 'assets/img/concepcion.png' },
            { id: 6, nombre: 'Valdivia', lat: -39.81, lon: -73.25, imagen: 'assets/img/valdivia.jpg' },
            { id: 7, nombre: 'Punta Arenas', lat: -53.16, lon: -70.92, imagen: 'assets/img/puntaArenas.jpeg' }
        ];

        this.dataCache = {}; // Cache simple para no llamar a la API repetidamente en la misma sesión si se desea

        // Referencias al DOM
        this.ui = {
            cardsContainer: document.getElementById('weatherCards'),
            detailSection: document.getElementById('detailSection'),
            closeDetailBtn: document.getElementById('closeDetail'),

            // Detalle header y current
            detailCityName: document.getElementById('detailCityName'),
            detailTemp: document.getElementById('detailTemp'),
            detailStatus: document.getElementById('detailStatus'),
            detailHeader: document.querySelector('.detail-header'),
            detailContainer: document.querySelector('.detail-section__container'),

            // Grids
            forecastGrid: document.getElementById('forecastGrid'),
            statsGrid: document.getElementById('statsGrid'),
            climateGrid: document.getElementById('climateGrid'),
            summaryText: document.getElementById('summaryText')
        };
    }

    // Inicializar la aplicación
    init() {
        console.log('🚀 Iniciando WeatherApp (POO + ES6)');
        this.renderLoading();
        this.loadWeatherData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.ui.closeDetailBtn.addEventListener('click', () => this.hideDetail());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideDetail();
        });
    }

    // Carga de datos
    async loadWeatherData() {
        try {
            // Promesas simultáneas para todos los lugares
            const promesas = this.lugares.map(lugar =>
                this.api.getWeather(lugar.lat, lugar.lon)
                    .then(data => ({ ...lugar, data })) // Combinar config con datos
            );

            const resultados = await Promise.all(promesas);

            // Guardar en cache o estado local
            this.lugares = resultados;

            this.renderHome();
        } catch (error) {
            console.error('Fallo general:', error);
            this.ui.cardsContainer.innerHTML = '<p class="error-msg">Error al cargar el clima. Por favor verifique su conexión.</p>';
        }
    }

    // Renderizado del Home
    renderLoading() {
        this.ui.cardsContainer.innerHTML = '<div class="loading">Cargando datos climáticos...</div>';
    }

    renderHome() {
        this.ui.cardsContainer.innerHTML = '';

        this.lugares.forEach(lugar => {
            const current = lugar.data.current_weather;
            const emoji = this.getWeatherEmoji(current.weathercode);

            const card = document.createElement('div');
            card.className = 'weather-card';
            card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${lugar.imagen}')`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            card.onclick = () => this.showDetail(lugar.id);

            card.innerHTML = `
                <div class="weather-card__header">
                    <h3 class="weather-card__city">${lugar.nombre}</h3>
                </div>
                <div class="weather-card__current">
                    <div class="weather-card__temp">${Math.round(current.temperature)}°C</div>
                    <div class="weather-card__status">${emoji}</div>
                </div>
                <div class="weather-card__footer">
                    📊 Ver Pronóstico Completo
                </div>
            `;
            this.ui.cardsContainer.appendChild(card);
        });
    }

    // Mostrar Detalle
    showDetail(id) {
        const lugar = this.lugares.find(l => l.id === id);
        if (!lugar) return;

        const { daily, current_weather } = lugar.data;
        const currentEmoji = this.getWeatherEmoji(current_weather.weathercode);

        // 1. Actualizar Header
        this.ui.detailCityName.textContent = lugar.nombre;
        this.ui.detailTemp.textContent = `${Math.round(current_weather.temperature)}°C`;
        this.ui.detailStatus.textContent = currentEmoji;

        this.ui.detailHeader.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${lugar.imagen}')`;
        this.applyTheme(currentEmoji);

        // 2. Calcular Estadísticas
        const stats = this.calculateStats(daily);

        // 3. Renderizar Pronóstico y Stats
        this.renderForecast(daily, stats);
        this.renderStats(stats);

        // 4. Generar Alertas y Resumen
        this.renderAlertsAndSummary(lugar.nombre, stats);

        this.ui.detailSection.style.display = 'block';
    }

    hideDetail() {
        this.ui.detailSection.style.display = 'none';
    }

    // Lógica de Negocio y Auxiliares
    getWeatherEmoji(code) {
        // Códigos WMO
        if (code === 0) return '☀️';
        if ([1, 2, 3].includes(code)) return '⛅';
        if ([45, 48].includes(code)) return '🌫️';
        if ([51, 53, 55, 61, 63, 65].includes(code)) return '🌧️';
        if ([71, 73, 75, 77].includes(code)) return '❄️';
        if ([80, 81, 82].includes(code)) return '🌦️';
        if ([95, 96, 99].includes(code)) return '⛈️';
        return 'cloud';
    }

    applyTheme(emoji) {
        // Mapeo simple de emojis a clases de tema existentes
        const themeMap = {
            '☀️': 'theme-sunny',
            '⛅': 'theme-cloudy',
            '🌫️': 'theme-cloudy',
            '🌧️': 'theme-rainy',
            '🌦️': 'theme-rainy',
            '⛈️': 'theme-rainy',
            '❄️': 'theme-snowy'
        };
        const theme = themeMap[emoji] || 'theme-cloudy';

        // Limpiar clases anteriores (manteniendo la base)
        this.ui.detailContainer.className = 'detail-section__container';
        this.ui.detailContainer.classList.add(theme);
    }

    calculateStats(daily) {
        // daily.temperature_2m_max es un array
        // daily.temperature_2m_min es un array

        const maxs = daily.temperature_2m_max;
        const mins = daily.temperature_2m_min;
        const codes = daily.weathercode;

        let minSemana = Math.min(...mins);
        let maxSemana = Math.max(...maxs);

        // Promedio total
        const sumMax = maxs.reduce((a, b) => a + b, 0);
        const sumMin = mins.reduce((a, b) => a + b, 0);
        const avg = (sumMax + sumMin) / (maxs.length + mins.length);

        // Conteo de climas
        const counts = {};
        codes.forEach(code => {
            const emoji = this.getWeatherEmoji(code);
            counts[emoji] = (counts[emoji] || 0) + 1;
        });

        return { minSemana, maxSemana, avg, counts };
    }

    renderForecast(daily, stats) {
        this.ui.forecastGrid.innerHTML = '';
        const range = stats.maxSemana - stats.minSemana || 1;

        // Open-Meteo devuelve arrays paralelos. daily.time, daily.temperature_2m_max, etc.
        daily.time.forEach((t, i) => {
            const date = new Date(t);
            const dayName = date.toLocaleDateString('es-CL', { weekday: 'long' });
            const max = daily.temperature_2m_max[i];
            const min = daily.temperature_2m_min[i];
            const code = daily.weathercode[i];
            const emoji = this.getWeatherEmoji(code);

            // Cálculos para la barra visual (reutilizando lógica visual anterior)
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

    renderAlertsAndSummary(name, stats) {
        // Alertas simples
        const alerts = [];
        if (stats.avg > 25) alerts.push("🚨 Alerta de Ola de Calor");
        if (stats.minSemana < 5) alerts.push("🥶 Alerta de Frío Extremo");
        if (stats.counts['🌧️'] >= 3) alerts.push("☔ Semana Lluviosa");

        let summary = `Pronóstico para ${name}: `;
        if (alerts.length > 0) {
            summary += alerts.join(' | ') + ". ";
        }
        summary += `Temperatura promedio de ${stats.avg.toFixed(1)}°C. `;

        // Clima predominante
        const predominant = Object.entries(stats.counts).sort((a, b) => b[1] - a[1])[0];
        summary += `Predominará: ${predominant[0]} (${predominant[1]} días).`;

        this.ui.summaryText.textContent = summary;
    }
}
