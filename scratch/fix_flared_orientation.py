import os
from PIL import Image
from rembg import remove

def process_image(input_jpg_path, output_path, is_png=True, rotate_angle=90, padding_pct=0.06, aspect_ratio=1.0):
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
            print(f"Fixed & Saved PNG cover (right side up): {output_path}")
            
        else:
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
            print(f"Fixed & Saved JPG gallery: {output_path}")

raw_dir = r'scratch\raw_jpegs'
dir_flared = r'catalogo\jean flared'

# Rotate 90 degrees instead of 270 degrees to flip 180 degrees right side up!
process_image(os.path.join(raw_dir, 'DSC00094.ARW.jpg'), os.path.join(dir_flared, 'portada jean flared.png'), is_png=True, rotate_angle=90, padding_pct=0.06, aspect_ratio=1.0)
process_image(os.path.join(raw_dir, 'DSC00197.ARW.jpg'), os.path.join(dir_flared, 'jean flared reverso.jpg'), is_png=False, rotate_angle=270, padding_pct=0.06, aspect_ratio=1.0)

print("Jean Flared orientation fixed!")
