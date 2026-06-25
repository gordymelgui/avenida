import cv2
import numpy as np

cap = cv2.VideoCapture("AP/cierre.mp4")
ret, frame = cap.read()
if ret:
    h, w = frame.shape[:2]
    mask = np.zeros((h+2, w+2), np.uint8)
    
    # Floodfill from top-left (assuming it's background)
    # The diff allows slight variations in the white background
    cv2.floodFill(frame, mask, (0,0), (0,255,0), (10,10,10), (10,10,10), cv2.FLOODFILL_MASK_ONLY)
    
    # Mask is 1 for background. It has size h+2, w+2
    bg_mask = mask[1:-1, 1:-1]
    
    cv2.imwrite("AP/test_frame.png", frame)
    cv2.imwrite("AP/test_mask.png", bg_mask * 255)
    print("Test frame and mask generated.")
