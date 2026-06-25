// Script para corregir la redirección del botón de checkout
console.log('🔧 Corrigiendo redirección del botón de checkout...');

// Función para corregir la redirección
function fixCheckoutRedirect() {
    // Buscar el botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (checkoutBtn) {
        // Remover event listeners existentes
        checkoutBtn.replaceWith(checkoutBtn.cloneNode(true));
        
        // Obtener el nuevo botón
        const newCheckoutBtn = document.getElementById('checkout-btn');
        
        // Configurar la redirección correcta
        newCheckoutBtn.onclick = function() {
            console.log('🚀 Continuando con la compra...');
            window.location.href = 'checkout.html';
        };
        
        console.log('✅ Redirección del botón corregida a checkout.html (simplificado)');
    }
    
    // También corregir la función global si existe
    if (typeof window.continueToCheckout === 'function') {
        window.continueToCheckout = function() {
            console.log('🚀 Continuando con la compra...');
            window.location.href = 'checkout.html';
        };
        console.log('✅ Función global continueToCheckout corregida');
    }
}

// Ejecutar inmediatamente
fixCheckoutRedirect();

// Ejecutar cada segundo para asegurar que se mantenga
setInterval(fixCheckoutRedirect, 1000);

console.log('✅ Script de corrección de redirección activado');
