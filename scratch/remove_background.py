import cv2
import numpy as np
import os
import shutil

def remove_background(image_path, lo_diff=25, up_diff=25):
    if not os.path.exists(image_path):
        print(f"Error: file not found at {image_path}")
        return False
        
    # Backup original image if not already backed up
    backup_path = image_path + ".bak"
    if not os.path.exists(backup_path):
        shutil.copy2(image_path, backup_path)
        print(f"Created backup of original at {backup_path}")
    
    # Read the image
    img = cv2.imread(backup_path)
    if img is None:
        print(f"Error loading image from {backup_path}")
        return False
        
    h, w = img.shape[:2]
    
    # Create mask for floodFill (must be 2 pixels wider and taller)
    mask = np.zeros((h + 2, w + 2), np.uint8)
    
    # Seed points: the four corners of the image
    seed_points = [
        (0, 0),          # Top-left
        (w - 1, 0),      # Top-right
        (0, h - 1),      # Bottom-left
        (w - 1, h - 1)   # Bottom-right
    ]
    
    # Run flood fill from the specified seed points
    # Fixed range helps stop fill when color changes significantly (clothing boundary)
    for pt in seed_points:
        cv2.floodFill(
            img, 
            mask, 
            pt, 
            (0, 0, 0), 
            (lo_diff,) * 3, 
            (up_diff,) * 3, 
            flags=8 | cv2.FLOODFILL_FIXED_RANGE
        )
    
    # bg_mask contains 1 where background was filled, 0 where foreground remains
    bg_mask = mask[1:-1, 1:-1]
    
    # Reload original image to keep full color resolution and convert to BGRA
    original = cv2.imread(backup_path)
    bgra = cv2.cvtColor(original, cv2.COLOR_BGR2BGRA)
    
    # Set the alpha channel to 0 for background pixels
    bgra[bg_mask == 1] = [0, 0, 0, 0]
    
    # Write output to the original image path
    cv2.imwrite(image_path, bgra)
    print(f"Successfully processed and removed background for {image_path}")
    return True

# Run for all cover images that need background removal
images_to_process = [
    "catalogo/jeans holgados/portada baggy.png",
    "catalogo/jeans rectos/portada straight.png",
    "catalogo/boxer avenida/boxer restock front.png",
    "catalogo/jorts/jort denim portada principal.png",
    "catalogo/jorts/vestir portada principal.png",
    "catalogo/camisas/cami A portada principal.png",
    "catalogo/camisas/cami B portada principal.png"
]

for img_path in images_to_process:
    remove_background(img_path, lo_diff=25, up_diff=25)
