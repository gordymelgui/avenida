import os
import re

files = ['checkout-simple.html', 'checkout.html', 'payment-confirmation.html', 'product.html', 'cart.html']

for filepath in files:
    try:
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'rb') as f:
            raw_data = f.read()
            
        # Decode ignoring errors just in case
        content = raw_data.decode('utf-8', errors='ignore')

        # Hard sweep of literally corrupted strings to JS unicode escape (safest default)
        content = content.replace('â,²', '\u20B2')
        content = content.replace('â‚²', '\u20B2')

        # Replace HTML instances with entity
        content = content.replace('₲0', '&#8370;0')
        
        # Replace JS template literals
        content = content.replace('₲${', '\\u20B2${')
        
        # Replace JS regex replacements
        content = content.replace('[₲\s]', '[\\u20B2\s]')
        content = content.replace('/₲/g', '/\\u20B2/g')
        
        # Replace JS simple string assignments
        content = content.replace("'₲0'", "'\\u20B20'")
        content = content.replace("'₲'", "'\\u20B2'")
        content = content.replace("`   Precio despus de limpiar ₲", "`   Precio despus de limpiar \\u20B2")

        # Fallback replacing any remaining lone ₲ just in case
        content = content.replace('₲', '&#8370;')

        # Bust cache to force updates on checkout pages
        content = re.sub(r'style\.css\?v=[0-9.]+', 'style.css?v=5.0', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f'Patched {filepath}')
    except Exception as e:
        print(f'Failed on {filepath}: {e}')
