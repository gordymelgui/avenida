// Configuración de EmailJS para AVENIDA - EJEMPLO (Completa con tus credenciales)
const EMAILJS_CONFIG = {
    // Tu clave pública de EmailJS
    PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY_HERE',
    
    // ID del servicio Gmail que creaste
    SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID_HERE',
    
    // IDs de los templates
    TEMPLATES: {
        CUSTOMER: 'YOUR_EMAILJS_CUSTOMER_TEMPLATE_ID_HERE', // Template para el cliente
        ADMIN: 'YOUR_EMAILJS_ADMIN_TEMPLATE_ID_HERE'        // Template para el admin
    }
};

function initializeEmailJS() {
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('✅ EmailJS inicializado correctamente');
        } else {
            console.warn('⚠️ EmailJS no está cargado');
        }
    } catch (error) {
        console.error('❌ Error al inicializar EmailJS:', error);
    }
}

async function sendEmailWithEmailJS(templateId, templateParams) {
    try {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS no está disponible');
        }
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        const emailParams = {
            ...templateParams,
            public_key: EMAILJS_CONFIG.PUBLIC_KEY
        };
        const result = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            templateId,
            emailParams
        );
        return result;
    } catch (error) {
        console.error('❌ Error al enviar email con EmailJS:', error);
        throw error;
    }
}

window.EMAILJS_CONFIG = EMAILJS_CONFIG;
window.initializeEmailJS = initializeEmailJS;
window.sendEmailWithEmailJS = sendEmailWithEmailJS;

document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
});
