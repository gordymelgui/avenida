import cv2
import numpy as np
import os

dest_dir = r"C:\Users\jordy\.gemini\antigravity-ide\brain\62ecef54-dccd-4750-98f3-6597b4179b39\drop_images"
artifacts_dir = r"C:\Users\jordy\.gemini\antigravity-ide\brain\62ecef54-dccd-4750-98f3-6597b4179b39"

files = sorted([f for f in os.listdir(dest_dir) if f.lower().endswith('.jpg')])

grid_imgs = []
for f in files:
    img_path = os.path.join(dest_dir, f)
    img = cv2.imread(img_path)
    if img is None:
        continue
    
    # Resize to standard size (300x200) for grid cell
    cell = cv2.resize(img, (300, 200))
    
    # Put text label on cell
    cv2.putText(cell, f, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2, cv2.LINE_AA)
    grid_imgs.append(cell)

# Pad list with empty images if not 9
while len(grid_imgs) < 9:
    grid_imgs.append(np.zeros((200, 300, 3), dtype=np.uint8))

# Create 3x3 grid
row1 = np.hstack(grid_imgs[0:3])
row2 = np.hstack(grid_imgs[3:6])
row3 = np.hstack(grid_imgs[6:9])
collage = np.vstack([row1, row2, row3])

collage_path = os.path.join(artifacts_dir, "drop_collage.jpg")
cv2.imwrite(collage_path, collage)
print(f"Collage saved successfully to {collage_path}")
