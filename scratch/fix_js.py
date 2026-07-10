import re

with open(r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add id="secret-unlock" to the AVENIDA logo div inside the new stitch header
# Find: <div class="font-display-xl text-3xl md:text-headline-lg uppercase tracking-tighter text-on-background glitch-text cursor-pointer" data-text="AVENIDA">
old_logo_div = '<div class="font-display-xl text-3xl md:text-headline-lg uppercase tracking-tighter text-on-background glitch-text cursor-pointer" data-text="AVENIDA">'
new_logo_div = '<div id="secret-unlock" class="font-display-xl text-3xl md:text-headline-lg uppercase tracking-tighter text-on-background glitch-text cursor-pointer" data-text="AVENIDA">'
html = html.replace(old_logo_div, new_logo_div)

# 2. Update the updateCountdown function to use the new IDs 'hours', 'minutes', 'seconds'
old_script = """// === COUNTDOWN LÓGICA ===
        function updateCountdown() {
            const now = new Date();
            // Fecha específica de lanzamiento: Final de este mes a las 23:59:59 (Se puede cambiar fácilmente aquí)
            const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
            const t = endDate - now.getTime();
            
            if (t <= 0) return;
            
            const d = Math.floor(t / 86400000);
            const h = Math.floor((t % 86400000) / 3600000);
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
            
            set('cd-days', d); set('cd-hours', h); set('cd-mins', m); set('cd-secs', s);
        }"""

new_script = """// === COUNTDOWN LÓGICA ===
        function updateCountdown() {
            const now = new Date();
            // Fecha específica de lanzamiento: Final de este mes a las 23:59:59 (Se puede cambiar fácilmente aquí)
            const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
            const t = endDate - now.getTime();
            
            if (t <= 0) return;
            
            // Note: The new design only shows hours, minutes, seconds (total hours remaining, not days)
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
        }"""

html = html.replace(old_script, new_script)

# 3. Add ?admin=true bypass
old_bypass = """const isAfterLaunch = new Date() >= LAUNCH_DATE;

        if (isAfterLaunch || sessionStorage.getItem(SESSION_KEY) === 'true') {"""

new_bypass = """const isAfterLaunch = new Date() >= LAUNCH_DATE;

        // Auto bypass for admin
        if (window.location.search.includes('admin=true')) {
            sessionStorage.setItem(SESSION_KEY, 'true');
        }

        if (isAfterLaunch || sessionStorage.getItem(SESSION_KEY) === 'true') {"""

html = html.replace(old_bypass, new_bypass)

with open(r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated JS and IDs in index.html")
