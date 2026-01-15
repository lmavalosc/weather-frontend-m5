# 🚀 Instrucciones de Ejecución - App de Clima

## ⚠️ IMPORTANTE: Uso de Servidor Local

Esta aplicación utiliza **módulos ES6** (`import/export`), por lo que **NO funcionará** si abres `index.html` directamente haciendo doble clic. Los navegadores modernos bloquean la carga de módulos desde el protocolo `file://` por razones de seguridad (CORS).

**Debes usar un servidor HTTP local** para ejecutar la aplicación.

---

## 📋 Opciones para Ejecutar el Proyecto

### Opción 1: Visual Studio Code + Live Server (⭐ Recomendado)

**Requisitos**: Tener instalado Visual Studio Code

1. Abre VS Code
2. Instala la extensión **"Live Server"** de Ritwick Dey:
   - Ve a Extensiones (Ctrl+Shift+X)
   - Busca "Live Server"
   - Instala la extensión
3. Abre la carpeta del proyecto en VS Code
4. Haz clic derecho en `index.html`
5. Selecciona **"Open with Live Server"**
6. El navegador se abrirá automáticamente en `http://127.0.0.1:5500`

**Ventajas**: Recarga automática al guardar cambios, muy fácil de usar.

---

### Opción 2: Python (Si tienes Python instalado)

#### Python 3.x:
```bash
# Navega a la carpeta del proyecto
cd "C:\Users\ericl\OneDrive\Desktop\clima"

# Inicia el servidor
python -m http.server 8000
```

#### Python 2.x:
```bash
cd "C:\Users\ericl\OneDrive\Desktop\clima"
python -m SimpleHTTPServer 8000
```

Luego abre tu navegador en: `http://localhost:8000`

---

### Opción 3: Node.js (Si tienes Node.js instalado)

```bash
# Navega a la carpeta del proyecto
cd "C:\Users\ericl\OneDrive\Desktop\clima"

# Opción A: Usando npx (no requiere instalación)
npx http-server -p 8000

# Opción B: Instalando http-server globalmente
npm install -g http-server
http-server -p 8000
```

Luego abre tu navegador en: `http://localhost:8000`

---

### Opción 4: PHP (Si tienes PHP instalado)

```bash
cd "C:\Users\ericl\OneDrive\Desktop\clima"
php -S localhost:8000
```

Luego abre tu navegador en: `http://localhost:8000`

---

## 🔍 Verificación de Funcionamiento

Una vez que el servidor esté corriendo:

1. **Página de Inicio**: Deberías ver un mensaje "Cargando datos climáticos..." que luego se reemplaza con 7 tarjetas de ciudades chilenas.

2. **Datos Reales**: Las temperaturas y estados del clima provienen de la API de Open-Meteo en tiempo real.

3. **Consola del Navegador**: Abre las DevTools (F12) y verifica que aparezca el mensaje:
   ```
   🚀 Iniciando WeatherApp (POO + ES6)
   ```

4. **Sin Errores CORS**: No deberías ver errores relacionados con CORS o módulos bloqueados.

---

## 🐛 Solución de Problemas

### Error: "Failed to load module script"
**Causa**: Estás abriendo el archivo directamente sin servidor.  
**Solución**: Usa una de las opciones de servidor local descritas arriba.

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"
**Causa**: Módulos ES6 bloqueados por política CORS.  
**Solución**: Usa un servidor HTTP local.

### Las tarjetas no cargan / se queda en "Cargando..."
**Causa**: Posible problema de conexión a internet o la API está caída.  
**Solución**: 
- Verifica tu conexión a internet
- Abre la consola del navegador (F12) y revisa si hay errores de red
- La API de Open-Meteo es gratuita y pública, pero puede tener límites de tasa

### No se ven las imágenes de las ciudades
**Causa**: Las rutas de las imágenes son relativas.  
**Solución**: Asegúrate de que la carpeta `assets/img/` contenga todas las imágenes:
- arica.jpg
- antofagasta.jpg
- valparaiso.png
- santiago.jpg
- concepcion.png
- valdivia.jpg
- puntaArenas.jpeg

---

## 📱 Navegadores Compatibles

La aplicación funciona en navegadores modernos que soporten:
- ES6+ (módulos, async/await, arrow functions)
- Fetch API
- CSS Grid y Flexbox

**Navegadores recomendados**:
- ✅ Google Chrome (v80+)
- ✅ Mozilla Firefox (v75+)
- ✅ Microsoft Edge (v80+)
- ✅ Safari (v13+)

---

## 🌐 API Utilizada

**Open-Meteo Weather API**  
- URL: https://api.open-meteo.com/v1/forecast
- Tipo: Pública y gratuita
- Sin autenticación requerida
- Documentación: https://open-meteo.com/en/docs

---

## 📞 Soporte

Si tienes problemas para ejecutar la aplicación:

1. Verifica que estés usando un servidor HTTP local
2. Revisa la consola del navegador (F12) para ver errores específicos
3. Asegúrate de tener conexión a internet para la API
4. Verifica que todos los archivos estén en su lugar (HTML, CSS, JS, imágenes)

---

**Desarrollado por**: Lorenzo Ávalos  
**Módulo**: 5 - POO, ES6+ y Consumo de API  
**Fecha**: Enero 2026
