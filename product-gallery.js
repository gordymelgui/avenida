/**
 * PRODUCT GALLERY - Archivo independiente para la galería de imágenes
 * No afecta el código existente, solo maneja la visualización de imágenes
 */

console.log('📁 product-gallery.js: Archivo cargado correctamente');

class ProductGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.images = [];
        this.mainImage = null;
        this.thumbnailContainer = null;
        this.waitAttempts = 0;
        this.maxWaitAttempts = 50; // Máximo 5 segundos de espera (50 * 100ms)
        this.init();
    }

    init() {
        console.log('🖼️ ProductGallery: Inicializando...');
        this.waitForProducts();
    }

    waitForProducts() {
        this.waitAttempts++;
        
        // Esperar a que window.products esté disponible
        if (window.products && window.products.length > 0) {
            console.log('✅ ProductGallery: window.products disponible');
            this.setupGallery();
        } else if (this.waitAttempts < this.maxWaitAttempts) {
            console.log(`⏳ ProductGallery: Esperando window.products... (intento ${this.waitAttempts}/${this.maxWaitAttempts})`);
            setTimeout(() => this.waitForProducts(), 100);
        } else {
            console.error('❌ ProductGallery: Timeout esperando window.products, usando imágenes por defecto');
            this.setupGalleryWithDefaultImages();
        }
    }

    setupGallery() {
        console.log('🎨 ProductGallery: Configurando galería...');
        
        // Obtener ID del producto de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            console.log('❌ ProductGallery: No se encontró ID del producto en la URL');
            return;
        }

        console.log('🔍 ProductGallery: Buscando producto con ID:', productId);
        
        // Buscar el producto en window.products
        const product = window.products.find(p => p.id == productId);
        
        if (!product) {
            console.log('❌ ProductGallery: Producto no encontrado');
            return;
        }

        console.log('✅ ProductGallery: Producto encontrado:', {
            id: product.id,
            name: product.name,
            hasImages: !!product.images,
            imagesLength: product.images ? product.images.length : 'undefined'
        });

        // Determinar qué tipo de jean es basándose en el ID
        let jeanType = 'straight';
        
        // ID 1 = Holgados (Baggy), ID 2 = Rectos (Straight)
        if (productId === '1') {
            jeanType = 'baggy';
        } else if (productId === '2') {
            jeanType = 'straight';
        }
        
        // Cargar imágenes del catálogo en el orden correcto según el tipo
        if (jeanType === 'baggy') {
            // JEANS HOLGADOS - ID 1
            this.images = [
                'catalogo/jeans holgados/portada baggy.png',
                'catalogo/jeans holgados/baggy back.png',
                'catalogo/jeans holgados/avenida baggy modelo1.JPG',
                'catalogo/jeans holgados/avenida baggy modelo2.JPG',
                'catalogo/jeans holgados/avenida baggy modelo3.JPG',
                'catalogo/jeans holgados/avenida baggy modelo4.JPG',
                'catalogo/jeans holgados/baggy tag.png',
                'catalogo/jeans holgados/baggy backtag 2.png'
            ];
        } else {
            // JEANS RECTOS - ID 2
            this.images = [
                'catalogo/jeans rectos/portada straight.png',
                'catalogo/jeans rectos/straight back.png',
                'catalogo/jeans rectos/avenida straight modelo1.JPG',
                'catalogo/jeans rectos/avenida straight modelo2.JPG',
                'catalogo/jeans rectos/avenida straight modelo3.JPG',
                'catalogo/jeans rectos/straight leather tag.png',
                'catalogo/jeans rectos/straight etiqueta.png'
            ];
        }
        
        console.log('🖼️ ProductGallery: Imágenes cargadas:', this.images.length);

        // Configurar elementos de la galería
        this.setupGalleryElements();
        
        // Generar galería
        this.generateGallery();
        
        // Generar indicadores móviles
        this.generateMobileIndicators();
        
        // Configurar eventos
        this.setupEvents();
    }

    setupGalleryElements() {
        // Buscar elementos de la galería
        this.mainImage = document.getElementById('main-product-image');
        this.thumbnailContainer = document.getElementById('thumbnails-list');
        
        if (!this.mainImage) {
            console.log('❌ ProductGallery: No se encontró main-product-image');
        }
        
        if (!this.thumbnailContainer) {
            console.log('❌ ProductGallery: No se encontró thumbnails-list');
        }
    }

    generateGallery() {
        if (!this.thumbnailContainer || this.images.length === 0) {
            return;
        }

        console.log('🎨 ProductGallery: Generando galería con', this.images.length, 'imágenes');
        
        // Limpiar contenedor
        this.thumbnailContainer.innerHTML = '';
        
        // Generar miniaturas
        this.images.forEach((imageSrc, index) => {
            const thumbnail = this.createThumbnail(imageSrc, index);
            this.thumbnailContainer.appendChild(thumbnail);
        });

        // Establecer imagen principal
        if (this.mainImage && this.images.length > 0) {
            this.setMainImage(0);
        }

        console.log('✅ ProductGallery: Galería generada exitosamente');
    }

    generateMobileIndicators() {
        const indicatorsContainer = document.getElementById('mobile-carousel-indicators');
        if (!indicatorsContainer || this.images.length <= 1) {
            return;
        }

        console.log('📱 ProductGallery: Generando indicadores móviles...');
        
        // Limpiar indicadores existentes
        indicatorsContainer.innerHTML = '';
        
        // Generar indicadores
        this.images.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `mobile-carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            
            // Hacer clic en indicador cambia la imagen
            indicator.addEventListener('click', () => {
                this.setMainImage(index);
            });
            
            indicatorsContainer.appendChild(indicator);
        });

        console.log('✅ ProductGallery: Indicadores móviles generados');
    }

    updateMobileIndicators(activeIndex) {
        const indicators = document.querySelectorAll('.mobile-carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    createThumbnail(imageSrc, index) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-container';
        thumbnail.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Imagen ${index + 1}`;
        img.className = `thumbnail w-full h-full object-cover rounded cursor-pointer border-2 transition-all duration-300 ${index === 0 ? 'border-[#8357C5]' : 'border-gray-300'}`;
        
        // Hacer clic en miniatura cambia la imagen principal
        img.addEventListener('click', () => {
            this.setMainImage(index);
        });
        
        thumbnail.appendChild(img);
        
        return thumbnail;
    }

    setMainImage(index) {
        if (index < 0 || index >= this.images.length) {
            return;
        }

        this.currentImageIndex = index;
        
        // Actualizar imagen principal con efecto de fade
        if (this.mainImage) {
            // Aplicar fade out
            this.mainImage.style.opacity = '0.7';
            
            // Cambiar imagen después de un breve delay
            setTimeout(() => {
                this.mainImage.src = this.images[index];
                this.mainImage.alt = `Imagen ${index + 1}`;
                
                // Aplicar fade in
                this.mainImage.style.opacity = '1';
            }, 50);
        }

        // Actualizar miniaturas activas
        const thumbnails = this.thumbnailContainer.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.remove('border-gray-300');
                thumb.classList.add('border-[#8357C5]');
            } else {
                thumb.classList.remove('border-[#8357C5]');
                thumb.classList.add('border-gray-300');
            }
        });

        // Actualizar indicadores móviles
        this.updateMobileIndicators(index);

        console.log('🖼️ ProductGallery: Imagen principal cambiada a índice', index);
    }

    setupEvents() {
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousImage();
            } else if (e.key === 'ArrowRight') {
                this.nextImage();
            }
        });

        // Configurar eventos táctiles para móvil
        this.setupTouchEvents();

        console.log('✅ ProductGallery: Eventos configurados');
    }

    setupGalleryWithDefaultImages() {
        console.log('🎨 ProductGallery: Configurando galería con imágenes por defecto...');
        
        // Obtener ID del producto de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            console.log('❌ ProductGallery: No se encontró ID del producto en la URL');
            return;
        }

        // Determinar qué tipo de jean es basándose en el ID
        let jeanType = 'straight';
        
        // ID 1 = Holgados (Baggy), ID 2 = Rectos (Straight)
        if (productId === '1') {
            jeanType = 'baggy';
        } else if (productId === '2') {
            jeanType = 'straight';
        }
        
        // Cargar imágenes del catálogo en el orden correcto según el tipo
        if (jeanType === 'baggy') {
            // JEANS HOLGADOS - ID 1
            this.images = [
                'catalogo/jeans holgados/portada baggy.png',
                'catalogo/jeans holgados/baggy back.png',
                'catalogo/jeans holgados/avenida baggy modelo1.JPG',
                'catalogo/jeans holgados/avenida baggy modelo2.JPG',
                'catalogo/jeans holgados/avenida baggy modelo3.JPG',
                'catalogo/jeans holgados/avenida baggy modelo4.JPG',
                'catalogo/jeans holgados/baggy tag.png',
                'catalogo/jeans holgados/baggy backtag 2.png'
            ];
        } else {
            // JEANS RECTOS - ID 2
            this.images = [
                'catalogo/jeans rectos/portada straight.png',
                'catalogo/jeans rectos/straight back.png',
                'catalogo/jeans rectos/avenida straight modelo1.JPG',
                'catalogo/jeans rectos/avenida straight modelo2.JPG',
                'catalogo/jeans rectos/avenida straight modelo3.JPG',
                'catalogo/jeans rectos/straight leather tag.png',
                'catalogo/jeans rectos/straight etiqueta.png'
            ];
        }
        
        console.log('🖼️ ProductGallery: Imágenes por defecto cargadas:', this.images.length);

        // Configurar elementos de la galería
        this.setupGalleryElements();
        
        // Generar galería
        this.generateGallery();
        
        // Generar indicadores móviles
        this.generateMobileIndicators();
        
        // Configurar eventos
        this.setupEvents();
    }

    setupTouchEvents() {
        if (!this.mainImage) return;

        let startX = 0;
        let startY = 0;
        let isDragging = false;

        // Eventos táctiles
        this.mainImage.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = false;
        });

        this.mainImage.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);
            
            // Si el movimiento horizontal es mayor que el vertical, es un swipe
            if (diffX > diffY && diffX > 10) {
                isDragging = true;
                e.preventDefault(); // Prevenir scroll
            }
        });

        this.mainImage.addEventListener('touchend', (e) => {
            if (!isDragging || !startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Swipe izquierda (siguiente imagen)
            if (diffX > 50) {
                this.nextImage();
            }
            // Swipe derecha (imagen anterior)
            else if (diffX < -50) {
                this.previousImage();
            }
            
            startX = 0;
            startY = 0;
            isDragging = false;
        });

        console.log('📱 ProductGallery: Eventos táctiles configurados');
    }

    previousImage() {
        console.log('⬅️ previousImage() llamada');
        console.log('📊 Estado actual:', {
            currentIndex: this.currentImageIndex,
            totalImages: this.images.length
        });
        
        const newIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : this.images.length - 1;
        console.log('🎯 Nuevo índice:', newIndex);
        this.setMainImage(newIndex);
    }

    nextImage() {
        console.log('➡️ nextImage() llamada');
        console.log('📊 Estado actual:', {
            currentIndex: this.currentImageIndex,
            totalImages: this.images.length
        });
        
        const newIndex = this.currentImageIndex < this.images.length - 1 ? this.currentImageIndex + 1 : 0;
        console.log('🎯 Nuevo índice:', newIndex);
        this.setMainImage(newIndex);
    }
}

// Función para inicializar la galería de forma robusta
function initializeProductGallery() {
    try {
        console.log('🚀 ProductGallery: Inicializando...');
        window.productGallery = new ProductGallery();
        console.log('✅ ProductGallery: Inicializado correctamente');
    } catch (error) {
        console.error('❌ ProductGallery: Error al inicializar:', error);
        // Reintentar después de un breve delay
        setTimeout(() => {
            try {
                window.productGallery = new ProductGallery();
                console.log('✅ ProductGallery: Inicializado en segundo intento');
            } catch (retryError) {
                console.error('❌ ProductGallery: Error en segundo intento:', retryError);
            }
        }, 1000);
    }
}

// Inicializar galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeProductGallery);

// También inicializar si se carga después del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProductGallery);
} else {
    console.log('🚀 ProductGallery: DOM ya listo, inicializando...');
    initializeProductGallery();
}

// Funciones globales para los botones del HTML
window.changeImage = function(direction) {
    try {
        console.log('🔄 changeImage llamada con dirección:', direction);
        console.log('🔍 window.productGallery disponible:', !!window.productGallery);
        
        if (window.productGallery) {
            if (direction === -1) {
                console.log('⬅️ Navegando a imagen anterior');
                window.productGallery.previousImage();
            } else if (direction === 1) {
                console.log('➡️ Navegando a imagen siguiente');
                window.productGallery.nextImage();
            }
        } else {
            console.error('❌ window.productGallery no está disponible, intentando inicializar...');
            // Intentar inicializar si no está disponible
            initializeProductGallery();
        }
    } catch (error) {
        console.error('❌ Error en changeImage:', error);
    }
};

// Hacer la instancia global para acceso desde HTML
window.productGallery = null;

// Función de fallback para asegurar que changeImage esté disponible
function ensureChangeImageFunction() {
    if (!window.changeImage) {
        console.log('⚠️ changeImage no está disponible, creando función de fallback');
        window.changeImage = function(direction) {
            console.log('🔄 changeImage (fallback) llamada con dirección:', direction);
            if (window.productGallery) {
                if (direction === -1) {
                    window.productGallery.previousImage();
                } else if (direction === 1) {
                    window.productGallery.nextImage();
                }
            } else {
                console.error('❌ window.productGallery no está disponible en fallback');
            }
        };
    }
}

// Asegurar que la función esté disponible inmediatamente
ensureChangeImageFunction();

console.log('📁 product-gallery.js: Fin del archivo alcanzado');
