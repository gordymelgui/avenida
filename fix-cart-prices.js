// Script completo para corregir precios y envío del carrito
console.log('🔧 Corrigiendo precios y envío del carrito...');

// Función para corregir precios del carrito
function fixCartPrices() {
    try {
        const savedCart = localStorage.getItem('avenidaCart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            let needsUpdate = false;
            
            // Verificar y corregir precios
            cart.forEach(item => {
                if (item.price !== 300000) {
                    console.log(`🔄 Corrigiendo precio de ${item.name}: ${item.price} → 300000`);
                    item.price = 300000;
                    needsUpdate = true;
                }
            });
            
            // Si se corrigieron precios, actualizar localStorage
            if (needsUpdate) {
                localStorage.setItem('avenidaCart', JSON.stringify(cart));
                console.log('✅ Carrito actualizado con precios correctos');
                
                // Recargar la información del carrito
                if (typeof loadCartInfo === 'function') {
                    loadCartInfo();
                }
            }
        }
    } catch (error) {
        console.error('❌ Error al corregir precios del carrito:', error);
    }
}

// Función para corregir el envío en cart.html
function fixShippingInCart() {
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (shippingEl) {
        shippingEl.textContent = 'Consultar por el precio';
    }
    
    if (totalEl) {
        const subtotalEl = document.getElementById('subtotal');
        if (subtotalEl) {
            const subtotalText = subtotalEl.textContent;
            totalEl.textContent = subtotalText + ' + delivery';
        }
    }
}

// Función principal de corrección
function fixCartIssues() {
    // Corregir precios
    fixCartPrices();
    
    // Corregir envío
    fixShippingInCart();
    
    console.log('✅ Correcciones aplicadas al carrito');
}

// Ejecutar inmediatamente
fixCartIssues();

// Ejecutar cada 3 segundos para mantener las correcciones
setInterval(fixCartIssues, 3000);

console.log('✅ Script de corrección del carrito activado');
