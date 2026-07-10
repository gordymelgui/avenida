import cv2
import numpy as np
import os

dest_dir = r"C:\Users\jordy\.gemini\antigravity-ide\brain\62ecef54-dccd-4750-98f3-6597b4179b39\drop_images"
files = sorted([f for f in os.listdir(dest_dir) if f.lower().endswith('.jpg')])

print("Analyzing images...")
for f in files:
    img_path = os.path.join(dest_dir, f)
    img = cv2.imread(img_path)
    if img is None:
        continue
    
    h, w = img.shape[:2]
    
    # 1. Check border color consistency (studio vs lifestyle)
    # Extract borders: top, bottom, left, right rows/columns (5 pixels deep)
    top = img[0:5, :, :]
    bottom = img[h-5:h, :, :]
    left = img[:, 0:5, :]
    right = img[:, w-5:w, :]
    
    borders = np.concatenate([top.flatten(), bottom.flatten(), left.flatten(), right.flatten()])
    border_std = np.std(borders)
    
    # 2. Extract center color (average of center 30% of the image)
    center = img[int(h*0.35):int(h*0.65), int(w*0.35):int(w*0.65)]
    avg_color_bgr = np.mean(center, axis=(0,1))
    
    # Let's print features to guess what it is
    print(f"{f}: border_std={border_std:.2f}, avg_color_bgr={[int(x) for x in avg_color_bgr]}")
