import os
from bs4 import BeautifulSoup
import re

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# 1. Update Footer Text
footer_div = soup.find(string=re.compile(r"©2024 AVENIDA DIVISIÓN SKATE"))
if footer_div:
    footer_div.replace_with(footer_div.replace("©2024 AVENIDA DIVISIÓN SKATE", "©2026 AVENIDA"))

# 2. Update Social Links in Footer
for a in soup.find_all("a"):
    if a.string and "INSTAGRAM" in a.string:
        a["href"] = "https://www.instagram.com/aaavenidaaa/"
        a["target"] = "_blank"
    elif a.string and "TIKTOK" in a.string:
        a["href"] = "https://www.tiktok.com/@aaavenidaaa"
        a["target"] = "_blank"
    elif a.string and "WHATSAPP" in a.string:
        a["href"] = "https://wa.me/595982713971"
        a["target"] = "_blank"

# 3. Update Header Texts
for span in soup.find_all("span"):
    if span.string and "002_PRÓXIMO_DROP" in span.string:
        span.string = span.string.replace("002_PRÓXIMO_DROP", "003_PRÓXIMO_DROP")
    elif span.string and "003_ARCHIVO" in span.string:
        span.string = span.string.replace("003_ARCHIVO", "004_ARCHIVO")

# 4. Remove hover/cursor properties from decorative elements
classes_to_remove = ["cursor-pointer", "hover:text-industrial-purple", "hover:scale-125", "hover:bg-white", "transition-colors", "transition-all", "transition-transform"]

# Top Header spans
header = soup.find("header")
if header:
    for span in header.find_all("span"):
        if span.get("class"):
            span["class"] = [c for c in span["class"] if c not in classes_to_remove]
    
    # Also the menu div containing the icon
    for div in header.find_all("div"):
        if div.get("class"):
            div["class"] = [c for c in div["class"] if c not in classes_to_remove]

# Sidebar icons
sidebar = soup.find("div", class_=re.compile(r"SideNavBar|w-16"))
if sidebar:
    for div in sidebar.find_all("div"):
        if div.get("class"):
            div["class"] = [c for c in div["class"] if c not in classes_to_remove]
    for span in sidebar.find_all("span"):
        if span.get("class"):
            span["class"] = [c for c in span["class"] if c not in classes_to_remove]

with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(soup))

print("Successfully applied visual tweaks to index.html")
