import os
from PIL import Image

drop_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\WEB-drop-julio"
files = [f for f in os.listdir(drop_dir) if f.lower().endswith('.jpg')]

print(f"Found {len(files)} JPEG images in drop folder.")
for f in sorted(files):
    path = os.path.join(drop_dir, f)
    try:
        with Image.open(path) as img:
            print(f"{f}: format={img.format}, size={img.size}, mode={img.mode}")
    except Exception as e:
        print(f"Error reading {f}: {e}")
