import os
import re

files = [
    'about.html', 'about-fixed.html', 'checkout-simple.html', 'checkout.html', 
    'favorites.html', 'help.html', 'index.html', 'manifiesto.html', 
    'notifications.html', 'payment-confirmation.html', 'privacy.html', 
    'product.html', 'profile.html', 'returns.html', 'settings.html', 
    'terms.html', 'cart.html', 'admin.html'
]

for filepath in files:
    try:
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Busting cache: change style.css?v=X.X to style.css?v=4.3
        new_content = re.sub(r'style\.css\?v=[0-9.]+', 'style.css?v=4.3', content)
        new_content = new_content.replace('href="style.css"', 'href="style.css?v=4.3"')
        
        # Busting cache for script.js
        new_content = re.sub(r'script\.js\?v=[0-9.]+', 'script.js?v=7', new_content)
        new_content = new_content.replace('src="script.js"', 'src="script.js?v=7"')
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Busted cache in {filepath}')
            
    except Exception as e:
        print(f'Skipped {filepath}: {e}')
