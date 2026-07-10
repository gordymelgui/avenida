import os
from bs4 import BeautifulSoup

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")
code_path = os.path.join(workspace_dir, "stitch_avenida_urban_drop_loader", "code.html")

with open(index_path, "r", encoding="utf-8") as f:
    index_soup = BeautifulSoup(f.read(), "html.parser")

with open(code_path, "r", encoding="utf-8") as f:
    stitch_soup = BeautifulSoup(f.read(), "html.parser")

head = index_soup.find("head")
if head:
    # Get all links from stitch that have fonts
    stitch_links = stitch_soup.find("head").find_all("link")
    for link in stitch_links:
        if "fonts.googleapis.com" in link.get("href", ""):
            # Check if it already exists in index.html to avoid duplicates
            exists = False
            for existing in head.find_all("link"):
                if existing.get("href") == link.get("href"):
                    exists = True
                    break
            if not exists:
                head.append(link)
                
with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(index_soup))

print("Fonts added successfully!")
