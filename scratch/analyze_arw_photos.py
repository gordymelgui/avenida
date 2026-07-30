import os
from PIL import Image

src_dir = 'scratch/raw_jpegs'
thumb_dir = 'scratch/raw_thumbs'
os.makedirs(thumb_dir, exist_ok=True)

for fname in os.listdir(src_dir):
    if fname.endswith('.jpg'):
        path = os.path.join(src_dir, fname)
        with Image.open(path) as img:
            img.thumbnail((400, 400))
            save_path = os.path.join(thumb_dir, fname)
            img.save(save_path)
            print(f"Thumb created: {fname} -> size {img.size}")
