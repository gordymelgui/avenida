import os
from bs4 import BeautifulSoup
import re

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# 1. Inject @font-face into the <style> tag
font_face_rule = """
@font-face {
    font-family: 'Rip Regular';
    src: url('./rip-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
}
"""
style_tag = soup.find("style")
if style_tag:
    style_tag.string = font_face_rule + style_tag.string

# 2. Add "font-rip" to tailwind-config fontFamily
config_script = soup.find("script", id="tailwind-config")
if config_script:
    # Let's replace the fontFamily definition in the text
    config_text = config_script.string
    # We look for "fontFamily": {
    font_family_target = '"fontFamily": {'
    font_family_replacement = '"fontFamily": {\n                        "font-rip": ["\'Rip Regular\'", "sans-serif"],'
    if font_family_target in config_text:
        config_text = config_text.replace(font_family_target, font_family_replacement)
        config_script.string = config_text

# 3. Update the Header logo to use the Rip font
header_logo = soup.find("div", class_=re.compile(r"glitch-text"))
if header_logo:
    # Replace font-display-xl with font-rip
    classes = header_logo.get("class", [])
    if "font-display-xl" in classes:
        classes = [c for c in classes if c != "font-display-xl"] + ["font-rip"]
    header_logo["class"] = classes

# 4. Remove the big logo image in the main hero section
main_logo_container = soup.find("img", alt="AVENIDA Industrial Logo")
if main_logo_container:
    # The parent has tape-effect etc, let's find the container parent
    parent_container = main_logo_container.find_parent("div", class_=re.compile(r"tape-effect"))
    if parent_container:
        parent_container.decompose()
    else:
        main_logo_container.decompose()

# 5. Change "PRÓXIMO DROP" h1 to "CARGANDO..." with font-rip
h1_title = soup.find("h1")
if h1_title:
    h1_title.string = "CARGANDO..."
    classes = h1_title.get("class", [])
    # Change font family class
    classes = [c for c in classes if c != "font-display-xl"] + ["font-rip"]
    # We can also increase the text sizes a bit
    classes = [c for c in classes if c != "text-5xl" and c != "md:text-8xl"] + ["text-6xl", "md:text-9xl"]
    h1_title["class"] = classes

# 6. Save modifications
with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(soup))

print("Successfully updated typography and layout!")
