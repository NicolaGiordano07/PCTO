let video;
let bodyPose;
let posizioni = [];
let immagine;
let movimentoBraccia90;
let movimentoBracciaAvanti;
let movimentoBracciaIndietro;
let movimentoBracciaSuGiu;
let movimentoBracciaSpalle;
let complimentiHaiFinito;
let counter = 6;
let esercizio = 1;
let xhome, yhome;

function preload() {
  bodyPose = ml5.bodyPose();   // Carica il modello BodyPose
  immagine = loadImage('immagini/sfondoParquet.jpg'); // Carica l'immagine di sfondo
  menu = loadImage('immagini/CASA_PICCOLA.png'); //carica l'immagine per tornare alla home
}

function setup() {
  createCanvas(1500, 850);

  // Crea il video e nascondilo
  video = createCapture(VIDEO);
  video.size(1150, 710);
  video.hide();

  // Carica le GIF degli esercizi
  movimentoBraccia90 = createImg("gif_movimenti/OMINO_MovimentoBraccia90Destra90Sinistra.gif");
  movimentoBraccia90.position(550, 30);
  movimentoBraccia90.size(1500, 1800);
  movimentoBraccia90.hide();

  movimentoBracciaAvanti = createImg("gif_movimenti/OMINO_MovimentoBracciaAvanti.gif");
  movimentoBracciaAvanti.position(550, 30);
  movimentoBracciaAvanti.size(1500, 1800);
  movimentoBracciaAvanti.hide();

  movimentoBracciaIndietro = createImg("gif_movimenti/OMINO_MovimentoBracciaIndietro.gif");
  movimentoBracciaIndietro.position(550, 30);
  movimentoBracciaIndietro.size(1500, 1800);
  movimentoBracciaIndietro.hide();

  movimentoBracciaSuGiu = createImg("gif_movimenti/OMINO_MovimentoBracciaSuEGiu.gif");
  movimentoBracciaSuGiu.position(550, 30);
  movimentoBracciaSuGiu.size(1500, 1800);
  movimentoBracciaSuGiu.hide();

  movimentoBracciaSpalle = createImg("gif_movimenti/OMINO_MovimentoBracciaVersoSpalle.gif");
  movimentoBracciaSpalle.position(550, 30);
  movimentoBracciaSpalle.size(1500, 1800);
  movimentoBracciaSpalle.hide();

  complimentiHaiFinito = createImg("immagini/HAI_FINITO_IL_CIRCUITO.gif");
  complimentiHaiFinito.position(0, 0);
  complimentiHaiFinito.size(1500, 1000);
  complimentiHaiFinito.hide();

  xhome = 5;
  yhome = 4;

  // Rilevamento delle pose nel video
  bodyPose.detectStart(video, gotPoses); // gotPoses è una funzione di callback
}

function draw() {
  background(immagine); // Disegna lo sfondo
  
  if(esercizio!=6)
  {
    // Video capovolto orizzontalmente
    push(); 
    translate(width, 0); // Sposta l'origine della canvas a destra
    scale(-1, 1); // Inverti orizzontalmente
    image(video, 500, 140, 1000, 710); // Disegna il video sulla canvas
    pop();
    
    // Disegna i keypoints
    for (let i = 0; i < posizioni.length; i++) {
      let pose = posizioni[i];
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.confidence > 0.1) {
          // Disegna il cerchio sui punti chiave
          fill(0, 255, 0);
          noStroke();
          circle(width - (keypoint.x + 430), (keypoint.y+140), 10); // Correggi il flip e l'offset per i keypoints

          // Mostra il nome del keypoint
          fill(255);
          textSize(12);
          text(keypoint.name, width - (keypoint.x + 420), (keypoint.y + 140));
        }
      }
    }

    switch (esercizio) {
      case 1:
        mostraGif(movimentoBraccia90);
        mostraTesto("ESERCIZIO 1: ALZA LE BRACCIA A 90°, ALTERNA DESTRO E SINISTRO");
        movimentoBracciaNovanta();
        mostraContatore();
        break;

      case 2:
        mostraGif();
        mostraTesto("ESERCIZIO 2: ROTAZIONE DELLE BRACCIA IN AVANTI");
        movimentoRotazioneAvantiIndietro();
        mostraContatore();
        break;

      case 3:
        mostraGif();
        mostraTesto("ESERCIZIO 3: ROTAZIONI DELLE BRACCIA INDIETRO");
        movimentoRotazioneAvantiIndietro();
        mostraContatore();
        break;

      case 4:
        mostraGif();
        mostraTesto("ESERCIZIO 4: ALZA LE BRACCIA, ALTERNA DESTRO E SINISTRO");
        movimentoRotazioneAvantiIndietro();
        mostraContatore();
        break;
      case 5:
        mostraGif();
        mostraTesto("ESERCIZIO 5: TOCCATI LA SPALLA CON IL POLSO, ALTERNA DESTRO E SINISTRO");
        movimentoToccarsiSpallaOpposta();
        mostraContatore();
        break;
    }
  }
  else
  {
    movimentoBraccia90.hide();
    movimentoBracciaIndietro.hide();
    movimentoBracciaSuGiu.hide();
    movimentoBracciaSpalle.hide();
    movimentoBracciaAvanti.hide();
    complimentiHaiFinito.show();
  }

  image(menu, xhome, yhome);
}


// Callback per il rilevamento delle pose
function gotPoses(results) {
  posizioni = results;
}

function mostraContatore() {
  fill(0, 102, 255); // Imposta il colore del cerchio (rosso)
  ellipse(1250, 215, 250, 250); // Disegna il cerchio (x, y, diametro, diametro)
  fill(255);
  textSize(30);
  text(`RIPETIZIONI`, 1250, 160);
  textSize(150);
  text(`${counter}`, 1253, 295);
  textSize(80);
  if (counter === 0) 
  {
    counter = 6;
    esercizio++;
  }
}


function movimentoBracciaNovanta() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];
    let leftWrist = pose.keypoints.find(kp => kp.name === "left_wrist");
    let rightWrist = pose.keypoints.find(kp => kp.name === "right_wrist");

    if (rightWrist && rightWrist.confidence > 0.1 && leftWrist && leftWrist.confidence > 0.1) {
      if (counter % 2 === 0) 
      {
        fill(0, 102, 255);
        ellipse(873, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("BRACCIO DX", 875, 195);
        if (rightWrist.y < 300)
        {
          counter--;
        }
      } 
      else 
      {
        fill(0, 102, 255);
        ellipse(113, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("BRACCIO SX", 115, 195);
        if (leftWrist.y < 300)
        {
          counter--;
        }
      }
    }
  }
}


function movimentoRotazioneAvantiIndietro() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];
    let leftWrist = pose.keypoints.find(kp => kp.name === "left_wrist");
    let rightWrist = pose.keypoints.find(kp => kp.name === "right_wrist");

    if (rightWrist && rightWrist.confidence > 0.1 && leftWrist && leftWrist.confidence > 0.1) {
      if (counter % 2 === 0) 
      {
        fill(0, 102, 255);
        ellipse(873, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("BRACCIO DX", 875, 195);
        if (rightWrist.y < 100)
        {
          counter--;
        }
      } 
      else 
      {
        fill(0, 102, 255);
        ellipse(113, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("BRACCIO SX", 115, 195);
        if (leftWrist.y < 100) 
        {
          counter--;
        }
      }
    }
  }
}

//esercizio toccarsi spalla opposta
function movimentoToccarsiSpallaOpposta() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];
    let leftWrist = pose.keypoints.find(kp => kp.name === "left_wrist");
    let rightWrist = pose.keypoints.find(kp => kp.name === "right_wrist");
    let leftShoulder = pose.keypoints.find(kp => kp.name === "left_shoulder");
    let rightShoulder = pose.keypoints.find(kp => kp.name === "right_shoulder");

    if (rightWrist && rightWrist.confidence > 0.1 && leftWrist && leftWrist.confidence > 0.1 && rightShoulder && rightShoulder.confidence > 0.1 && leftShoulder && leftShoulder.confidence > 0.1) 
    {
      if (counter % 2 === 0) 
      {
        fill(0, 102, 255);
        ellipse(873, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("BRACCIO DX", 875, 195);
        if (rightWrist.y <= leftShoulder.y)
        {
          counter--;
        }
      } 
      else 
      {
        fill(0, 102, 255);
        ellipse(113, 190, 250, 100);
        fill(255);
        textSize(30);
        textStyle(BOLD);
        text("BRACCIO SX", 115, 195);
        if (leftWrist.y <= rightShoulder.y)
        {
          counter--;
        }
      }
    }
  }
}

function mostraGif() {
  movimentoBraccia90.hide();
  movimentoBracciaAvanti.hide();
  movimentoBracciaIndietro.hide();
  movimentoBracciaSuGiu.hide();
  movimentoBracciaSpalle.hide();
  
  if(esercizio===1)
  {
    movimentoBraccia90.show();
  }
  else if(esercizio===2)
  {
    movimentoBracciaAvanti.show();
  }
  else if(esercizio===3)
  {
    movimentoBracciaIndietro.show();
  }
  else if(esercizio===4)
  {
    movimentoBracciaSuGiu.show();
  }
  else if(esercizio===5)
  {
    movimentoBracciaSpalle.show();
  }
}

// Funzione per mostrare testo dell'esercizio
function mostraTesto(testo) {
  if(esercizio!=5)
  {
    // Colore per l'ombra (bordo)
    fill(0, 102, 255); // Ombra blu
    textSize(40);
    textAlign(CENTER); // Centra il testo
    textStyle(BOLD); // Grassetto
    
    // Aggiungi un piccolo offset per l'ombra
    text(testo, width / 2 + 4, 50 + 4); // Ombra (spostamento di 4px a destra e in basso)
    
    // Colore del testo
    fill(255); // Colore principale del testo (bianco)
    text(testo, width / 2, 50); // Testo centrato
  }
  else
  {
    // Colore per l'ombra (bordo)
    fill(0, 102, 255); // Ombra blu
    textSize(35);
    textAlign(CENTER); // Centra il testo
    textStyle(BOLD); // Grassetto
    
    // Aggiungi un piccolo offset per l'ombra
    text(testo, width / 2 + 4, 50 + 4); // Ombra (spostamento di 4px a destra e in basso)
    
    // Colore del testo
    fill(255); // Colore principale del testo (bianco)
    text(testo, width / 2, 50); // Testo centrato
  }
  
}

function mouseClicked(){
  let dhome = dist(mouseX, mouseY, xhome, yhome);

  if(dhome < 50){
    window.location.href = "pcto.HTML";
  }
}
