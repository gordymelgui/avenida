import os

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
files = [f for f in os.listdir(workspace_dir) if f.lower().endswith('.html')]

# We do NOT want to modify index.html or shop.html with these simple global replacements.
# index.html has specific redirect links.
# shop.html retains its local hash links.
excluded_files = ['index.html', 'shop.html']

replacements = {
    'href="index.html#product-grid"': 'href="shop.html"',
    'href="index.html#lookbook-section"': 'href="shop.html#lookbook-section"',
    'href="index.html#productos"': 'href="shop.html"',
    'href="#productos"': 'href="shop.html"',
}

print("Updating HTML links...")
for f in files:
    if f in excluded_files:
        continue
    
    file_path = os.path.join(workspace_dir, f)
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        modified = False
        for old, new in replacements.items():
            if old in content:
                content = content.replace(old, new)
                print(f"Replaced '{old}' with '{new}' in {f}")
                modified = True
                
        if modified:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
                
    except Exception as e:
        print(f"Error updating {f}: {e}")
