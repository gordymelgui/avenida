import re

filepath = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\shop.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the maintenance overlay block
# It starts around <!-- ======================= COMING SOON OVERLAY
# And ends at the script closing tag for LÓGICA DE ACCESO (ADMIN)
pattern = r'<!-- ===+ COMING SOON OVERLAY \(DISEÑO REPLICADO\) ===+ -->.*?// === LÓGICA DE ACCESO \(ADMIN\) ===.*?</script>'

new_content = re.sub(pattern, '', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Removed overlay from shop.html")
