import os
from bs4 import BeautifulSoup
import re

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# 1. Update the text "[ PREPARANDO_COLECCIÓN_SKATE_001 ]"
for p in soup.find_all("p"):
    if p.string and "[ PREPARANDO_COLECCIÓN_SKATE_001 ]" in p.string:
        p.string = p.string.replace("[ PREPARANDO_COLECCIÓN_SKATE_001 ]", "[ PREPARANDO_NUEVO_DROP_002 ]")

# 2. Remove the Zine Style Lookbook Grid and Technical Section
main_tag = soup.find("main")
if main_tag:
    sections = main_tag.find_all("section")
    # The first section is the Hero Section, which we keep.
    # We remove the rest (Lookbook and Technical)
    for section in sections[1:]:
        section.decompose()

# 3. Fix the countdown scripts
# Remove all script tags that contain countdown logic
scripts = soup.find_all("script")
for s in scripts:
    if s.string and ("updateCountdown" in s.string or "COUNTDOWN LÓGICA" in s.string):
        s.decompose()

# Inject a single, clean script at the end of the body
script_content = """
    // === COUNTDOWN LÓGICA (HASTA MAÑANA A LA MEDIANOCHE) ===
    function updateCountdown() {
        const now = new Date();
        // Set to tomorrow at 23:59:59
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59);
        const endDate = tomorrow.getTime();
        
        const update = () => {
            const currentTime = new Date().getTime();
            let distance = endDate - currentTime;
            
            if (distance < 0) return;
            
            // Calculate total hours remaining (includes days converted to hours)
            const totalHours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const set = (id, val) => {
                const el = document.getElementById(id);
                if (!el) return;
                const str = val.toString().padStart(2, '0');
                if (el.innerText !== str) {
                    el.innerText = str;
                }
            };
            
            set('hours', totalHours); 
            set('minutes', minutes); 
            set('seconds', seconds);
        };
        
        setInterval(update, 1000);
        update();
    }
    
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

new_script = soup.new_tag("script")
new_script.string = script_content
soup.body.append(new_script)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(soup))

print("Successfully cleaned up index.html")
