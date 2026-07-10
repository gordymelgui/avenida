import os
from bs4 import BeautifulSoup

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")
code_path = os.path.join(workspace_dir, "stitch_avenida_urban_drop_loader", "code.html")

with open(index_path, "r", encoding="utf-8") as f:
    index_soup = BeautifulSoup(f.read(), "html.parser")

with open(code_path, "r", encoding="utf-8") as f:
    stitch_soup = BeautifulSoup(f.read(), "html.parser")

# 1. Clear old maintenance-overlay contents
overlay = index_soup.find("div", id="maintenance-overlay")
if overlay:
    overlay.clear()
    stitch_body = stitch_soup.find("body")
    overlay["class"] = stitch_body.get("class", []) + ["fixed", "inset-0", "z-[9999]", "overflow-y-auto"]

    # 2. Copy styles from stitch head, modifying body { to #maintenance-overlay {
    stitch_styles = stitch_soup.find("head").find_all("style")
    for style in stitch_styles:
        if style.string:
            style.string = style.string.replace("body {", "#maintenance-overlay {")
        overlay.append(style)

    # 3. Copy body content (except countdown script)
    for child in stitch_body.children:
        if child.name == "script" and child.string and "updateCountdown" in child.string:
            continue
        overlay.append(child)

    # 4. Fix image paths
    images = overlay.find_all("img")
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

# 5. Fix Tailwind config: move to <head> before the CDN script
tailwind_script = stitch_soup.find("script", id="tailwind-config")
if tailwind_script:
    # Remove any existing tailwind-config from index
    for existing in index_soup.find_all("script", id="tailwind-config"):
        existing.extract()
    
    # Find the CDN script
    cdn_script = None
    for s in index_soup.find_all("script"):
        if s.get("src") and "tailwindcss.com" in s["src"]:
            cdn_script = s
            # ensure plugins are present
            s["src"] = "https://cdn.tailwindcss.com?plugins=forms,container-queries"
            break
            
    if cdn_script:
        cdn_script.insert_before(tailwind_script)
    else:
        # If CDN script is missing, add both to head
        head = index_soup.find("head")
        if head:
            head.append(tailwind_script)
            new_cdn = index_soup.new_tag("script", src="https://cdn.tailwindcss.com?plugins=forms,container-queries")
            head.append(new_cdn)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(index_soup))

print("Restored Stitch overlay and fixed Tailwind loading!")
