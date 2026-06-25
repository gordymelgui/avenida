# -*- coding: utf-8 -*-
import os, re

def fix_script(filename):
    if not os.path.exists(filename):
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update year 25/2025 to 26/2026 in names and copyright
    content = content.replace("AVDA '25", "AVDA '26")
    content = content.replace("COLECCIÓN 2025", "COLECCIÓN 2026")
    
    # 2. Fix product names specifically as requested
    content = content.replace("JEANS DE VESTIR AVDA '26", "Capri AVDA '26")
    # Add other name fixes if needed
    
    # 3. Fix maintenance redirect logic to handle query params
    content = re.sub(
        r'const page = path\.split\("/"\)\.pop\(\);',
        r'const page = path.split("/").pop().split("?")[0];',
        content
    )
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filename}")

fix_script('script.js')
fix_script('admin-panel.js')

# Also fix HTMLs again for names just in case
for filename in ['index.html', 'cart.html', 'checkout.html', 'product.html']:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace("AVDA '25", "AVDA '26")
        content = content.replace("JEANS DE VESTIR AVDA '26", "Capri AVDA '26")
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Update names in {filename}")
