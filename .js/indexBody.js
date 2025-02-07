let video;
let bodyPose;
let posizioni = [];
let immagine;
let counter = 5;
let esercizio = 1;
let sottoGinocchia = false;
let appenaDecrementatoGinocchia = false;
let bracciaSottoGinocchia;
let incrocioToccarsiCaviglie;
let movimentoBusto;
let complimentiHaiFinito;
let appenaDecrementatoCaviglie = false;
let appenaDecrementatoBusto = false;
let xhome, yhome;

function preload() {
  bodyPose = ml5.bodyPose();   // Carica il modello BodyPose
  immagine = loadImage('immagini/sfondoParquet.jpg'); // Carica l'immagine di sfondo
  menu = loadImage('immagini/CASA_PICCOLA.png');
}

function setup() {
  createCanvas(1500, 850);

  // Crea il video e nascondilo
  video = createCapture(VIDEO);
  video.size(1150, 710);
  video.hide();

  // Rilevamento delle pose nel video
  bodyPose.detectStart(video, gotPoses); // gotPoses è una funzione di callback

  bracciaSottoGinocchia = createImg("gif_movimenti/OMINO_MovimentoBracciaVersoGinocchia.gif");
  bracciaSottoGinocchia.position(558, -40);
  bracciaSottoGinocchia.size(1500, 1800);
  bracciaSottoGinocchia.hide();

  incrocioToccarsiCaviglie = createImg("gif_movimenti/OMINO_movimentoBracciaVersoGinocchiaIncrociato.gif");
  incrocioToccarsiCaviglie.position(558, -40);
  incrocioToccarsiCaviglie.size(1500, 1800);
  incrocioToccarsiCaviglie.hide();

  movimentoBusto = createImg("gif_movimenti/OMINO_movimentoBusto.gif");
  movimentoBusto.position(558, -40);
  movimentoBusto.size(1500, 1800);
  movimentoBusto.hide();

  complimentiHaiFinito = createImg("immagini/HAI_FINITO_IL_CIRCUITO.gif");
  complimentiHaiFinito.position(0, 0);
  complimentiHaiFinito.size(1500, 1000);
  complimentiHaiFinito.hide();

  xhome = 5;
  yhome = 4;
}

function draw() {
  background(immagine);
  
  if(esercizio!=4)
  {
    // video capovolto orizzontalmente
    push(); 
    translate(width, 0); // sposta l'origine della canvas a destra
    scale(-1, 1); // inverte orizzontalmente
    image(video, 500, 140, 1000, 710); // disegna il video sulla canvas
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
          circle(width - (keypoint.x + 420), (keypoint.y+140), 10); // Correggi il flip e l'offset per i keypoints

          // Mostra il nome del keypoint
          fill(255);
          textSize(12);
          text(keypoint.name, width - (keypoint.x + 420) + 10, (keypoint.y+140));
        }
      }
    }

    switch (esercizio) {
      case 1:
        mostraGif();
        mostraTesto("ESERCIZIO 1: TOCCATI LE CAVIGLIE CON I POLSI, POI SALI E ALLUNGATI");
        abbassamento();
        mostraContatore();

        if (counter === 0) 
        {
          counter=6;
          esercizio++;
        }
        break;
      case 2:
        mostraGif();
        mostraTesto("ESERCIZIO 2: TOCCATI LA CAVIGLIA SINISTRA CON IL POLSO DESTRO E VICEVERSA");
        toccarsiCaviglie();
        mostraContatore();

        if (counter === 0) 
        {
          counter=5;
          esercizio++;
        }
        break;
      case 3:
        mostraGif();
        mostraTesto("ESERCIZIO 3, RUOTA IL BUSTO");
        giramentoBusto();
        mostraContatore();

        if(counter===0)
        {
          counter=6;
          esercizio++;
        }
    }
  }
  else
  {
    bracciaSottoGinocchia.hide();
    incrocioToccarsiCaviglie.hide();
    movimentoBusto.hide();
    complimentiHaiFinito.show();
  }
  
  image(menu, xhome, yhome);
}

// Callback per il rilevamento delle pose
function gotPoses(results) {
  posizioni = results;
}

function mostraContatore() {
  // Disegna il contatore con cerchio e testo
  fill(0, 102, 255); // Colore del cerchio rosso
  ellipse(1250, 189, 250, 250); // Posizione e dimensione del cerchio
  fill(255);
  textSize(30);
  text("RIPETIZIONI", 1250, 134);
  textSize(150);
  text(`${counter}`, 1253, 269);
}


function abbassamento() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];
    let leftWrist = pose.keypoints.find(kp => kp.name === "left_wrist");
    let rightWrist = pose.keypoints.find(kp => kp.name === "right_wrist");
    let leftKnee = pose.keypoints.find(kp => kp.name === "left_knee");
    let rightKnee = pose.keypoints.find(kp => kp.name === "right_knee");

    if (rightWrist && rightWrist.confidence > 0.1 && leftWrist && leftWrist.confidence > 0.1 && 
        rightKnee && rightKnee.confidence > 0.1 && leftKnee && leftKnee.confidence > 0.1) 
    {
      // Se i polsi sono sotto le ginocchia
      if (rightWrist.y > rightKnee.y && leftWrist.y > leftKnee.y) {
        sottoGinocchia = true;
      } else if (rightWrist.y < rightKnee.y && leftWrist.y < leftKnee.y) {
        sottoGinocchia = false;
      }

      // Se i polsi sono sotto le ginocchia e il contatore non è stato decrementato
      if (sottoGinocchia && !appenaDecrementatoGinocchia) {
        counter--; // Decrementa il contatore
        appenaDecrementatoGinocchia = true; // Impedisce ulteriori decrementi finché non si torna sopra le ginocchia
      }

      // Se i polsi sono sopra le ginocchia, resettare lo stato appenaDecrementato
      if (!sottoGinocchia) {
        appenaDecrementatoGinocchia = false;
      }
    }
  }
}


function toccarsiCaviglie() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];
    let leftWrist = pose.keypoints.find(kp => kp.name === "left_wrist");
    let rightWrist = pose.keypoints.find(kp => kp.name === "right_wrist");
    let leftAnkle = pose.keypoints.find(kp => kp.name === "left_ankle");
    let rightAnkle = pose.keypoints.find(kp => kp.name === "right_ankle");

    if (rightWrist && rightWrist.confidence > 0.1 && leftWrist && leftWrist.confidence > 0.1 && 
        rightAnkle && rightAnkle.confidence > 0.1 && leftAnkle && leftAnkle.confidence > 0.1) 
    {
      if(counter % 2 === 0) { 
        if (leftAnkle.y - rightWrist.y < 150 && Math.abs(rightWrist.x - leftAnkle.x) < 150) //math.abs calcola la distanza tra due punti
        {
          fill(0, 102, 255);
          ellipse(873, 190, 250, 100);
          fill(255);
          textSize(30);
          textStyle(BOLD);
          text("POLSO DX", 875, 195);
          if (!appenaDecrementatoCaviglie) { 
            counter--;
            appenaDecrementatoCaviglie = true;
          }
        }
      } 
      else { 
        // Controllo per polso sinistro su caviglia destra
        if (rightAnkle.y - leftWrist.y < 150 && Math.abs(leftWrist.x - rightAnkle.x) < 150) 
        {
          fill(0, 102, 255);
          ellipse(873, 190, 250, 100);
          fill(255);
          textSize(30);
          textStyle(BOLD);
          text("POLSO SX", 875, 195);
          if (!appenaDecrementatoCaviglie) { // Evita decrementi multipli
            counter--;
            appenaDecrementatoCaviglie = true;
          }
        }
      }
    } 
    else {
      // Resetta la variabile quando i polsi si allontanano dalle caviglie
      appenaDecrementatoCaviglie = false;
    }
  }
}

//esercizio del busto 
function giramentoBusto() {
  if (posizioni.length > 0) {
    let pose = posizioni[0];
    let leftShoulder = pose.keypoints.find(kp => kp.name === "left_shoulder");
    let rightShoulder = pose.keypoints.find(kp => kp.name === "right_shoulder");

    if (rightShoulder && rightShoulder.confidence > 0.1 && leftShoulder && leftShoulder.confidence > 0.1) 
    {
      // Calcola la distanza tra le due spalle
      let distanzaSpalle = dist(leftShoulder.x, leftShoulder.y, rightShoulder.x, rightShoulder.y);

      // Se la distanza tra le spalle si riduce (indicativo di una rotazione)
      if (distanzaSpalle < 100) { 
        if (!appenaDecrementatoBusto) { 
          counter--;
          appenaDecrementatoBusto = true;
        }
      } 
      else { 
        appenaDecrementatoBusto = false; 
      }
    }
  }
}




function mostraGif() {

  bracciaSottoGinocchia.hide();
  incrocioToccarsiCaviglie.hide();
  movimentoBusto.hide();
  
  if(esercizio===1)
  {
    bracciaSottoGinocchia.show();
  }
  else if(esercizio===2)
  {
    incrocioToccarsiCaviglie.show();
  }
  else if(esercizio===3)
  {
    movimentoBusto.show();
  }
}


function mostraTesto(testo) {
  if(esercizio===2)
  {
    // Colore per l'ombra (bordo)
    fill(0, 102, 255); // Ombra blu
    textSize(30);
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
    textSize(40);
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
