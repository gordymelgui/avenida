import os
import re

files = [
    'about.html', 'about-fixed.html', 'checkout-simple.html', 'checkout.html', 
    'favorites.html', 'help.html', 'index.html', 'manifiesto.html', 
    'notifications.html', 'payment-confirmation.html', 'privacy.html', 
    'product.html', 'profile.html', 'returns.html', 'settings.html', 
    'terms.html', 'cart.html', 'admin.html'
]

# We are making the logo even smaller on mobile and changing the structure 
# so the left/right sections don't push the logo off-center or overlap.
replacement_html = """<header id="main-header" class="fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto flex justify-between items-center py-2 px-3 md:py-4 md:px-6 h-16 md:h-24">
            
            <!-- Izquierda (Menú y Desktop Links) - flex-1 keeps both sides exactly equal width to center logo -->
            <div class="flex-1 flex items-center justify-start space-x-3 md:space-x-6 z-20">
                <!-- Menú hamburguesa -->
                <button id="menu-toggle" class="icon-link shrink-0">
                    <i class="fas fa-bars text-lg md:text-2xl"></i>
                </button>
                <nav class="hidden md:flex items-center space-x-8">
                    <a href="index.html#product-grid" class="nav-link">Ropa</a>
                </nav>
            </div>

            <!-- Centro (Logo) - Centrado perfecto usando flex-none sin superposición absolute -->
            <div class="flex-none text-center flex items-center justify-center z-10 px-1">
                <a href="index.html" class="logo-link">
                    <span id="header-logo-text" class="text-[14px] sm:text-[16px] md:text-2xl leading-none tracking-normal md:tracking-widest font-black">AVENIDA</span>
                </a>
            </div>

            <!-- Derecha (Botones) - Se limitan los espacios para no chocar -->
            <div class="flex-1 flex items-center justify-end space-x-2 md:space-x-6 z-20">
                <a href="cart.html" class="relative icon-link flex items-center justify-center shrink-0">
                    <i class="fas fa-shopping-cart text-[16px] sm:text-lg md:text-2xl"></i>
                    <span id="cart-count" class="cart-counter hidden lg:flex">0</span>
                </a>
                <!-- Botón de registrarse compacto (limite de ancho en celulares súper chicos) -->
                <button id="register-btn" class="bg-white text-[#8357C5] px-2 py-1 md:px-4 md:py-2 rounded font-semibold hover:bg-gray-100 transition-colors duration-300 text-[9px] sm:text-[11px] md:text-base whitespace-nowrap shrink-0 max-w-[130px] sm:max-w-none overflow-hidden text-ellipsis">
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
