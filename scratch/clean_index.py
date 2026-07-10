import os
from bs4 import BeautifulSoup
import re

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# Find all tailwind-config scripts and remove them
configs = soup.find_all("script", id="tailwind-config")
config_script = None
if configs:
    config_script = configs[0] # keep the first one
    for c in configs:
        c.extract()

# Find the tailwind CDN script
tailwind_cdn = None
for s in soup.find_all("script"):
    if s.get("src") and "tailwindcss.com" in s["src"]:
        tailwind_cdn = s
        break

if tailwind_cdn and config_script:
    # Insert config before tailwind CDN
    tailwind_cdn.insert_before(config_script)
    # Ensure plugins are loaded
    tailwind_cdn["src"] = "https://cdn.tailwindcss.com?plugins=forms,container-queries"

# Ensure #maintenance-overlay style is correct
overlay_styles = soup.find_all("style")
for style in overlay_styles:
    if style.string and "background-color: #131313" in style.string:
        style.string = style.string.replace("body {", "#maintenance-overlay {")

with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(soup))
print("Successfully cleaned up index.html")
