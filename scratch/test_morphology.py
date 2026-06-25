import cv2
import numpy as np

def main():
    video_path = "AP/cierre.mp4"
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error")
        return
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Test at 5% (closed)
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(total_frames * 0.05))
    ret, frame = cap.read()
    cap.release()
    
    if not ret:
        print("Error reading frame")
        return
        
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    hsv_S = hsv[:, :, 1]
    
    h, w = gray.shape
    
    # Define corners (jeans)
    jeans_mask = np.zeros_like(gray, dtype=bool)
    jeans_mask[:h//3, :w//3] = True
    jeans_mask[:h//3, 2*w//3:] = True
    
    # Threshold: aggressive Gray > 115, Saturation < 45
    white_mask = (gray > 115) & (hsv_S < 45)
    
    # Convert to uint8 for OpenCV morphology
    mask_uint8 = np.zeros_like(gray, dtype=np.uint8)
    mask_uint8[white_mask] = 255
    
    # Apply Morphological Opening with a 3x3 kernel
    kernel = np.ones((3, 3), np.uint8)
    opened_mask = cv2.morphologyEx(mask_uint8, cv2.MORPH_OPEN, kernel)
    
    # Count matches in jeans mask before and after morphology
    before_count = np.sum(mask_uint8[jeans_mask] > 0)
    after_count = np.sum(opened_mask[jeans_mask] > 0)
    
    print(f"Aggressive Threshold (Gray > 125, Sat < 40):")
    print(f"Jeans matches BEFORE morphology: {before_count}")
    print(f"Jeans matches AFTER morphology: {after_count}")

if __name__ == "__main__":
    main()
