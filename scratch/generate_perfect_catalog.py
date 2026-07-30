import os
from PIL import Image
from rembg import remove

def process_image(input_jpg_path, output_path, is_png=True, rotate_angle=0, padding_pct=0.06, aspect_ratio=1.0):
    """
    Automatic smart cropper & background remover:
    1. Opens raw image & applies studio rotation
    2. Removes background if PNG transparent cover requested
    3. Finds garment bounding box (alpha > 0 for PNG, or color contrast for JPG)
    4. Applies padding (6%) so zero garment edges get cut
    5. Centers onto a perfectly formatted canvas (1:1 square or custom)
    """
    with Image.open(input_jpg_path) as orig_img:
        img = orig_img.copy()
        if rotate_angle != 0:
            img = img.rotate(rotate_angle, expand=True)
            
        if is_png:
            rgba = remove(img)
            bbox = rgba.getbbox()
            if not bbox:
                print(f"Warning: Empty bbox for {input_jpg_path}")
                rgba.save(output_path, "PNG")
                return
                
            left, top, right, bottom = bbox
            g_w = right - left
            g_h = bottom - top
            
            # Safe padding
            pad = int(max(g_w, g_h) * padding_pct)
            w, h = rgba.size
            
            p_left = max(0, left - pad)
            p_top = max(0, top - pad)
            p_right = min(w, right + pad)
            p_bottom = min(h, bottom + pad)
            
            cropped = rgba.crop((p_left, p_top, p_right, p_bottom))
            cw, ch = cropped.size
            
            if aspect_ratio:
                if (cw / ch) > aspect_ratio:
                    target_w = cw
                    target_h = int(cw / aspect_ratio)
                else:
                    target_h = ch
                    target_w = int(ch * aspect_ratio)
                    
                canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
                canvas.paste(cropped, ((target_w - cw) // 2, (target_h - ch) // 2))
                canvas.save(output_path, "PNG")
            else:
                cropped.save(output_path, "PNG")
            print(f"Saved PNG cover: {output_path}")
            
        else:
            # JPG formatting: auto crop non-background or clean margin
            # Convert JPG to RGBA to get exact bbox via rembg first
            rgba_tmp = remove(img)
            bbox = rgba_tmp.getbbox()
            if bbox:
                left, top, right, bottom = bbox
                g_w = right - left
                g_h = bottom - top
                pad = int(max(g_w, g_h) * padding_pct)
                w, h = img.size
                
                p_left = max(0, left - pad)
                p_top = max(0, top - pad)
                p_right = min(w, right + pad)
                p_bottom = min(h, bottom + pad)
                
                cropped_jpg = img.crop((p_left, p_top, p_right, p_bottom))
                
                # Make square JPG with white/clean or original background fill if needed, or save cropped
                cw, ch = cropped_jpg.size
                if aspect_ratio:
                    if (cw / ch) > aspect_ratio:
                        target_w = cw
                        target_h = int(cw / aspect_ratio)
                    else:
                        target_h = ch
                        target_w = int(ch * aspect_ratio)
                    
                    canvas = Image.new("RGB", (target_w, target_h), (255, 255, 255))
                    canvas.paste(cropped_jpg, ((target_w - cw) // 2, (target_h - ch) // 2))
                    canvas.save(output_path, "JPEG", quality=95)
                else:
                    cropped_jpg.save(output_path, "JPEG", quality=95)
            else:
                img.save(output_path, "JPEG", quality=95)
            print(f"Saved JPG gallery: {output_path}")

raw_dir = r'scratch\raw_jpegs'

# Directories
dir_flared = r'catalogo\jean flared'
dir_slim_fit = r'catalogo\remera slim fit'
dir_mangas_largas = r'catalogo\remera mangas largas'

for d in [dir_flared, dir_slim_fit, dir_mangas_largas]:
    os.makedirs(d, exist_ok=True)

print("Starting perfect catalog re-processing...")

# 1. JEAN FLARED
# Portada PNG
process_image(os.path.join(raw_dir, 'DSC00094.ARW.jpg'), os.path.join(dir_flared, 'portada jean flared.png'), is_png=True, rotate_angle=90, padding_pct=0.06, aspect_ratio=1.0)
# Reverso JPG
process_image(os.path.join(raw_dir, 'DSC00197.ARW.jpg'), os.path.join(dir_flared, 'jean flared reverso.jpg'), is_png=False, rotate_angle=270, padding_pct=0.06, aspect_ratio=1.0)
# Etiqueta AV JPG
process_image(os.path.join(raw_dir, 'DSC00217.ARW.jpg'), os.path.join(dir_flared, 'jean flared etiqueta av.jpg'), is_png=False, rotate_angle=0, padding_pct=0.06, aspect_ratio=1.0)
# Detalle bolsillos JPG
process_image(os.path.join(raw_dir, 'DSC00131.ARW.jpg'), os.path.join(dir_flared, 'jean flared detalle bolsillos.jpg'), is_png=False, rotate_angle=0, padding_pct=0.06, aspect_ratio=1.0)

# 2. REMERA SLIM FIT
# Portada PNG
process_image(os.path.join(raw_dir, 'DSC00265.ARW.jpg'), os.path.join(dir_slim_fit, 'portada remera slim fit.png'), is_png=True, rotate_angle=90, padding_pct=0.06, aspect_ratio=1.0)
# Reverso JPG
process_image(os.path.join(raw_dir, 'DSC00266.ARW.jpg'), os.path.join(dir_slim_fit, 'remera slim fit reverso.jpg'), is_png=False, rotate_angle=90, padding_pct=0.06, aspect_ratio=1.0)
# Etiqueta cuello JPG
process_image(os.path.join(raw_dir, 'DSC00280.ARW.jpg'), os.path.join(dir_slim_fit, 'remera slim fit etiqueta cuello.jpg'), is_png=False, rotate_angle=0, padding_pct=0.06, aspect_ratio=1.0)

# 3. REMERA MANGAS LARGAS
# Portada PNG
process_image(os.path.join(raw_dir, 'DSC00403.ARW.jpg'), os.path.join(dir_mangas_largas, 'portada remera mangas largas.png'), is_png=True, rotate_angle=90, padding_pct=0.06, aspect_ratio=1.0)
# Reverso JPG
process_image(os.path.join(raw_dir, 'DSC00406.ARW.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas reverso.jpg'), is_png=False, rotate_angle=90, padding_pct=0.06, aspect_ratio=1.0)
# Etiqueta cuello JPG
process_image(os.path.join(raw_dir, 'DSC00377.ARW.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas etiqueta cuello.jpg'), is_png=False, rotate_angle=0, padding_pct=0.06, aspect_ratio=1.0)
# Etiqueta composicion JPG
process_image(os.path.join(raw_dir, 'DSC00391.ARW.jpg'), os.path.join(dir_mangas_largas, 'remera mangas largas etiqueta composicion.jpg'), is_png=False, rotate_angle=0, padding_pct=0.06, aspect_ratio=1.0)

print("PERFECT CATALOG CREATED SUCCESSFULY!")
