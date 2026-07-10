import os
from bs4 import BeautifulSoup

workspace_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# 1. Add Firebase scripts to the head
firebase_scripts = """
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-storage.js"></script>
<script src="firebase-config.js"></script>
"""
if not soup.find(src="firebase-config.js"):
    head = soup.find("head")
    head.append(BeautifulSoup(firebase_scripts, "html.parser"))

# 2. Add IDs to the input and button
input_el = soup.find("input", type="email")
if input_el:
    input_el["id"] = "avisame-email"

btn_el = soup.find("button", string=lambda text: "AVÍSAME" in text if text else False)
if btn_el:
    btn_el["id"] = "avisame-btn"
    btn_el["class"] = [c for c in btn_el.get("class", [])] + ["cursor-pointer"]

# 3. Adjust sizing and spacing to make it more compressed
main = soup.find("main")
if main and main.get("class"):
    classes = " ".join(main["class"]).replace("pt-32", "pt-16").replace("pb-24", "pb-12")
    main["class"] = classes.split()

h1 = soup.find("h1")
if h1 and h1.get("class"):
    classes = " ".join(h1["class"]).replace("md:text-8xl", "md:text-7xl")
    h1["class"] = classes.split()

# Adjust margin bottoms
for div in soup.find_all("div", class_=True):
    classes = " ".join(div["class"])
    if "mb-16" in classes:
        div["class"] = classes.replace("mb-16", "mb-8").split()
    elif "mb-20" in classes:
        div["class"] = classes.replace("mb-20", "mb-12").split()

# Adjust countdown sizes
countdown = soup.find("div", id="countdown")
if countdown:
    # Reduce gap
    classes = " ".join(countdown["class"])
    classes = classes.replace("md:gap-12", "md:gap-8").replace("gap-6", "gap-4")
    countdown["class"] = classes.split()
    
    # Reduce text sizes of numbers and colons
    for span in countdown.find_all(["span", "div"]):
        if span.get("class"):
            s_classes = " ".join(span["class"])
            if "text-7xl" in s_classes or "md:text-9xl" in s_classes:
                s_classes = s_classes.replace("md:text-9xl", "md:text-8xl").replace("text-7xl", "text-6xl")
                span["class"] = s_classes.split()

# 4. Inject script logic for the button
script_content = """
    // === AVISAME LÓGICA ===
    const avisameBtn = document.getElementById('avisame-btn');
    const avisameEmail = document.getElementById('avisame-email');
    
    if (avisameBtn && avisameEmail) {
        avisameBtn.addEventListener('click', async () => {
            const email = avisameEmail.value.trim();
            if (!email || !email.includes('@')) {
                alert('Por favor, ingresa un correo válido.');
                return;
            }
            
            avisameBtn.disabled = true;
            const originalText = avisameBtn.innerText;
            avisameBtn.innerText = 'PROCESANDO...';
            
            try {
                // Ensure Firebase is initialized
                if (window.firebaseAuth && window.firebaseAuth.db) {
                    await window.firebaseAuth.db.collection('newsletter').add({
                        email: email,
                        source: 'Waitlist Drop 3',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                } else if (typeof firebase !== 'undefined') {
                    // Fallback if window.firebaseAuth is not fully set up on this page
                    await firebase.firestore().collection('newsletter').add({
                        email: email,
                        source: 'Waitlist Drop 3',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
                
                avisameBtn.innerText = '¡REGISTRADO!';
                avisameBtn.classList.remove('bg-industrial-purple');
                avisameBtn.classList.add('bg-white', 'text-black');
                avisameEmail.value = '';
            } catch (error) {
                console.error("Error subscribing:", error);
                alert('Hubo un error. Intenta nuevamente.');
                avisameBtn.innerText = originalText;
                avisameBtn.disabled = false;
            }
        });
    }
"""

new_script = soup.new_tag("script")
new_script.string = script_content
soup.body.append(new_script)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(str(soup))

print("Successfully fixed AVÍSAME button and compressed the layout.")
