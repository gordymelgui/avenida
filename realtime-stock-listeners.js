// Sistema de Listeners en Tiempo Real para Stock
// Implementa onSnapshot() de Firebase Firestore para actualizaciones inmediatas

console.log('🔄 Sistema de listeners de stock en tiempo real cargado');

class RealtimeStockListeners {
    constructor() {
        this.listeners = new Map(); // Almacenar referencias a los listeners
        this.isInitialized = false;
        this.firebaseAvailable = false;
        this.init();
    }

    async init() {
        try {
            // Esperar a que Firebase esté disponible
            await this.waitForFirebase();
            
            if (this.firebaseAvailable) {
                console.log('✅ Firebase disponible, configurando listeners de stock');
                this.setupGlobalStockListener();
                this.isInitialized = true;
            } else {
                console.log('⚠️ Firebase no disponible, usando modo local');
                this.setupLocalStockListener();
                this.isInitialized = true;
            }
        } catch (error) {
            console.error('❌ Error al inicializar listeners de stock:', error);
            this.setupLocalStockListener();
            this.isInitialized = true;
        }
    }

    async waitForFirebase() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (attempts < maxAttempts) {
            if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.db) {
                console.log('✅ Firebase encontrado para listeners de stock');
                this.firebaseAvailable = true;
                return true;
            }
            
            if (attempts % 10 === 0) {
                console.log(`⏳ Esperando Firebase para listeners... (${attempts + 1}/${maxAttempts})`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        console.warn('⚠️ Firebase no disponible para listeners de stock');
        this.firebaseAvailable = false;
        return false;
    }

    // Configurar listener global para todos los productos
    setupGlobalStockListener() {
        try {
            if (!this.firebaseAvailable || !window.firebaseAuth?.db) {
                console.log('⚠️ Firebase no disponible para listener global');
                return;
            }

            console.log('👂 Configurando listener global de stock...');
            
            // Listener para toda la colección de productos
            const unsubscribe = window.firebaseAuth.db.collection('products')
                .onSnapshot((snapshot) => {
                    console.log('🔄 Cambio detectado en colección de productos');
                    
                    snapshot.docChanges().forEach((change) => {
                        const productId = change.doc.id;
                        const productData = change.doc.data();
                        
                        if (change.type === 'modified') {
                            console.log(`📦 Stock actualizado en tiempo real: ${productId}`);
                            this.handleStockUpdate(productId, productData);
                        } else if (change.type === 'added') {
                            console.log(`➕ Producto agregado: ${productId}`);
                            this.handleProductAdded(productId, productData);
                        } else if (change.type === 'removed') {
                            console.log(`➖ Producto eliminado: ${productId}`);
                            this.handleProductRemoved(productId);
                        }
                    });
                }, (error) => {
                    console.error('❌ Error en listener global de stock:', error);
                });

            // Guardar referencia para poder cancelar
            this.listeners.set('global', unsubscribe);
            console.log('✅ Listener global de stock configurado');
            
        } catch (error) {
            console.error('❌ Error al configurar listener global:', error);
        }
    }

    // Configurar listener específico para un producto
    setupProductStockListener(productId) {
        try {
            if (!this.firebaseAvailable || !window.firebaseAuth?.db) {
                console.log('⚠️ Firebase no disponible para listener de producto');
                return;
            }

            // Evitar duplicar listeners
            if (this.listeners.has(`product_${productId}`)) {
                console.log(`👂 Listener ya existe para producto ${productId}`);
                return;
            }

            console.log(`👂 Configurando listener específico para producto: ${productId}`);
            
            const productDoc = window.firebaseAuth.db.collection('products').doc(productId);
            const unsubscribe = productDoc.onSnapshot((docSnapshot) => {
                if (docSnapshot.exists) {
                    const productData = docSnapshot.data();
                    console.log(`📦 Stock actualizado en tiempo real para producto ${productId}:`, productData.stock);
                    this.handleStockUpdate(productId, productData);
                } else {
                    console.log(`❌ Producto ${productId} no existe en Firebase`);
                    this.handleProductRemoved(productId);
                }
            }, (error) => {
                console.error(`❌ Error en listener de producto ${productId}:`, error);
            });

            // Guardar referencia
            this.listeners.set(`product_${productId}`, unsubscribe);
            console.log(`✅ Listener específico configurado para producto: ${productId}`);
            
        } catch (error) {
            console.error(`❌ Error al configurar listener para producto ${productId}:`, error);
        }
    }

    // Manejar actualización de stock
    handleStockUpdate(productId, productData) {
        try {
            // Actualizar producto en memoria
            if (window.products && Array.isArray(window.products)) {
                const productIndex = window.products.findIndex(p => p.id == productId);
                if (productIndex !== -1) {
                    const oldStock = { ...window.products[productIndex].stock };
                    window.products[productIndex].stock = productData.stock || {};
                    window.products[productIndex].status = productData.status || 'available';
                    window.products[productIndex].lastUpdated = productData.lastUpdated;
                    
                    console.log(`🔄 Stock actualizado en memoria: ${window.products[productIndex].name}`);
                    console.log(`📊 Stock anterior:`, oldStock);
                    console.log(`📊 Stock nuevo:`, productData.stock);
                    
                    // Actualizar localStorage
                    this.updateLocalStorage();
                    
                    // Actualizar UI inmediatamente
                    this.updateStockUI(productId, productData);
                    
                    // Disparar evento personalizado
                    this.dispatchStockUpdateEvent(productId, productData, oldStock);
                }
            }
        } catch (error) {
            console.error('❌ Error al manejar actualización de stock:', error);
        }
    }

    // Manejar producto agregado
    handleProductAdded(productId, productData) {
        try {
            if (window.products && Array.isArray(window.products)) {
                // Verificar si el producto ya existe
                const existingIndex = window.products.findIndex(p => p.id == productId);
                if (existingIndex === -1) {
                    // Agregar nuevo producto
                    window.products.push({
                        id: productId,
                        ...productData
                    });
                    
                    console.log(`➕ Producto agregado: ${productData.name || productId}`);
                    this.updateLocalStorage();
                    this.updateStockUI(productId, productData);
                }
            }
        } catch (error) {
            console.error('❌ Error al manejar producto agregado:', error);
        }
    }

    // Manejar producto eliminado
    handleProductRemoved(productId) {
        try {
            if (window.products && Array.isArray(window.products)) {
                const productIndex = window.products.findIndex(p => p.id == productId);
                if (productIndex !== -1) {
                    const removedProduct = window.products.splice(productIndex, 1)[0];
                    console.log(`➖ Producto eliminado: ${removedProduct.name || productId}`);
                    this.updateLocalStorage();
                    
                    // Actualizar UI para mostrar que el producto no está disponible
                    this.updateStockUI(productId, { status: 'unavailable' });
                }
            }
        } catch (error) {
            console.error('❌ Error al manejar producto eliminado:', error);
        }
    }

    // Actualizar localStorage
    updateLocalStorage() {
        try {
            if (window.products && Array.isArray(window.products)) {
                localStorage.setItem('avenidaProducts', JSON.stringify(window.products));
                localStorage.setItem('avenidaAdminProducts', JSON.stringify(window.products));
                console.log('💾 Productos actualizados en localStorage');
            }
        } catch (error) {
            console.error('❌ Error al actualizar localStorage:', error);
        }
    }

    // Actualizar UI del stock
    updateStockUI(productId, productData) {
        try {
            // Actualizar indicadores de stock en la página
            this.updateStockIndicators(productId, productData);
            
            // Actualizar botones de tallas
            this.updateSizeButtons(productId, productData);
            
            // Actualizar contador del carrito si es necesario
            if (window.updateCartCount) {
                window.updateCartCount();
            }
            
            // Actualizar display de productos si estamos en una página de producto
            if (window.updateProductDisplay) {
                window.updateProductDisplay();
            }
            
            console.log(`🎨 UI actualizada para producto ${productId}`);
        } catch (error) {
            console.error('❌ Error al actualizar UI del stock:', error);
        }
    }

    // Actualizar indicadores de stock
    updateStockIndicators(productId, productData) {
        try {
            const stock = productData.stock || {};
            const totalStock = Object.values(stock).reduce((sum, qty) => sum + (qty || 0), 0);
            
            // Buscar elementos con data-product-stock
            const stockElements = document.querySelectorAll(`[data-product-stock="${productId}"]`);
            stockElements.forEach(element => {
                if (totalStock === 0) {
                    element.textContent = 'Sin Stock';
                    element.className = 'text-red-500 font-bold';
                } else if (totalStock < 10) {
                    element.textContent = 'Stock Bajo';
                    element.className = 'text-yellow-500 font-bold';
                } else {
                    element.textContent = 'En Stock';
                    element.className = 'text-green-500 font-bold';
                }
            });
            
            // Buscar elementos con data-product-id para actualizar stock por talla
            const sizeElements = document.querySelectorAll(`[data-product-id="${productId}"]`);
            sizeElements.forEach(element => {
                const size = element.getAttribute('data-size');
                if (size && stock[size] !== undefined) {
                    const stockQty = stock[size] || 0;
                    
                    if (stockQty === 0) {
                        element.textContent = 'Sin Stock';
                        element.className = 'text-red-500 font-bold text-sm';
                        element.disabled = true;
                    } else if (stockQty < 5) {
                        element.textContent = `Stock Bajo (${stockQty})`;
                        element.className = 'text-yellow-500 font-bold text-sm';
                        element.disabled = false;
                    } else {
                        element.textContent = `Disponible (${stockQty})`;
                        element.className = 'text-green-500 font-bold text-sm';
                        element.disabled = false;
                    }
                }
            });
            
        } catch (error) {
            console.error('❌ Error al actualizar indicadores de stock:', error);
        }
    }

    // Actualizar botones de tallas
    updateSizeButtons(productId, productData) {
        try {
            const stock = productData.stock || {};
            
            // Buscar botones de tallas para este producto
            const sizeButtons = document.querySelectorAll(`[data-product-id="${productId}"][data-size]`);
            sizeButtons.forEach(button => {
                const size = button.getAttribute('data-size');
                const stockQty = stock[size] || 0;
                
                if (stockQty === 0) {
                    button.disabled = true;
                    button.classList.add('opacity-50', 'cursor-not-allowed');
                    button.classList.remove('hover:bg-gray-100');
                } else {
                    button.disabled = false;
                    button.classList.remove('opacity-50', 'cursor-not-allowed');
                    button.classList.add('hover:bg-gray-100');
                }
            });
            
        } catch (error) {
            console.error('❌ Error al actualizar botones de tallas:', error);
        }
    }

    // Disparar evento personalizado
    dispatchStockUpdateEvent(productId, productData, oldStock) {
        try {
            const event = new CustomEvent('stockUpdatedRealtime', {
                detail: {
                    productId: productId,
                    productData: productData,
                    oldStock: oldStock,
                    timestamp: Date.now(),
                    source: 'realtime-listener'
                }
            });
            
            window.dispatchEvent(event);
            console.log(`📡 Evento de actualización de stock disparado para producto ${productId}`);
        } catch (error) {
            console.error('❌ Error al disparar evento de stock:', error);
        }
    }

    // Configurar listener local (sin Firebase)
    setupLocalStockListener() {
        console.log('🔄 Configurando listener local de stock...');
        
        // Escuchar cambios en localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'avenidaAdminProducts' || e.key === 'avenidaProducts') {
                console.log('🔄 Cambio detectado en localStorage de productos');
                this.handleLocalStorageChange();
            }
        });
        
        // También escuchar eventos personalizados
        window.addEventListener('stockUpdated', (e) => {
            console.log('🔄 Evento de stock actualizado recibido:', e.detail);
            if (e.detail && e.detail.products) {
                this.handleLocalStockUpdate(e.detail.products);
            }
        });
        
        console.log('✅ Listener local de stock configurado');
    }

    // Manejar cambio en localStorage
    handleLocalStorageChange() {
        try {
            const savedProducts = localStorage.getItem('avenidaAdminProducts') || localStorage.getItem('avenidaProducts');
            if (savedProducts) {
                const localProducts = JSON.parse(savedProducts);
                if (window.products && JSON.stringify(window.products) !== JSON.stringify(localProducts)) {
                    window.products = localProducts;
                    console.log('🔄 Productos sincronizados desde localStorage');
                    this.updateAllStockUI();
                }
            }
        } catch (error) {
            console.error('❌ Error al manejar cambio en localStorage:', error);
        }
    }

    // Manejar actualización local de stock
    handleLocalStockUpdate(updatedProducts) {
        try {
            if (window.products && updatedProducts) {
                window.products = updatedProducts;
                this.updateLocalStorage();
                this.updateAllStockUI();
                console.log('🔄 Stock actualizado desde evento local');
            }
        } catch (error) {
            console.error('❌ Error al manejar actualización local:', error);
        }
    }

    // Actualizar toda la UI de stock
    updateAllStockUI() {
        try {
            if (window.products && Array.isArray(window.products)) {
                window.products.forEach(product => {
                    this.updateStockUI(product.id, product);
                });
            }
        } catch (error) {
            console.error('❌ Error al actualizar toda la UI de stock:', error);
        }
    }

    // Cancelar listener específico
    unsubscribeProduct(productId) {
        const listenerKey = `product_${productId}`;
        if (this.listeners.has(listenerKey)) {
            const unsubscribe = this.listeners.get(listenerKey);
            unsubscribe();
            this.listeners.delete(listenerKey);
            console.log(`👂 Listener cancelado para producto ${productId}`);
        }
    }

    // Cancelar todos los listeners
    unsubscribeAll() {
        console.log('👂 Cancelando todos los listeners de stock...');
        
        this.listeners.forEach((unsubscribe, key) => {
            try {
                unsubscribe();
                console.log(`👂 Listener cancelado: ${key}`);
            } catch (error) {
                console.error(`❌ Error al cancelar listener ${key}:`, error);
            }
        });
        
        this.listeners.clear();
        console.log('✅ Todos los listeners de stock cancelados');
    }

    // Obtener estado del sistema
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            firebaseAvailable: this.firebaseAvailable,
            activeListeners: this.listeners.size,
            listenerKeys: Array.from(this.listeners.keys()),
            productsCount: window.products ? window.products.length : 0
        };
    }

    // Diagnosticar problemas
    diagnose() {
        console.log('🔍 Diagnóstico del sistema de listeners de stock:');
        console.log('📊 Estado:', this.getStatus());
        console.log('🌐 Firebase:', {
            firebaseAuth: typeof window.firebaseAuth,
            firebaseAuthDb: typeof window.firebaseAuth?.db
        });
        console.log('📦 Productos:', {
            global: window.products ? window.products.length : 'No definido',
            localStorage: localStorage.getItem('avenidaProducts') ? JSON.parse(localStorage.getItem('avenidaProducts')).length : 'No disponible'
        });
    }
}

// Crear instancia global
window.realtimeStockListeners = new RealtimeStockListeners();

// Exponer funciones útiles
window.setupProductStockListener = (productId) => window.realtimeStockListeners.setupProductStockListener(productId);
window.unsubscribeProductStock = (productId) => window.realtimeStockListeners.unsubscribeProduct(productId);
window.unsubscribeAllStockListeners = () => window.realtimeStockListeners.unsubscribeAll();
window.getStockListenersStatus = () => window.realtimeStockListeners.getStatus();
window.diagnoseStockListeners = () => window.realtimeStockListeners.diagnose();

// Limpiar listeners cuando se abandona la página
window.addEventListener('beforeunload', () => {
    if (window.realtimeStockListeners) {
        window.realtimeStockListeners.unsubscribeAll();
    }
});

// Limpiar listeners cuando se oculta la página (para móviles)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.realtimeStockListeners) {
        console.log('📱 Página oculta, manteniendo listeners activos');
    }
});

console.log('✅ Sistema de listeners de stock en tiempo real listo');
