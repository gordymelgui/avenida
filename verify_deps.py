# -*- coding: utf-8 -*-
import os, re

def add_deps(filename):
    if not os.path.exists(filename):
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add EmailJS CDN if missing
    if 'cdn.jsdelivr.net/npm/@emailjs/browser' not in content:
        content = content.replace(
            '<!-- Firebase SDK -->',
            '<!-- EmailJS SDK -->\n    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>\n\n    <!-- Firebase SDK -->'
        )
    
    # 2. Add firebase-config.js if missing
    if 'src="firebase-config.js"' not in content:
        content = content.replace(
            '<!-- Firebase SDK -->',
            '<!-- Firebase SDK -->\n    <script src="firebase-config.js"></script>'
        )
    
    # 3. Add script.js if missing (some checkout pages might need it)
    if 'src="script.js"' not in content and 'checkout' in filename:
        content = content.replace(
            '<!-- Firebase SDK -->',
            '<!-- Firebase SDK -->\n    <script src="script.js"></script>'
        )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Verified dependencies in {filename}")

add_deps('checkout.html')
add_deps('checkout-simple.html')
