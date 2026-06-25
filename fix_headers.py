import os
import re

files = [
    'about.html', 'about-fixed.html', 'checkout-simple.html', 'checkout.html', 
    'favorites.html', 'help.html', 'index.html', 'manifiesto.html', 
    'notifications.html', 'payment-confirmation.html', 'privacy.html', 
    'product.html', 'profile.html', 'returns.html', 'settings.html', 
    'terms.html', 'cart.html', 'admin.html'
]

replacement_html = """<header id="main-header" class="fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto flex justify-between items-center py-4 px-4 md:px-6 relative h-20 md:h-24">
            
            <!-- Izquierda (Menú y Desktop Links) -->
            <div class="flex items-center space-x-4 md:space-x-6 flex-1 justify-start">
                <!-- Menú hamburguesa -->
                <button id="menu-toggle" class="icon-link">
                    <i class="fas fa-bars text-xl md:text-2xl"></i>
                </button>
                <nav class="hidden md:flex items-center space-x-8">
                    <a href="index.html#product-grid" class="nav-link">Ropa</a>
                </nav>
            </div>

            <!-- Centro (Logo) - Absoluto en Desktop, Flex en Mobile -->
            <div class="flex-none flex justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-24 sm:w-auto">
                <a href="index.html" class="logo-link"><span id="header-logo-text" class="text-xl md:text-2xl leading-none">AVENIDA</span></a>
            </div>

            <!-- Derecha (Botones) -->
            <div class="flex items-center space-x-3 md:space-x-6 flex-1 justify-end z-20">
                <a href="cart.html" class="relative icon-link">
                    <i class="fas fa-shopping-cart text-xl md:text-2xl"></i>
                    <span id="cart-count" class="cart-counter hidden lg:flex">0</span>
                </a>
                <!-- Botón de registrarse -->
                <button id="register-btn" class="bg-white text-[#8357C5] px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-[10px] sm:text-xs md:text-base whitespace-nowrap">
                    Registrarse
                </button>
            </div>

        </div>
    </header>"""

# Using regex to find <header id="main-header" ...> ... </header>
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
