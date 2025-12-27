// ============================================
// CONFIGURACIÓN Y DATOS GEOGRÁFICOS
// ============================================
const ciudadesBase = [
    { id: 1, nombre: 'Arica', lat: -18.47, lon: -70.30, imagen: 'assets/img/arica.jpg' },
    { id: 2, nombre: 'Antofagasta', lat: -23.65, lon: -70.40, imagen: 'assets/img/antofagasta.jpg' },
    { id: 3, nombre: 'Valparaíso', lat: -33.04, lon: -71.63, imagen: 'assets/img/valparaiso.png' },
    { id: 4, nombre: 'Santiago', lat: -33.45, lon: -70.67, imagen: 'assets/img/santiago.jpg' },
    { id: 5, nombre: 'Concepción', lat: -36.83, lon: -73.05, imagen: 'assets/img/concepcion.png' },
    { id: 6, nombre: 'Temuco', lat: -38.74, lon: -72.59, imagen: 'assets/img/temuco.jpg' },
    { id: 7, nombre: 'Valdivia', lat: -39.81, lon: -73.25, imagen: 'assets/img/valdivia.jpg' },
    { id: 8, nombre: 'Puerto Montt', lat: -41.47, lon: -72.94, imagen: 'assets/img/puertoMontt.jpg' },
    { id: 9, nombre: 'Coyhaique', lat: -45.58, lon: -72.07, imagen: 'assets/img/cohiaique.jpeg' },
    { id: 10, nombre: 'Punta Arenas', lat: -53.16, lon: -70.92, imagen: 'assets/img/puntaArenas.jpeg' }
];

let lugares = []; // Se llenará con datos de la API

// Mapeo de códigos WMO de Open-Meteo a nuestros emojis
const weatherCodes = {
    0: { icon: '☀️', desc: 'Despejado' },
    1: { icon: '🌤️', desc: 'Mayormente Despejado' },
    2: { icon: '⛅', desc: 'Parcialmente Nublado' },
    3: { icon: '☁️', desc: 'Nublado' },
    45: { icon: '🌫️', desc: 'Niebla' },
    48: { icon: '🌫️', desc: 'Niebla' },
    51: { icon: '🌧️', desc: 'Llovizna' },
    53: { icon: '🌧️', desc: 'Llovizna' },
    55: { icon: '🌧️', desc: 'Llovizna' },
    61: { icon: '🌧️', desc: 'Lluvia' },
    63: { icon: '🌧️', desc: 'Lluvia' },
    65: { icon: '🌧️', desc: 'Lluvia Fuerte' },
    71: { icon: '❄️', desc: 'Nieve' },
    73: { icon: '❄️', desc: 'Nieve' },
    75: { icon: '❄️', desc: 'Nevazón' },
    80: { icon: '🌧️', desc: 'Chubascos' },
    81: { icon: '🌧️', desc: 'Chubascos' },
    82: { icon: '🌧️', desc: 'Chubascos Fuertes' },
    95: { icon: '⛈️', desc: 'Tormenta' },
    96: { icon: '⛈️', desc: 'Tormenta con Granizo' },
    99: { icon: '⛈️', desc: 'Tormenta Fuerte' }
};

// ============================================
// FUNCIÓN: OBTENER NOMBRE DEL DÍA
// ============================================
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function obtenerNombreDia(fechaStr) {
    // Aseguramos que la fecha se interprete correctamente (agregando T00:00:00 para evitar desfases de zona horaria al parsear)
    const fecha = new Date(fechaStr + 'T00:00:00');
    return diasSemana[fecha.getDay()];
}

// ============================================
// FUNCIÓN: DETECTAR ESTADO CLIMÁTICO
// ============================================
function obtenerIconoClima(code) {
    return weatherCodes[code]?.icon || '❓';
}

// ============================================
// FUNCIÓN PRINCIPAL: CARGAR DATOS DE LA API
// ============================================
async function cargarDatosClima() {
    const container = document.getElementById('weatherCards');
    container.innerHTML = '<div class="loading">Cargando datos del clima en vivo... 📡</div>';

    try {
        const fetchPromises = ciudadesBase.map(async (ciudad) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.lat}&longitude=${ciudad.lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

            const response = await fetch(url);
            const data = await response.json();

            // Procesar pronóstico diario
            const pronosticoSemanal = data.daily.time.slice(0, 7).map((time, index) => {
                return {
                    dia: obtenerNombreDia(time),
                    min: Math.round(data.daily.temperature_2m_min[index]),
                    max: Math.round(data.daily.temperature_2m_max[index]),
                    estado: obtenerIconoClima(data.daily.weather_code[index])
                };
            });

            return {
                ...ciudad,
                tempActual: Math.round(data.current.temperature_2m),
                estadoActual: obtenerIconoClima(data.current.weather_code),
                pronosticoSemanal: pronosticoSemanal
            };
        });

        lugares = await Promise.all(fetchPromises);
        renderizarTarjetasClima();
        console.log('✅ Datos actualizados desde Open-Meteo');

    } catch (error) {
        console.error('Error al cargar datos:', error);
        container.innerHTML = '<div class="error">Error al cargar datos del clima. Por favor intenta más tarde. ⚠️</div>';
    }
}

// ============================================
// FUNCIÓN: RENDERIZAR TARJETAS DE CLIMA
// ============================================
function renderizarTarjetasClima() {
    const container = document.getElementById('weatherCards');
    container.innerHTML = '';

    lugares.forEach(lugar => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${lugar.imagen}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';

        card.onclick = () => mostrarDetalleCiudad(lugar.id);

        card.innerHTML = `
            <div class="weather-card__header">
                <h3 class="weather-card__city">${lugar.nombre}</h3>
            </div>
            <div class="weather-card__current">
                <div class="weather-card__temp">${lugar.tempActual}°C</div>
                <div class="weather-card__status">${lugar.estadoActual}</div>
            </div>
            <div class="weather-card__footer">
                📊 Ver Pronóstico Completo
            </div>
        `;

        container.appendChild(card);
    });
}

// ============================================
// FUNCIÓN: BUSCAR LUGAR POR ID
// ============================================
function buscarLugarPorId(id) {
    return lugares.find(lugar => lugar.id === id);
}

// ============================================
// FUNCIÓN: CALCULAR ESTADÍSTICAS
// ============================================
function calcularEstadisticas(pronosticoSemanal) {
    let tempMin = Infinity;
    let tempMax = -Infinity;
    let sumaPromedios = 0;
    const conteoClima = {};

    // Uso de bucle FOR clásico (Requisito Académico)
    for (let i = 0; i < pronosticoSemanal.length; i++) {
        const dia = pronosticoSemanal[i];

        // 1. Encontrar Mínimos y Máximos
        if (dia.min < tempMin) tempMin = dia.min;
        if (dia.max > tempMax) tempMax = dia.max;

        // 2. Acumular para Promedio
        const promedioDia = (dia.min + dia.max) / 2;
        sumaPromedios += promedioDia;

        // 3. Contar tipos de clima
        // Equivalente a lógica de conteo o frecuencia
        if (conteoClima[dia.estado]) {
            conteoClima[dia.estado]++;
        } else {
            conteoClima[dia.estado] = 1;
        }
    }

    const tempPromedio = sumaPromedios / pronosticoSemanal.length;

    return {
        tempMin,
        tempMax,
        tempPromedio: Math.round(tempPromedio * 10) / 10,
        conteoClima
    };
}

// ============================================
// FUNCIÓN: GENERAR RESUMEN DINÁMICO
// ============================================
function generarResumen(nombreCiudad, stats) {
    let resumen = `En ${nombreCiudad}, la temperatura `;

    if (stats.tempPromedio < 10) {
        resumen += `se mantendrá fría con un promedio de ${stats.tempPromedio}°C. `;
    } else if (stats.tempPromedio < 20) {
        resumen += `será templada con un promedio de ${stats.tempPromedio}°C. `;
    } else {
        resumen += `será cálida con un promedio de ${stats.tempPromedio}°C. `;
    }

    resumen += `Se esperan temperaturas entre ${stats.tempMin}°C y ${stats.tempMax}°C. `;

    const climaPredominante = Object.entries(stats.conteoClima)
        .sort((a, b) => b[1] - a[1])[0];

    // Mapeo simple de emojis a descripciones para el texto
    const descripciones = {
        '☀️': 'días soleados',
        '🌤️': 'días mayormente soleados',
        '⛅': 'nubosidad parcial',
        '☁️': 'días nublados',
        '🌧️': 'lluvia probable',
        '⛈️': 'tormentas',
        '❄️': 'nieve',
        '🌫️': 'niebla'
    };

    resumen += `La semana tendrá principalmente ${descripciones[climaPredominante[0]] || 'clima variable'}.`;

    return resumen;
}

// ============================================
// FUNCIÓN: APLICAR TEMA DINÁMICO
// ============================================
function aplicarTema(estado, imagen) {
    const container = document.querySelector('.detail-section__container');
    container.className = 'detail-section__container'; // Reset classes

    // Mapeo básico para temas de color
    const temas = {
        '☀️': 'theme-sunny',
        '🌤️': 'theme-sunny',
        '⛅': 'theme-cloudy',
        '☁️': 'theme-cloudy',
        '🌧️': 'theme-rainy',
        '⛈️': 'theme-rainy',
        '❄️': 'theme-snowy',
        '🌫️': 'theme-cloudy'
    };

    const tema = temas[estado] || 'theme-cloudy';
    container.classList.add(tema);

    // Imagen de fondo en el header del detalle
    const header = document.querySelector('.detail-header');
    header.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${imagen}')`;
    header.style.backgroundSize = 'cover';
    header.style.backgroundPosition = 'center';
    header.style.borderRadius = '12px';
    header.style.padding = '3rem';
    header.style.color = 'white';
    header.style.marginBottom = '2rem';
}

// ============================================
// FUNCIÓN: MOSTRAR DETALLE
// ============================================
function mostrarDetalleCiudad(id) {
    const lugar = buscarLugarPorId(id);
    if (!lugar) return;

    const stats = calcularEstadisticas(lugar.pronosticoSemanal);

    aplicarTema(lugar.estadoActual, lugar.imagen);

    document.getElementById('detailCityName').textContent = lugar.nombre;
    document.getElementById('detailTemp').textContent = `${lugar.tempActual}°C`;
    document.getElementById('detailStatus').textContent = lugar.estadoActual;

    const semanaMin = stats.tempMin;
    const semanaMax = stats.tempMax;
    const rangoTotal = semanaMax - semanaMin;

    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';

    lugar.pronosticoSemanal.forEach(dia => {
        const range = rangoTotal === 0 ? 1 : rangoTotal;
        const left = ((dia.min - semanaMin) / range) * 100;
        const width = ((dia.max - dia.min) / range) * 100;

        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <div class="forecast-day__name">${dia.dia}</div>
            <div class="forecast-day__icon">${dia.estado}</div>
            <div class="forecast-day__temp">
                <span style="color: #3b82f6; font-size: 0.9em">${dia.min}°</span>
                <span style="color: #ef4444">${dia.max}°</span>
            </div>
            <div class="forecast-day__bar-container">
                <div class="forecast-day__bar" style="left: ${left}%; width: ${Math.max(width, 1)}%"></div>
            </div>
        `;
        forecastGrid.appendChild(dayDiv);
    });

    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-card__label">Temp. Mínima</div>
            <div class="stat-card__value">${stats.tempMin}°C</div>
        </div>
        <div class="stat-card">
            <div class="stat-card__label">Temp. Máxima</div>
            <div class="stat-card__value">${stats.tempMax}°C</div>
        </div>
        <div class="stat-card">
            <div class="stat-card__label">Temp. Promedio</div>
            <div class="stat-card__value">${stats.tempPromedio}°C</div>
        </div>
    `;

    const climateGrid = document.getElementById('climateGrid');
    if (climateGrid) {
        climateGrid.innerHTML = '';
        Object.entries(stats.conteoClima).forEach(([estado, cantidad]) => {
            const div = document.createElement('div');
            div.className = 'stat-card';
            div.innerHTML = `
                <div class="stat-card__label">Días</div>
                <div class="stat-card__value" style="font-size: 1.4rem">${estado} <span style="font-size: 1rem; color: #fff;">x${cantidad}</span></div>
            `;
            climateGrid.appendChild(div);
        });
    }

    document.getElementById('summaryText').textContent = generarResumen(lugar.nombre, stats);
    document.getElementById('detailSection').style.display = 'block';
}

function cerrarDetalle() {
    document.getElementById('detailSection').style.display = 'none';
}

// ============================================
// INICIALIZACIÓN
// ============================================
function inicializarApp() {
    // 1. Mostrar estado de carga inicial
    // const container = document.getElementById('weatherCards');
    // container.innerHTML = '<div style="color:white; text-align:center; padding:2rem;">Cargando información meteorológica...</div>';

    // 2. Cargar datos reales
    cargarDatosClima();

    // 3. Event Listeners
    document.getElementById('closeDetail').addEventListener('click', cerrarDetalle);

    console.log('✅ App iniciada - Conectando a APIs');
}

document.addEventListener('DOMContentLoaded', inicializarApp);
