import os
import re
import shutil
from PIL import Image

arw_dir = r'catalogo\drive del nuevo drop'
raw_jpeg_dir = r'scratch\raw_jpegs'
os.makedirs(raw_jpeg_dir, exist_ok=True)

# 1. Extract embedded JPEG preview from each ARW file
arw_files = [f for f in os.listdir(arw_dir) if f.lower().endswith('.arw')]
print(f"Found {len(arw_files)} ARW files in '{arw_dir}'")

for fname in arw_files:
    arw_path = os.path.join(arw_dir, fname)
    out_jpeg = os.path.join(raw_jpeg_dir, fname + '.jpg')
    
    with open(arw_path, 'rb') as f:
        data = f.read()
    
    jpeg_starts = [m.start() for m in re.finditer(b'\xff\xd8\xff', data)]
    largest_size = 0
    best_jpeg = None
    
    for start in jpeg_starts:
        end = data.find(b'\xff\xd9', start)
        if end != -1:
            size = end + 2 - start
            if size > largest_size:
                largest_size = size
                best_jpeg = data[start:end+2]
    
    if best_jpeg:
        with open(out_jpeg, 'wb') as out_f:
            out_f.write(best_jpeg)
        print(f"Extracted {fname} -> {out_jpeg} ({largest_size/1024:.1f} KB)")
    else:
        print(f"Warning: No embedded JPEG found in {fname}")

print("JPEG Extraction Complete.")
