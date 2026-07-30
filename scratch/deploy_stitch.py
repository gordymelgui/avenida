import os
import shutil
from bs4 import BeautifulSoup

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")
store_path = os.path.join(workspace_dir, "store.html")
code_path = os.path.join(workspace_dir, "stitch_avenida_urban_drop_loader", "code.html")

# 1. Back up index.html to store.html and clean it up
with open(index_path, "r", encoding="utf-8") as f:
    store_soup = BeautifulSoup(f.read(), "html.parser")

overlay = store_soup.find("div", id="maintenance-overlay")
if overlay:
    overlay.decompose() # Remove the messy overlay from the store page

with open(store_path, "w", encoding="utf-8") as f:
    f.write(str(store_soup))

# 2. Copy code.html to index.html and add bypass logic
with open(code_path, "r", encoding="utf-8") as f:
    code_soup = BeautifulSoup(f.read(), "html.parser")

# Replace image paths to point to WEB-drop-julio
images = code_soup.find_all("img")
for img in images:
    src = img.get("src", "")
    if "lh3.googleusercontent.com" in src:
        alt = img.get("alt", "").lower()
        if "logo" in alt:
            img["src"] = "logo/logo blanco.png"
            img["class"] = [c for c in img.get("class", []) if c not in ["invert", "brightness-0"]]
        elif "detail" in alt:
            img["src"] = "WEB-drop-julio/DSC_0753.jpg"
        elif "portrait" in alt:
            img["src"] = "WEB-drop-julio/IMG_6206.jpg"
        elif "warped" in alt:
            img["src"] = "WEB-drop-julio/IMG_6198.jpg"
        else:
            img["src"] = "WEB-drop-julio/IMG_6212.jpg"

# Create a new script for countdown and bypass logic
script_content = """
    // === COUNTDOWN LÓGICA ===
    function updateCountdown() {
        const now = new Date();
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
        const t = endDate - now.getTime();
        
        if (t <= 0) return;
        
        const totalHours = Math.floor(t / 3600000);
        const m = Math.floor((t % 3600000) / 60000);
        const s = Math.floor((t % 60000) / 1000);
        
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (!el) return;
            const str = val.toString().padStart(2, '0');
            if (el.innerText !== str) {
                el.innerText = str;
            }
        };
        
        set('hours', totalHours); set('minutes', m); set('seconds', s);
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // === LÓGICA DE ACCESO (ADMIN) ===
    const SESSION_KEY = "avenida_unlocked_v4";
    
    // Auto bypass for admin via URL or session
    if (window.location.search.includes('admin=true')) {
        sessionStorage.setItem(SESSION_KEY, 'true');
    }

    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        window.location.replace('store.html');
    } else {
        // Secret unlock: click the top AVENIDA logo 5 times
        let clickCount = 0;
        const secretElement = document.querySelector('[data-text="AVENIDA"]');
        if (secretElement) {
            secretElement.addEventListener('click', () => {
                clickCount++;
                if (clickCount >= 5) {
                    sessionStorage.setItem(SESSION_KEY, 'true');
                    window.location.href = 'store.html';
                }
            });
        }
    }
"""

new_script = code_soup.new_tag("script")
new_script.string = script_content
code_soup.body.append(new_script)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(code_soup))

print("Deployed Stitch code as standalone index.html!")
