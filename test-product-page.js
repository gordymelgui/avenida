const fs = require('fs');

console.log('🧪 Probando página de producto...\n');

// Verificar que product.html tenga todos los elementos necesarios
if (fs.existsSync('product.html')) {
    const productContent = fs.readFileSync('product.html', 'utf8');
    
    console.log('📄 product.html - Elementos necesarios:');
    
    // Verificar elementos HTML críticos
    const hasAddToCartBtn = productContent.includes('id="add-to-cart-btn"');
    const hasSizeOptions = productContent.includes('id="size-options"');
    const hasToastNotification = productContent.includes('id="toast-notification"');
    const hasCustomerModal = productContent.includes('id="customer-data-modal"');
    
    console.log(`   🔘 Botón añadir al carrito: ${hasAddToCartBtn ? '✅' : '❌'}`);
    console.log(`   📏 Opciones de talla: ${hasSizeOptions ? '✅' : '❌'}`);
    console.log(`   🔔 Notificación toast: ${hasToastNotification ? '✅' : '❌'}`);
    console.log(`   📋 Modal de datos del cliente: ${hasCustomerModal ? '✅' : '❌'}`);
    
    // Verificar funciones JavaScript
    const hasInitializeProductPage = productContent.includes('function initializeProductPage');
    const hasSetupActionButtons = productContent.includes('function setupActionButtons');
    const hasGenerateSizeOptions = productContent.includes('function generateSizeOptions');
    const hasShowToast = productContent.includes('function showToast');
    
    console.log(`   🚀 initializeProductPage: ${hasInitializeProductPage ? '✅' : '❌'}`);
    console.log(`   ⚙️  setupActionButtons: ${hasSetupActionButtons ? '✅' : '❌'}`);
    console.log(`   📏 generateSizeOptions: ${hasGenerateSizeOptions ? '✅' : '❌'}`);
    console.log(`   🔔 showToast: ${hasShowToast ? '✅' : '❌'}`);
    
    // Verificar llamadas a funciones
    const hasCallToInitialize = productContent.includes('initializeProductPage()');
    const hasCallToSetupAction = productContent.includes('setupActionButtons(product)');
    const hasCallToGenerateSize = productContent.includes('generateSizeOptions(product)');
    
    console.log(`   📞 Llamada a initializeProductPage: ${hasCallToInitialize ? '✅' : '❌'}`);
    console.log(`   📞 Llamada a setupActionButtons: ${hasCallToSetupAction ? '✅' : '❌'}`);
    console.log(`   📞 Llamada a generateSizeOptions: ${hasCallToGenerateSize ? '✅' : '❌'}`);
    
    // Verificar logs de depuración
    const hasDebugLogs = productContent.includes('console.log') && productContent.includes('🔧');
    console.log(`   🐛 Logs de depuración: ${hasDebugLogs ? '✅' : '❌'}`);
    
} else {
    console.log('❌ product.html no encontrado');
}

console.log('');

// Verificar que script.js tenga las funciones necesarias
if (fs.existsSync('script.js')) {
    const scriptContent = fs.readFileSync('script.js', 'utf8');
    
    console.log('📄 script.js - Funciones del carrito:');
    
    const hasProductsArray = scriptContent.includes('window.products = [');
    const hasAddToCart = scriptContent.includes('window.addToCart = addToCart');
    const hasUpdateCartCount = scriptContent.includes('window.updateCartCount = updateCartCount');
    const hasShowToast = scriptContent.includes('window.showToast = showToast');
    const hasCheckStock = scriptContent.includes('window.checkStock = checkStock');
    
    console.log(`   📦 Array products: ${hasProductsArray ? '✅' : '❌'}`);
    console.log(`   🛒 addToCart: ${hasAddToCart ? '✅' : '❌'}`);
    console.log(`   🔢 updateCartCount: ${hasUpdateCartCount ? '✅' : '❌'}`);
    console.log(`   🔔 showToast: ${hasShowToast ? '✅' : '❌'}`);
    console.log(`   📊 checkStock: ${hasCheckStock ? '✅' : '❌'}`);
    
} else {
    console.log('❌ script.js no encontrado');
}

console.log('\n🧪 Prueba completada.');
