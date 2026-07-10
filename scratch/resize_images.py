import os
from PIL import Image

drop_dir = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\WEB-drop-julio"
artifacts_dir = r"C:\Users\jordy\.gemini\antigravity-ide\brain\62ecef54-dccd-4750-98f3-6597b4179b39"
dest_dir = os.path.join(artifacts_dir, "drop_images")
os.makedirs(dest_dir, exist_ok=True)

files = sorted([f for f in os.listdir(drop_dir) if f.lower().endswith('.jpg')])

print(f"Resizing {len(files)} images...")
for f in files:
    src_path = os.path.join(drop_dir, f)
    # Replace spaces and parentheses to make paths markdown-friendly
    safe_name = f.replace(" ", "_").replace("(", "").replace(")", "").lower()
    dest_path = os.path.join(dest_dir, safe_name)
    
    try:
        with Image.open(src_path) as img:
            # Resize keeping aspect ratio, width = 600
            w, h = img.size
            new_w = 600
            new_h = int(h * (new_w / w))
            resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            resized.save(dest_path, "JPEG", quality=85)
            print(f"Saved {f} as {safe_name} ({new_w}x{new_h})")
    except Exception as e:
        print(f"Error processing {f}: {e}")
