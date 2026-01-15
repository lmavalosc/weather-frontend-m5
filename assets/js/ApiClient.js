/**
 * Clase ApiClient
 * Se encarga de la comunicación con la API externa (Open-Meteo).
 * Módulo 5: Programación Asíncrona y Consumo de APIs
 */
export class ApiClient {
    constructor() {
        // Base URL definida en el constructor
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    /**
     * Obtiene el clima actual y pronóstico para una ubicación
     * @param {number} lat - Latitud
     * @param {number} lon - Longitud
     * @returns {Promise<Object>} Promesa con los datos JSON del clima
     */
    async getWeather(lat, lon) {
        try {
            // URLSearchParams facilita la construcción de query strings
            const params = new URLSearchParams({
                latitude: lat,
                longitude: lon,
                // Parámetros específicos requeridos por la rúbrica (pronóstico + actual)
                daily: ['temperature_2m_max', 'temperature_2m_min', 'weathercode'],
                current_weather: true,
                timezone: 'auto'
            });

            // Uso de fetch API con await (ES6+)
            const response = await fetch(`${this.baseUrl}?${params.toString()}`);

            // Validación de la respuesta HTTP
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Parseo de la respuesta JSON
            return await response.json();

        } catch (error) {
            // Propagación del error para que sea manejado por la clase WeatherApp
            console.error('Error al obtener datos del clima:', error);
            throw error;
        }
    }
}
