import os
from bs4 import BeautifulSoup
import re

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")
code_path = os.path.join(workspace_dir, "stitch_avenida_urban_drop_loader", "code.html")

with open(index_path, "r", encoding="utf-8") as f:
    index_html = f.read()

with open(code_path, "r", encoding="utf-8") as f:
    stitch_html = f.read()

stitch_soup = BeautifulSoup(stitch_html, "html.parser")
index_soup = BeautifulSoup(index_html, "html.parser")

# 1. Extract tailwind-config script
tailwind_script = stitch_soup.find("script", id="tailwind-config")

# 2. Extract <style> from Stitch head
stitch_styles = stitch_soup.find("head").find_all("style")

# 3. Extract body content from Stitch
stitch_body = stitch_soup.find("body")

# 4. Find maintenance-overlay in index.html
maintenance_overlay = index_soup.find("div", id="maintenance-overlay")

if maintenance_overlay:
    # Clear the old overlay content
    maintenance_overlay.clear()
    
    # Copy classes from stitch body to maintenance-overlay
    # It needs to look like a full screen overlay
    maintenance_overlay["class"] = stitch_body.get("class", []) + ["fixed", "inset-0", "z-[9999]", "overflow-y-auto"]
    # Remove old inline styles so they don't override tailwind
    if "style" in maintenance_overlay.attrs:
        del maintenance_overlay["style"]
        
    # Append the custom style and tailwind config right before the overlay content
    if tailwind_script:
        maintenance_overlay.append(tailwind_script)
    for style in stitch_styles:
        maintenance_overlay.append(style)
        
    # Append the stitch body content
    for child in stitch_body.children:
        if child.name == "script" and "updateCountdown" in child.text:
            continue # Skip the stitch countdown logic, we will modify our existing one
        maintenance_overlay.append(child)

    # 5. Fix Image sources (Replace with WEB-drop-julio images)
    # The stitch HTML uses googleusercontent links. We'll replace them with our local images.
    images = maintenance_overlay.find_all("img")
    for img in images:
        src = img.get("src", "")
        if "lh3.googleusercontent.com" in src:
            alt = img.get("alt", "").lower()
            if "logo" in alt:
                img["src"] = "logo/logo blanco.png"
                img["class"] = [c for c in img.get("class", []) if c not in ["invert", "brightness-0"]]
            elif "detail" in alt:
                img["src"] = "WEB-drop-julio/IMG_6181.jpg"
            elif "portrait" in alt:
                img["src"] = "WEB-drop-julio/IMG_6206.jpg"
            elif "warped" in alt:
                img["src"] = "WEB-drop-julio/IMG_6198.jpg"
            else:
                img["src"] = "WEB-drop-julio/IMG_6212.jpg"

    # Save changes to index.html
    with open(index_path, "w", encoding="utf-8") as f:
        # Use str(index_soup) but we need to format it nicely without breaking anything.
        f.write(str(index_soup))
    print("Successfully merged stitch design into index.html")
else:
    print("Error: Could not find maintenance-overlay in index.html")
