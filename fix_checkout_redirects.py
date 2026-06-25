# -*- coding: utf-8 -*-
import os, re

files_to_fix = ['checkout.html', 'checkout-simple.html']

for filename in files_to_fix:
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Remove maintenance redirect
    new_content = re.sub(r'<!-- MODO MANTENIMIENTO -->\s*<script>.*?</script>', '', content, flags=re.DOTALL)
    
    # 2. Fix year 2025 to 2026
    new_content = re.sub(r'(Copyright|&copy;|©)\s*2025', r'\g<1> 2026', new_content)
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filename}")
    else:
        print(f"No changes needed for {filename}")
