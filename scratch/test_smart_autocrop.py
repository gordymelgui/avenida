import os
from PIL import Image
from rembg import remove

def smart_autocrop_transparent(input_jpg_path, output_png_path, rotate_angle=0, padding_pct=0.08, aspect_ratio=None):
    """
    1. Removes background with rembg
    2. Rotates if necessary
    3. Finds tight bounding box of garment (alpha > 0)
    4. Adds uniform padding around the garment (never cutting off any part)
    5. Optionally fits inside a target aspect ratio (e.g. 4:5 or 1:1) with transparent margin
    """
    with Image.open(input_jpg_path) as orig_img:
        # 1. Background removal
        rgba = remove(orig_img)
        
        # 2. Rotate if specified
        if rotate_angle != 0:
            rgba = rgba.rotate(rotate_angle, expand=True)
            
        # 3. Find exact garment bounding box
        bbox = rgba.getbbox()
        if not bbox:
            print(f"Warning: No garment found in {input_jpg_path}")
            rgba.save(output_png_path, "PNG")
            return
            
        left, top, right, bottom = bbox
        g_w = right - left
        g_h = bottom - top
        
        # 4. Add padding
        pad = int(max(g_w, g_h) * padding_pct)
        w, h = rgba.size
        
        pad_left = max(0, left - pad)
        pad_top = max(0, top - pad)
        pad_right = min(w, right + pad)
        pad_bottom = min(h, bottom + pad)
        
        cropped_rgba = rgba.crop((pad_left, pad_top, pad_right, pad_bottom))
        
        # 5. Fit inside canvas ratio if aspect_ratio specified (e.g., 1.0 for square, 0.8 for 4:5)
        if aspect_ratio:
            cw, ch = cropped_rgba.size
            current_ratio = cw / ch
            if current_ratio > aspect_ratio: # wider than target ratio
                target_w = cw
                target_h = int(cw / aspect_ratio)
            else: # taller than target ratio
                target_h = ch
                target_w = int(ch * aspect_ratio)
                
            canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
            offset_x = (target_w - cw) // 2
            offset_y = (target_h - ch) // 2
            canvas.paste(cropped_rgba, (offset_x, offset_y))
            canvas.save(output_png_path, "PNG")
        else:
            cropped_rgba.save(output_png_path, "PNG")
            
        print(f"Smart cropped: {os.path.basename(output_png_path)} | Garment size: {g_w}x{g_h} | Final crop: {cropped_rgba.size}")

# Test on 3 front photos
raw_dir = r'scratch\raw_jpegs'
out_test_dir = r'scratch\smart_crop_test'
os.makedirs(out_test_dir, exist_ok=True)

# Jean Flared (DSC00094.ARW.jpg) - Needs 270 rotation
smart_autocrop_transparent(
    os.path.join(raw_dir, 'DSC00094.ARW.jpg'),
    os.path.join(out_test_dir, 'portada_jean_flared.png'),
    rotate_angle=270,
    padding_pct=0.06,
    aspect_ratio=1.0 # square
)

# Remera Slim Fit (DSC00265.ARW.jpg) - Needs 90 rotation
smart_autocrop_transparent(
    os.path.join(raw_dir, 'DSC00265.ARW.jpg'),
    os.path.join(out_test_dir, 'portada_remera_slim_fit.png'),
    rotate_angle=90,
    padding_pct=0.06,
    aspect_ratio=1.0 # square
)

# Remera Mangas Largas (DSC00403.ARW.jpg) - Needs 90 rotation
smart_autocrop_transparent(
    os.path.join(raw_dir, 'DSC00403.ARW.jpg'),
    os.path.join(out_test_dir, 'portada_remera_mangas_largas.png'),
    rotate_angle=90,
    padding_pct=0.06,
    aspect_ratio=1.0 # square
)
