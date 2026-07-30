import os
import rawpy
from PIL import Image
from rembg import remove

def process_png_reverso(input_img_path, output_png_path, is_arw=False, rotate_angle=0, padding_pct=0.06, aspect_ratio=1.0):
    print(f"Processing reverso PNG for {output_png_path}...")
    if is_arw:
        with rawpy.imread(input_img_path) as raw:
            rgb = raw.postprocess()
        img = Image.fromarray(rgb)
    else:
        img = Image.open(input_img_path)
        
    if rotate_angle != 0:
        img = img.rotate(rotate_angle, expand=True)
        
    w, h = img.size
    if w > h and rotate_angle == 0:
        img = img.rotate(90, expand=True)
        
    rgba = remove(img)
    bbox = rgba.getbbox()
    if not bbox:
        print(f"Warning: Empty bbox for {input_img_path}")
        rgba.save(output_png_path, "PNG")
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
        canvas.save(output_png_path, "PNG")
    else:
        cropped.save(output_png_path, "PNG")
    print(f"Saved transparent PNG reverso: {output_png_path}")

# 1. Jean Flared (Campana Al Cuerpo) Reverso (Rotated 90 degrees so waist tag is AT THE TOP!)
process_png_reverso(
    r'scratch\raw_jpegs\DSC00197.ARW.jpg',
    r'catalogo\jean flared\jean flared reverso.png',
    is_arw=False,
    rotate_angle=90
)

# 2. Remera Slim Fit (Remera Avenida 26') Reverso
process_png_reverso(
    r'scratch\raw_jpegs\DSC00266.ARW.jpg',
    r'catalogo\remera slim fit\remera slim fit reverso.png',
    is_arw=False,
    rotate_angle=90
)

# 3. Campana Relajado Reverso (from Downloads ARW)
downloads_arw = r'C:\Users\jordy\Downloads\reverso campana relajado.ARW'
if os.path.exists(downloads_arw):
    process_png_reverso(
        downloads_arw,
        r'catalogo\campana relajado\reverso campana relajado.png',
        is_arw=True,
        rotate_angle=0
    )

print("All reversos successfully converted to backgroundless PNGs and oriented correctly!")
