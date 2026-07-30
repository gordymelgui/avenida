import os
from PIL import Image

raw_jpeg_dir = r'scratch\raw_jpegs'
thumb_dir = r'scratch\thumbs_raw'
os.makedirs(thumb_dir, exist_ok=True)

html_items = []

files = sorted([f for f in os.listdir(raw_jpeg_dir) if f.endswith('.jpg')])

for f in files:
    src_path = os.path.join(raw_jpeg_dir, f)
    thumb_path = os.path.join(thumb_dir, f)
    
    with Image.open(src_path) as img:
        w, h = img.size
        # Make a thumbnail (max 500px)
        img_thumb = img.copy()
        img_thumb.thumbnail((500, 500))
        img_thumb.save(thumb_path, 'JPEG', quality=85)
        
        html_items.append(f"""
        <div style="border: 1px solid #444; background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: sans-serif;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px;">{f}</h4>
            <div style="font-size: 12px; color: #aaa; margin-bottom: 8px;">Tamaño: {w} x {h} px</div>
            <img src="thumbs_raw/{f}" style="width: 100%; height: 260px; object-fit: contain; background: #000; border-radius: 4px;">
        </div>
        """)

html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Inspección de Fotos RAW Drop</title>
</head>
<body style="background: #121212; padding: 20px; font-family: sans-serif;">
    <h1 style="color: #fff; text-align: center;">Catálogo de Fotos RAW del Nuevo Drop (27 fotos)</h1>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
        {''.join(html_items)}
    </div>
</body>
</html>
"""

with open(r'scratch\inspect_all_photos.html', 'w', encoding='utf-8') as out_f:
    out_f.write(html_content)

print(f"Generated inspect_all_photos.html with {len(files)} thumbnails.")
