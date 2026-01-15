export class ApiClient {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    /**
     * Obtiene el clima actual y pronóstico para una ubicación
     * @param {number} lat - Latitud
     * @param {number} lon - Longitud
     * @returns {Promise<Object>} Datos del clima
     */
    async getWeather(lat, lon) {
        try {
            // Construir URL con parámetros para clima actual y pronóstico diario (min, max, códigos de clima)
            const params = new URLSearchParams({
                latitude: lat,
                longitude: lon,
                daily: ['temperature_2m_max', 'temperature_2m_min', 'weathercode'],
                current_weather: true,
                timezone: 'auto'
            });

            const response = await fetch(`${this.baseUrl}?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener datos del clima:', error);
            throw error;
        }
    }
}
