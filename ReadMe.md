Introduction:
                This module is about Pose Estimation , which gives the percentage of similarity between Reference image
and live stream video frames. 
Dependencies:

1) P5 JavaScript library
2) ML5 Javascript library
3) PoseNet Model
4) HTML5 
5) Core JavaScript

Image_sketch.html:
                In Image_sketch.html , you can save the distances between coordinates of reference image on browser's 
local storage and you can visualize the keypoints too.

index.html:
                In index.html file, you will get the distances between coordinates of frames in live stream and 
reference image, once model gets complete coordinates it will give you the difference between frames and reference image.

sketch.js:
                This file contains the actual code of javascript which computes the difference between the keypoints of  
reference image and live video frames. Currently , the keypoints are hardcoded but the code for getting the keypoints from
the local storage is written and commented in this file. Use this code if you have already used Image_sketch.js file for
saving the keypoints in the local storage.