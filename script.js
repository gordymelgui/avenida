// === MODO MANTENIMIENTO: REDIRECCIÓN ===
(function () {
    // 0. Verificar si ya desbloqueó el sitio (Password Gate Seguro)
    const validHash = "34901268d5b71a86abd37eb10b127b6cc18947ac4855ac59df6f3c81780bf137";
    const isUnlocked = sessionStorage.getItem('avenida_unlocked') === validHash;

    if (isUnlocked) {
        // Si ya desbloqueó con el hash válido, PERMITIR TODO (salir de la función)
        return;
    }

    // Obtener el nombre del archivo actual
    const path = window.location.pathname;
    const page = path.includes('/') ? path.split("/").pop().split("?")[0] : (path.includes('\\') ? path.split("\\").pop().split("?")[0] : path);

    // Lista de páginas permitidas (que no redirigen)
    const allowedPages = [
        'index.html',
        'shop.html',
        '',
        'admin.html',
        'admin-panel.html',
        'product.html',
        'cart.html',
        'profile.html',
        'favorites.html',
        'settings.html',
        'help.html',
        'about.html',
        'privacy.html',
        'terms.html',
        'returns.html',
        'notifications.html',
        'checkout.html',
        'checkout-simple.html',
        'payment-confirmation.html',
        'manifiesto.html'
    ];

    // Si no está en la lista de permitidas, mandar al index
    if (!allowedPages.includes(page)) {
        console.log('🚧 Modo Mantenimiento activado: Redirigiendo a inicio...');
        window.location.href = 'index.html';
    }
})();

window.products = [

    {
        id: 1,
        name: 'JEANS HOLGADOS AVDA \'25',
        price: 300000,
        images: [
            'catalogo/jeans holgados/portada baggy.png',
            'catalogo/jeans holgados/baggy back.png',
            'catalogo/jeans holgados/baggy backtag 2.png',
            'catalogo/jeans holgados/baggy tag.png',
            'catalogo/jeans holgados/avenida baggy modelo1.JPG',
            'catalogo/jeans holgados/avenida baggy modelo2.JPG',
            'catalogo/jeans holgados/avenida baggy modelo3.JPG',
            'catalogo/jeans holgados/avenida baggy modelo4.JPG'
        ],
        description: 'Un baggy cómodo y con estilo, perfecto para cualquier ocasión. Hecho con denim de alta resistencia y diseñado para ofrecer la máxima comodidad sin sacrificar el estilo. Ideal para el día a día y ocasiones casuales.',
        availableSizes: ['P', 'M', 'G'],
        stock: { P: 10, M: 10, G: 10 },
        features: [
            'Denim de alta resistencia',
            'Corte baggy moderno',
            'Bolsillos funcionales',
            'Cierre con botón y cremallera',
            'Diseño urbano y versátil'
        ],
        material: 'Denim Premium',
        care: 'Lavar con agua fría',
        origin: 'Paraguay',
        warranty: '30 días',
        status: 'Disponible',
        category: 'Inferior'
    },
    {
        id: 2,
        name: 'JEANS RECTOS AVDA \'25',
        price: 300000,
        images: [
            'catalogo/jeans rectos/portada straight.png',
            'catalogo/jeans rectos/straight back.png',
            'catalogo/jeans rectos/straight leather tag.png',
            'catalogo/jeans rectos/straight etiqueta.png',
            'catalogo/jeans rectos/avenida straight modelo1.JPG',
            'catalogo/jeans rectos/avenida straight modelo2.JPG',
            'catalogo/jeans rectos/avenida straight modelo3.JPG',
            'catalogo/jeans rectos/avenida straight modelo4.JPG'
        ],
        description: 'Pantalones rectos clásicos con un toque moderno. El corte perfecto para un look limpio y elegante. Fabricados con materiales de primera calidad para garantizar durabilidad y confort.',
        availableSizes: ['P', 'M', 'G'],
        stock: { P: 10, M: 10, G: 10 },
        features: [
            'Corte recto clásico',
            'Denim de alta calidad',
            'Bolsillos laterales y traseros',
            'Cierre con botón metálico',
            'Versátil para cualquier ocasión'
        ],
        material: 'Denim Premium',
        care: 'Lavar con agua fría',
        origin: 'Paraguay',
        warranty: '30 días',
        status: 'Disponible',
        category: 'Inferior'
    },
    {
        id: 3,
        name: 'BOXER AVDA \'25',
        price: 100000,
        images: [
            'catalogo/boxer avenida/boxer restock front.png',
            'catalogo/boxer avenida/boxer restock back.png',
            'catalogo/boxer avenida/boxer ap fb.png',
            'catalogo/boxer avenida/boxer etiqueta fb.png',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-12 (1).jpg',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-12.jpg',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-14.jpg',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-16.jpg',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-17.jpg',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-5.jpg',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-6.jpg',
            'catalogo/boxer avenida/modelos/avda restock vertical op cmbyn-7.jpg'
        ],
        description: 'Boxer de alta calidad con diseño exclusivo Avenida. Comodidad y estilo para tu día a día. Fabricado con algodón premium para máxima suavidad.',
        availableSizes: ['P', 'M', 'G'],
        // Stock inicializado vacío para cargar desde Firebase
        stock: { P: 0, M: 0, G: 0 },
        features: [
            'Algodón premium',
            'Elástico resistente con logo',
            'Ajuste cómodo',
            'Transpirable',
            'Diseño minimalista'
        ],
        material: 'Algodón / Elastano',
        care: 'Lavar con agua fría',
        origin: 'Paraguay',
        // warranty: 'Sin cambio por higiene',
        status: 'Disponible',
        category: 'Inferior'
    },
    {
        id: 4,
        name: 'JORT DENIM AVDA \'26',
        price: 350000,
        images: [
            'catalogo/jorts/jort denim portada principal.png',
            'catalogo/jorts/jort denim 2 .png',
            'catalogo/jorts/jort denim 3 .png',
            'catalogo/jorts/jort denim 4.png',
            'catalogo/jorts/jort denim 5.jpeg',
            'catalogo/jorts/jort denim 6.jpeg'
        ],
        description: 'El Jort es para todos los amantes del streetwear. Para esos días de calor o incluso para aquellos en los que te apetece un look más casual, el jort se convierte en tu mejor acompañante. Esta prenda indiscutiblemente es una carta de amor al primer drop de AVENIDA.',
        sizeChart: 'size chart/jorts/size chart jort.png',
        availableSizes: ['36', '40', '44', '48'],
        stock: { '36': 0, '40': 0, '44': 0, '48': 0 },
        features: [
            'Detalles próximamente',
            'Material premium'
        ],
        material: 'Denim',
        care: 'Lavar con agua fría',
        status: 'Próximamente',
        category: 'Inferior'
    },
    {
        id: 6,
        name: 'CAPRI AVDA \'26',
        price: 400000,
        images: [
            'catalogo/jorts/vestir portada principal.png',
            'catalogo/jorts/vestir 2.png',
            'catalogo/jorts/vestir close 3.png',
            'catalogo/jorts/vestir close 4.png',
            'catalogo/jorts/jort de vestir 5.jpeg',
            'catalogo/jorts/jort de vestir 6.jpeg',
            'catalogo/jorts/jort de vestir 7.jpeg'
        ],
        description: 'El Capri es la representación de la flexibilidad en este drop, es tan cómodo que podrías terminar usándolo en tu casa sin darte cuenta. Al mismo tiempo su carácter osado y elegante hace que siempre sea una pieza que te incita a ser modelada.',
        sizeChart: 'size chart/jorts/size chart vestir.png',
        availableSizes: ['36', '40', '44', '48'],
        stock: { '36': 0, '40': 0, '44': 0, '48': 0 },
        features: [
            'Detalles próximamente',
            'Material premium'
        ],
        material: 'Sartorial',
        care: 'Lavar con agua fría',
        status: 'Próximamente',
        category: 'Inferior'
    },
    {
        id: 5,
        name: 'CAMISA AVDA X NNEGATIVO \'26',
        price: 260000,
        images: [
            'catalogo/camisas/cami A portada principal.png',
            'catalogo/camisas/cami A 2.png',
            'catalogo/camisas/cami front.png',
            'catalogo/camisas/cami close.png',
            'catalogo/camisas/camisa 1.jpeg',
            'catalogo/camisas/camisa 2.jpeg',
            'catalogo/camisas/camisas 4.jpeg'
        ],
        designImages: {
            'Diseño A': [
                'catalogo/camisas/cami A portada principal.png',
                'catalogo/camisas/cami A 2.png',
                'catalogo/camisas/cami front.png',
                'catalogo/camisas/cami close.png',
                'catalogo/camisas/camisa 1.jpeg',
                'catalogo/camisas/camisa 2.jpeg',
                'catalogo/camisas/camisas 4.jpeg'
            ],
            'Diseño B': [
                'catalogo/camisas/cami B portada principal.png',
                'catalogo/camisas/cami B 2.png',
                'catalogo/camisas/cami b close.png',
                'catalogo/camisas/cami front.png',
                'catalogo/camisas/cami close.png',
                'catalogo/camisas/camisa 1.jpeg',
                'catalogo/camisas/camisa 2.jpeg',
                'catalogo/camisas/camisas 4.jpeg'
            ]
        },
        description: 'La Camisa del segundo drop sale de una colaboración con la marca de intervenciones \"nnegativo\". El color vino representa el morado de avenida, haciéndolo más elegante, y el diseño con A.P. junto al estilo de negativo da ese toque casual y urbano que tanto nos gusta. Es realmente una prenda flexible y cómoda que podrás usar en cualquier situación de tu día a día.',
        designs: ['Diseño A', 'Diseño B'],
        designSizeCharts: {
            'Diseño A': 'size chart/camisas/size chart cami A.png',
            'Diseño B': 'size chart/camisas/size chart cami B.png'
        },
        availableSizes: ['P', 'M', 'G'],
        stock: { P: 4, M: 4, G: 4, 'Diseño A_P': 2, 'Diseño A_M': 2, 'Diseño A_G': 2, 'Diseño B_P': 2, 'Diseño B_M': 2, 'Diseño B_G': 2 },
        features: [
            'Detalles próximamente',
            'Material premium'
        ],
        material: 'Algodón',
        care: 'Lavar con agua fría',
        status: 'Próximamente',
        category: 'Superior'
    },
    {
        id: 7,
        name: 'JEAN FLARED',
        price: 350000,
        images: [
            'WEB-drop-julio/IMG_6198.jpg',
            'WEB-drop-julio/IMG_6192 (1).jpg',
            'WEB-drop-julio/IMG_6181.jpg'
        ],
        description: 'Nuevo Jean Flared de Avenida. Detalles próximamente.',
        availableSizes: ['36', '40', '44', '48'],
        stock: { '36': 0, '40': 0, '44': 0, '48': 0 },
        features: [
            'Detalles próximamente',
            'Material premium'
        ],
        material: 'Denim',
        care: 'Lavar con agua fría',
        status: 'Próximamente',
        category: 'Inferior'
    },
    {
        id: 8,
        name: 'REMERA MANGAS LARGAS',
        price: 200000,
        images: [
            'WEB-drop-julio/IMG_6203 (1).jpg',
            'WEB-drop-julio/IMG_6206.jpg',
            'WEB-drop-julio/IMG_6204.jpg'
        ],
        description: 'Nueva Remera Mangas Largas de Avenida. Detalles próximamente.',
        availableSizes: ['P', 'M', 'G'],
        stock: { P: 0, M: 0, G: 0 },
        features: [
            'Detalles próximamente',
            'Material premium'
        ],
        material: 'Algodón',
        care: 'Lavar con agua fría',
        status: 'Próximamente',
        category: 'Superior'
    },
    {
        id: 9,
        name: 'REMERA SLIM FIT',
        price: 180000,
        images: [
            'WEB-drop-julio/IMG_6181.jpg',
            'WEB-drop-julio/IMG_6212.jpg',
            'WEB-drop-julio/IMG_6225.jpg'
        ],
        description: 'Nueva Remera Slim Fit de Avenida. Detalles próximamente.',
        availableSizes: ['P', 'M', 'G'],
        stock: { P: 0, M: 0, G: 0 },
        features: [
            'Detalles próximamente',
            'Material premium'
        ],
        material: 'Algodón',
        care: 'Lavar con agua fría',
        status: 'Próximamente',
        category: 'Superior'
    }
];

// Función para inicializar la aplicación
async function initApp() {
    console.log('🚀 Inicializando aplicación...');

    // VERIFICAR VERSIÓN Y LIMPIAR LOCALSTORAGE SI ES NECESARIO
    const APP_VERSION = '3.5';
    const storedVersion = localStorage.getItem('appVersion');
    if (storedVersion !== APP_VERSION) {
        console.log(`🔄 Nueva versión detectada (${APP_VERSION}). Limpiando localStorage...`);
        localStorage.removeItem('avenidaProducts');
        localStorage.removeItem('avenidaAdminProducts');
        localStorage.removeItem('avenidaCart'); // IMPORTANTE: Borra el carrito con fotos equivocadas
        localStorage.setItem('appVersion', APP_VERSION);
        console.log('✅ localStorage actualizado a la versión ' + APP_VERSION);
    }

    console.log('📱 Dispositivo móvil detectado:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    console.log('🌐 User Agent:', navigator.userAgent);
    console.log('📏 Tamaño de pantalla:', window.innerWidth + 'x' + window.innerHeight);

    // LIMPIAR COMPLETAMENTE localStorage si contiene nombres incorrectos
    console.log('🧹 Verificando y limpiando localStorage...');

    // FORZAR LIMPIEZA DE PRODUCTOS PARA RECARGAR DESDE FIREBASE
    // Esto soluciona el problema de stock "hardcodeado" o estancado
    localStorage.removeItem('avenidaProducts');
    console.log('🧹 localStorage de productos limpiado para forzar recarga fresca');

    const avenidaAdminProducts = localStorage.getItem('avenidaAdminProducts');

    if (avenidaAdminProducts) {
        try {
            const parsed = JSON.parse(avenidaAdminProducts);
            const hasIncorrectNames = parsed.some(p => p.name && p.name.includes('Baggy'));
            if (hasIncorrectNames) {
                console.log('🧹 LIMPIANDO localStorage del admin con nombres incorrectos...');
                localStorage.removeItem('avenidaAdminProducts');
            }
        } catch (e) {
            console.log('🧹 LIMPIANDO localStorage del admin corrupto...');
            localStorage.removeItem('avenidaAdminProducts');
        }
    }

    console.log('📦 Productos iniciales:', window.products.map(p => ({
        id: p.id,
        name: p.name,
        hasImages: !!p.images,
        imagesLength: p.images ? p.images.length : 'undefined',
        stock: p.stock
    })));

    // Cargar carrito desde localStorage
    window.cart = JSON.parse(localStorage.getItem('avenidaCart')) || [];

    let currentUser = null;

    // Verificar si hay un usuario autenticado
    console.log('🔍 Verificando Firebase...');
    console.log('🔍 typeof firebase:', typeof firebase);

    if (typeof firebase !== 'undefined' && firebase.auth) {
        console.log('✅ Firebase disponible, configurando auth...');
        firebase.auth().onAuthStateChanged(user => {
            console.log('🔄 Estado de autenticación cambiado:', user ? user.email : 'No usuario');
            if (user) {
                currentUser = user;
                updateUIForLoggedInUser(user);
                checkAdminStatus();
            } else {
                updateUIForLoggedOutUser();
            }
        });

        // Cargar stock real desde Firebase después de configurar auth
        console.log('🔄 Cargando stock real desde Firebase...');
        await loadRealStockFromFirebase();

        // Configurar listeners en tiempo real
        setupProductRealtimeListeners();

        // FORZAR nombres correctos después de cargar desde Firebase
        forceCorrectProductNames();

        // Renderizar productos después de cargar stock real
        if (typeof renderProducts === 'function') {
            console.log('🖼️ Renderizando productos...');
            renderProducts();

            // Verificación simple de productos renderizados
            setTimeout(() => {
                const productGrid = document.getElementById('product-grid');
                if (productGrid) {
                    const productCards = productGrid.querySelectorAll('.product-card');
                    console.log('📊 Productos renderizados:', productCards.length);
                    if (productCards.length === 0 && window.products && window.products.length > 0) {
                        console.log('🔄 Forzando renderizado de productos...');
                        forceRenderProducts();
                    }
                }
            }, 500);

            // Verificación adicional para móviles (más tiempo)
            setTimeout(() => {
                const productGrid = document.getElementById('product-grid');
                if (productGrid) {
                    const productCards = productGrid.querySelectorAll('.product-card');
                    const isMobile = window.innerWidth <= 768;
                    console.log('📱 Verificación móvil:', {
                        isMobile: isMobile,
                        width: window.innerWidth,
                        productsRendered: productCards.length,
                        productsAvailable: window.products ? window.products.length : 0
                    });

                    if (productCards.length === 0 && window.products && window.products.length > 0) {
                        console.log('🔄 Segunda verificación: Forzando renderizado...');
                        forceRenderProducts();
                    }
                }
            }, 2000);

            // Verificación final para Hostinger (más tiempo)
            setTimeout(() => {
                const productGrid = document.getElementById('product-grid');
                if (productGrid) {
                    const productCards = productGrid.querySelectorAll('.product-card');
                    console.log('🌐 Verificación final Hostinger:', {
                        productsRendered: productCards.length,
                        productsAvailable: window.products ? window.products.length : 0,
                        userAgent: navigator.userAgent,
                        url: window.location.href
                    });

                    if (productCards.length === 0 && window.products && window.products.length > 0) {
                        console.log('🔄 Verificación final: Forzando renderizado...');
                        forceRenderProducts();
                    }
                }
            }, 5000);
        } else {
            console.error('❌ Función renderProducts no encontrada');
        }
    } else {
        console.error('❌ Firebase no está disponible');
        // Usar stock por defecto si Firebase no está disponible
        ensureDefaultSizesAndStock();

        // FORZAR nombres correctos incluso sin Firebase
        forceCorrectProductNames();

        // Renderizar productos sin Firebase
        console.log('🖼️ Renderizando productos sin Firebase...');
        if (typeof renderProducts === 'function') {
            renderProducts();
        } else {
            console.log('🔄 Usando renderizado forzado...');
            forceRenderProducts();
        }
    }

    // Inicializar contador del carrito
    updateCartCount();

    // Mantener el carrito existente

    // Actualizar contador después de cargar
    updateCartCount();

    // Verificación final de productos (solo si es necesario)
    setTimeout(() => {
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
            const productCards = productGrid.querySelectorAll('.product-card');
            if (productCards.length === 0 && window.products && window.products.length > 0) {
                console.log('🔄 Verificación final: Forzando renderizado...');
                forceRenderProducts();
            }
        }
    }, 2000);







    // Actualizar contador del carrito
    updateCartCount();









    function setupHeader() {
        const header = document.getElementById('main-header');

        if (header) {
            const onScroll = () => {
                const scrolled = window.scrollY > 50;
                header.classList.toggle('scrolled', scrolled);
            };

            // Event listeners
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onScroll, { passive: true });

            onScroll(); // Ejecutar inmediatamente para establecer el estado inicial
        }
    }



    function setupSidebar() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const closeSidebar = document.getElementById('close-sidebar');

        if (!menuToggle || !sidebar) {
            console.error('Elementos del sidebar no encontrados');
            return;
        }

        // Abrir sidebar
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.add('open');
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');

            // Notificar al header que el sidebar está abierto
            if (window.onSidebarToggle) {
                window.onSidebarToggle(true);
            }
        });

        // Cerrar sidebar (botón X)
        if (closeSidebar) {
            closeSidebar.addEventListener('click', (e) => {
                e.preventDefault();
                closeSidebarFunction();
            });
        }

        // Cerrar sidebar (overlay)
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebarFunction);

        // Cerrar sidebar al hacer clic en enlaces (pero permitir navegación a nuevas páginas)
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Si el enlace va a una página diferente, no cerrar el sidebar inmediatamente
                // El navegador se encargará de cerrarlo al cargar la nueva página
                if (link.href && !link.href.includes('#')) {
                    // Es un enlace a una página diferente, permitir navegación
                    return;
                }
                // Es un enlace interno (anchor), cerrar sidebar
                closeSidebarFunction();
            });
        });

        function closeSidebarFunction() {
            sidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');

            // Notificar al header que el sidebar está cerrado
            if (window.onSidebarToggle) {
                window.onSidebarToggle(false);
            }
        }
    }

    function setupRegisterButton() {
        const registerBtn = document.getElementById('register-btn');
        const registerModal = document.getElementById('register-modal');
        const closeRegisterBtn = document.getElementById('close-register-btn');
        const loginLink = document.getElementById('login-link');

        if (!registerBtn) {
            console.error('Boton de registro no encontrado');
            return;
        }
        if (!registerModal) {
            console.error('Modal de registro no encontrado');
            return;
        }

        const userBtn = document.getElementById('user-btn');

        if (registerBtn && registerModal) {
            registerBtn.addEventListener('click', openRegisterModal);
        }

        if (userBtn && registerModal) {
            userBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openRegisterModal();
            });
        }

        if (closeRegisterBtn) {
            closeRegisterBtn.addEventListener('click', () => {
                registerModal.classList.remove('visible');
                document.body.style.overflow = '';
            });
        }

        // Cambiar entre formularios de registro y login
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleAuthForms();
            });
        }

        // Manejar envío del formulario de registro
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }
    }

    // Set up common elements that are shared across all pages
    setupHeader();
    setupSidebar();
    setupRegisterButton();

    // Detectar e inicializar la página actual
    if (document.getElementById('cart-products-list')) {
        initCartPage();
    } else if (document.getElementById('product-preview-modal') || document.getElementById('product-grid')) {
        console.log('🏠 Página principal detectada, inicializando...');
        initHomePage();
    }

    // Inicializar el carrusel si estamos en la página principal
    if (document.getElementById('banner-carousel')) {
        console.log('Carrusel detectado, inicializando...');
        setupCarousel();
    }

    function setupCarousel() {
        console.log('Iniciando setupCarousel...');

        const carouselContainer = document.querySelector('.carousel-container');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        console.log('Elementos encontrados:', {
            carouselContainer: !!carouselContainer,
            slides: slides.length,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });

        if (!carouselContainer || slides.length === 0) {
            console.error('Carrusel no encontrado o sin slides');
            return;
        }

        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;

        // Configuración dinámica de anchos
        carouselContainer.style.width = `${totalSlides * 100}%`;
        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
        });

        console.log(`Carrusel configurado con ${totalSlides} slides`);

        function updateCarousel() {
            const translateX = -currentSlide * (100 / totalSlides);
            carouselContainer.style.transform = `translateX(${translateX}%)`;
            console.log(`Slide actual: ${currentSlide + 1}/${totalSlides}, translateX: ${translateX}%`);

            // Actualizar indicadores
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }

        // Event listeners para los botones
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Botón siguiente clickeado');
                nextSlide();
            });
            console.log('Event listener agregado al botón siguiente');
        } else {
            console.error('Botón siguiente no encontrado');
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Botón anterior clickeado');
                prevSlide();
            });
            console.log('Event listener agregado al botón anterior');
        } else {
            console.error('Botón anterior no encontrado');
        }

        // Configurar indicadores
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                console.log(`Indicador clickeado: slide ${index + 1}`);
                goToSlide(index);
            });
        });

        // Auto-slide cada 3 segundos con ritmo constante
        function startAutoSlide() {
            console.log('Iniciando auto-slide con ritmo constante...');
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
            // Avanzar cada 5 segundos, sin salto inicial
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }

        function stopAutoSlide() {
            console.log('Deteniendo auto-slide...');
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        // El carousel continúa funcionando incluso con el cursor encima
        // Removido el pausado en hover para mantener el ritmo constante

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });

        // Inicializar
        updateCarousel();
        startAutoSlide();

        console.log('Carrusel configurado correctamente');

        // Sin pruebas automáticas para evitar movimientos inesperados
    }

    // Variable global para el filtro actual
    window.currentFilter = 'Todas';

    function filterProducts(category, event) {
        if (event) event.preventDefault();
        window.currentFilter = category;

        console.log('🔍 Filtrando por:', category);

        // Actualizar estilos de los links en el header
        const navLinks = document.querySelectorAll('#category-nav .category-link');
        navLinks.forEach(link => {
            const linkText = link.textContent.trim().toLowerCase();
            const filterText = category.toLowerCase();

            if (linkText === filterText) {
                link.classList.add('active-category');
            } else {
                link.classList.remove('active-category');
            }
        });

        renderProducts();

        // Scroll suave a la sección de productos
        const gridTitle = document.getElementById('product-grid-title');
        if (gridTitle) {
            const offset = 120;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = gridTitle.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Exponer globalmente
    window.filterProducts = filterProducts;

    window.showOlderDrops = function (event) {
        if (event) event.preventDefault();
        const olderSection = document.getElementById('older-drops-section');
        const viewAllContainer = document.getElementById('view-all-container');
        if (olderSection) olderSection.style.display = 'block';
        if (viewAllContainer) viewAllContainer.style.display = 'none';

        // Scroll suave a la sección
        if (olderSection) {
            const offset = 120;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = olderSection.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    function renderProducts() {
        const productGridContainer = document.getElementById('product-grid');
        const oldProductGrid = document.getElementById('old-product-grid');
        const olderProductGrid = document.getElementById('older-product-grid');

        const gridTitle = document.getElementById('product-grid-title');
        const oldGridSectionTitle = document.getElementById('old-grid-title');
        const viewAllContainer = document.getElementById('view-all-container');
        const olderDropsSection = document.getElementById('older-drops-section');

        if (!productGridContainer) return;

        const filter = window.currentFilter;

        // Reset state
        if (olderDropsSection) olderDropsSection.style.display = 'none';
        if (viewAllContainer) viewAllContainer.style.display = 'none';
        if (oldGridSectionTitle) oldGridSectionTitle.style.display = 'none';
        if (oldProductGrid) oldProductGrid.style.display = 'none';

        if (filter === 'Todas' || filter === 'Todas las prendas' || filter === 'Nuevo Drop') {
            if (gridTitle) gridTitle.textContent = 'Nuevo Drop';
            if (oldGridSectionTitle) oldGridSectionTitle.style.display = 'block';
            if (oldProductGrid) oldProductGrid.style.display = 'grid';
            if (viewAllContainer) viewAllContainer.style.display = 'flex';

            const novedades = window.products.filter(p => p.id === 7 || p.id === 8 || p.id === 9);
            productGridContainer.innerHTML = generateProductsHTML(novedades);

            if (oldProductGrid) {
                const coleccionesAnteriores = window.products.filter(p => p.id === 4 || p.id === 5 || p.id === 6);
                oldProductGrid.innerHTML = generateProductsHTML(coleccionesAnteriores);
            }

            if (olderProductGrid) {
                const dropsAntiguos = window.products.filter(p => p.id === 1 || p.id === 2 || p.id === 3);
                olderProductGrid.innerHTML = generateProductsHTML(dropsAntiguos);
            }
        } else {
            // Filtrar por categoría (Superior o Inferior)
            if (gridTitle) gridTitle.textContent = filter;

            const filtered = window.products.filter(p => p.category === filter);
            productGridContainer.innerHTML = generateProductsHTML(filtered);
        }
    }

    function generateProductsHTML(productsList) {
        return productsList.map(product => {
            const stockStatus = getProductStockStatus(product.id);
            
            // La insignia "En Stock" fue removida por diseño, se asume en stock si no dice "SIN STOCK"
            const stockBadge = '';

            // Superposición para productos sin stock
            const outOfStockOverlay = !stockStatus.hasStock
                ? `<div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                       <span class="font-brutal-header text-white text-base md:text-lg tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] uppercase">SIN STOCK</span>
                   </div>`
                : '';

            const outOfStockClass = !stockStatus.hasStock ? 'out-of-stock-media' : '';

            // Verificar si el producto usa la imagen del logo como placeholder
            const isPlaceholder = product.images[0] && (product.images[0].includes('logo/logo') || product.images[0].includes('logo/logo blanco'));

            const imageHtml = isPlaceholder
                ? `<div class="w-full h-full flex items-center justify-center bg-black/10 min-h-[250px]">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-16 h-16 text-white/30">
                           <path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                           <path d="M12 7v2M12 9l8.5 5.5a1 1 0 0 1-.5 1.8H4a1 1 0 0 1-.5-1.8L12 9Z" />
                       </svg>
                   </div>`
                : `
                    <!-- Imagen Principal -->
                    <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover object-center main-image ${outOfStockClass}">
                    
                    <!-- Imagen de Hover -->
                    ${product.images.length > 1 ? `
                    <img src="${product.images[product.images.length > 4 ? 4 : 1]}" alt="${product.name} lifestyle" class="w-full h-full object-cover object-center hover-image absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out ${outOfStockClass}">
                    ` : ''}
                `;

            return `
                <div class="product-card relative group cursor-pointer text-center" onclick="goToProduct(${product.id})">
                    <!-- Contenedor de Imagen -->
                    <div class="aspect-square w-full relative overflow-hidden rounded-none mb-4 transition-all duration-300">
                        ${imageHtml}
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                        ${stockBadge}
                        ${outOfStockOverlay}
                    </div>
                    <div class="mt-4">
                        <h3 class="font-brutal-title text-sm md:text-base text-white mb-1 tracking-[0.05em] uppercase">${product.name}</h3>
                        <div class="flex justify-center items-center mt-2">
                            <span class="font-brutal-price text-lg md:text-xl text-white/80 hover-price">₲${product.price.toLocaleString('es-PY')}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    window.generateProductsHTML = generateProductsHTML;

    // Función global para abrir el modal de tallas
    window.openSizeChart = function (imgSrc) {
        const modal = document.getElementById('size-chart-modal');
        const modalImg = document.getElementById('size-chart-img');

        if (modal && modalImg) {
            modalImg.src = imgSrc;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
    };

    // Inicializar eventos del modal de tallas
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('size-chart-modal');
        const closeBtn = document.getElementById('close-size-chart');

        if (modal && closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    function initHomePage() {
        console.log('Inicializando página principal...');
        renderProducts();
        updateCartCount();
        setupHeroVideo();
    }

    function setupHeroVideo() {
        const video = document.getElementById('hero-video');
        const soundBtn = document.getElementById('video-sound-btn');

        if (video && soundBtn) {
            soundBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (video.muted) {
                    video.muted = false;
                    soundBtn.innerHTML = '<i class="fas fa-volume-up text-lg"></i>';
                    soundBtn.classList.add('bg-purple-600/80');
                    soundBtn.classList.remove('bg-black/50');
                } else {
                    video.muted = true;
                    soundBtn.innerHTML = '<i class="fas fa-volume-mute text-lg"></i>';
                    soundBtn.classList.remove('bg-purple-600/80');
                    soundBtn.classList.add('bg-black/50');
                }
            });
        }
    }

    function initCartPage() {
        // Simular tiempo de carga para mostrar el indicador
        setTimeout(() => {
            renderCart();
            updateCartCount();
            setupCheckout();
        }, 500);
    }

    function toggleAuthForms() {
        const modalContent = document.querySelector('#register-modal .modal-content');
        const currentForm = modalContent.querySelector('form').id;

        if (currentForm === 'register-form') {
            // Cambiar a formulario de login
            modalContent.querySelector('h2').textContent = 'Iniciar Sesión';
            modalContent.querySelector('form').id = 'login-form';
            modalContent.querySelector('form').innerHTML = `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="login-email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8357C5] focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <input type="password" id="login-password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8357C5] focus:border-transparent">
                </div>
                
                <button type="submit" class="w-full bg-[#8357C5] text-white py-3 px-4 rounded-md hover:bg-[#6e48a9] transition-colors duration-300 font-semibold">
                    Iniciar Sesión
                </button>
            `;

            // Cambiar el enlace inferior
            const linkText = modalContent.querySelector('.mt-6 p');
            linkText.innerHTML = `
                ¿No tienes cuenta? 
                <a href="#" id="register-link" class="text-[#8357C5] hover:underline font-medium">Crear Cuenta</a>
            `;

            // Agregar event listener al nuevo enlace
            const registerLink = modalContent.querySelector('#register-link');
            if (registerLink) {
                registerLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleAuthForms();
                });
            }

            // Agregar event listener al formulario de login
            const loginForm = modalContent.querySelector('#login-form');
            if (loginForm) {
                loginForm.addEventListener('submit', handleLogin);
            }

        } else {
            // Cambiar a formulario de registro
            modalContent.querySelector('h2').textContent = 'Crear Cuenta';
            modalContent.querySelector('form').id = 'register-form';
            modalContent.querySelector('form').innerHTML = `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                    <input type="text" id="register-name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8357C5] focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="register-email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8357C5] focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <input type="password" id="register-password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8357C5] focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                    <input type="password" id="register-confirm-password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8357C5] focus:border-transparent">
                </div>
                
                <div class="flex items-center">
                    <input type="checkbox" id="register-terms" required class="h-4 w-4 text-[#8357C5] focus:ring-[#8357C5] border-gray-300 rounded">
                    <label class="ml-2 block text-sm text-gray-900">
                        Acepto los <a href="#" class="text-[#8357C5] hover:underline">Términos y Condiciones</a>
                    </label>
                </div>
                
                <button type="submit" class="w-full bg-[#8357C5] text-white py-3 px-4 rounded-md hover:bg-[#6e48a9] transition-colors duration-300 font-semibold">
                    Crear Cuenta
                </button>
            `;

            // Cambiar el enlace inferior
            const linkText = modalContent.querySelector('.mt-6 p');
            linkText.innerHTML = `
                ¿Ya tienes cuenta? 
                <a href="#" id="login-link" class="text-[#8357C5] hover:underline font-medium">Iniciar Sesión</a>
            `;

            // Agregar event listener al nuevo enlace
            const loginLink = modalContent.querySelector('#login-link');
            if (loginLink) {
                loginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleAuthForms();
                });
            }

            // Agregar event listener al formulario de registro
            const registerForm = modalContent.querySelector('#register-form');
            if (registerForm) {
                registerForm.addEventListener('submit', handleRegister);
            }
        }
    }

    async function handleRegister(e) {
        e.preventDefault();

        // Verificar que los elementos existan antes de acceder a sus valores
        const nameElement = document.getElementById('register-name');
        const emailElement = document.getElementById('register-email');
        const passwordElement = document.getElementById('register-password');
        const confirmPasswordElement = document.getElementById('register-confirm-password');
        const termsElement = document.getElementById('register-terms');

        // Si algún elemento no existe, no proceder
        if (!nameElement || !emailElement || !passwordElement || !confirmPasswordElement || !termsElement) {
            console.warn('⚠️ Elementos del formulario de registro no encontrados');
            return;
        }

        const name = nameElement.value;
        const email = emailElement.value;
        const password = passwordElement.value;
        const confirmPassword = confirmPasswordElement.value;
        const termsAccepted = termsElement.checked;

        // Validaciones
        if (!name || !email || !password || !confirmPassword) {
            showToast('Por favor, completa todos los campos', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Las contraseñas no coinciden', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (!termsAccepted) {
            showToast('Debes aceptar los términos y condiciones', 'error');
            return;
        }

        try {
            // Registrar usuario con Firebase
            const userCredential = await window.firebaseAuth.registerUser(email, password, name);
            showToast('Cuenta creada exitosamente', 'success');

            // Cerrar modal
            const registerModal = document.getElementById('register-modal');
            if (registerModal) {
                registerModal.classList.remove('visible');
                document.body.style.overflow = '';
            }

            // Actualizar UI
            currentUser = userCredential.user;
            updateUIForLoggedInUser(currentUser);

        } catch (error) {
            console.error('Error al registrar:', error);

            // Mensajes de error más específicos y amigables
            let errorMessage = 'Error al crear la cuenta';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Esta cuenta ya está registrada';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'La dirección de email no es válida.';
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = 'El registro con email/contraseña no está habilitado.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Error de conexión. Verifica tu internet e intenta nuevamente.';
            } else if (error.message) {
                errorMessage = 'Error al crear la cuenta: ' + error.message;
            }

            showToast(errorMessage, 'error');
        }
    }

    async function handleLogin(e) {
        e.preventDefault();

        // Verificar que los elementos existan antes de acceder a sus valores
        const emailElement = document.getElementById('login-email');
        const passwordElement = document.getElementById('login-password');

        // Si algún elemento no existe, no proceder
        if (!emailElement || !passwordElement) {
            console.warn('⚠️ Elementos del formulario de login no encontrados');
            return;
        }

        const email = emailElement.value;
        const password = passwordElement.value;

        if (!email || !password) {
            showToast('Por favor, completa todos los campos', 'error');
            return;
        }

        try {
            const userCredential = await window.firebaseAuth.loginUser(email, password);
            showToast('Inicio de sesión exitoso', 'success');

            // Cerrar modal
            const registerModal = document.getElementById('register-modal');
            if (registerModal) {
                registerModal.classList.add('hidden');
            }

            // Actualizar UI
            currentUser = userCredential.user;
            updateUIForLoggedInUser(currentUser);

        } catch (error) {
            console.error('Error al iniciar sesión:', error);

            // Mensajes de error más específicos y amigables
            let errorMessage = 'Error al iniciar sesión';

            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No existe una cuenta con este email. Verifica el email o regístrate.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Contraseña incorrecta. Intenta nuevamente.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'La dirección de email no es válida.';
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = 'Esta cuenta ha sido deshabilitada. Contacta al administrador.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Demasiados intentos fallidos. Espera un momento e intenta nuevamente.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Error de conexión. Verifica tu internet e intenta nuevamente.';
            } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/internal-error') {
                // Verificar si el mensaje contiene INVALID_LOGIN_CREDENTIALS
                if (error.message && error.message.includes('INVALID_LOGIN_CREDENTIALS')) {
                    errorMessage = 'Credenciales incorrectas';
                } else {
                    errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
                }
            } else if (error.message) {
                errorMessage = 'Error al iniciar sesión: ' + error.message;
            }

            showToast(errorMessage, 'error');
        }
    }

    function setupLoginForm() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    }






    // Navegación a la página dedicada
    window.goToProduct = function (productId) {
        window.location.href = `product.html?id=${productId}`;
    }



    // Función openPreviewModal ya no existe - eliminada

    function setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('close-sidebar');
        const overlay = document.getElementById('sidebar-overlay');

        if (!menuToggle) {
            console.error('Boton de menu no encontrado');
            return;
        }

        if (!sidebar) {
            console.error('Sidebar no encontrado');
            return;
        }

        if (menuToggle && sidebar) {
            // Abrir el menú al hacer clic en el botón hamburguesa
            menuToggle.addEventListener('click', () => {
                sidebar.classList.add('open');
                if (overlay) overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evitar scroll del body
            });

            // Cerrar el menú al hacer clic en el botón de cerrar
            if (closeSidebar) {
                closeSidebar.addEventListener('click', () => {
                    sidebar.classList.remove('open');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = ''; // Restaurar scroll
                });
            }

            // Cerrar el menú al hacer clic en el overlay
            if (overlay) {
                overlay.addEventListener('click', () => {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                    document.body.style.overflow = ''; // Restaurar scroll
                });
            }

            // Cerrar el menú al hacer clic en los enlaces del menú
            const sidebarLinks = sidebar.querySelectorAll('a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    sidebar.classList.remove('open');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = ''; // Restaurar scroll
                });
            });
        }
    }



    // Todas las funciones de autenticación han sido movidas dentro de initApp()

    function renderCart() {
        // Solo renderizar si NO estamos en la página del carrito
        if (window.location.pathname.includes('cart.html')) {
            return; // No hacer nada en cart.html
        }

        // Usar el carrito local en lugar de leer localStorage cada vez
        const loadingCart = document.getElementById('loading-cart');
        const cartContent = document.getElementById('cart-content');
        const emptyCart = document.getElementById('empty-cart');
        const cartItems = document.getElementById('cart-items');
        const cartProductsList = document.getElementById('cart-products-list');

        // Solo continuar si estos elementos existen (no en cart.html)
        if (!loadingCart || !cartContent || !emptyCart || !cartItems || !cartProductsList) {
            return;
        }

        // Ocultar indicador de carga y mostrar contenido
        if (loadingCart) loadingCart.classList.add('hidden');
        if (cartContent) cartContent.classList.remove('hidden');

        if (cart.length === 0) {
            if (emptyCart) emptyCart.classList.remove('hidden');
            if (cartItems) cartItems.classList.add('hidden');
            return;
        }

        if (emptyCart) emptyCart.classList.add('hidden');
        if (cartItems) cartItems.classList.remove('hidden');

        // Renderizar productos del carrito
        if (cartProductsList) {
            cartProductsList.innerHTML = '';
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item p-6 flex items-center space-x-4 mb-4';
                cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900 text-lg">${item.name}</h3>
                            <p class="text-sm text-gray-600">Talla: ${item.size}</p>
                            <p class="text-[#8357C5] font-semibold text-lg">\u20B2${item.price.toLocaleString('es-PY')}</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                        </div>
                        <button class="remove-item" data-index="${index}" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                cartProductsList.appendChild(cartItem);
            });

            // Agregar event listeners para botones de cantidad y eliminar
            setupCartEventListeners();

            // Actualizar resumen
            updateCartSummary();
        }
    }

    function setupCartEventListeners() {
        // Botones de cantidad
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const action = e.target.dataset.action;
                updateCartItemQuantity(index, action);
            });
        });

        // Botones de eliminar
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                removeCartItem(index);
            });
        });
    }

    function updateCartItemQuantity(index, action) {
        // Usar el carrito local en lugar de leer localStorage cada vez
        if (cart[index]) {
            const item = cart[index];
            const oldQuantity = item.quantity;

            if (action === 'increase') {
                // Verificar si hay stock disponible
                if (checkStock(item.id, item.size) > 0) {
                    item.quantity++;
                    reduceStock(item.id, item.size, 1);
                } else {
                    showToast('No hay más stock disponible para esta talla', 'error');
                    return;
                }
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity--;
                restoreStock(item.id, item.size, 1);
            }

            syncCartToLocalStorage();
            renderCart();
        }
    }

    function removeCartItem(index) {
        // Usar el carrito local en lugar de leer localStorage cada vez
        const removedItem = cart[index];

        if (removedItem) {
            // Restaurar stock al inventario
            restoreStock(removedItem.id, removedItem.size, removedItem.quantity);
        }

        cart.splice(index, 1);
        syncCartToLocalStorage();
        renderCart();
        if (window.updateCartCount) window.updateCartCount();
    }

    function updateCartSummary() {
        // Usar el carrito local en lugar de leer localStorage cada vez
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 15000 : 0; // Envío de \u20B215.000
        const total = subtotal + shipping;

        // Actualizar en la página del carrito
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const totalEl = document.getElementById('total');

        if (subtotalEl) subtotalEl.textContent = `\u20B2${subtotal.toLocaleString('es-PY')}`;
        if (shippingEl) shippingEl.textContent = `\u20B2${shipping.toLocaleString('es-PY')}`;
        if (totalEl) totalEl.textContent = `\u20B2${total.toLocaleString('es-PY')}`;
    }

    function setupCheckout() {
        const checkoutBtn = document.getElementById('checkout-btn');
        const deliveryModal = document.getElementById('delivery-modal');
        const closeDeliveryBtn = document.getElementById('close-delivery-btn');
        const deliveryForm = document.getElementById('delivery-form');
        const checkoutModal = document.getElementById('checkout-modal');
        const closeCheckoutBtn = document.getElementById('close-checkout-btn');
        const placeOrderBtn = document.getElementById('place-order-btn');
        const confirmationModal = document.getElementById('confirmation-modal');

        if (checkoutBtn && deliveryModal) {
            checkoutBtn.addEventListener('click', () => {
                deliveryModal.classList.add('visible');
            });
        }

        if (closeDeliveryBtn) {
            closeDeliveryBtn.addEventListener('click', () => {
                deliveryModal.classList.remove('visible');
            });
        }

        if (deliveryForm) {
            deliveryForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Obtener datos del formulario de entrega
                const name = document.getElementById('delivery-name').value;
                const lastname = document.getElementById('delivery-lastname').value;
                const email = document.getElementById('delivery-email').value;
                const phone = document.getElementById('delivery-phone').value;
                const country = document.getElementById('delivery-country').value;
                const city = document.getElementById('delivery-city').value;
                const address = document.getElementById('delivery-address').value;
                const neighborhood = document.getElementById('delivery-neighborhood').value;

                // Validar que todos los campos estén llenos
                if (!name || !lastname || !email || !phone || !country || !city || !address || !neighborhood) {
                    showToast('Por favor completa todos los campos', 'error');
                    return;
                }

                // Llenar los campos del modal de checkout
                const checkoutEmail = document.getElementById('checkout-email');
                const checkoutAddress = document.getElementById('checkout-address');

                if (checkoutEmail) checkoutEmail.value = email;
                if (checkoutAddress) checkoutAddress.value = `${address}, ${neighborhood}, ${city}, ${country}`;

                // Cerrar modal de entrega y abrir modal de checkout
                deliveryModal.classList.remove('visible');
                checkoutModal.classList.add('visible');
                updateCheckoutSummary();
            });
        }

        if (closeCheckoutBtn) {
            closeCheckoutBtn.addEventListener('click', () => {
                checkoutModal.classList.remove('visible');
            });
        }

        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                processOrder();
            });
        }

        // Cerrar modales al hacer clic fuera
        if (deliveryModal) {
            deliveryModal.addEventListener('click', (e) => {
                if (e.target === deliveryModal) {
                    deliveryModal.classList.remove('visible');
                }
            });
        }

        if (checkoutModal) {
            checkoutModal.addEventListener('click', (e) => {
                if (e.target === checkoutModal) {
                    checkoutModal.classList.remove('visible');
                }
            });
        }
    }

    function updateCheckoutSummary() {
        // Usar el carrito local en lugar de leer localStorage cada vez
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 15000 : 0;
        const total = subtotal + shipping;

        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutShipping = document.getElementById('checkout-shipping');
        const checkoutTotal = document.getElementById('checkout-total');

        if (checkoutSubtotal) checkoutSubtotal.textContent = `\u20B2${subtotal.toLocaleString('es-PY')}`;
        if (checkoutShipping) checkoutShipping.textContent = `\u20B2${shipping.toLocaleString('es-PY')}`;
        if (checkoutTotal) checkoutTotal.textContent = `\u20B2${total.toLocaleString('es-PY')}`;
    }

    async function processOrder() {
        // 1. Recopilar datos del cliente
        const customerData = {
            firstName: document.getElementById('delivery-name')?.value || '',
            lastName: document.getElementById('delivery-lastname')?.value || '',
            email: document.getElementById('delivery-email')?.value || '',
            phone: document.getElementById('delivery-phone')?.value || '',
            country: document.getElementById('delivery-country')?.value || '',
            city: document.getElementById('delivery-city')?.value || '',
            address: document.getElementById('delivery-address')?.value || '',
            neighborhood: document.getElementById('delivery-neighborhood')?.value || ''
        };

        // 2. Preparar datos del pedido
        const currentCart = window.cart || [];
        if (currentCart.length === 0) {
            showToast('El carrito está vacío', 'error');
            return;
        }

        // UI Feedback
        const placeOrderBtn = document.getElementById('place-order-btn');
        const originalBtnText = placeOrderBtn ? placeOrderBtn.textContent : 'Realizar Pedido';
        if (placeOrderBtn) {
            placeOrderBtn.textContent = 'Procesando...';
            placeOrderBtn.disabled = true;
        }

        let orderNumber = 'AV-' + Date.now().toString().slice(-6);
        let total = 0;

        try {
            // 3. Intentar enviar emails y guardar (Optimización)
            if (window.completeCheckoutWithFirebase) {
                const result = await window.completeCheckoutWithFirebase(customerData, currentCart);
                if (result.success) {
                    orderNumber = result.orderId;
                }
            }

            // Calcular totales para la UI
            const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = 15000;
            total = subtotal + shipping;

            // 4. Actualizar UI del modal de confirmación
            const orderNumberEl = document.getElementById('order-number');
            const orderTotalEl = document.getElementById('order-total');
            const whatsappProofLink = document.getElementById('whatsapp-proof-link');

            if (orderNumberEl) orderNumberEl.textContent = orderNumber;
            if (orderTotalEl) orderTotalEl.textContent = `\u20B2${total.toLocaleString('es-PY')}`;
            if (whatsappProofLink) {
                const msg = encodeURIComponent(`Hola, envío comprobante de pago. Pedido ${orderNumber} por \u20B2${total.toLocaleString('es-PY')}`);
                whatsappProofLink.href = `https://wa.me/595982713971?text=${msg}`;
            }

            // 5. Cerrar modal de checkout y mostrar confirmación
            document.getElementById('checkout-modal').classList.remove('visible');
            document.getElementById('confirmation-modal').classList.add('visible');

            // 6. Limpiar carrito
            window.cart = [];
            localStorage.removeItem('avenidaCart');
            if (window.updateCartCount) window.updateCartCount();

            showToast('¡Pedido realizado con éxito!', 'success');

        } catch (error) {
            console.error('Error en proceso de pedido:', error);
            // Fallback: Mostrar confirmación de todos modos para pago manual
            document.getElementById('checkout-modal').classList.remove('visible');
            document.getElementById('confirmation-modal').classList.add('visible');

            // Limpiar carrito también en fallback
            window.cart = [];
            localStorage.removeItem('avenidaCart');
            if (window.updateCartCount) window.updateCartCount();
        } finally {
            if (placeOrderBtn) {
                placeOrderBtn.textContent = originalBtnText;
                placeOrderBtn.disabled = false;
            }
        }
    }

    // Filtrar por categoría desde parámetros de URL al iniciar (redirecciones)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam) {
        console.log('🎯 Filtrando por categoría desde parámetro URL:', catParam);
        setTimeout(() => {
            if (typeof window.filterProducts === 'function') {
                window.filterProducts(catParam);
            }
        }, 150);
    }
} // cierre de initApp





// Función para mostrar notificaciones toast
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast-notification');
    if (toast) {
        toast.innerHTML = message; // Changed to innerHTML to support links/buttons
        toast.className = `toast-notification ${type}`;
        toast.classList.add('show');

        // Auto-hide después de 4 segundos
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.classList.remove('show', 'hide');
            }, 400);
        }, 4000);
    }
}

// Exponer la función showToast globalmente
window.showToast = showToast;

// Función para obtener la imagen del producto basándose en su ID y diseño opcional
function getProductImage(productId, design = null) {
    // Determinar qué tipo de producto es basándose en el ID
    if (productId == 1) {
        return 'catalogo/jeans holgados/portada baggy.png';
    } else if (productId == 2) {
        return 'catalogo/jeans rectos/portada straight.png';
    } else if (productId == 3) {
        return 'catalogo/boxer avenida/boxer restock front.png';
    } else if (productId == 4) {
        return 'catalogo/jorts/jort denim portada principal.png';
    } else if (productId == 5) {
        if (design === 'Diseño B') {
            return 'catalogo/camisas/cami B portada principal.png';
        }
        return 'catalogo/camisas/cami A portada principal.png';
    } else if (productId == 6) {
        return 'catalogo/jorts/vestir portada principal.png';
    }

    // Fallback por defecto
    return 'catalogo/jeans holgados/portada baggy.png';
}

// Función para añadir productos al carrito
function addToCart(id, size, quantity = 1, design = null) {
    // Verificar que se haya seleccionado una talla
    if (!size) {
        showToast('Por favor, selecciona una talla', 'error');
        return false;
    }

    // Verificar stock antes de añadir
    if (!isSizeAvailable(id, size, design)) {
        showToast('Esta talla no está disponible en stock', 'error');
        return false;
    }

    const existingItem = window.cart.find(item => item.id === id && item.size === size && (item.design || null) === design);
    if (existingItem) {
        // Verificar si hay suficiente stock para la cantidad total
        const totalQuantity = existingItem.quantity + quantity;
        if (totalQuantity > checkStock(id, size, design)) {
            showToast('No hay suficiente stock disponible para esta cantidad', 'error');
            return false;
        }
        existingItem.quantity += quantity;
    } else {
        const product = window.products.find(p => p.id == id);
        if (product) {
            // Obtener la imagen correcta basándose en el ID del producto
            const productImage = getProductImage(product.id, design);
            console.log('🖼️ Imagen del producto para el carrito:', productImage);

            const cartItem = {
                id: product.id,
                name: design ? `${product.name} - ${design}` : product.name,
                price: product.price,
                image: productImage,
                size: size,
                design: design,
                quantity: quantity
            };

            window.cart.push(cartItem);
            console.log('✅ Nuevo producto añadido al carrito:', cartItem);
        } else {
            console.error('❌ Producto no encontrado:', id);
            showToast('Error: Producto no encontrado', 'error');
            return false;
        }
    }

    // Reducir stock del inventario
    if (reduceStock(id, size, quantity, design)) {
        syncCartToLocalStorage();
        updateCartCount();

        // Mostrar toast con botón de ir al carrito
        const toastMessage = `
            <div class="flex flex-col items-center">
                <span>${quantity} artículo(s) añadido(s)</span>
                <a href="cart.html" class="mt-2 bg-white text-[#8357C5] px-3 py-1 rounded text-sm font-bold hover:bg-gray-100 transition-colors">
                    Ir al Carrito <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        `;
        showToast(toastMessage, 'success');

        // También mostrar el botón "Ver Carrito" en la página de producto si existe
        const viewCartBtn = document.getElementById('view-cart-btn');
        if (viewCartBtn) {
            viewCartBtn.classList.remove('hidden');
            viewCartBtn.classList.add('inline-flex');
        }

        return true;
    } else {
        showToast('Error al actualizar el stock', 'error');
        return false;
    }
}

// Exponer la función addToCart globalmente
window.addToCart = addToCart;

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = window.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Mostrar u ocultar el contador según si hay items
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Exponer la función updateCartCount globalmente
window.updateCartCount = updateCartCount;

// Función para sincronizar el carrito local con localStorage
function syncCartToLocalStorage() {
    localStorage.setItem('avenidaCart', JSON.stringify(window.cart));
}

// Exponer la función syncCartToLocalStorage globalmente
window.syncCartToLocalStorage = syncCartToLocalStorage;

// Función para sincronizar el carrito desde localStorage
function syncCartFromLocalStorage() {
    const savedCart = localStorage.getItem('avenidaCart');
    if (savedCart) {
        window.cart = JSON.parse(savedCart);
    }
}

// Exponer la función syncCartFromLocalStorage globalmente
window.syncCartFromLocalStorage = syncCartFromLocalStorage;

// ======================= FUNCIÓN DE LOGOUT CENTRALIZADA =======================
async function logoutUser() {
    console.log('🚪 Iniciando proceso de logout...');

    try {
        // Mostrar modal de confirmación
        const confirmed = await showLogoutConfirmation();

        if (!confirmed) {
            console.log('❌ Usuario canceló el logout');
            return;
        }

        console.log('✅ Usuario confirmó el logout, procediendo...');

        // Limpiar estado de Firebase si está disponible
        if (typeof firebase !== 'undefined' && firebase.auth) {
            try {
                await firebase.auth().signOut();
                console.log('✅ Sesión de Firebase cerrada');
            } catch (firebaseError) {
                console.warn('⚠️ Error al cerrar sesión de Firebase:', firebaseError);
            }
        }

        // Limpiar localStorage
        localStorage.removeItem('avenidaUserData');
        localStorage.removeItem('avenidaAdminData');
        localStorage.removeItem('avenidaCart');
        localStorage.removeItem('avenidaCheckoutData');
        localStorage.removeItem('avenidaCustomerData');

        console.log('🗑️ localStorage limpiado');

        // ACTUALIZAR LA UI ANTES DE REFRESCAR
        console.log('🔄 Actualizando UI para usuario no logueado...');
        updateUIForLoggedOutUser();

        // Mostrar mensaje de éxito
        showToast('Sesión cerrada exitosamente', 'success');

        // Refrescar la página después de 1 segundo
        setTimeout(() => {
            console.log('🔄 Refrescando página...');
            window.location.reload();
        }, 1000);

    } catch (error) {
        console.error('❌ Error durante el logout:', error);
        showToast('Error al cerrar sesión', 'error');
    }
}

// Función para mostrar confirmación de logout
function showLogoutConfirmation() {
    return new Promise((resolve) => {
        // Crear modal de confirmación
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-sign-out-alt text-2xl text-red-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Cerrar Sesión?</h3>
                <p class="text-gray-600 mb-6">¿Estás seguro de que quieres cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder a tu cuenta.</p>
                <div class="flex space-x-3">
                    <button id="cancel-logout" class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors">
                        Cancelar
                    </button>
                    <button id="confirm-logout" class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        document.getElementById('cancel-logout').addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(false);
        });

        document.getElementById('confirm-logout').addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(true);
        });

        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                resolve(false);
            }
        });
    });
}

// Exponer funciones globalmente
window.logoutUser = logoutUser;
window.showLogoutConfirmation = showLogoutConfirmation;
window.loadRealStockFromFirebase = loadRealStockFromFirebase;
window.forceCorrectProductNames = forceCorrectProductNames;
window.forceRenderProducts = forceRenderProducts;
window.showProductError = showProductError;

// Función para cargar stock real desde Firebase
async function loadRealStockFromFirebase() {
    try {
        if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.db) {
            console.log('🔄 Cargando stock real desde Firebase (Colección completa)...');

            // OPTIMIZACIÓN: Cargar toda la colección en lugar de documentos individuales
            // Esto asegura que veamos todos los productos disponibles y evita errores de ID
            const snapshot = await window.firebaseAuth.db.collection('products').get();

            if (snapshot.empty) {
                console.log('⚠️ La colección de productos está vacía');
                ensureDefaultSizesAndStock();
                return;
            }

            // Crear un mapa de productos de Firebase para búsqueda rápida
            const firebaseProductsMap = {};
            snapshot.forEach(doc => {
                firebaseProductsMap[doc.id] = doc.data();
                console.log(`📦 Producto encontrado en Firebase: ID "${doc.id}"`);
            });

            for (let product of window.products) {
                // Intentar encontrar el documento correspondiente
                let firebaseData = firebaseProductsMap[product.id.toString()];

                // Si no se encuentra por ID exacto, intentar buscar por nombre (fallback)
                if (!firebaseData) {
                    console.log(`⚠️ No se encontró ID exacto "${product.id}" en Firebase. Buscando por nombre...`);
                    const foundId = Object.keys(firebaseProductsMap).find(id =>
                        firebaseProductsMap[id].name === product.name
                    );
                    if (foundId) {
                        console.log(`✅ Encontrado por nombre: "${product.name}" tiene ID "${foundId}"`);
                        firebaseData = firebaseProductsMap[foundId];
                    }
                }

                if (firebaseData) {
                    // Actualizar stock con datos reales de Firebase
                    if (firebaseData.stock) {
                        // Asegurar que los valores sean números para todas las tallas disponibles para este producto
                        const newStock = {};
                        (product.availableSizes || ['P', 'M', 'G']).forEach(size => {
                            newStock[size] = parseInt(firebaseData.stock[size]) || 0;
                        });
                        product.stock = newStock;
                        console.log(`✅ Stock actualizado para ${product.name}:`, product.stock);
                    }

                    // Actualizar estado
                    if (firebaseData.status) {
                        product.status = firebaseData.status;
                    } else {
                        const hasStock = Object.values(product.stock).some(val => val > 0);
                        product.status = hasStock ? 'En Stock' : 'Sin Stock';
                    }
                } else {
                    console.log(`⚠️ Producto ${product.name} (ID: ${product.id}) no encontrado en Firebase`);
                    ensureDefaultStockForProduct(product);
                }

                // FORZAR nombres correctos (siempre)
                if (product.id === 1) product.name = 'JEANS HOLGADOS AVDA \'25';
                else if (product.id === 2) product.name = 'JEANS RECTOS AVDA \'25';
                else if (product.id === 3) product.name = 'BOXER AVDA \'25';
            }

            // Guardar productos actualizados
            saveProductsToLocalStorage();
            console.log('✅ Stock real cargado y sincronizado');

            // Disparar evento para actualizar UI
            window.dispatchEvent(new CustomEvent('productsUpdated'));

        } else {
            console.log('⚠️ Firebase no disponible, usando stock por defecto');
            ensureDefaultSizesAndStock();
        }
    } catch (error) {
        console.error('❌ Error al cargar stock desde Firebase:', error);
        ensureDefaultSizesAndStock();
    }
}

// Función para asegurar stock por defecto para un producto específico
function ensureDefaultStockForProduct(product) {
    // Si ya tiene tallas definidas y stock, mantenerlas pero asegurar que sean números
    if (product.availableSizes && product.availableSizes.length > 0) {
        const newStock = {};
        product.availableSizes.forEach(size => {
            newStock[size] = typeof product.stock?.[size] === 'number' ? product.stock[size] : 0;
        });
        product.stock = newStock;
    } else {
        // Fallback a tallas por defecto si no tiene nada definido
        const defaultSizes = ['P', 'M', 'G'];
        product.availableSizes = [...defaultSizes];
        product.stock = {
            P: typeof product.stock?.P === 'number' ? product.stock.P : 0,
            M: typeof product.stock?.M === 'number' ? product.stock.M : 0,
            G: typeof product.stock?.G === 'number' ? product.stock.G : 0
        };
    }

    // Establecer estado basado en stock
    const hasStock = Object.values(product.stock).some(qty => (qty || 0) > 0);
    product.status = hasStock ? 'En Stock' : 'Sin Stock';
}

// Función para asegurar tallas y stock consistentes (P, M, G) para todos los productos
function ensureDefaultSizesAndStock() {
    const defaultSizes = ['P', 'M', 'G'];

    window.products.forEach(product => {
        ensureDefaultStockForProduct(product);
    });

    // Guardar para que el modal/otras páginas lean el estado correcto
    try { saveProductsToLocalStorage(); } catch (_) { }
}

// La función ensureDefaultSizesAndStock() ahora se ejecuta desde initApp()
// para permitir cargar stock real desde Firebase primero

// Función para configurar listeners de productos en tiempo real
function setupProductRealtimeListeners() {
    if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.db) {
        console.log('🔄 Configurando listeners de productos en tiempo real...');
        window.firebaseAuth.db.collection('products').onSnapshot((snapshot) => {
            let changesDetected = false;

            snapshot.docChanges().forEach((change) => {
                if (change.type === "modified" || change.type === "added") {
                    const data = change.doc.data();
                    const product = window.products.find(p => p.id == change.doc.id);

                    if (product) {
                        console.log(`🔄 Actualización en tiempo real para producto ${product.id}`);

                        if (data.stock) product.stock = data.stock;
                        if (data.status) product.status = data.status;

                        // Recalcular estado si no viene de Firebase
                        if (!data.status) {
                            const hasStock = Object.values(product.stock || {}).some(qty => (qty || 0) > 0);
                            product.status = hasStock ? 'En Stock' : 'Sin Stock';
                        }

                        changesDetected = true;
                    }
                }
            });

            if (changesDetected) {
                saveProductsToLocalStorage();

                // Actualizar UI
                if (typeof renderProducts === 'function') {
                    renderProducts();
                }

                // Disparar evento para otras partes de la app (como product.html)
                window.dispatchEvent(new CustomEvent('productsUpdated'));
            }
        });
    }
}

// Función para forzar nombres correctos en todos los productos
function forceCorrectProductNames() {
    console.log('🔒 FORZANDO nombres correctos en todos los productos...');

    window.products.forEach(product => {
        const originalName = product.name;

        if (product.id === 1) {
            product.name = 'JEANS HOLGADOS AVDA \'25';
        } else if (product.id === 2) {
            product.name = 'JEANS RECTOS AVDA \'25';
        } else if (product.id === 3) {
            product.name = 'BOXER AVDA \'25';
        } else if (product.id === 4) {
            product.name = 'JORT DENIM AVDA \'26';
            product.description = 'El Jort es para todos los amantes del streetwear. Para esos días de calor o incluso para aquellos en los que te apetece un look más casual, el jort se convierte en tu mejor acompañante. Esta prenda indiscutiblemente es una carta de amor al primer drop de AVENIDA.';
        } else if (product.id === 5) {
            product.name = "CAMISA AVDA X NNEGATIVO '26";
            product.description = 'La Camisa del segundo drop sale de una colaboración con la marca de intervenciones "nnegativo". El color vino representa el morado de avenida, haciéndolo más elegante, y el diseño con A.P. junto al estilo de negativo da ese toque casual y urbano que tanto nos gusta. Es realmente una prenda flexible y cómoda que podrás usar en cualquier situación de tu día a día.';
        } else if (product.id === 6) {
            product.name = 'CAPRI AVDA \'26';
            product.description = 'El Capri es la representación de la flexibilidad en este drop, es tan cómodo que podrías terminar usándolo en tu casa sin darte cuenta. Al mismo tiempo su carácter osado y elegante hace que siempre sea una pieza que te incita a ser modelada.';
        } else if (product.id === 7) {
            product.name = 'JEAN FLARED';
            product.description = 'Nuevo Jean Flared de Avenida. Detalles próximamente.';
        } else if (product.id === 8) {
            product.name = 'REMERA MANGAS LARGAS';
            product.description = 'Nueva Remera Mangas Largas de Avenida. Detalles próximamente.';
        } else if (product.id === 9) {
            product.name = 'REMERA SLIM FIT';
            product.description = 'Nueva Remera Slim Fit de Avenida. Detalles próximamente.';
        }

        if (originalName !== product.name) {
            console.log(`🔒 Producto ${product.id}: "${originalName}" → "${product.name}"`);
        }
    });

    console.log('✅ Nombres correctos forzados en todos los productos');
}

// Función para forzar el renderizado de productos (fallback para móviles)
function forceRenderProducts() {
    console.log('🔄 FORZANDO renderizado de productos...');

    const productGrid = document.getElementById('product-grid');
    if (!productGrid) {
        console.error('❌ Elemento product-grid no encontrado');
        return;
    }

    // Verificar que window.products existe y tiene datos
    if (!window.products || window.products.length === 0) {
        console.error('❌ window.products no disponible o vacío');
        return;
    }

    console.log('📦 Productos disponibles para renderizar:', window.products.length);
    console.log('📱 Dispositivo móvil detectado:', window.innerWidth <= 768);
    console.log('🌐 User Agent:', navigator.userAgent);

    // Asegurar que los contenedores sean visibles
    const gridTitle = document.getElementById('product-grid-title');
    const oldGridSectionTitle = document.getElementById('old-grid-title');
    const viewAllContainer = document.getElementById('view-all-container');
    const olderDropsSection = document.getElementById('older-drops-section');

    if (gridTitle) gridTitle.style.display = 'block';
    if (productGrid) productGrid.style.display = 'grid';

    // Renderizar novedades (ID 7, 8 y 9)
    const novedades = window.products.filter(p => p.id === 7 || p.id === 8 || p.id === 9);
    productGrid.innerHTML = window.generateProductsHTML(novedades);

    // Renderizar colecciones anteriores (ID 4, 5 y 6)
    const oldProductGrid = document.getElementById('old-product-grid');
    if (oldProductGrid) {
        if (oldGridSectionTitle) oldGridSectionTitle.style.display = 'block';
        oldProductGrid.style.display = 'grid';
        if (viewAllContainer) viewAllContainer.style.display = 'flex';

        const coleccionesAnteriores = window.products.filter(p => p.id === 4 || p.id === 5 || p.id === 6);
        oldProductGrid.innerHTML = window.generateProductsHTML(coleccionesAnteriores);
    }

    // Renderizar drops antiguos (1, 2, 3)
    const olderProductGrid = document.getElementById('older-product-grid');
    if (olderProductGrid) {
        const dropsAntiguos = window.products.filter(p => p.id === 1 || p.id === 2 || p.id === 3);
        olderProductGrid.innerHTML = window.generateProductsHTML(dropsAntiguos);
    }

    console.log('✅ Productos renderizados forzadamente');
}

// Función para mostrar error si los productos no se pueden renderizar
function showProductError() {
    console.log('🚨 Mostrando mensaje de error al usuario...');

    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        productGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-red-900 mb-2">Error al cargar productos</h3>
                    <p class="text-red-700 mb-4">No se pudieron cargar los productos. Por favor, recarga la página.</p>
                    <button onclick="window.location.reload()" 
                            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                        <i class="fas fa-refresh mr-2"></i>
                        Recargar página
                    </button>
                </div>
            </div>
        `;
    }

    // También mostrar toast de error
    if (typeof showToast === 'function') {
        showToast('Error al cargar productos. Recargando página...', 'error');
    }
}

// Función para limpiar el carrito completamente
function clearCart() {
    window.cart = [];
    localStorage.removeItem('avenidaCart');
    updateCartCount();
    if (typeof renderCart === 'function') {
        renderCart();
    }
    showToast('Carrito limpiado correctamente', 'success');
}

// Exponer la función clearCart globalmente
window.clearCart = clearCart;

// Función para abrir el modal de registro
function openRegisterModal() {
    const registerModal = document.getElementById('register-modal');
    if (registerModal) {
        registerModal.classList.remove('hidden');
    }
}

// Exponer la función openRegisterModal globalmente
window.openRegisterModal = openRegisterModal;

// Función para manejar el cierre de sesión
async function handleLogout() {
    try {
        await window.firebaseAuth.logoutUser();
        showToast('Has cerrado sesión correctamente', 'success');
        currentUser = null;
        updateUIForLoggedOutUser();
    } catch (error) {
        showToast('Error al cerrar sesión: ' + error.message, 'error');
    }
}

// Exponer la función handleLogout globalmente
window.handleLogout = handleLogout;

// Función para actualizar la UI cuando el usuario está logueado
function updateUIForLoggedInUser(user) {
    // Verificar que el usuario existe y tiene las propiedades necesarias
    if (!user) {
        console.error('❌ Error: Usuario no definido en updateUIForLoggedInUser');
        showToast('Error: Usuario no válido', 'error');
        return;
    }

    if (!user.email) {
        console.error('❌ Error: Usuario sin email en updateUIForLoggedInUser');
        showToast('Error: Usuario sin email válido', 'error');
        return;
    }

    console.log('🔄 Actualizando UI para usuario logueado:', user.email);

    // Actualizar la información del usuario en el sidebar
    const userDisplayName = document.getElementById('user-display-name');
    const userDisplayEmail = document.getElementById('user-display-email');

    if (userDisplayName) userDisplayName.textContent = user.displayName || 'Usuario';
    if (userDisplayEmail) userDisplayEmail.textContent = user.email;

    // Cambiar el botón de registro por uno de cerrar sesión
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.textContent = 'Cerrar Sesión';
        registerBtn.removeEventListener('click', openRegisterModal);
        registerBtn.addEventListener('click', handleLogout);
    }

    // MOSTRAR BOTÓN DE LOGOUT EN EL SIDEBAR
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = 'block';
        console.log('🚪 Botón de logout mostrado en sidebar');
    }
}

// Función para actualizar la UI cuando el usuario no está logueado
function updateUIForLoggedOutUser() {
    console.log('🔄 Actualizando UI para usuario no logueado...');

    // Restablecer la información del usuario en el sidebar
    const userDisplayName = document.getElementById('user-display-name');
    const userDisplayEmail = document.getElementById('user-display-email');

    if (userDisplayName) userDisplayName.textContent = 'Usuario';
    if (userDisplayEmail) userDisplayEmail.textContent = 'usuario@email.com';

    // Restablecer el botón de registro
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.textContent = 'Registrarse';
        registerBtn.removeEventListener('click', handleLogout);
        registerBtn.addEventListener('click', openRegisterModal);
    }

    // LIMPIAR PANEL DE ADMINISTRACIÓN DEL SIDEBAR
    console.log('🗑️ Limpiando panel de administración del sidebar...');
    const navList = document.querySelector('#sidebar nav ul');
    if (navList) {
        // Buscar y eliminar enlaces de administración
        const adminLinks = navList.querySelectorAll('li a[href*="admin"], li a[href*="stock"]');
        adminLinks.forEach(link => {
            const listItem = link.closest('li');
            if (listItem) {
                console.log('🗑️ Eliminando enlace de admin:', link.href);
                listItem.remove();
            }
        });
        console.log('✅ Panel de administración limpiado del sidebar');
    }

    // Ocultar botón de logout si existe
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = 'none';
        console.log('🚪 Botón de logout ocultado');
    }
}

// Exponer las funciones de UI globalmente
window.updateUIForLoggedInUser = updateUIForLoggedInUser;
window.updateUIForLoggedOutUser = updateUIForLoggedOutUser;

// Función para verificar el estado de administrador del usuario
async function checkAdminStatus() {
    const isAdmin = await window.firebaseAuth.isUserAdmin();
    if (isAdmin) {
        // Añadir enlaces al panel de administración en el sidebar
        const navList = document.querySelector('#sidebar nav ul');
        if (navList) {
            // Panel de administración general
            const adminLi = document.createElement('li');
            adminLi.innerHTML = `
                <a href="admin-panel.html" class="flex items-center text-white hover:text-gray-200 py-2">
                    <i class="fas fa-cog mr-3"></i>
                    <span>Panel de Administración</span>
                </a>
            `;
            navList.appendChild(adminLi);

            // Panel de gestión de stock
            const stockLi = document.createElement('li');
            stockLi.innerHTML = `
                <a href="stock-admin.html" class="flex items-center text-white hover:text-gray-200 py-2">
                    <i class="fas fa-boxes mr-3"></i>
                    <span>Gestión de Stock</span>
                </a>
            `;
            navList.appendChild(stockLi);
        }
    }
}

// Exponer la función checkAdminStatus globalmente
window.checkAdminStatus = checkAdminStatus;

// ======================= FUNCIONES DE GESTIÓN DE STOCK =======================

// Función para verificar si hay stock disponible
function checkStock(productId, size, design = null) {
    const product = window.products.find(p => p.id === productId);
    if (!product) {
        console.warn('⚠️ Producto no encontrado:', productId);
        return 0;
    }
    const internalSize = design ? `${design}_${size}` : size;
    // Si no hay stock específico del diseño pero sí hay stock genérico, usar el genérico
    let stockValue = product.stock[internalSize];
    if (stockValue === undefined) stockValue = product.stock[size] || 0;

    console.log(`📦 Stock disponible - Producto ${productId}, Talla ${internalSize}: ${stockValue}`);
    return stockValue;
}

// Función para actualizar stock (usada por administradores)
function updateStock(productId, size, quantity) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return false;

    if (product.stock[size] !== undefined) {
        product.stock[size] = Math.max(0, quantity); // No permitir stock negativo
        saveProductsToLocalStorage();
        return true;
    }
    return false;
}

// Función para reducir stock al añadir al carrito
function reduceStock(productId, size, quantity = 1, design = null) {
    const product = window.products.find(p => p.id === productId);
    const internalSize = design ? `${design}_${size}` : size;

    // As in original code, no actual reduce is performed natively here yet, just check
    if (!product) return false;
    const stockToCheck = product.stock[internalSize] !== undefined ? product.stock[internalSize] : product.stock[size];

    if (stockToCheck >= quantity) {
        return true;
    }
    return false;
}

// Función para restaurar stock al quitar del carrito
function restoreStock(productId, size, quantity = 1, design = null) {
    return true; // We keep original dummy restore
}

// Función para obtener el estado de stock de un producto
function getProductStockStatus(productId) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return { hasStock: false, totalStock: 0, availableSizes: [] };

    const availableSizes = [];
    let totalStock = 0;

    Object.entries(product.stock).forEach(([size, quantity]) => {
        if (quantity > 0) {
            availableSizes.push(size);
            totalStock += quantity;
        }
    });

    return {
        hasStock: totalStock > 0,
        totalStock,
        availableSizes
    };
}

// Función para guardar productos en localStorage
function saveProductsToLocalStorage() {
    localStorage.setItem('avenidaProducts', JSON.stringify(window.products));
}

// Función para cargar productos desde localStorage
function loadProductsFromLocalStorage() {
    console.log('🔄 loadProductsFromLocalStorage ejecutándose...');
    console.log('📦 ANTES de cargar - Productos:', window.products.map(p => ({
        id: p.id,
        name: p.name,
        hasImages: !!p.images,
        imagesLength: p.images ? p.images.length : 'undefined'
    })));

    // Limpiar localStorage si contiene nombres incorrectos o stock desactualizado de Camisas
    const savedProducts = localStorage.getItem('avenidaProducts');
    if (savedProducts) {
        try {
            const parsedProducts = JSON.parse(savedProducts);
            const hasIncorrectNames = parsedProducts.some(p => p.name && p.name.includes('Baggy'));
            const missingDesignStock = parsedProducts.some(p => p.id === 5 && p.stock && p.stock['Diseño A_P'] === undefined);
            if (hasIncorrectNames || missingDesignStock) {
                console.log('🧹 Limpiando localStorage con datos obsoletos...');
                localStorage.removeItem('avenidaProducts');
                localStorage.removeItem('avenidaAdminProducts');
                return; // No cargar datos corruptos
            }
        } catch (e) {
            console.log('🧹 Limpiando localStorage corrupto...');
            localStorage.removeItem('avenidaProducts');
            localStorage.removeItem('avenidaAdminProducts');
            return;
        }
    }

    const savedProductsClean = localStorage.getItem('avenidaProducts');
    if (savedProductsClean) {
        const parsedProducts = JSON.parse(savedProductsClean);
        // Actualizar solo el stock, NUNCA el nombre - mantener el resto de la información original
        window.products.forEach(product => {
            const savedProduct = parsedProducts.find(p => p.id === product.id);
            if (savedProduct && savedProduct.stock) {
                // Solo actualizar stock si el valor guardado es mayor que 0
                Object.keys(product.stock).forEach(size => {
                    if (savedProduct.stock[size] !== undefined && savedProduct.stock[size] > 0) {
                        product.stock[size] = savedProduct.stock[size];
                    }
                });

                // NUNCA actualizar el nombre desde localStorage - mantener el nombre local correcto
                const originalName = product.name;
                if (savedProduct.name && savedProduct.name !== originalName) {
                    console.log(`⚠️ localStorage tiene nombre diferente '${savedProduct.name}', IGNORANDO y usando nombre local: "${originalName}"`);
                }

                // FORZAR el nombre local correcto, ignorando cualquier cosa guardada
                product.name = originalName;
            }
        });
    }

    // Verificar que el stock esté correcto
    console.log('📦 DESPUÉS de cargar - Productos:', window.products.map(p => ({
        id: p.id,
        name: p.name,
        hasImages: !!p.images,
        imagesLength: p.images ? p.images.length : 'undefined',
        stock: p.stock
    })));
}

// Función para obtener tallas disponibles con stock
function getAvailableSizesWithStock(productId) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return [];

    // Usar directamente el array de tallas disponibles
    return product.availableSizes.filter(size => product.stock[size] > 0);
}

// Función para verificar si una talla específica está disponible
function isSizeAvailable(productId, size, design = null) {
    const stock = checkStock(productId, size, design);
    const isAvailable = stock > 0;
    console.log(`🔍 Talla ${size} disponible para producto ${productId}: ${isAvailable} (stock: ${stock})`);
    return isAvailable;
}

// Exponer funciones para uso global
window.checkStock = checkStock;
window.updateStock = updateStock;
window.reduceStock = reduceStock;
window.restoreStock = restoreStock;
window.getProductStockStatus = getProductStockStatus;
window.getAvailableSizesWithStock = getAvailableSizesWithStock;
window.isSizeAvailable = isSizeAvailable;

// Proteger window.products de modificaciones accidentales
console.log('🛡️ Protegiendo window.products...');
console.log('📦 Estado final de window.products:', window.products.map(p => ({
    id: p.id,
    name: p.name,
    hasImages: !!p.images,
    imagesLength: p.images ? p.images.length : 'undefined'
})));

// Función para completar el checkout con Firebase
async function completeCheckoutWithFirebase(customerData, cart) {
    console.log('🚀 completeCheckoutWithFirebase ejecutándose...');

    try {
        // Generar ID único del pedido
        const orderId = 'AVD-' + Date.now();

        // Calcular total
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 1;
            return sum + (price * quantity);
        }, 0);

        // Preparar detalles del pedido
        const orderDetails = {
            orderId,
            items: cart,
            total,
            date: new Date().toISOString()
        };

        console.log('📋 Datos del pedido preparados:', orderDetails);

        // ENVIAR EMAILS DE CONFIRMACIÓN
        console.log('📧 Enviando emails de confirmación...');
        const emailResult = await window.sendOrderConfirmationEmails(customerData, orderDetails);

        if (emailResult.success) {
            console.log('✅ Emails enviados exitosamente');
            console.log('🔐 Código de confirmación:', emailResult.confirmationCode);

            // Guardar pedido en Firebase (si está disponible)
            if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.db) {
                try {
                    await window.firebaseAuth.db.collection('orders').doc(orderId).set({
                        ...customerData,
                        ...orderDetails,
                        confirmationCode: emailResult.confirmationCode,
                        status: 'pending',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                    console.log('✅ Pedido guardado en Firebase');
                } catch (firebaseError) {
                    console.warn('⚠️ Error al guardar en Firebase, pero emails enviados:', firebaseError);
                }
            }
            // Vaciar el carrito tras compra exitosa
            localStorage.removeItem('avenidaCart');
            window.cart = [];
            console.log('🗑️ Carrito vaciado exitosamente tras completar la compra');

            return {
                success: true,
                orderId: orderId,
                confirmationCode: emailResult.confirmationCode,
                total: total
            };
        } else {
            throw new Error(emailResult.error || 'Error al enviar emails');
        }

    } catch (error) {
        console.error('❌ Error en completeCheckoutWithFirebase:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Exponer la función globalmente
window.completeCheckoutWithFirebase = completeCheckoutWithFirebase;

// Esperar a que Firebase esté disponible antes de inicializar
function waitForFirebaseAndInit() {
    const maxAttempts = 50;
    let attempts = 0;
    const interval = setInterval(() => {
        const hasFirebase = typeof firebase !== 'undefined' && firebase.auth;
        const hasWrapper = window.firebaseAuth && typeof window.firebaseAuth.onAuthStateChanged === 'function';
        if (hasFirebase || hasWrapper) {
            clearInterval(interval);
            loadProductsFromLocalStorage(); // Cargar stock guardado
            initApp();
        } else if (++attempts >= maxAttempts) {
            clearInterval(interval);
            console.warn('Firebase no disponible, iniciando sin autenticación');
            loadProductsFromLocalStorage(); // Cargar stock guardado
            initApp();
        }
    }, 100);
}

// Verificación inicial de productos
function initialProductCheck() {
    console.log('🔍 Verificación inicial de productos...');

    const productGrid = document.getElementById('product-grid');
    if (!productGrid) {
        console.warn('⚠️ Elemento product-grid no encontrado');
        return;
    }

    if (!window.products || window.products.length === 0) {
        console.warn('⚠️ window.products no disponible');
        return;
    }

    console.log('✅ Verificación inicial exitosa');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForFirebaseAndInit);
} else {
    waitForFirebaseAndInit();
}

// Función para abrir el modal de registro
function openRegisterModal() {
    const registerModal = document.getElementById('register-modal');
    if (registerModal) {
        registerModal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
}
window.openRegisterModal = openRegisterModal;

// Función para cambiar los formularios
function toggleAuthForms() {
    if (typeof showToast === 'function') {
        showToast('El inicio de sesión directo se encuentra temporalmente en mantenimiento.', 'info');
    } else {
        alert('Funcionalidad en desarrollo.');
    }
}
window.toggleAuthForms = toggleAuthForms;

// Configurar el botón de logout
document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    // LISTENER PARA EL FORMULARIO DE COMUNIDAD (INDEX)
    const newsletterFormMain = document.getElementById('newsletter-form-main');
    if (newsletterFormMain) {
        newsletterFormMain.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('🚀 Enviando formulario de comunidad...');

            const submitBtn = document.getElementById('newsletter-submit-main');
            const nameInput = document.getElementById('newsletter-name-main');
            const emailInput = document.getElementById('newsletter-email-main');

            if (!nameInput || !emailInput || !submitBtn) return;

            const name = nameInput.value;
            const email = emailInput.value;
            const originalText = submitBtn.textContent;

            try {
                submitBtn.textContent = 'ENVIANDO...';
                submitBtn.disabled = true;

                if (typeof window.firebaseAuth !== 'undefined' && window.firebaseAuth.db) {
                    await window.firebaseAuth.db.collection('newsletter').add({
                        name: name,
                        email: email,
                        source: 'comunidad_avenida',
                        date: new Date()
                    });

                    console.log('✅ Usuario registrado en comunidad');
                    if (typeof showToast === 'function') {
                        showToast('¡Bienvenido a la Comunidad Avenida!', 'success');
                    } else {
                        alert('¡Bienvenido! Ya eres parte de la Comunidad Avenida.');
                    }
                    newsletterFormMain.reset();
                } else {
                    throw new Error('Firebase no conectado');
                }
            } catch (error) {
                console.error('Error:', error);
                if (typeof showToast === 'function') {
                    showToast('Error al unirse. Inténtalo de nuevo.', 'error');
                } else {
                    alert('Hubo un error. Inténtalo de nuevo.');
                }
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// EASTER EGG LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const eeBtn = document.getElementById('ee-btn');
    const eeWrapper = document.getElementById('ee-zipper-wrapper');
    const canvas = document.getElementById('ee-zipper-canvas');
    const portalBtn = document.getElementById('ee-portal-btn');
    
    let overscrollAmount = 0;
    let isPopped = false;
    let startY = 0;

    if (!sidebar || !eeBtn) return;

    // Canvas & Frame Sequence setup
    const totalFrames = 120;
    const frames = [];
    let loadedCount = 0;
    let ctx = null;

    if (canvas) {
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        preloadFrames();
    }

    function resizeCanvas() {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        // Redraw current frame if already popped
        if (isPopped) {
            let progress = (overscrollAmount - 2500) / 2500;
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;
            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            drawFrame(frameIndex);
        }
    }

    function preloadFrames() {
        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `AP/cierre-frames/frame_${frameNum}.png?v=5`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames && !isPopped) {
                    drawFrame(0);
                }
            };
            img.onerror = () => {
                console.warn(`Could not load frame_${frameNum}.png. Run extract_frames.py once your video is in the project folder!`);
            };
            frames.push(img);
        }
    }

    function drawFrame(index) {
        if (!ctx || !canvas) return;
        const img = frames[index];
        if (!img || !img.complete || img.naturalWidth === 0) {
            // Find nearest loaded frame to prevent flickering
            let fallbackImg = null;
            for (let offset = 1; offset < totalFrames; offset++) {
                if (index - offset >= 0 && frames[index - offset].complete && frames[index - offset].naturalWidth > 0) {
                    fallbackImg = frames[index - offset];
                    break;
                }
                if (index + offset < totalFrames && frames[index + offset].complete && frames[index + offset].naturalWidth > 0) {
                    fallbackImg = frames[index + offset];
                    break;
                }
            }
            if (fallbackImg) {
                renderImage(fallbackImg);
            }
            return;
        }
        renderImage(img);
    }

    function renderImage(img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        // Match exactly the canvas width to occupy the full sidebar width without aggressive zoom
        const ratio = canvasWidth / imgWidth;
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = 0;
        const y = (canvasHeight - newHeight) / 2;
        
        ctx.drawImage(img, x, y, newWidth, newHeight);
    }

    const isAtBottom = () => {
        return sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight < 5;
    };

    const handleOverscroll = (delta) => {
        if (!isAtBottom()) {
            if (overscrollAmount > 0 && !isPopped) {
                overscrollAmount = 0;
                eeBtn.classList.remove('ee-wobble');
            }
            return;
        }

        overscrollAmount += delta;
        if (overscrollAmount < 0) overscrollAmount = 0;

        // Phase 1: Wobble
        if (overscrollAmount > 0 && overscrollAmount < 2500 && !isPopped) {
            eeBtn.classList.add('ee-wobble');
        }

        // Phase 2: Pop off
        if (overscrollAmount >= 2500 && !isPopped) {
            isPopped = true;
            eeBtn.classList.remove('ee-wobble');
            eeBtn.classList.add('ee-pop-off');
            
            const eeContainer = document.getElementById('easter-egg-container');
            if (eeContainer) {
                const containerWidth = eeContainer.clientWidth || 300;
                // Video is 720x1280 (aspect ratio 1.777...)
                const targetHeight = containerWidth * (1280 / 720);
                
                eeContainer.style.height = `${targetHeight}px`;
                eeContainer.style.marginBottom = '0px'; // Remove the purple space below
                
                // CRITICAL FIX: Update canvas intrinsic dimensions immediately so it's not stuck at 80px height
                if (canvas) {
                    const dpr = window.devicePixelRatio || 1;
                    canvas.width = containerWidth * dpr;
                    canvas.height = targetHeight * dpr;
                }
            }
            
            setTimeout(() => {
                if (eeWrapper) {
                    eeWrapper.classList.remove('opacity-0');
                    eeWrapper.classList.remove('pointer-events-none');
                }
                drawFrame(0);
            }, 300);
        }

        // Phase 3: Draw frame sequence
        if (isPopped) {
            let progress = (overscrollAmount - 2500) / 2500;
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            drawFrame(frameIndex);

            // Phase 4: Reveal Portal
            if (portalBtn) {
                const portalContent = document.getElementById('ee-portal-content');
                if (progress >= 0.9) {
                    portalBtn.classList.remove('pointer-events-none');
                    if (portalContent) {
                        portalContent.classList.remove('opacity-0', 'scale-50');
                        portalContent.classList.add('opacity-100', 'scale-100');
                    }
                } else {
                    portalBtn.classList.add('pointer-events-none');
                    if (portalContent) {
                        portalContent.classList.add('opacity-0', 'scale-50');
                        portalContent.classList.remove('opacity-100', 'scale-100');
                    }
                }
            }
        }
    };

    sidebar.addEventListener('wheel', (e) => {
        if (isAtBottom() && e.deltaY > 0) {
            e.preventDefault();
            handleOverscroll(e.deltaY * 0.5);
        } else {
            handleOverscroll(0);
        }
    }, { passive: false });

    sidebar.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    sidebar.addEventListener('touchmove', (e) => {
        if (!startY) return;
        const currentY = e.touches[0].clientY;
        const deltaY = startY - currentY;
        
        if (isAtBottom() && deltaY > 0) {
            e.preventDefault();
            handleOverscroll(deltaY * 0.5);
        } else {
            handleOverscroll(0);
        }
        
        startY = currentY;
    }, { passive: false });
});