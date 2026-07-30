import os
import shutil
from PIL import Image
from rembg import remove

# Paths
src_dir = 'WEB-drop-julio'
dir_flared = 'catalogo/jean flared'
dir_mangas_largas = 'catalogo/remera mangas largas'
dir_slim_fit = 'catalogo/remera slim fit'

# Clean files inside target directories
for d in [dir_flared, dir_mangas_largas, dir_slim_fit]:
    os.makedirs(d, exist_ok=True)
    for f in os.listdir(d):
        fp = os.path.join(d, f)
        if os.path.isfile(fp):
            try:
                os.remove(fp)
            except Exception as e:
                print(f"Warning removing {fp}: {e}")

print("Cleaned catalog folders. Processing ONLY WEB-drop-julio images...")

def process_cover_png(img_path, output_png_path, crop_box=None):
    with Image.open(img_path) as img:
        if crop_box:
            img = img.crop(crop_box)
        output = remove(img)
        output.save(output_png_path, "PNG")
        print(f"Created cover PNG: {output_png_path}")

# ==========================================
# 1. JEAN FLARED (derived strictly from WEB-drop-julio)
# ==========================================
# Cover: Cropped Jean Flared from DSC_0753.jpg (skater flared jeans)
with Image.open(os.path.join(src_dir, 'DSC_0753.jpg')) as img:
    w, h = img.size
    crop_flared = (int(w * 0.05), int(h * 0.35), int(w * 0.95), int(h * 0.95))

process_cover_png(
    os.path.join(src_dir, 'DSC_0753.jpg'),
    os.path.join(dir_flared, 'portada jean flared.png'),
    crop_box=crop_flared
)

# Photo 2 (Reverso / Full stance): IMG_6192 (1).jpg
shutil.copy2(os.path.join(src_dir, 'IMG_6192 (1).jpg'), os.path.join(dir_flared, 'jean flared reverso.jpg'))

# Photo 3 (Etiqueta & Bolsillo detail): Cropped AV pocket tag from IMG_6181.jpg
with Image.open(os.path.join(src_dir, 'IMG_6181.jpg')) as img:
    w, h = img.size
    crop_tag = (0, int(h * 0.35), int(w * 0.45), h)
    img_tag = img.crop(crop_tag)
    img_tag.save(os.path.join(dir_flared, 'jean flared etiqueta y bolsillo.jpg'))

# Photo 4 (Lookbook): DSC_0753.jpg
shutil.copy2(os.path.join(src_dir, 'DSC_0753.jpg'), os.path.join(dir_flared, 'jean flared lookbook skater.jpg'))


# ==========================================
# 2. REMERA MANGAS LARGAS (derived strictly from WEB-drop-julio)
# ==========================================
# Cover: Cropped Remera Mangas Largas from IMG_6203 (1).jpg
with Image.open(os.path.join(src_dir, 'IMG_6203 (1).jpg')) as img:
    w, h = img.size
    crop_mangas = (int(w * 0.20), int(h * 0.20), int(w * 0.65), int(h * 0.85))

process_cover_png(
    os.path.join(src_dir, 'IMG_6203 (1).jpg'),
    os.path.join(dir_mangas_largas, 'portada remera mangas largas.png'),
    crop_box=crop_mangas
)

# Photo 2 (Reverso / Stance): IMG_6204.jpg
shutil.copy2(os.path.join(src_dir, 'IMG_6204.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas reverso.jpg'))

# Photo 3 (Etiquetas & Detalle): IMG_6206.jpg
shutil.copy2(os.path.join(src_dir, 'IMG_6206.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas detalle.jpg'))


# ==========================================
# 3. REMERA SLIM FIT (derived strictly from WEB-drop-julio)
# ==========================================
# Cover: Cropped Remera Slim Fit (ringer tee) from IMG_6181.jpg
with Image.open(os.path.join(src_dir, 'IMG_6181.jpg')) as img:
    w, h = img.size
    crop_slim = (int(w * 0.25), int(h * 0.25), int(w * 0.75), int(h * 0.95))

process_cover_png(
    os.path.join(src_dir, 'IMG_6181.jpg'),
    os.path.join(dir_slim_fit, 'portada remera slim fit.png'),
    crop_box=crop_slim
)

# Photo 2 (Reverso / Stance): IMG_6198.jpg
shutil.copy2(os.path.join(src_dir, 'IMG_6198.jpg'), os.path.join(dir_slim_fit, 'remera slim fit reverso.jpg'))

# Photo 3 (Etiquetas & Detalle): IMG_6225.jpg
shutil.copy2(os.path.join(src_dir, 'IMG_6225.jpg'), os.path.join(dir_slim_fit, 'remera slim fit detalle.jpg'))

print("STRICT WEB-drop-julio libraries created successfully!")
