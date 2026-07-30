import re

shop_path = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\shop.html"
css_path = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\style.css"

with open(shop_path, 'r', encoding='utf-8') as f:
    shop_content = f.read()

# Replace the transparent PNGs with the actual lifestyle photos from WEB-drop-julio
shop_content = shop_content.replace('catalogo/camisas/cami A portada principal.png', 'WEB-drop-julio/IMG_6181.jpg')
shop_content = shop_content.replace('catalogo/jorts/jort denim portada principal.png', 'WEB-drop-julio/IMG_6190.jpg')
shop_content = shop_content.replace('catalogo/jeans holgados/portada baggy.png', 'WEB-drop-julio/IMG_6204.jpg')

# Add the dark street background to the zine lookbook section directly in HTML (using style or adding classes)
# Since shop.html uses tailwind, we can add some inline styles or classes, but it's better to update the CSS.
with open(shop_path, 'w', encoding='utf-8') as f:
    f.write(shop_content)

# Update style.css to give .zine-container a dark background
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# We need to add background to the zine section to override the purple body
old_css_class = ".zine-container { max-width: 1400px; }"
new_css_class = """.zine-lookbook-wrapper {
    background-color: #131313;
    background-image: url("https://www.transparenttextures.com/patterns/stucco.png");
    width: 100%;
    margin-top: 4rem;
    border-top: 4px solid #8357C5;
    border-bottom: 4px solid #8357C5;
}
.zine-container { max-width: 1400px; padding-top: 5rem; padding-bottom: 5rem; }
"""
if old_css_class in css_content:
    css_content = css_content.replace(old_css_class, new_css_class)
else:
    # If not found, just append
    css_content += "\n" + new_css_class

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Images replaced and lookbook background fixed.")
