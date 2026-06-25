import cv2
import numpy as np

def main():
    video_path = "AP/cierre.mp4"
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error")
        return
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Analyze frame at 5% where the zipper is closed
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
    
    # Define corners (always jeans)
    # Top-left corner: Y < h/3, X < w/3
    # Top-right corner: Y < h/3, X > 2*w/3
    jeans_mask = np.zeros_like(gray, dtype=bool)
    jeans_mask[:h//3, :w//3] = True
    jeans_mask[:h//3, 2*w//3:] = True
    
    # Define center bottom (where the shadow is, Y between h/2 and h*0.8, X near center)
    shadow_mask = np.zeros_like(gray, dtype=bool)
    shadow_mask[h//2:int(h*0.8), w//2-40:w//2+40] = True
    
    # Test grid of thresholds
    print(f"{'GrayThresh':<12}{'SatThresh':<12}{'Jeans matches':<15}{'Shadow matches':<15}")
    print("-" * 55)
    
    for gray_thresh in [120, 130, 140, 150, 160, 170]:
        for sat_thresh in [35, 40, 45, 50, 55]:
            white_mask = (gray > gray_thresh) & (hsv_S < sat_thresh)
            
            jeans_count = np.sum(white_mask & jeans_mask)
            shadow_count = np.sum(white_mask & shadow_mask)
            
            print(f"{gray_thresh:<12}{sat_thresh:<12}{jeans_count:<15}{shadow_count:<15}")

if __name__ == "__main__":
    main()
