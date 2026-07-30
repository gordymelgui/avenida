import os
import shutil
from PIL import Image
from rembg import remove

# Target directories
dir_flared = 'catalogo/jean flared'
dir_mangas_largas = 'catalogo/remera mangas largas'
dir_slim_fit = 'catalogo/remera slim fit'

raw_dir = 'scratch/raw_jpegs'

# Ensure directories exist and clean existing files
for d in [dir_flared, dir_mangas_largas, dir_slim_fit]:
    os.makedirs(d, exist_ok=True)
    for f in os.listdir(d):
        fp = os.path.join(d, f)
        if os.path.isfile(fp):
            try:
                os.remove(fp)
            except Exception as e:
                print(f"Clean warning: {e}")

print("Processing RAW studio photos from 'drive del nuevo drop'...")

def create_transparent_cover(input_jpg, output_png, crop_box=None, rotate_angle=0):
    with Image.open(input_jpg) as img:
        if rotate_angle != 0:
            img = img.rotate(rotate_angle, expand=True)
        if crop_box:
            img = img.crop(crop_box)
        output = remove(img)
        output.save(output_png, "PNG")
        print(f"Generated transparent cover PNG: {output_png}")

def save_formatted_jpg(input_jpg, output_jpg, crop_box=None, rotate_angle=0):
    with Image.open(input_jpg) as img:
        if rotate_angle != 0:
            img = img.rotate(rotate_angle, expand=True)
        if crop_box:
            img = img.crop(crop_box)
        img.save(output_jpg, "JPEG", quality=95)
        print(f"Saved formatted JPG: {output_jpg}")


# ==========================================
# 1. JEAN FLARED (from drive del nuevo drop ARW photos)
# ==========================================
# Front Flat Lay: DSC00094.ARW.jpg (Note: image is horizontal in shot, let's rotate -90 or 270 if needed or crop)
# Let's inspect orientation and crop
with Image.open(os.path.join(raw_dir, 'DSC00094.ARW.jpg')) as img:
    w, h = img.size
    # Crop the jeans flat lay from center
    crop_flared_front = (int(w * 0.05), int(h * 0.05), int(w * 0.95), int(h * 0.95))

# Transparent Cover PNG
create_transparent_cover(
    os.path.join(raw_dir, 'DSC00094.ARW.jpg'),
    os.path.join(dir_flared, 'portada jean flared.png'),
    crop_box=crop_flared_front,
    rotate_angle=270
)

# Reverso (Back Flat Lay): DSC00197.ARW.jpg
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00197.ARW.jpg'),
    os.path.join(dir_flared, 'jean flared reverso.jpg'),
    rotate_angle=90
)

# Etiqueta / Tag Detail: DSC00217.ARW.jpg (purple AV leather patch)
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00217.ARW.jpg'),
    os.path.join(dir_flared, 'jean flared etiqueta av.jpg')
)

# Additional Flat Lay detail: DSC00131.ARW.jpg
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00131.ARW.jpg'),
    os.path.join(dir_flared, 'jean flared detalle bolsillos.jpg')
)


# ==========================================
# 2. REMERA SLIM FIT (from drive del nuevo drop ARW photos)
# ==========================================
# Front Flat Lay: DSC00265.ARW.jpg (White ringer tee with red collar)
with Image.open(os.path.join(raw_dir, 'DSC00265.ARW.jpg')) as img:
    w, h = img.size
    crop_slim_front = (int(w * 0.15), int(h * 0.05), int(w * 0.85), int(h * 0.95))

# Transparent Cover PNG
create_transparent_cover(
    os.path.join(raw_dir, 'DSC00265.ARW.jpg'),
    os.path.join(dir_slim_fit, 'portada remera slim fit.png'),
    crop_box=crop_slim_front,
    rotate_angle=90
)

# Reverso (Back Flat Lay): DSC00266.ARW.jpg
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00266.ARW.jpg'),
    os.path.join(dir_slim_fit, 'remera slim fit reverso.jpg'),
    rotate_angle=90
)

# Etiqueta / Neck Tag: DSC00280.ARW.jpg ("AVENIDA M" on red collar)
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00280.ARW.jpg'),
    os.path.join(dir_slim_fit, 'remera slim fit etiqueta cuello.jpg')
)


# ==========================================
# 3. REMERA MANGAS LARGAS (from drive del nuevo drop ARW photos)
# ==========================================
# Front Flat Lay: DSC00403.ARW.jpg (Raglan long sleeve)
with Image.open(os.path.join(raw_dir, 'DSC00403.ARW.jpg')) as img:
    w, h = img.size
    crop_mangas_front = (int(w * 0.15), int(h * 0.05), int(w * 0.85), int(h * 0.95))

# Transparent Cover PNG
create_transparent_cover(
    os.path.join(raw_dir, 'DSC00403.ARW.jpg'),
    os.path.join(dir_mangas_largas, 'portada remera mangas largas.png'),
    crop_box=crop_mangas_front,
    rotate_angle=90
)

# Reverso (Back Flat Lay): DSC00406.ARW.jpg
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00406.ARW.jpg'),
    os.path.join(dir_mangas_largas, 'remera mangas largas reverso.jpg'),
    rotate_angle=90
)

# Etiqueta / Neck Tag: DSC00377.ARW.jpg ("AVENIDA G" on dark collar)
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00377.ARW.jpg'),
    os.path.join(dir_mangas_largas, 'remera mangas largas etiqueta cuello.jpg')
)

# Etiqueta de Composicion: DSC00391.ARW.jpg
save_formatted_jpg(
    os.path.join(raw_dir, 'DSC00391.ARW.jpg'),
    os.path.join(dir_mangas_largas, 'remera mangas largas etiqueta composicion.jpg')
)

print("All studio product libraries successfully created from drive del nuevo drop!")
