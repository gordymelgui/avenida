// Solo visible para aaavenidaaa@gmail.com

console.log('📊 Panel de Administración - Gestión de Stock cargado');

// Estado global del panel
let products = [];
let isAdmin = false;

// Inicialización del panel
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Inicializando panel de administración...');
    initializeAdminPanel();
});

// Listener para cambios de autenticación desde otras páginas
window.addEventListener('authStateChanged', function (event) {
    console.log('🔄 Evento de cambio de autenticación recibido:', event.detail.user);

    if (event.detail.user && event.detail.user.email === 'aaavenidaaa@gmail.com') {
        console.log('✅ Usuario admin detectado, continuando...');
        if (!isAdmin) {
            isAdmin = true;
            // Continuar con la inicialización
            setupAdminSidebar();
            loadProductsFromFirebase();
            setupFirebaseListeners();
            loadStockTable();
        }
    } else {
        console.log('❌ Usuario no es admin o se cerró sesión');
        isAdmin = false;
        showError('Sesión de administrador cerrada');
    }
});

// Función principal de inicialización
async function initializeAdminPanel() {
    try {
        console.log('🔍 Verificando Firebase y permisos de admin...');

        // PRIMERO: Verificar si hay sesión guardada en localStorage
        const savedUser = localStorage.getItem('firebaseUser');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            console.log('💾 Usuario encontrado en localStorage:', userData.email);

            if (userData.isAdmin) {
                console.log('✅ Usuario es admin según localStorage');
                isAdmin = true;
            } else {
                console.log('❌ Usuario no es admin según localStorage');
                showError('Acceso denegado: Solo administradores pueden acceder');
                return;
            }
        } else {
            console.log('⚠️ No hay usuario guardado en localStorage');
        }

        // SEGUNDO: Esperar a que Firebase esté disponible
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
            if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.isUserAdmin) {
                console.log('✅ Firebase disponible, verificando admin...');
                break;
            }
            console.log(`⏳ Esperando Firebase... (intento ${attempts + 1}/${maxAttempts})`);
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (attempts >= maxAttempts) {
            console.error('❌ Firebase no disponible después de múltiples intentos');
            showError('Error: Firebase no disponible');
            return;
        }

        // TERCERO: Verificar si el usuario es admin en Firebase
        try {
            // Verificar si hay usuario autenticado primero
            const currentUser = window.firebaseAuth.auth.currentUser;
            console.log('🔐 Usuario actual en Firebase:', currentUser ? currentUser.email : 'No hay usuario');

            if (!currentUser) {
                console.log('⚠️ No hay usuario en Firebase, pero hay uno en localStorage');
                // Continuar con el usuario de localStorage si es admin
                if (!isAdmin) {
                    showError('Error: No hay usuario autenticado');
                    return;
                }
            } else {
                // Verificar si es admin
                const firebaseAdmin = await window.firebaseAuth.isUserAdmin();
                console.log('🔐 Resultado verificación admin en Firebase:', firebaseAdmin);

                if (!firebaseAdmin) {
                    console.error('❌ Usuario no es admin en Firebase');
                    showError('Acceso denegado: Solo administradores pueden acceder');
                    return;
                }

                isAdmin = firebaseAdmin;
            }
        } catch (error) {
            console.error('❌ Error al verificar admin:', error);
            showError('Error al verificar permisos de administrador');
            return;
        }

        // Configurar sidebar del admin
        setupAdminSidebar();

        // Cargar productos desde Firebase
        await loadProductsFromFirebase();

        // Configurar listeners de Firebase para cambios en tiempo real
        setupFirebaseListeners();

        // Mostrar la tabla de stock
        loadStockTable();

        console.log('✅ Panel de administración inicializado correctamente');

    } catch (error) {
        console.error('❌ Error al inicializar panel:', error);
        showError('Error al inicializar el panel de administración');
    }
}

// Configurar sidebar del admin
function setupAdminSidebar() {
    console.log('🔧 Configurando sidebar del admin...');

    const adminSidebar = document.getElementById('admin-sidebar');
    const adminMenuToggle = document.getElementById('admin-menu-toggle');
    const adminSidebarOverlay = document.getElementById('admin-sidebar-overlay');
    const mainContent = document.getElementById('main-content');

    if (!adminSidebar || !adminMenuToggle) {
        console.error('❌ Elementos del sidebar no encontrados');
        return;
    }

    console.log('✅ Elementos del sidebar encontrados');

    // Función para abrir/cerrar sidebar
    function toggleAdminSidebar() {
        const isOpen = !adminSidebar.classList.contains('-translate-x-full');

        if (isOpen) {
            // Cerrar sidebar
            adminSidebar.classList.add('-translate-x-full');
            adminSidebarOverlay.classList.add('hidden');
            if (mainContent) mainContent.classList.remove('ml-80');
            adminMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            // Abrir sidebar
            adminSidebar.classList.remove('-translate-x-full');
            adminSidebarOverlay.classList.remove('hidden');
            if (mainContent) mainContent.classList.add('ml-80');
            adminMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        }
    }

    // Event listeners
    adminMenuToggle.addEventListener('click', toggleAdminSidebar);

    if (adminSidebarOverlay) {
        adminSidebarOverlay.addEventListener('click', toggleAdminSidebar);
    }

    // Cerrar sidebar con botón X
    const closeAdminSidebar = document.getElementById('close-admin-sidebar');
    if (closeAdminSidebar) {
        closeAdminSidebar.addEventListener('click', toggleAdminSidebar);
    }

    console.log('✅ Sidebar del admin configurado correctamente');
}

// Cargar productos desde Firebase
async function loadProductsFromFirebase() {
    try {
        console.log('📦 Cargando productos desde Firebase...');

        if (typeof window.firebaseAuth === 'undefined' || !window.firebaseAuth.db) {
            throw new Error('Firebase no disponible');
        }

        const productsSnapshot = await window.firebaseAuth.db.collection('products').get();
        products = [];

        productsSnapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });

        // Si no hay productos en Firebase, crear productos de ejemplo
        if (products.length === 0) {
            console.log('⚠️ No hay productos en Firebase, creando productos de ejemplo...');
            await createSampleProducts();
        } else {
            // Verificar si faltan productos de ejemplo (como el Boxer)
            const sampleProducts = getSampleProducts();
            let missingProducts = false;

            for (const sample of sampleProducts) {
                if (!products.find(p => p.id === sample.id)) {
                    console.log(`⚠️ Producto faltante en Firebase: ${sample.name} (ID: ${sample.id}), creándolo...`);
                    try {
                        await window.firebaseAuth.db.collection('products').doc(sample.id).set(sample);
                        products.push(sample);
                        missingProducts = true;
                        console.log(`✅ Producto creado exitosamente: ${sample.name}`);
                    } catch (err) {
                        console.error(`❌ Error al crear producto ${sample.name}:`, err);
                    }
                }
            }

            if (missingProducts) {
                console.log('✅ Productos faltantes creados en Firebase');
            }
        }

        // Actualizar productos globales
        if (window.products !== products) {
            window.products = products;
            console.log('📦 Productos globales actualizados');
        }

        console.log('✅ Productos cargados:', products.length);

    } catch (error) {
        console.error('❌ Error al cargar productos:', error);
        showError('Error al cargar productos desde Firebase');

        // Usar productos de ejemplo como fallback
        products = getSampleProducts();
        if (window.products !== products) {
            window.products = products;
        }
    }
}

// Crear productos de ejemplo en Firebase
async function createSampleProducts() {
    try {
        const sampleProducts = getSampleProducts();

        for (const product of sampleProducts) {
            await window.firebaseAuth.db.collection('products').doc(product.id).set(product);
            console.log(`✅ Producto de ejemplo creado: ${product.name}`);
        }

        products = sampleProducts;
        console.log('✅ Productos de ejemplo creados en Firebase');

    } catch (error) {
        console.error('❌ Error al crear productos de ejemplo:', error);
    }
}

// Configurar listeners de Firebase para cambios en tiempo real
function setupFirebaseListeners() {
    try {
        console.log('🔄 Configurando listeners de Firebase para cambios en tiempo real...');

        if (typeof window.firebaseAuth === 'undefined' || !window.firebaseAuth.db) {
            throw new Error('Firebase no disponible');
        }

        // Listener para cambios en productos
        window.firebaseAuth.db.collection('products').onSnapshot((snapshot) => {
            console.log('🔄 Cambios detectados en Firebase, actualizando...');

            products = [];
            snapshot.forEach(doc => {
                products.push({ id: doc.id, ...doc.data() });
            });

            // Actualizar productos globales
            if (window.products !== products) {
                window.products = products;
                console.log('📦 Productos globales actualizados desde Firebase');
            }

            // Actualizar la tabla
            loadStockTable();

            // SINCRONIZACIÓN INSTANTÁNEA con la página principal
            if (window.syncStockFromAdmin) {
                console.log('🔄 Sincronizando con página principal...');
                window.syncStockFromAdmin();
            }

            // DISPARAR EVENTO INMEDIATO para todas las páginas
            window.dispatchEvent(new CustomEvent('stockUpdated', {
                detail: {
                    products: products,
                    source: 'firebase',
                    timestamp: Date.now()
                }
            }));

            // Actualizar indicadores de stock en la página principal
            if (window.updateStockIndicators) {
                window.updateStockIndicators();
            }

            // Forzar actualización de UI
            if (window.forceUIUpdate) {
                window.forceUIUpdate();
            }

        }, (error) => {
            console.error('❌ Error en listener de Firebase:', error);
        });

        console.log('✅ Listeners de Firebase configurados correctamente');

    } catch (error) {
        console.error('❌ Error al configurar listeners de Firebase:', error);
    }
}

// Cargar tabla de stock
function loadStockTable() {
    const tableBody = document.getElementById('stock-table-body');
    if (!tableBody) {
        console.error('❌ Tabla de stock no encontrada');
        return;
    }

    let html = '';

    products.forEach(product => {
        const stock = product.stock || {};
        const currentStatus = product.status || 'available';

        html += `
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <img src="${product.image || (product.images && product.images[0]) || 'placeholder.jpg'}" alt="${product.name}" class="w-12 h-12 rounded-lg object-cover mr-3">
                        <div>
                            <div class="font-medium text-gray-900">${product.name}</div>
                            <div class="text-sm text-gray-500">${product.category || 'Sin categoría'}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 text-gray-900">${product.price || '\u20B20'}</td>
                
                <!-- Talla 1 (P o 36) -->
                <td class="px-6 py-4">
                    ${(() => {
                const sizes = product.availableSizes || (product.name && (product.name.toUpperCase().includes('JORT') || product.name.toUpperCase().includes('CAPRI')) ? ['36', '40', '44', '48'] : ['P', 'M', 'G', 'GG']);
                const size = sizes.includes('36') ? '36' : (sizes.includes('P') ? 'P' : sizes[0]);
                if (!size) return '<span class="text-gray-400">N/A</span>';
                return `
                            <div class="space-y-2">
                            ${product.designs && product.designs.length > 0 ? product.designs.map(d => `
                                <div class="flex flex-col mb-1">
                                    <span class="text-xs font-semibold text-gray-600">${d} (${size})</span>
                                    <div class="flex items-center mt-1">
                                        <input type="number" value="${stock[`${d}_${size}`] || 0}" min="0" 
                                               class="stock-input w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                               onchange="updateStock('${product.id}', '${d}_${size}', this.value)">
                                    </div>
                                </div>
                            `).join('') : `
                                <input type="number" value="${stock[size] || 0}" min="0" 
                                       class="stock-input w-20 px-2 py-1 border border-gray-300 rounded"
                                       onchange="updateStock('${product.id}', '${size}', this.value)">
                                <div class="stock-indicator mt-1 text-xs ${(stock[size] || 0) === 0 ? 'text-red-600' : 'text-green-600'}">
                                    ${size}: ${(stock[size] || 0) === 0 ? 'Sin Stock' : 'En Stock'}
                                </div>
                            `}
                            </div>
                        `;
            })()}
                </td>

                <!-- Talla 2 (M o 40) -->
                <td class="px-6 py-4">
                    ${(() => {
                const sizes = product.availableSizes || (product.name && (product.name.toUpperCase().includes('JORT') || product.name.toUpperCase().includes('CAPRI')) ? ['36', '40', '44', '48'] : ['P', 'M', 'G', 'GG']);
                const size = sizes.includes('40') ? '40' : (sizes.includes('M') ? 'M' : sizes[1]);
                if (!size) return '<span class="text-gray-400">N/A</span>';
                return `
                            <div class="space-y-2">
                            ${product.designs && product.designs.length > 0 ? product.designs.map(d => `
                                <div class="flex flex-col mb-1">
                                    <span class="text-xs font-semibold text-gray-600">${d} (${size})</span>
                                    <div class="flex items-center mt-1">
                                        <input type="number" value="${stock[`${d}_${size}`] || 0}" min="0" 
                                               class="stock-input w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                               onchange="updateStock('${product.id}', '${d}_${size}', this.value)">
                                    </div>
                                </div>
                            `).join('') : `
                                <input type="number" value="${stock[size] || 0}" min="0" 
                                       class="stock-input w-20 px-2 py-1 border border-gray-300 rounded"
                                       onchange="updateStock('${product.id}', '${size}', this.value)">
                                <div class="stock-indicator mt-1 text-xs ${(stock[size] || 0) === 0 ? 'text-red-600' : 'text-green-600'}">
                                    ${size}: ${(stock[size] || 0) === 0 ? 'Sin Stock' : 'En Stock'}
                                </div>
                            `}
                            </div>
                        `;
            })()}
                </td>

                <!-- Talla 3 (G o 44) -->
                <td class="px-6 py-4">
                    ${(() => {
                const sizes = product.availableSizes || (product.name && (product.name.toUpperCase().includes('JORT') || product.name.toUpperCase().includes('CAPRI')) ? ['36', '40', '44', '48'] : ['P', 'M', 'G', 'GG']);
                const size = sizes.includes('44') ? '44' : (sizes.includes('G') ? 'G' : sizes[2]);
                if (!size) return '<span class="text-gray-400">N/A</span>';
                return `
                            <div class="space-y-2">
                            ${product.designs && product.designs.length > 0 ? product.designs.map(d => `
                                <div class="flex flex-col mb-1">
                                    <span class="text-xs font-semibold text-gray-600">${d} (${size})</span>
                                    <div class="flex items-center mt-1">
                                        <input type="number" value="${stock[`${d}_${size}`] || 0}" min="0" 
                                               class="stock-input w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                               onchange="updateStock('${product.id}', '${d}_${size}', this.value)">
                                    </div>
                                </div>
                            `).join('') : `
                                <input type="number" value="${stock[size] || 0}" min="0" 
                                       class="stock-input w-20 px-2 py-1 border border-gray-300 rounded"
                                       onchange="updateStock('${product.id}', '${size}', this.value)">
                                <div class="stock-indicator mt-1 text-xs ${(stock[size] || 0) === 0 ? 'text-red-600' : 'text-green-600'}">
                                    ${size}: ${(stock[size] || 0) === 0 ? 'Sin Stock' : 'En Stock'}
                                </div>
                            `}
                            </div>
                        `;
            })()}
                </td>

                <!-- Talla 4 (GG o 48) -->
                <td class="px-6 py-4">
                    ${(() => {
                const sizes = product.availableSizes || (product.name && (product.name.toUpperCase().includes('JORT') || product.name.toUpperCase().includes('CAPRI')) ? ['36', '40', '44', '48'] : ['P', 'M', 'G', 'GG']);
                const size = sizes.includes('48') ? '48' : (sizes.includes('GG') ? 'GG' : sizes[3]);
                if (!size) return '<span class="text-gray-400">N/A</span>';
                return `
                            <div class="space-y-2">
                            ${product.designs && product.designs.length > 0 ? product.designs.map(d => `
                                <div class="flex flex-col mb-1">
                                    <span class="text-xs font-semibold text-gray-600">${d} (${size})</span>
                                    <div class="flex items-center mt-1">
                                        <input type="number" value="${stock[`${d}_${size}`] || 0}" min="0" 
                                               class="stock-input w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                               onchange="updateStock('${product.id}', '${d}_${size}', this.value)">
                                    </div>
                                </div>
                            `).join('') : `
                                <input type="number" value="${stock[size] || 0}" min="0" 
                                       class="stock-input w-20 px-2 py-1 border border-gray-300 rounded"
                                       onchange="updateStock('${product.id}', '${size}', this.value)">
                                <div class="stock-indicator mt-1 text-xs ${(stock[size] || 0) === 0 ? 'text-red-600' : 'text-green-600'}">
                                    ${size}: ${(stock[size] || 0) === 0 ? 'Sin Stock' : 'En Stock'}
                                </div>
                            `}
                            </div>
                        `;
            })()}
                </td>
                
                <!-- Estado -->
                <td class="px-6 py-4 text-center">
                    <select onchange="updateProductStatus('${product.id}', this.value)" 
                            class="status-selector px-3 py-1 border border-gray-300 rounded text-sm">
                        <option value="available" ${currentStatus === 'available' ? 'selected' : ''}>Disponible</option>
                        <option value="in-stock" ${currentStatus === 'in-stock' ? 'selected' : ''}>En Stock</option>
                        <option value="out-of-stock" ${currentStatus === 'out-of-stock' ? 'selected' : ''}>Sin Stock</option>
                    </select>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
    console.log('✅ Tabla de stock actualizada');
}

// Actualizar stock de un producto
async function updateStock(productId, size, quantity) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error('❌ Producto no encontrado:', productId);
            return;
        }

        const oldQuantity = (product.stock && product.stock[size]) || 0;
        const newQuantity = parseInt(quantity) || 0;

        console.log(`🔄 Actualizando stock: ${product.name} - Talla ${size}: ${oldQuantity} → ${newQuantity}`);

        // Actualizar stock local
        if (!product.stock) product.stock = {};
        product.stock[size] = newQuantity;

        // Actualizar en Firebase
        if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.db) {
            await window.firebaseAuth.db.collection('products').doc(productId).update({
                [`stock.${size}`]: newQuantity,
                lastUpdated: new Date(),
                updatedBy: 'admin'
            });

            console.log('✅ Stock actualizado en Firebase - Los listeners en tiempo real se encargarán de la sincronización');

            // GUARDAR EN LOCALSTORAGE para sincronización inmediata
            localStorage.setItem('avenidaAdminProducts', JSON.stringify(products));
            console.log('💾 Productos guardados en localStorage');

            // Los listeners en tiempo real se encargarán de la sincronización automática
            // No necesitamos disparar eventos manuales ya que onSnapshot() detectará el cambio

        } else {
            throw new Error('Firebase no disponible');
        }

        showSuccess(`Stock actualizado: ${product.name} - Talla ${size}: ${newQuantity}`);

    } catch (error) {
        console.error('❌ Error al actualizar stock:', error);
        showError('Error al actualizar stock');

        // Revertir cambio local
        if (product && product.stock) {
            product.stock[size] = oldQuantity;
        }

        // Recargar tabla
        loadStockTable();
    }
}

// Actualizar estado del producto
async function updateProductStatus(productId, newStatus) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error('❌ Producto no encontrado:', productId);
            return;
        }

        const oldStatus = product.status || 'available';

        console.log(`🔄 Actualizando estado: ${product.name}: ${oldStatus} → ${newStatus}`);

        // Actualizar estado local
        product.status = newStatus;

        // Actualizar en Firebase
        if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.db) {
            await window.firebaseAuth.db.collection('products').doc(productId).update({
                status: newStatus,
                lastUpdated: new Date(),
                updatedBy: 'admin'
            });

            console.log('✅ Estado actualizado en Firebase');

            // GUARDAR EN LOCALSTORAGE para sincronización inmediata
            localStorage.setItem('avenidaAdminProducts', JSON.stringify(products));
            console.log('💾 Productos guardados en localStorage');

            // SINCRONIZACIÓN INMEDIATA con la página principal
            if (window.syncStockFromAdmin) {
                console.log('🔄 Sincronizando inmediatamente con página principal...');
                window.syncStockFromAdmin();
            }

            // DISPARAR EVENTO INMEDIATO para todas las páginas
            window.dispatchEvent(new CustomEvent('stockUpdated', {
                detail: {
                    products: products,
                    source: 'admin-update-status',
                    timestamp: Date.now()
                }
            }));

            // Forzar actualización de UI
            if (window.forceUIUpdate) {
                window.forceUIUpdate();
            }

        } else {
            throw new Error('Firebase no disponible');
        }

        showSuccess(`Estado actualizado: ${product.name} - ${getStatusText(newStatus)}`);

    } catch (error) {
        console.error('❌ Error al actualizar estado:', error);
        showError('Error al actualizar estado del producto');

        // Revertir cambio local
        if (product) {
            product.status = oldStatus;
        }

        // Recargar tabla
        loadStockTable();
    }
}

// Obtener texto del estado
function getStatusText(status) {
    const statusMap = {
        'available': 'Disponible',
        'in-stock': 'En Stock',
        'out-of-stock': 'Sin Stock'
    };
    return statusMap[status] || status;
}

// Datos de ejemplo
function getSampleProducts() {
    return [
        {
            id: '1',
            name: 'JEANS HOLGADOS',
            category: 'Pantalones',
            price: '₲300.000',
            stock: { P: 5, M: 8, G: 0 },
            status: 'available',
            image: 'catalogo/jeans holgados/portada baggy.png'
        },
        {
            id: '2',
            name: 'JEANS RECTOS',
            category: 'Pantalones',
            price: '₲300.000',
            stock: { P: 3, M: 10, G: 15 },
            status: 'in-stock',
            image: 'catalogo/jeans rectos/portada straight.png'
        },
        {
            id: '3',
            name: 'BOXER',
            category: 'Ropa Interior',
            price: '₲100.000',
            stock: { P: 0, M: 0, G: 0 },
            status: 'out-of-stock',
            image: 'catalogo/boxer avenida/boxer restock front.png'
        },
        {
            id: '4',
            name: 'JORT DENIM',
            category: 'Pantalones',
            price: '₲350.000',
            stock: { P: 0, M: 0, G: 0 },
            status: 'out-of-stock',
            image: 'catalogo/jorts/jort denim portada principal.png'
        },
        {
            id: '6',
            name: 'CAPRI',
            category: 'Pantalones',
            price: '₲400.000',
            stock: { P: 0, M: 0, G: 0 },
            status: 'out-of-stock',
            image: 'catalogo/jorts/vestir portada principal.png'
        },
        {
            id: '5',
            name: 'CAMISA X NNEGATIVO',
            category: 'Ropa Superior',
            price: '₲260.000',
            designs: ['Diseño A', 'Diseño B'],
            stock: { P: 4, M: 4, G: 4, 'Diseño A_P': 2, 'Diseño A_M': 2, 'Diseño A_G': 2, 'Diseño B_P': 2, 'Diseño B_M': 2, 'Diseño B_G': 2 },
            status: 'out-of-stock',
            image: 'catalogo/camisas/cami A portada principal.png'
        }
    ];
}

// Mostrar mensaje de éxito
function showSuccess(message) {
    showToast(message, 'success');
}

// Mostrar mensaje de error
function showError(message) {
    showToast(message, 'error');
}

// Sistema de toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;

    switch (type) {
        case 'success':
            toast.className += ' bg-green-500 text-white';
            break;
        case 'error':
            toast.className += ' bg-red-500 text-white';
            break;
        default:
            toast.className += ' bg-blue-500 text-white';
    }

    const icon = document.createElement('i');
    icon.className = `fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'} mr-2`;
    toast.appendChild(icon);

    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ml-4 text-white hover:text-gray-200';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.onclick = () => removeToast(toast);
    toast.appendChild(closeBtn);

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
        removeToast(toast);
    }, 5000);
}

// Remover toast
function removeToast(toast) {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Función para verificar estado de autenticación
function checkAuthStatus() {
    console.log('🔍 === VERIFICACIÓN DE ESTADO DE AUTENTICACIÓN ===');

    try {
        // Verificar Firebase
        console.log('🌐 Firebase disponible:', typeof window.firebaseAuth !== 'undefined');
        console.log('🌐 Firebase Auth disponible:', typeof window.firebaseAuth?.auth !== 'undefined');

        // Verificar usuario actual
        const currentUser = window.firebaseAuth?.auth?.currentUser;
        console.log('👤 Usuario actual:', currentUser);
        console.log('📧 Email del usuario:', currentUser?.email);
        console.log('🆔 UID del usuario:', currentUser?.uid);

        // Verificar si es admin
        if (currentUser) {
            const isAdmin = currentUser.email === 'aaavenidaaa@gmail.com';
            console.log('👑 ¿Es admin por email?', isAdmin);
        }

        // Verificar función isUserAdmin
        console.log('🔧 Función isUserAdmin disponible:', typeof window.firebaseAuth?.isUserAdmin);

        // Verificar localStorage
        const savedUser = localStorage.getItem('firebaseUser');
        console.log('💾 Usuario en localStorage:', savedUser ? JSON.parse(savedUser) : 'No hay usuario');

        console.log('🔍 === FIN VERIFICACIÓN ===');

        showSuccess('Verificación completada. Revisa la consola.');

    } catch (error) {
        console.error('❌ Error en verificación:', error);
        showError('Error en la verificación');
    }
}

// Función para forzar sincronización de autenticación
function forceAuthSync() {
    console.log('🔄 Forzando sincronización de autenticación...');

    try {
        // Verificar localStorage
        const savedUser = localStorage.getItem('firebaseUser');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            console.log('💾 Usuario encontrado en localStorage:', userData);

            if (userData.isAdmin) {
                console.log('✅ Usuario es admin, forzando inicialización...');
                isAdmin = true;

                // Forzar inicialización completa
                setupAdminSidebar();
                loadProductsFromFirebase();
                setupFirebaseListeners();
                loadStockTable();

                showSuccess('Sincronización forzada exitosa');
            } else {
                showError('Usuario no es admin');
            }
        } else {
            showError('No hay usuario en localStorage');
        }

    } catch (error) {
        console.error('❌ Error en sincronización forzada:', error);
        showError('Error en la sincronización');
    }
}

// Función para guardar todos los cambios y sincronizar
async function saveAllChanges() {
    console.log('💾 Guardando todos los cambios...');

    try {
        // Guardar productos en localStorage para sincronización
        localStorage.setItem('avenidaAdminProducts', JSON.stringify(products));
        console.log('💾 Productos guardados en localStorage');

        // Actualizar productos globales
        if (window.products !== products) {
            window.products = products;
            console.log('📦 Productos globales actualizados');
        }

        // Sincronizar con la página principal
        if (window.syncStockFromAdmin) {
            console.log('🔄 Sincronizando con página principal...');
            window.syncStockFromAdmin();
        }

        // Forzar actualización de UI
        if (window.forceUIUpdate) {
            console.log('🔄 Forzando actualización de UI...');
            window.forceUIUpdate();
        }

        // Actualizar indicadores de stock
        if (window.updateStockIndicators) {
            console.log('🔄 Actualizando indicadores de stock...');
            window.updateStockIndicators();
        }

        showSuccess('✅ Todos los cambios guardados y sincronizados');

        // Redirigir a la página principal para ver los cambios
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error('❌ Error al guardar cambios:', error);
        showError('Error al guardar cambios');
    }
}

// Exponer funciones globalmente
window.updateStock = updateStock;
window.updateProductStatus = updateProductStatus;
window.checkAuthStatus = checkAuthStatus;
window.forceAuthSync = forceAuthSync;
window.saveAllChanges = saveAllChanges;
