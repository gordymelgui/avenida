import os
from bs4 import BeautifulSoup

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# 1. Update text from "PRÓXIMO DROP - MAÑANA" to "PRÓXIMO DROP"
h1 = soup.find("h1")
if h1 and h1.string and "PRÓXIMO DROP" in h1.string:
    h1.string = h1.string.replace("PRÓXIMO DROP - MAÑANA", "PRÓXIMO DROP")
    # Also just in case there are whitespace differences:
    h1.string = h1.string.strip().replace(" - MAÑANA", "")

# 2. Remove the countdown
countdown = soup.find("div", id="countdown")
if countdown:
    countdown.decompose()

with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(soup))

print("Successfully updated title and removed countdown.")
