import cv2
import numpy as np

def main():
    video_path = "AP/cierre.mp4"
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error: Could not open video.")
        return
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Test different frames (e.g. at 20%, 40%, 60%, 80% of the video)
    test_fractions = [0.2, 0.4, 0.6, 0.8]
    
    for frac in test_fractions:
        frame_no = int(total_frames * frac)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_no)
        ret, frame = cap.read()
        if not ret:
            continue
            
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        hsv_S = hsv[:, :, 1]
        
        # Test thresholds: Gray > 110, Saturation < 50
        white_mask = (gray > 110) & (hsv_S < 50)
        
        # Count matches in the jeans areas (outer columns: X < w/4 and X > 3*w/4)
        h, w = gray.shape
        left_jeans = white_mask[:, :w//4]
        right_jeans = white_mask[:, 3*w//4:]
        
        left_matches = np.sum(left_jeans)
        right_matches = np.sum(right_jeans)
        
        print(f"Frame {frame_no:03d} (at {frac*100}%): Jeans matches: Left={left_matches}, Right={right_matches}")
        
    cap.release()

if __name__ == "__main__":
    main()
