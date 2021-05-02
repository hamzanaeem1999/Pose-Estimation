let video;
let poseNet;
let pose;
let skeleton;

let coordinates_of_x1 = -1;
let coordinates_of_x2 = -1;
let coordinates_of_y1 = -1;
let coordinates_of_y2 = -1;
let coordinates_of_x3 = -1;
let coordinates_of_x4 = -1;
let coordinates_of_y3 = -1;
let coordinates_of_y4 = -1;
let coordinates_of_x5 = -1;
let coordinates_of_x6 = -1;
let coordinates_of_y5 = -1;
let coordinates_of_y6 = -1;


function setup() {
  let cnv=  createCanvas(640, 480);
  cnv.id('mycanvas');
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);


    var myVar;
    myVar = setInterval(get_Keypoints(pose.keypoints), 1000);

    // console.log(pose.keypoints)
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;

      fill(0, 255, 0);
      ellipse(x, y, 16, 16);

    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}

function get_Keypoints(keypoint)
{
  let myStorage;
  for (let i = 0; i < keypoint.length; i++) {

    if ((keypoint[i].part === 'leftHip') || (keypoint[i].part === 'rightHip') || (keypoint[i].part === 'leftKnee') || (keypoint[i].part === 'rightKnee') || (keypoint[i].part === 'leftAnkle') || (keypoint[i].part === 'rightAnkle')) {

      if (keypoint[i].part === 'leftHip' && keypoint[i].score > 0.80) {
        coordinates_of_x1 = keypoint[i].position.x
        coordinates_of_y1 = keypoint[i].position.y
      }

      if (keypoint[i].part === 'rightHip' && keypoint[i].score > 0.80) {
        coordinates_of_x2 = keypoint[i].position.x
        coordinates_of_y2 = keypoint[i].position.y
      }

      if (keypoint[i].part === 'leftKnee' && keypoint[i].score > 0.80) {
        coordinates_of_x3 = keypoint[i].position.x
        coordinates_of_y3 = keypoint[i].position.y
      }

      if (keypoint[i].part === 'rightKnee' && keypoint[i].score > 0.80) {
        coordinates_of_x4 = keypoint[i].position.x
        coordinates_of_y4 = keypoint[i].position.y
      }

      if (keypoint[i].part === 'leftAnkle' && keypoint[i].score > 0.80) {
        coordinates_of_x5 = keypoint[i].position.x
        coordinates_of_y5 = keypoint[i].position.y
      }

      if (keypoint[i].part === 'rightAnkle' && keypoint[i].score > 0.80) {
        coordinates_of_x6 = keypoint[i].position.x
        coordinates_of_y6 = keypoint[i].position.y
      }

      if (coordinates_of_x1 !== -1 && coordinates_of_x2 !== -1 && coordinates_of_x3 !== -1 && coordinates_of_x4 !== -1 && coordinates_of_x5 !== -1 && coordinates_of_x6 !== -1) {
        var Hip_distance = (sqrt(sq(coordinates_of_x2 - coordinates_of_x1) + (sq(coordinates_of_y2 - coordinates_of_y1))));
        var Knee_distance = (sqrt(sq(coordinates_of_x4 - coordinates_of_x3) + (sq(coordinates_of_y4 - coordinates_of_y3))));
        var Ankle_distance = (sqrt(sq(coordinates_of_x6 - coordinates_of_x5) + (sq(coordinates_of_y6 - coordinates_of_y5))));
        var LeftHip_to_LeftKnee_distance=(sqrt(sq(coordinates_of_x3 - coordinates_of_x1) + (sq(coordinates_of_y3 - coordinates_of_y1))));
        var LeftKnee_to_LeftAnkle_distance=(sqrt(sq(coordinates_of_x5 - coordinates_of_x3) + (sq(coordinates_of_y5 - coordinates_of_y3))));
        var RightHip_to_RightKnee_distance=(sqrt(sq(coordinates_of_x4 - coordinates_of_x2) + (sq(coordinates_of_y4 - coordinates_of_y2))));
        var RightKnee_to_RightAnkle_distance=(sqrt(sq(coordinates_of_x6 - coordinates_of_x4) + (sq(coordinates_of_y6 - coordinates_of_y4))));

        // myStorage = window.localStorage;

        //You can use the below code to get the distances from local storage , if you have already saved that using
        // image_sketch.js

        // var Base_Image_Hip_distance = myStorage.getItem("Hip_distance")
        // var Base_Image_Knee_distance = myStorage.getItem("Knee_distance")
        // var Base_Image_Ankle_distance = myStorage.getItem("Ankle_distance")
        // var Base_Image_LeftHip_to_LeftKnee_distance = myStorage.getItem("LeftHip_to_LeftKnee_distance")
        // var Base_Image_LeftKnee_to_LeftAnkle_distance = myStorage.getItem("LeftKnee_to_LeftAnkle_distance")
        // var Base_Image_RightHip_to_RightKnee_distance = myStorage.getItem("RightHip_to_RightKnee_distance")
        // var Base_Image_RightKnee_to_RightAnkle_distance = myStorage.getItem("RightKnee_to_RightAnkle_distance")



        // Hard-Coded the values of base image
        var Base_Image_Hip_distance = 174.72427371231296
        var Base_Image_Knee_distance = 660.5118150798683
        var Base_Image_Ankle_distance = 501.31782238000164
        var Base_Image_LeftHip_to_LeftKnee_distance = 237.83881435395548
        var Base_Image_LeftKnee_to_LeftAnkle_distance = 307.20643048749656
        var Base_Image_RightHip_to_RightKnee_distance = 249.68416299263774
        var Base_Image_RightKnee_to_RightAnkle_distance = 316.9116545455167


        //Similarities between base image and frames
        var Rate_of_Change_of_Hip_Distance =Math.abs((1- (((Base_Image_Hip_distance - Hip_distance)/Base_Image_Hip_distance)*100)))
        var Rate_of_Change_of_Knee_Distance =Math.abs((1- (((Base_Image_Knee_distance - Knee_distance)/Base_Image_Knee_distance)*100)))
        var Rate_of_Change_of_Ankle_Distance =Math.abs((1- (((Base_Image_Ankle_distance - Ankle_distance)/Base_Image_Ankle_distance)*100)))
        var Rate_of_Change_of_LeftHip_to_LeftKnee_distance =Math.abs((1- (((Base_Image_LeftHip_to_LeftKnee_distance - LeftHip_to_LeftKnee_distance)/Base_Image_LeftHip_to_LeftKnee_distance)*100)))
        var Rate_of_Change_of_LeftKnee_to_LeftAnkle_distance =Math.abs((1- (((Base_Image_LeftKnee_to_LeftAnkle_distance - LeftKnee_to_LeftAnkle_distance)/Base_Image_LeftKnee_to_LeftAnkle_distance)*100)))
        var Rate_of_Change_of_RightHip_to_RightKnee_distance =Math.abs((1- (((Base_Image_RightHip_to_RightKnee_distance - RightHip_to_RightKnee_distance)/Base_Image_RightHip_to_RightKnee_distance)*100)))
        var Rate_of_Change_of_RightKnee_to_RightAnkle_distance =Math.abs((1- (((Base_Image_RightKnee_to_RightAnkle_distance - RightKnee_to_RightAnkle_distance)/Base_Image_RightKnee_to_RightAnkle_distance)*100)))


        var Average_Distance=((((Rate_of_Change_of_Hip_Distance)+(Rate_of_Change_of_Knee_Distance)+(Rate_of_Change_of_Ankle_Distance)+
            (Rate_of_Change_of_LeftHip_to_LeftKnee_distance)+(Rate_of_Change_of_LeftKnee_to_LeftAnkle_distance)+
            (Rate_of_Change_of_RightHip_to_RightKnee_distance)+(Rate_of_Change_of_RightKnee_to_RightAnkle_distance))/7))

        console.log("Similarity after every second from refrence image",Average_Distance,"%")
        document.getElementById("MyScore").innerHTML=Average_Distance+'% matches';


      }
    }
  }



}
