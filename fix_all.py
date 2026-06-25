# -*- coding: utf-8 -*-
import sys, re, glob, os

# 1. Update payment-confirmation.html
with open('payment-confirmation.html', 'r', encoding='utf-8') as f:
    text = f.read()

target = '<!-- Scripts de la aplicación -->'
replacement = '''<!-- EmailJS SDK -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

    <!-- Scripts de la aplicación -->
    <script src="firebase-config.js"></script>'''

if target in text:
    text = text.replace(target, replacement)
    
text = text.replace('Pedido Realizado con Ã‰xito', 'Pedido Realizado con Éxito')

with open('payment-confirmation.html', 'w', encoding='utf-8') as f:
    f.write(text)


# 2. Update checkout.html (Remove maintenance script)
with open('checkout.html', 'r', encoding='utf-8') as f:
    text = f.read()

maintenance_script = '''<script>
        // MODO MANTENIMIENTO ACTIVO
        // Redirigir al inicio o mostrar alerta
        // window.location.href = 'index.html';
        console.log("Modo Mantenimiento - Acceso denegado a checkout por seguridad");
    </script>'''

if "window.location.href = 'index.html';" in text:
    text = re.sub(r'<script>\s*// MODO MANTENIMIENTO ACTIVO.*?</script>', '', text, flags=re.DOTALL)

with open('checkout.html', 'w', encoding='utf-8') as f:
    f.write(text)


# 3. Update index.html (Hero video and text)
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('avda.video1.mp4', 'Avda TEASER I CORTE FINAL.mp4')
text = text.replace('COLECCIÃ“N 2025', 'COLECCIÓN 2026')
text = text.replace('COLECCIÓN 2025', 'COLECCIÓN 2026')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)


# 4. Update 2025 to 2026 in all HTMLs
for html_file in glob.glob('*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        file_text = f.read()
        
    modified_text = re.sub(r'(Copyright|&copy;|©)\s*2025', r'\g<1> 2026', file_text)
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(modified_text)

print("All fixes applied.")
