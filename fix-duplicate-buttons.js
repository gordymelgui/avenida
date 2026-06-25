// Script para eliminar botones duplicados y conflictos en el carrito
console.log('🔧 Eliminando botones duplicados del carrito...');

// Función para limpiar botones duplicados
function removeDuplicateButtons() {
    // Buscar todos los botones "Continuar con la Compra"
    const allButtons = document.querySelectorAll('button');
    const checkoutButtons = [];
    
    allButtons.forEach(button => {
        if (button.textContent.includes('Continuar con la Compra')) {
            checkoutButtons.push(button);
        }
    });
    
    // Si hay más de un botón, mantener solo el primero
    if (checkoutButtons.length > 1) {
        console.log(`🔄 Encontrados ${checkoutButtons.length} botones duplicados, eliminando extras...`);
        
        // Mantener solo el primer botón (el original de cart.html)
        for (let i = 1; i < checkoutButtons.length; i++) {
            checkoutButtons[i].remove();
            console.log(`🗑️ Botón duplicado ${i} eliminado`);
        }
        
        console.log('✅ Botones duplicados eliminados');
    }
    
    // Asegurar que solo haya un botón de checkout funcional
    if (checkoutButtons.length > 0) {
        const mainButton = checkoutButtons[0];
        mainButton.id = 'checkout-btn';
        mainButton.onclick = function() {
            console.log('🚀 Continuando con la compra...');
            window.location.href = 'checkout.html';
        };
        console.log('✅ Botón principal configurado correctamente');
    }
}

// Función para limpiar elementos duplicados del carrito
function cleanDuplicateCartElements() {
    // Buscar elementos duplicados del carrito
    const cartElements = document.querySelectorAll('[id*="cart"]');
    const seenIds = new Set();
    const duplicates = [];
    
    cartElements.forEach(element => {
        if (seenIds.has(element.id)) {
            duplicates.push(element);
        } else {
            seenIds.add(element.id);
        }
    });
    
    // Eliminar elementos duplicados
    duplicates.forEach(element => {
        element.remove();
        console.log(`🗑️ Elemento duplicado eliminado: ${element.id}`);
    });
    
    if (duplicates.length > 0) {
        console.log(`✅ ${duplicates.length} elementos duplicados eliminados`);
    }
}

// Función principal de limpieza
function cleanCartPage() {
    removeDuplicateButtons();
    cleanDuplicateCartElements();
    console.log('✅ Página del carrito limpiada');
}

// Ejecutar inmediatamente
cleanCartPage();

// Ejecutar cada 2 segundos para mantener la limpieza
setInterval(cleanCartPage, 2000);

console.log('✅ Script de limpieza del carrito activado');
