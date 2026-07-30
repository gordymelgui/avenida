import os
import rawpy
from PIL import Image
from rembg import remove

downloads_dir = r"C:\Users\jordy\Downloads"
out_dir_relajado = r"catalogo\campana relajado"
out_dir_mangas = r"catalogo\remera mangas largas"

os.makedirs(out_dir_relajado, exist_ok=True)
os.makedirs(out_dir_mangas, exist_ok=True)

def arw_to_pil(arw_path):
    print(f"Reading ARW: {arw_path}")
    with rawpy.imread(arw_path) as raw:
        rgb = raw.postprocess()
    img = Image.fromarray(rgb)
    return img

def process_png_cover(pil_img, output_path, padding_pct=0.06, aspect_ratio=1.0):
    print(f"Processing PNG background removal for {output_path}...")
    w, h = pil_img.size
    if w > h:
        pil_img = pil_img.rotate(90, expand=True)
        
    rgba = remove(pil_img)
    bbox = rgba.getbbox()
    if not bbox:
        print("Warning: empty bbox")
        rgba.save(output_path, "PNG")
        return
        
    left, top, right, bottom = bbox
    g_w = right - left
    g_h = bottom - top
    
    pad = int(max(g_w, g_h) * padding_pct)
    img_w, img_h = rgba.size
    
    p_left = max(0, left - pad)
    p_top = max(0, top - pad)
    p_right = min(img_w, right + pad)
    p_bottom = min(img_h, bottom + pad)
    
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

def process_jpg_gallery(pil_img, output_path, padding_pct=0.06, aspect_ratio=1.0):
    print(f"Processing JPG gallery image for {output_path}...")
    w, h = pil_img.size
    if w > h:
        pil_img = pil_img.rotate(90, expand=True)
        
    rgba_tmp = remove(pil_img)
    bbox = rgba_tmp.getbbox()
    if bbox:
        left, top, right, bottom = bbox
        g_w = right - left
        g_h = bottom - top
        pad = int(max(g_w, g_h) * padding_pct)
        img_w, img_h = pil_img.size
        
        p_left = max(0, left - pad)
        p_top = max(0, top - pad)
        p_right = min(img_w, right + pad)
        p_bottom = min(img_h, bottom + pad)
        
        cropped_jpg = pil_img.crop((p_left, p_top, p_right, p_bottom))
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
        pil_img.save(output_path, "JPEG", quality=95)
    print(f"Saved JPG gallery: {output_path}")

# 1. Portada Campana Relajado
p_campana_relajado = arw_to_pil(os.path.join(downloads_dir, "portada campana relajado.ARW"))
process_png_cover(p_campana_relajado, os.path.join(out_dir_relajado, "portada campana relajado.png"))

# 2. Reverso Campana Relajado
r_campana_relajado = arw_to_pil(os.path.join(downloads_dir, "reverso campana relajado.ARW"))
process_jpg_gallery(r_campana_relajado, os.path.join(out_dir_relajado, "reverso campana relajado.jpg"))

# 3. Portada Mangas
p_mangas = arw_to_pil(os.path.join(downloads_dir, "portada mangas.ARW"))
process_png_cover(p_mangas, os.path.join(out_dir_mangas, "portada remera mangas largas.png"))

print("All image processing completed successfully!")
