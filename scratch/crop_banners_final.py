import os
from PIL import Image

downloads_dir = r"C:\Users\jordy\Downloads"
banner_dir = r"banner\drop3"
os.makedirs(banner_dir, exist_ok=True)

# 1. Process Banner 4: crop right at pink beanie (Y=1400) down through skateboard (Y=4100)
b4_src = os.path.join(downloads_dir, "bannerdrop3-4.jpg")
b4_dst = os.path.join(banner_dir, "bannerdrop3-4.jpg")

img4 = Image.open(b4_src)
# Crop box (left, top, right, bottom)
# Top=1400 puts pink beanie right at the top edge of crop!
crop4 = img4.crop((0, 1400, 4000, 4100))
crop4.save(b4_dst, "JPEG", quality=95)
print(f"Banner 4 processed: size {crop4.size}")

# 2. Process New Banner 3: crop bannerdrop3-3new.jpg horizontally centered on subject
b3_src = os.path.join(downloads_dir, "bannerdrop3-3new.jpg")
b3_dst = os.path.join(banner_dir, "bannerdrop3-3.jpg")

img3 = Image.open(b3_src)
# Subject is Y=1286 to 2933. Crop Y=800 to Y=3467 (height 2667, width 4000)
crop3 = img3.crop((0, 800, 4000, 3467))
crop3.save(b3_dst, "JPEG", quality=95)
print(f"New Banner 3 processed: size {crop3.size}")

print("Both banners processed successfully!")
