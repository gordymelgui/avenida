import os
from bs4 import BeautifulSoup
import re

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# Fix 1: Move tailwind config before Tailwind CDN script
tailwind_config_match = re.search(r'<script id="tailwind-config">.*?</script>', html, flags=re.DOTALL)
if tailwind_config_match:
    tailwind_config_str = tailwind_config_match.group(0)
    # Remove it from its current place
    html = html.replace(tailwind_config_str, "")
    # Insert it before the tailwind cdn script
    cdn_script = '<script src="https://cdn.tailwindcss.com"></script>'
    html = html.replace(cdn_script, tailwind_config_str + "\n" + cdn_script)

# Fix 2: Also add the tailwind plugins that Stitch used, because we replaced the CDN link in code.html but index.html had the old one without plugins.
html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>')

# Fix 3: Change `body {` to `#maintenance-overlay {` in the injected style block
# The injected style block has `body {\n            background-color: #131313;`
html = html.replace('body {\n            background-color: #131313;', '#maintenance-overlay {\n            background-color: #131313;')
html = html.replace('body {', '#maintenance-overlay {')

# Let's be safer and just replace the exact block if possible, but the above string replace should work.
# Wait, there might be other `body {` in style.css, but we are only replacing in index.html, where it shouldn't have other `body {` unless it's in the old styles.
# Let's check if there are other `body {` in index.html.

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Fixed tailwind config order and background styles.")
