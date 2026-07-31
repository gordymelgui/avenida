import os
from PIL import Image

banner4_path = r"banner\drop3\bannerdrop3-4.jpg"
img = Image.open(banner4_path)

# Image size is (4000, 6000)
# We want a landscape 16:9 or 3:2 aspect ratio
# Width = 4000, Height = 2500 (3:2 ratio)
# Subject top is around Y=411, skateboard/feet near Y=4500
# Let's crop from Y=800 to Y=3400 (height = 2600) to focus on the skateboarder!

crop_box = (0, 800, 4000, 3400)
cropped = img.crop(crop_box)

cropped.save(banner4_path, "JPEG", quality=95)
print(f"Crop complete! Saved {banner4_path} with size {cropped.size}")
