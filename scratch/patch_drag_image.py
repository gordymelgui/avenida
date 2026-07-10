import re

filepath = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\outfit.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# The current dragstart logic:
#    card.addEventListener('dragstart', (e) => {
#      e.dataTransfer.setData('text/plain', item.id);
#    });

# We want to replace it with:
new_dragstart = '''    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
      
      // Set the drag image to the actual clothing item image
      const img = card.querySelector('img');
      if (img) {
        // Create a temporary clone for a better "hanging" effect if desired, 
        // but passing the existing img directly is usually enough for the browser ghost.
        // We set the offset to the middle-top of the image so it looks like you are holding it by the hanger
        e.dataTransfer.setDragImage(img, img.width / 2, 10);
      }
    });'''

content = re.sub(
    r"card\.addEventListener\('dragstart', \(e\) => \{\n\s*e\.dataTransfer\.setData\('text/plain', item\.id\);\n\s*\}\);",
    new_dragstart,
    content,
    flags=re.DOTALL
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Drag image patched successfully!")
