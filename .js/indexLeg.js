let video;
let bodyPose;
let posizioni = [];
let immagine;
let counter = 5;
let esercizio = 1;
let movimentoGambeLateraliTese;
let movimentoSkip;
let complimentiHaiFinito;


function preload() {
  bodyPose = ml5.bodyPose();
  immagine = loadImage('immagini/sfondoParquet.jpg');
  menu = loadImage('immagini/CASA_PICCOLA.png');
}

function setup() {
  createCanvas(1500, 850);

  video = createCapture(VIDEO);
  video.size(1150, 710);
  video.hide();

  bodyPose.detectStart(video, gotPoses);

  movimentoGambeLateraliTese = createImg("gif_movimenti/OMINO_MovimentoGambeLateraliTese.gif");
  movimentoGambeLateraliTese.position(550, 30);
  movimentoGambeLateraliTese.size(1500, 1800);
  movimentoGambeLateraliTese.hide();

  movimentoSkip = createImg("gif_movimenti/OMINO_MovimentoSkip.gif");
  movimentoSkip.position(558, -40);
  movimentoSkip.size(1500, 1800);
  movimentoSkip.hide();

  complimentiHaiFinito = createImg("immagini/HAI_FINITO_IL_CIRCUITO.gif");
  complimentiHaiFinito.position(0, 0);
  complimentiHaiFinito.size(1500, 1000);
  complimentiHaiFinito.hide();

  xhome = 5;
  yhome = 4;
}

function draw() {
  background(immagine);

  if(esercizio!=3)
  {
    push(); 
    translate(width, 0);
    scale(-1, 1);
    image(video, 500, 140, 1000, 710);
    pop();

    for (let i = 0; i < posizioni.length; i++) {
      let pose = posizioni[i];
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.confidence > 0.1) {
          fill(0, 255, 0);
          noStroke();
          circle(width - (keypoint.x + 420), keypoint.y + 140, 10);
          fill(255);
          textSize(12);
          text(keypoint.name, width - (keypoint.x + 420) + 10, keypoint.y + 140);
        }
      }
    }

    switch (esercizio) {
      case 1:
        mostraTesto("ESERCIZIO 1: ALZA UNA GAMBA TESA, ABBASSALA E POI CAMBIA GAMBA");
        alzaGambeDaSeduto();
        mostraContatore();
        mostraGif();
        if (counter === 0) {
          counter = 5;
          esercizio++;
        }
        break;
      case 2:
        mostraTesto("ESERCIZIO 2: SKIP");
        skip();
        mostraGif();
        mostraContatore();
        if (counter === 0) 
        {
          counter = 5;
          esercizio++;
        }
        break;
    }
  }
  else
  {
    movimentoGambeLateraliTese.hide();
    movimentoSkip.hide();
    complimentiHaiFinito.show();
  }

  image(menu, xhome, yhome);
  
}

function gotPoses(results) {
  if (results.length > 0) {
    posizioni = results;
  }
}

function mostraContatore() {
  fill(0, 102, 255);
  ellipse(1250, 189, 250, 250);
  fill(255);
  textSize(30);
  text("RIPETIZIONI", 1250, 134);
  textSize(150);
  text(`${counter}`, 1253, 269);
}

function mostraTesto(testo) {
  fill(0, 102, 255);
  textSize(40);
  textAlign(CENTER);
  textStyle(BOLD);
  text(testo, width / 2 + 4, 50 + 4);
  fill(255);
  text(testo, width / 2, 50);
}

function alzaGambeDaSeduto() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];

    let leftAnkle = pose.keypoints.find(kp => kp.name === "left_ankle");
    let rightAnkle = pose.keypoints.find(kp => kp.name === "right_ankle");
    let leftHip = pose.keypoints.find(kp => kp.name === "left_hip");
    let rightHip = pose.keypoints.find(kp => kp.name === "right_hip");

    if (leftAnkle && leftAnkle.confidence > 0.1 && rightAnkle && rightAnkle.confidence > 0.1 
        && leftHip && leftHip.confidence > 0.1 && rightHip && rightHip.confidence > 0.1) {
      
      let soglia = 200;  // Prova a ridurre la soglia da 200 a 150 o meno
      
      if (counter % 2 === 0) {
        fill(0, 102, 255);
        ellipse(873, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("GAMBA DX", 875, 195);

        if ((rightAnkle.y - rightHip.y) < soglia) { 
          console.log("Gamba destra sollevata!"); // Debug
          counter--;
        }
      } else {
        fill(0, 102, 255);
        ellipse(113, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("GAMBA SX", 115, 195);

        if ((leftAnkle.y - leftHip.y) < soglia) {
          console.log("Gamba sinistra sollevata!"); // Debug
          counter--;
        }
      }
    }
  }
}

//esercizio skip
function skip() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];

    let leftAnkle = pose.keypoints.find(kp => kp.name === "left_ankle");
    let rightAnkle = pose.keypoints.find(kp => kp.name === "right_ankle");

    if (leftAnkle && leftAnkle.confidence > 0.1 && rightAnkle && rightAnkle.confidence > 0.1)
    {
      let soglia = 500;  // Prova a ridurre la soglia da 200 a 150 o meno
      
      if (counter % 2 === 0) {
        fill(0, 102, 255);
        ellipse(113, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("GAMBA SX", 115, 195);

        if (leftAnkle.y < soglia) { 
          console.log("Gamba sinistra sollevata!"); // Debug
          counter--;
        }
      } else {
        fill(0, 102, 255);
        ellipse(873, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("GAMBA DX", 875, 195); 

        if (rightAnkle.y < soglia) {
          console.log("Gamba destra sollevata!"); // Debug
          counter--;
        }
      }
    }
  }
}


function mostraGif() {
  movimentoGambeLateraliTese.hide();
  movimentoSkip.hide();
  
  if(esercizio===1)
  {
    movimentoGambeLateraliTese.show();
  }
  else if(esercizio===2)
  {
    movimentoSkip.show();
  }
}

function mouseClicked(){
  let dhome = dist(mouseX, mouseY, xhome, yhome);

  if(dhome < 50){
    window.location.href = "pcto.HTML";
  }
}