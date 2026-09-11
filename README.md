# CV Profesional (Generador de Hojas de Vida)

Una aplicación web rápida y moderna para crear y descargar hojas de vida (CV) profesionales optimizadas para sistemas de seguimiento de candidatos (ATS). Todo el procesamiento se realiza en el navegador, garantizando la privacidad absoluta de los datos del usuario.

## 🚀 Características Principales

*   **Sin Registros ni Backend:** Comienza a crear tu CV al instante. No hay bases de datos, no hay formularios de inicio de sesión y no se guarda información en la nube. Tu información es tuya y vive únicamente en el almacenamiento local de tu navegador.
*   **Previsualización en Tiempo Real:** Interfaz de doble panel. Edita tu información en la izquierda y observa cómo se actualiza tu CV instantáneamente en la derecha.
*   **Traducción Automática Inteligente:** 
    *   Soporte bilingüe integrado (Español e Inglés).
    *   Al cambiar de idioma, el sistema traduce automáticamente tus descripciones de experiencia, perfil y educación en segundo plano mediante API gratuita.
    *   Protege inteligentemente entidades propias (ciudades, nombres de empresas, instituciones) compartiéndolas entre ambos idiomas sin alterarlas.
*   **Exportación a PDF ATS-Friendly:** Descarga directa a PDF con márgenes perfectos. El sistema inteligente de saltos de página evita que el texto, las habilidades o los contenedores queden cortados a la mitad entre una hoja y otra.
*   **Ordenamiento Automático:** Las experiencias laborales y estudios académicos se ordenan automáticamente de más reciente a más antiguo, dando siempre prioridad a los trabajos "Actuales".
*   **Plantillas Profesionales:** Incluye 3 plantillas diferentes para elegir:
    *   *Clásica:* Sobria, elegante y perfecta para la máxima compatibilidad ATS.
    *   *Moderna:* Limpia con detalles sutiles de color y estructura enfocada en destacar logros.
    *   *Compacta:* Especial para candidatos con mucha experiencia que necesitan aprovechar cada milímetro de la hoja.
*   **Personalización:** Cambia el color de acento de tu CV con un clic para darle un toque personal pero profesional, apoyado en iconografía limpia (SVG).

## 🛠️ Tecnologías Utilizadas

*   **React:** Construcción de la interfaz de usuario.
*   **Vite:** Herramienta de compilación rápida y servidor de desarrollo.
*   **Tailwind CSS:** Diseño responsivo y estilización ágil.
*   **html2pdf.js:** Generación avanzada de PDFs directamente desde el DOM en el cliente.
*   **Lucide React:** Iconografía profesional en formato SVG (amigable con lectores ATS).

## 📦 Instalación y Uso Local

Sigue estos pasos para clonar el repositorio y ejecutar la aplicación en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/cv-creator.git
   cd cv-creator
   ```

2. **Instalar dependencias:**
   Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Visita `http://localhost:5173` para ver la aplicación en funcionamiento.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo los términos de la licencia MIT.
