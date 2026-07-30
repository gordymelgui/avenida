import re

shop_path = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\shop.html"

with open(shop_path, 'r', encoding='utf-8') as f:
    shop_content = f.read()

# Wrap the zine-lookbook-section in a zine-lookbook-wrapper div
if 'class="zine-lookbook-wrapper"' not in shop_content:
    old_section = '<section id="zine-lookbook-section" class="zine-container container mx-auto py-20 px-6 relative">'
    new_section = '<div class="zine-lookbook-wrapper">\n        <section id="zine-lookbook-section" class="zine-container container mx-auto py-20 px-6 relative">'
    
    shop_content = shop_content.replace(old_section, new_section)
    
    # Add closing div after the section
    old_section_close = '</section>'
    # We only want to replace the closing section of the lookbook
    # We know the lookbook ends before the footer.
    # Let's use regex to find the lookbook closing tag
    
    # Find the zine lookbook section block
    regex = r'(<div class="zine-lookbook-wrapper">\n\s*<section id="zine-lookbook-section".*?</section>)'
    shop_content = re.sub(regex, r'\1\n        </div>', shop_content, flags=re.DOTALL)
    
with open(shop_path, 'w', encoding='utf-8') as f:
    f.write(shop_content)

print("shop.html wrapper added.")
