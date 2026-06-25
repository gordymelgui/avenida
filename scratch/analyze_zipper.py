import cv2
import numpy as np

def main():
    video_path = "AP/cierre.mp4"
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error: Could not open video.")
        return
        
    # Read frame around the middle of the video where the zipper is half open
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    target_frame = int(total_frames * 0.6)
    cap.set(cv2.CAP_PROP_POS_FRAMES, target_frame)
    ret, frame = cap.read()
    cap.release()
    
    if not ret:
        print("Error: Could not read frame.")
        return
        
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # We will sample different regions of the image to see their values
    # The image size:
    h, w, _ = frame.shape
    print(f"Frame dimensions: {w}x{h}")
    
    # Let's print out the min/max values for HSV and Gray in different horizontal slices
    # The center column (w // 2) is where the white background is.
    # The sides (e.g. w // 8, 7 * w // 8) are where the blue jeans are.
    
    print("\n--- ANALYZING CENTER COLUMN (EXPECTED BACKGROUND) ---")
    center_x = w // 2
    # Sample from top (where zipper is open) to bottom
    for y in range(50, h - 50, h // 10):
        val_gray = gray[y, center_x]
        val_hsv = hsv[y, center_x]
        print(f"At Y={y:03d}, X={center_x:03d} | Gray={val_gray:03d} | HSV={val_hsv}")
        
    print("\n--- ANALYZING LEFT SIDE (EXPECTED BLUE JEANS) ---")
    left_x = w // 8
    for y in range(50, h - 50, h // 10):
        val_gray = gray[y, left_x]
        val_hsv = hsv[y, left_x]
        print(f"At Y={y:03d}, X={left_x:03d} | Gray={val_gray:03d} | HSV={val_hsv}")

if __name__ == "__main__":
    main()
