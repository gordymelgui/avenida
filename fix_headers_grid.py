import os
import re

files = [
    'about.html', 'about-fixed.html', 'checkout-simple.html', 'checkout.html', 
    'favorites.html', 'help.html', 'index.html', 'manifiesto.html', 
    'notifications.html', 'payment-confirmation.html', 'privacy.html', 
    'product.html', 'profile.html', 'returns.html', 'settings.html', 
    'terms.html', 'cart.html', 'admin.html'
]

# We are switching from Flexbox with Absolute positioning to CSS Grid.
# grid-cols-3 ensures the screen is divided into 3 safe zones. They cannot overlap.
replacement_html = """<header id="main-header" class="fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto px-3 sm:px-4 md:px-6 h-16 md:h-24 grid grid-cols-3 items-center">
            
            <!-- Izquierda (Menú) -->
            <div class="flex justify-start items-center">
                <button id="menu-toggle" class="icon-link">
                    <i class="fas fa-bars text-lg md:text-2xl"></i>
                </button>
                <nav class="hidden md:flex items-center space-x-8 ml-6">
                    <a href="index.html#product-grid" class="nav-link">Ropa</a>
                </nav>
            </div>

            <!-- Centro (Logo) - Contenido dentro de su propio tercio del grid -->
            <div class="flex justify-center items-center w-full overflow-hidden">
                <a href="index.html" class="logo-link">
                    <!-- Tamaño dinámico hiper-ajustado -->
                    <span id="header-logo-text" class="text-[12px] min-[370px]:text-[14px] sm:text-base md:text-2xl leading-none font-black truncate">AVENIDA</span>
                </a>
            </div>

            <!-- Derecha (Botones) -->
            <div class="flex justify-end items-center space-x-2 sm:space-x-4 md:space-x-6">
                <a href="cart.html" class="relative icon-link flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-shopping-cart text-sm sm:text-base md:text-2xl"></i>
                    <span id="cart-count" class="cart-counter hidden lg:flex">0</span>
                </a>
                <!-- Botón de registrarse compacto -->
                <button id="register-btn" class="bg-white text-[#8357C5] px-2 py-1 md:px-4 md:py-2 rounded font-semibold hover:bg-gray-100 transition-colors duration-300 text-[10px] sm:text-xs md:text-base whitespace-nowrap flex-shrink-0">
                    Registrarse
                </button>
            </div>

        </div>
    </header>"""

pattern = re.compile(r'<header id="main-header"[^>]*>.*?</header>', re.DOTALL)

for filepath in files:
    try:
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content, count = pattern.subn(replacement_html, content)
        
        if count > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Fixed header in {filepath}')
            
    except Exception as e:
        print(f'Skipped {filepath}: {e}')
