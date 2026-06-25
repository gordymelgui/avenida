import os
import sys
import subprocess

def install_dependencies():
    try:
        import cv2
        import PIL
        print("[OK] Dependencies already installed.")
    except ImportError:
        print("Dependencies missing. Installing opencv-python-headless and pillow...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "opencv-python-headless", "pillow"])
        print("[OK] Dependencies installed successfully.")

def main():
    install_dependencies()
    import cv2
    import numpy as np
    from PIL import Image

    # Search for video files
    search_dirs = [
        "AP",
        "videos",
        "."
    ]
    
    video_extensions = (".mp4", ".mov", ".avi", ".mkv", ".webm")
    found_videos = []
    
    for folder in search_dirs:
        if not os.path.exists(folder):
            continue
        for file in os.listdir(folder):
            if file.lower().endswith(video_extensions):
                full_path = os.path.join(folder, file)
                found_videos.append(full_path)
                
    if not found_videos:
        print("\n[ERROR] No video file found in 'AP', 'videos', or root directory!")
        print("Please save your zipper video (e.g. 'cierre.mp4') inside the 'AP' folder and run this script again.")
        sys.exit(1)
        
    print("\nFound the following videos:")
    for idx, vid in enumerate(found_videos):
        print(f"[{idx}] {vid}")
        
    # Default to the first video found, or ask user to place it
    video_path = found_videos[0]
    print(f"\nUsing video: {video_path}")
    
    # Target frame count for scroll animation
    target_frames = 120
    output_dir = os.path.join("AP", "cierre-frames")
    os.makedirs(output_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[ERROR] Could not open video file: {video_path}")
        sys.exit(1)
        
    total_video_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = total_video_frames / fps if fps > 0 else 0
    
    print(f"Total video frames: {total_video_frames} (FPS: {fps:.2f}, Duration: {duration:.2f}s)")
    
    # Calculate indices to sample evenly
    indices = [int(i * (total_video_frames - 1) / (target_frames - 1)) for i in range(target_frames)]
    
    # Clear existing frames in the directory to avoid mixups
    for file in os.listdir(output_dir):
        if file.startswith("frame_") and file.endswith((".webp", ".png", ".jpg")):
            try:
                os.remove(os.path.join(output_dir, file))
            except Exception:
                pass
                
    print(f"Extracting {target_frames} frames to '{output_dir}'...")
    
    frame_idx = 0
    extracted_count = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_idx in indices:
            # We want to extract this frame
            out_index = indices.index(frame_idx)
            
            # 1. Convert to HSV and Grayscale to detect the white background
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # White/light-gray has very low saturation in HSV (S < 40) and is relatively bright (gray > 115)
            hsv_S = hsv[:, :, 1]
            white_mask = (gray > 115) & (hsv_S < 40)
            
            # Convert mask to uint8 (0 for keep, 255 for transparent)
            mask_uint8 = np.zeros_like(gray, dtype=np.uint8)
            mask_uint8[white_mask] = 255
            
            # Apply Morphological Opening to remove any isolated noise on the main subject
            kernel = np.ones((3, 3), np.uint8)
            opened_mask = cv2.morphologyEx(mask_uint8, cv2.MORPH_OPEN, kernel)
            
            # Soften the edges a bit with a Gaussian blur to avoid pixelated edges
            mask_blur = cv2.GaussianBlur(opened_mask, (3, 3), 0)
            
            # Create a 4-channel BGRA image
            rgba_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2BGRA)
            
            # Set alpha channel: invert the blur mask (where background was detected, alpha becomes 0 / transparent)
            rgba_frame[:, :, 3] = cv2.bitwise_not(mask_blur)
            
            # Convert BGRA to RGBA for PIL
            rgba_pil = cv2.cvtColor(rgba_frame, cv2.COLOR_BGRA2RGBA)
            img = Image.fromarray(rgba_pil)
            
            # Save as PNG with perfect quality and transparency
            output_filename = f"frame_{out_index:03d}.png"
            output_path = os.path.join(output_dir, output_filename)
            img.save(output_path, "PNG")
            extracted_count += 1
            
        frame_idx += 1
        
    cap.release()
    print(f"[OK] Successfully extracted {extracted_count} frames to '{output_dir}'!")
    print("Each frame is extracted as a PNG image for maximum quality and transparency.")

if __name__ == "__main__":
    main()
