// ============================================
// DATOS: ARREGLO DE LUGARES (HARDCODED)
// ============================================
// Definición del modelo de datos según requerimientos del Módulo 4
const lugares = [
    {
        id: 1,
        nombre: 'Arica',
        imagen: 'assets/img/arica.jpg',
        tempActual: 24,
        estadoActual: '☀️',
        pronosticoSemanal: [
            { dia: 'Lunes', min: 18, max: 24, estado: '☀️' },
            { dia: 'Martes', min: 19, max: 25, estado: '☀️' },
            { dia: 'Miércoles', min: 18, max: 24, estado: '🌤️' },
            { dia: 'Jueves', min: 17, max: 23, estado: '☁️' },
            { dia: 'Viernes', min: 18, max: 24, estado: '☀️' },
            { dia: 'Sábado', min: 19, max: 26, estado: '☀️' },
            { dia: 'Domingo', min: 18, max: 25, estado: '🌤️' }
        ]
    },
    {
        id: 2,
        nombre: 'Antofagasta',
        imagen: 'assets/img/antofagasta.jpg',
        tempActual: 20,
        estadoActual: '🌥️',
        pronosticoSemanal: [
            { dia: 'Lunes', min: 15, max: 20, estado: '🌥️' },
            { dia: 'Martes', min: 16, max: 21, estado: '☀️' },
            { dia: 'Miércoles', min: 15, max: 20, estado: '☁️' },
            { dia: 'Jueves', min: 14, max: 19, estado: '☁️' },
            { dia: 'Viernes', min: 15, max: 21, estado: '🌤️' },
            { dia: 'Sábado', min: 16, max: 22, estado: '☀️' },
            { dia: 'Domingo', min: 15, max: 20, estado: '🌥️' }
        ]
    },
    {
        id: 3,
        nombre: 'Valparaíso',
        imagen: 'assets/img/valparaiso.png',
        tempActual: 18,
        estadoActual: '🌤️',
        pronosticoSemanal: [
            { dia: 'Lunes', min: 12, max: 18, estado: '🌤️' },
            { dia: 'Martes', min: 11, max: 17, estado: '☁️' },
            { dia: 'Miércoles', min: 10, max: 16, estado: '🌫️' },
            { dia: 'Jueves', min: 12, max: 19, estado: '☀️' },
            { dia: 'Viernes', min: 13, max: 20, estado: '☀️' },
            { dia: 'Sábado', min: 14, max: 21, estado: '☀️' },
            { dia: 'Domingo', min: 13, max: 19, estado: '🌤️' }
        ]
    },
    {
        id: 4,
        nombre: 'Santiago',
        imagen: 'assets/img/santiago.jpg',
        tempActual: 28,
        estadoActual: '☀️',
        pronosticoSemanal: [
            { dia: 'Lunes', min: 15, max: 28, estado: '☀️' },
            { dia: 'Martes', min: 14, max: 27, estado: '☀️' },
            { dia: 'Miércoles', min: 16, max: 30, estado: '☀️' },
            { dia: 'Jueves', min: 17, max: 32, estado: '☀️' },
            { dia: 'Viernes', min: 16, max: 31, estado: '🌤️' },
            { dia: 'Sábado', min: 15, max: 29, estado: '🌤️' },
            { dia: 'Domingo', min: 14, max: 28, estado: '☁️' }
        ]
    },
    {
        id: 5,
        nombre: 'Concepción',
        imagen: 'assets/img/concepcion.png',
        tempActual: 16,
        estadoActual: '☁️',
        pronosticoSemanal: [
            { dia: 'Lunes', min: 10, max: 16, estado: '☁️' },
            { dia: 'Martes', min: 9, max: 15, estado: '🌧️' },
            { dia: 'Miércoles', min: 8, max: 14, estado: '🌧️' },
            { dia: 'Jueves', min: 10, max: 17, estado: '🌤️' },
            { dia: 'Viernes', min: 11, max: 18, estado: '☀️' },
            { dia: 'Sábado', min: 10, max: 16, estado: '☁️' },
            { dia: 'Domingo', min: 9, max: 15, estado: '🌧️' }
        ]
    },
    {
        id: 6,
        nombre: 'Valdivia',
        imagen: 'assets/img/valdivia.jpg',
        tempActual: 14,
        estadoActual: '🌧️',
        pronosticoSemanal: [
            { dia: 'Lunes', min: 8, max: 14, estado: '🌧️' },
            { dia: 'Martes', min: 7, max: 13, estado: '🌧️' },
            { dia: 'Miércoles', min: 6, max: 12, estado: '⛈️' },
            { dia: 'Jueves', min: 8, max: 14, estado: '🌧️' },
            { dia: 'Viernes', min: 9, max: 15, estado: '☁️' },
            { dia: 'Sábado', min: 8, max: 14, estado: '☁️' },
            { dia: 'Domingo', min: 7, max: 13, estado: '🌧️' }
        ]
    },
    {
        id: 7,
        nombre: 'Punta Arenas',
        imagen: 'assets/img/puntaArenas.jpeg',
        tempActual: 5,
        estadoActual: '❄️',
        pronosticoSemanal: [
            { dia: 'Lunes', min: 1, max: 5, estado: '❄️' },
            { dia: 'Martes', min: 0, max: 4, estado: '❄️' },
            { dia: 'Miércoles', min: -1, max: 3, estado: '☁️' },
            { dia: 'Jueves', min: 0, max: 5, estado: '🌤️' },
            { dia: 'Viernes', min: 1, max: 6, estado: '☁️' },
            { dia: 'Sábado', min: 0, max: 4, estado: '💨' },
            { dia: 'Domingo', min: -2, max: 3, estado: '❄️' }
        ]
    }
];

// ============================================
// FUNCIÓN: RENDERIZAR TARJETAS DE CLIMA
// ============================================
function renderizarTarjetasClima() {
    const container = document.getElementById('weatherCards');
    container.innerHTML = '';

    lugares.forEach(lugar => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        // Simulamos la carga de imagen, si no existe usa un degradado bonito
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
// FUNCIÓN: BUSCAR LUGAR POR ID O NOMBRE
// ============================================
function buscarLugar(criterio) {
    // Uso del método .find() iterando sobre el arreglo de objetos
    // Permite buscar tanto por el ID numérico como por el nombre de la ciudad
    return lugares.find(lugar =>
        lugar.id === criterio ||
        lugar.nombre.toLowerCase() === String(criterio).toLowerCase()
    );
}

// ============================================
// FUNCIÓN: CALCULAR ESTADÍSTICAS
// ============================================
function calcularEstadisticas(pronosticoSemanal) {
    let tempMin = Infinity;
    let tempMax = -Infinity;
    let sumaPromedios = 0;
    const conteoClima = {};

    // Uso de bucle FOR clásico para recorrer el arreglo
    for (let i = 0; i < pronosticoSemanal.length; i++) {
        const dia = pronosticoSemanal[i];

        // 1. Encontrar Mínimos y Máximos
        if (dia.min < tempMin) tempMin = dia.min;
        if (dia.max > tempMax) tempMax = dia.max;

        // 2. Acumular para Promedio
        const promedioDia = (dia.min + dia.max) / 2;
        sumaPromedios += promedioDia;

        // 3. Contar tipos de clima
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
// FUNCIÓN: GENERAR RESUMEN TEXTUAL
// ============================================
function generarResumen(nombreCiudad, stats) {
    let resumen = `En ${nombreCiudad}, esta semana `;

    // Condicionales para determinar el mensaje según la temperatura promedio
    if (stats.tempPromedio < 12) {
        resumen += `se sentirá bastante fría, con un promedio de solo ${stats.tempPromedio}°C. `;
    } else if (stats.tempPromedio < 22) {
        resumen += `el clima estará templado y agradable, promediando ${stats.tempPromedio}°C. `;
    } else {
        resumen += `hará calor, con una media de ${stats.tempPromedio}°C. `;
    }

    resumen += `Las temperaturas oscilarán entre ${stats.tempMin}°C y ${stats.tempMax}°C. `;

    // Determinar el clima predominante
    const climaPredominante = Object.entries(stats.conteoClima)
        .sort((a, b) => b[1] - a[1])[0];

    // Mapeo de emojis a texto para el resumen
    const descripciones = {
        '☀️': 'días soleados',
        '🌤️': 'algo de sol',
        '🌥️': 'nubosidad parcial',
        '☁️': 'días nublados',
        '🌧️': 'lluvias',
        '⛈️': 'tormentas eléctricas',
        '❄️': 'nevadas',
        '🌫️': 'neblina',
        '💨': 'vientos fuertes'
    };

    const textoClima = descripciones[climaPredominante[0]] || 'condiciones variables';

    // Condicional extra para el cierre
    if (climaPredominante[1] > 4) {
        resumen += `Prepárate para una semana marcada por ${textoClima}.`;
    } else {
        resumen += `Tendremos principalmente ${textoClima}, aunque el clima variará.`;
    }

    return resumen;
}

// ============================================
// FUNCIÓN: APLICAR TEMA DINÁMICO
// ============================================
function aplicarTema(estado, imagen) {
    const container = document.querySelector('.detail-section__container');
    container.className = 'detail-section__container'; // Reset classes

    const temas = {
        '☀️': 'theme-sunny',
        '🌤️': 'theme-sunny',
        '🌥️': 'theme-cloudy',
        '☁️': 'theme-cloudy',
        '🌧️': 'theme-rainy',
        '⛈️': 'theme-rainy',
        '❄️': 'theme-snowy',
        '🌫️': 'theme-cloudy',
        '💨': 'theme-cloudy'
    };

    const tema = temas[estado] || 'theme-cloudy';
    container.classList.add(tema);

    // Imagen de fondo en el header del detalle
    const header = document.querySelector('.detail-header');
    header.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${imagen}')`;
    header.style.backgroundSize = 'cover';
    header.style.backgroundPosition = 'center';
}

// ============================================
// FUNCIÓN: MOSTRAR DETALLE
// ============================================
function mostrarDetalleCiudad(id) {
    const lugar = buscarLugar(id);
    if (!lugar) return;

    // Calcular estadísticas al momento de abrir el detalle
    const stats = calcularEstadisticas(lugar.pronosticoSemanal);

    aplicarTema(lugar.estadoActual, lugar.imagen);

    // Actualizar DOM del detalle
    document.getElementById('detailCityName').textContent = lugar.nombre;
    document.getElementById('detailTemp').textContent = `${lugar.tempActual}°C`;
    document.getElementById('detailStatus').textContent = lugar.estadoActual;

    const semanaMin = stats.tempMin;
    const semanaMax = stats.tempMax;
    const rangoTotal = semanaMax - semanaMin || 1; // Evitar división por cero

    // Renderizar grafico de barras del pronostico
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';

    lugar.pronosticoSemanal.forEach(dia => {
        const left = ((dia.min - semanaMin) / rangoTotal) * 100;
        const width = ((dia.max - dia.min) / rangoTotal) * 100;

        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <div class="forecast-day__name">${dia.dia}</div>
            <div class="forecast-day__icon">${dia.estado}</div>
            <div class="forecast-day__temp">
                <span class="min" style="color: #3b82f6;">${dia.min}°</span>
                <span class="max" style="color: #ef4444;">${dia.max}°</span>
            </div>
            <div class="forecast-day__bar-container">
                <div class="forecast-day__bar" style="left: ${left}%; width: ${Math.max(width, 5)}%"></div>
            </div>
        `;
        forecastGrid.appendChild(dayDiv);
    });

    // Renderizar tarjetas de estadísticas
    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-card__label">Mínima</div>
            <div class="stat-card__value">${stats.tempMin}°C</div>
        </div>
        <div class="stat-card">
            <div class="stat-card__label">Máxima</div>
            <div class="stat-card__value">${stats.tempMax}°C</div>
        </div>
        <div class="stat-card">
            <div class="stat-card__label">Promedio</div>
            <div class="stat-card__value">${stats.tempPromedio}°C</div>
        </div>
    `;

    // Renderizar distribución de clima
    const climateGrid = document.getElementById('climateGrid');
    if (climateGrid) {
        climateGrid.innerHTML = '';
        Object.entries(stats.conteoClima).forEach(([estado, cantidad]) => {
            const div = document.createElement('div');
            div.className = 'stat-card';
            div.innerHTML = `
                <div class="stat-card__label">Días</div>
                <div class="stat-card__value" style="font-size: 1.5rem">${estado} <span style="font-size: 1rem; color: #cbd5e1;">x${cantidad}</span></div>
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
    console.log('🚀 Iniciando App de Clima - Módulo 4');

    // Carga inicial de tarjetas
    renderizarTarjetasClima();

    // Event Listeners
    document.getElementById('closeDetail').addEventListener('click', cerrarDetalle);

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarDetalle();
    });
}

document.addEventListener('DOMContentLoaded', inicializarApp);
