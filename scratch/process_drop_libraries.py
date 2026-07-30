import os
import shutil
from PIL import Image
from rembg import remove

# Source directory
src_dir = 'WEB-drop-julio'

# Target catalog directories
dir_flared = 'catalogo/jean flared'
dir_mangas_largas = 'catalogo/remera mangas largas'
dir_slim_fit = 'catalogo/remera slim fit'

os.makedirs(dir_flared, exist_ok=True)
os.makedirs(dir_mangas_largas, exist_ok=True)
os.makedirs(dir_slim_fit, exist_ok=True)

print("Starting background removal and photo organization...")

# Helper function to remove background and save as PNG
def create_cover_png(input_path, output_png_path, crop_box=None):
    with Image.open(input_path) as img:
        if crop_box:
            img = img.crop(crop_box)
        # Convert to RGBA and run rembg
        output = remove(img)
        output.save(output_png_path, "PNG")
        print(f"Cover PNG created: {output_png_path}")

# 1. JEAN FLARED
# Cover: DSC_0753.jpg (skater wearing flared jeans) or crop of jeans from DSC_0753.jpg
cover_flared_src = os.path.join(src_dir, 'DSC_0753.jpg')
cover_flared_dst = os.path.join(dir_flared, 'portada jean flared.png')
create_cover_png(cover_flared_src, cover_flared_dst)

# Secondary & details for JEAN FLARED
shutil.copy2(os.path.join(src_dir, 'IMG_6181.jpg'), os.path.join(dir_flared, 'jean flared etiqueta y bolsillo.jpg'))
shutil.copy2(os.path.join(src_dir, 'IMG_6190.jpg'), os.path.join(dir_flared, 'jean flared modelo 1.jpg'))
shutil.copy2(os.path.join(src_dir, 'IMG_6192 (1).jpg'), os.path.join(dir_flared, 'jean flared reverso.jpg'))
shutil.copy2(os.path.join(src_dir, 'IMG_6212.jpg'), os.path.join(dir_flared, 'jean flared vista superior.jpg'))


# 2. REMERA MANGAS LARGAS
# Cover: IMG_6203 (1).jpg
cover_mangas_src = os.path.join(src_dir, 'IMG_6203 (1).jpg')
cover_mangas_dst = os.path.join(dir_mangas_largas, 'portada remera mangas largas.png')
create_cover_png(cover_mangas_src, cover_mangas_dst)

# Secondary & details for REMERA MANGAS LARGAS
shutil.copy2(os.path.join(src_dir, 'IMG_6204.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas modelo 1.jpg'))
shutil.copy2(os.path.join(src_dir, 'IMG_6206.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas modelo 2.jpg'))
shutil.copy2(os.path.join(src_dir, 'IMG_6225.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas detalle.jpg'))


# 3. REMERA SLIM FIT
# Cover: IMG_6181.jpg
cover_slim_src = os.path.join(src_dir, 'IMG_6181.jpg')
cover_slim_dst = os.path.join(dir_slim_fit, 'portada remera slim fit.png')
create_cover_png(cover_slim_src, cover_slim_dst)

# Secondary & details for REMERA SLIM FIT
shutil.copy2(os.path.join(src_dir, 'IMG_6190.jpg'), os.path.join(dir_slim_fit, 'remera slim fit modelo 1.jpg'))
shutil.copy2(os.path.join(src_dir, 'IMG_6198.jpg'), os.path.join(dir_slim_fit, 'remera slim fit reverso.jpg'))
shutil.copy2(os.path.join(src_dir, 'IMG_6225.jpg'), os.path.join(dir_slim_fit, 'remera slim fit detalle.jpg'))

print("All product libraries created successfully!")
