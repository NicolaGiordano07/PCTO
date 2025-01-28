let video;
let bodyPose;
let poses = [];
let immagine;

function preload() {
// Carica il modello BodyPose
bodyPose = ml5.bodyPose();
}

function setup() {
createCanvas(600, 480);

// Crea il video e nascondilo
video = createCapture(VIDEO);
video.size(600, 480);
video.hide();

// Inizia il rilevamento delle pose nel video
bodyPose.detectStart(video, gotPoses);
}

function draw() {
// Disegna il video capovolto e croppato
push();
translate(width, 0); // Sposta l'origine della canvas a destra
scale(-1, 1); // Inverti orizzontalmente
image(video, 0, 0, width, height); // Disegna il video sulla canvas
pop();

// Disegna i keypoints

for (let i = 0; i < poses.length; i++) {
  let pose = poses[i];
  for (let j = 0; j < pose.keypoints.length; j++) {
    let keypoint = pose.keypoints[j];
    if (keypoint.confidence > 0.1) {
      // Disegna il cerchio
      fill(0, 255, 0);
      noStroke();
      circle(width - keypoint.x, keypoint.y, 10); // Correggi il flip per i keypoints

      // Mostra il nome del keypoint
      fill(255);
      textSize(12);
      text(keypoint.name, width - keypoint.x + 10, keypoint.y);
    }
  }
}

// Controlla la posizione di right_wrist
if (poses.length > 0) {
  let pose = poses[0]; // Usa la prima posa rilevata
  let rightWrist = pose.keypoints.find(kp => kp.name === "right_wrist");
}
}

// Callback per il rilevamento delle pose
function gotPoses(results) {
poses = results;
}