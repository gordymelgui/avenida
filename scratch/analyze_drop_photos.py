import os
from PIL import Image

src_dir = 'WEB-drop-julio'
thumb_dir = 'scratch/thumbs'
os.makedirs(thumb_dir, exist_ok=True)

for fname in os.listdir(src_dir):
    if fname.lower().endswith(('.jpg', '.jpeg', '.png')):
        path = os.path.join(src_dir, fname)
        with Image.open(path) as img:
            # Resize thumbnail for inspection
            img.thumbnail((400, 400))
            save_path = os.path.join(thumb_dir, fname)
            img.save(save_path)
            print(f"Thumb saved: {fname} -> {img.size}")
