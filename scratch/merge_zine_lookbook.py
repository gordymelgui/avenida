import re
import os

shop_path = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\shop.html"
css_path = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\style.css"

with open(shop_path, 'r', encoding='utf-8') as f:
    shop_content = f.read()

# 1. New HTML for the Zine Lookbook
# I'm using vanilla CSS classes instead of Tailwind.
new_html = '''        <!-- ======================= SECCIÓN LOOKBOOK ZINE ======================= -->
        <section id="zine-lookbook-section" class="zine-container container mx-auto py-20 px-6 relative">
            <div class="zine-grid relative z-10">
                <!-- Zine Image 1 -->
                <div class="zine-item item-1 group tape-effect zine-rotate-minus-1">
                    <div class="zine-photo-card shadow-xl relative">
                        <img src="catalogo/camisas/cami A portada principal.png" alt="Camisa AVDA" class="zine-img zine-grayscale">
                        <div class="zine-label zine-label-left">>> VOL. 1 / CALLE</div>
                    </div>
                </div>

                <!-- Text Block -->
                <div class="zine-item item-text flex-col justify-center zine-rotate-2">
                    <div class="zine-text-box border-4 border-industrial-purple bg-background sticker-slap">
                        <span class="zine-manifesto-badge">[MANIFIESTO]</span>
                        <h3 class="zine-title">CULTURA<br>ASFALTO</h3>
                        <p class="zine-paragraph border-l-4 border-industrial-purple pl-4">
                            TEXTILES CRUDOS. DISEÑO PARA EL CEMENTO. RESISTENCIA URBANA. INSPIRADO EN LAS CALLES DE LOS 90S, REINVENTADO PARA EL MAÑANA.
                        </p>
                    </div>
                </div>

                <!-- Zine Image 2 -->
                <div class="zine-item item-2 group tape-effect tape-effect-alt zine-rotate-1 zine-mt-mobile">
                    <div class="zine-photo-card shadow-xl relative">
                        <img src="catalogo/jorts/jort denim portada principal.png" alt="Jort AVDA" class="zine-img zine-grayscale">
                        <div class="zine-label zine-label-right">002 // GRIT</div>
                    </div>
                </div>

                <!-- Zine Image 3 -->
                <div class="zine-item item-3 group tape-effect zine-rotate-minus-2 zine-mt-large">
                    <div class="zine-photo-card shadow-xl relative">
                        <img src="catalogo/jeans holgados/portada baggy.png" alt="Baggy AVDA" class="zine-img zine-grayscale">
                        <div class="zine-label zine-label-left">DETALLE_TX</div>
                        <div class="zine-slap-badge zine-rotate-12">100% RAW</div>
                    </div>
                </div>
            </div>
        </section>
'''

# Find the old lookbook section and replace it
# The old lookbook starts with <!-- ======================= SECCIÓN LOOKBOOK ======================= -->
# and ends right before <!-- ======================= FOOTER ======================= -->
# Let's use regex to replace everything between them.
old_lookbook_regex = r"<!-- ======================= SECCIÓN LOOKBOOK ======================= -->.*?((?=<!-- ======================= FOOTER ======================= -->)|(?=</body))"

shop_content = re.sub(old_lookbook_regex, new_html, shop_content, flags=re.DOTALL)

with open(shop_path, 'w', encoding='utf-8') as f:
    f.write(shop_content)

# 2. Add the custom CSS to style.css
custom_css = '''
/* ======================= ZINE LOOKBOOK ======================= */
.zine-container { max-width: 1400px; }
.zine-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}
@media (min-width: 768px) {
    .zine-grid {
        grid-template-columns: repeat(12, 1fr);
        gap: 3rem;
    }
    .zine-item.item-1 { grid-column: span 7 / span 7; }
    .zine-item.item-text { grid-column: span 5 / span 5; }
    .zine-item.item-2 { grid-column: span 6 / span 6; }
    .zine-item.item-3 { grid-column: span 6 / span 6; }
    .zine-mt-mobile { margin-top: 0; }
    .zine-mt-large { margin-top: 6rem; }
}
@media (max-width: 767px) {
    .zine-mt-mobile { margin-top: 3rem; }
    .zine-mt-large { margin-top: 3rem; }
}

.tape-effect { position: relative; }
.tape-effect::before {
    content: ''; position: absolute; top: -10px; left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    width: 120px; height: 30px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    z-index: 20; mix-blend-mode: screen;
}
.tape-effect-alt::after {
    content: ''; position: absolute; bottom: -15px; right: -10px;
    transform: rotate(45deg);
    width: 80px; height: 25px;
    background-color: rgba(200, 200, 200, 0.3);
    z-index: 20;
}

.sticker-slap {
    transform: rotate(-3deg);
    box-shadow: 2px 2px 0px #000;
    border: 2px solid #e5e2e1;
    background-color: #131313;
    color: #e5e2e1;
}
.zine-slap-badge {
    position: absolute; right: -1.5rem; bottom: -1.5rem;
    background-color: #8357C5; color: #131313;
    padding: 0.5rem 1rem; border: 2px solid #131313;
    box-shadow: 3px 3px 0px #131313;
    font-family: 'Anton', sans-serif; font-size: 1.5rem; z-index: 30;
}

.zine-rotate-minus-1 { transform: rotate(-1deg); transition: transform 0.3s; }
.zine-rotate-minus-1:hover { transform: rotate(0); }
.zine-rotate-1 { transform: rotate(1deg); transition: transform 0.3s; }
.zine-rotate-1:hover { transform: rotate(0); }
.zine-rotate-minus-2 { transform: rotate(-2deg); transition: transform 0.3s; }
.zine-rotate-minus-2:hover { transform: rotate(0); }
.zine-rotate-2 { transform: rotate(2deg); }
.zine-rotate-12 { transform: rotate(12deg); }

.zine-photo-card {
    border: 8px solid white; background-color: white;
    padding: 0.5rem; padding-bottom: 3rem;
}
.zine-img {
    width: 100%; height: auto; object-fit: cover;
}
.zine-grayscale {
    filter: grayscale(100%) contrast(1.25);
}

.zine-label {
    position: absolute; bottom: 1rem; z-index: 20;
    font-family: 'Space Mono', monospace; font-size: 0.875rem;
    text-transform: uppercase; color: black; font-weight: bold;
}
.zine-label-left { left: 1rem; }
.zine-label-right { right: 1rem; }

.zine-text-box { padding: 2rem; }
.zine-manifesto-badge {
    color: #8357C5; background-color: rgba(131, 87, 197, 0.2);
    padding: 0.25rem 0.5rem; font-family: 'Space Mono', monospace;
    font-size: 0.875rem; display: inline-block; margin-bottom: 0.5rem;
}
.zine-title {
    font-family: 'Anton', sans-serif; font-size: 2.25rem;
    text-transform: uppercase; margin: 1rem 0; color: white;
    text-shadow: 2px 2px 0 #8357C5; line-height: 1;
}
.zine-paragraph {
    font-family: 'Space Mono', monospace; color: #cfc4c5;
    line-height: 1.6; border-left: 4px solid #8357C5; padding-left: 1rem;
}
'''

with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

if "ZINE LOOKBOOK" not in css_content:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(custom_css)

print("Lookbook replaced and styles injected successfully!")
