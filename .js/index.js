let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5;
let song;
let playButton;
let isPlaying = false;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();      //parte dedicata all'audio
const gainNode = audioCtx.createGain();
gainNode.gain.value = 0.5;

function preload(){
    sfondo = loadImage('immagini/SFONDO_PCTO.png');
    menu = loadImage('immagini/CASA.png');
    arm = loadImage('immagini/arm.png');
    legs = loadImage('immagini/legs.png');
    body = loadImage('immagini/body.png');
    song= loadSound('audio/chill_guy.mp3');
    info = loadImage('immagini/info.png');
    head = loadImage('immagini/head.png');    
    muto = loadImage('immagini/volume_no.png');
}

function setup() {
   createCanvas(1530, 839);

    // Blocco 1 - arm
    x1 = width / 20;
    y1 = height / 1.40;

    // Blocco 2 - legs
    x2 = (4 * width) / 5.75;
    y2 = height / 1.41;

    // Blocco 3 - body
    x3 = (3 * width) / 6.39;
    y3 = height / 1.19;

    // Blocco 4 - head
    x4 = (2 * width) / 8.7;
    y4 = height / 1.40;

    // Blocco 5 - info
    x5 = (5 * width) / 5.80 ;
    y5 = height / 1.40;
    
}


function draw() {
    background(sfondo);  //palestra caricata 

    image(arm, x1, y1);  //immagine cliccabile per le braccia

    image(legs, x2, y2); //immagine cliccabile per le gambe

    image(body, x3, y3); //immagine cliccabile per il corpo

    image(head, x4, y4); //immagine cliccabile per la testa

    image(info, x5, y5); //immagine cliccabile per le informazioni su di noi

    image(muto, 10, 2); //immagine per il muto
}

function mouseClicked() {
    let d1 = dist(mouseX, mouseY, x1 + arm.width / 2, y1 + arm.height / 2);         //funzione usata per calcolare la distanza tra il cursore del mouse e il centro dell'icona di ARM
    let d2 = dist(mouseX, mouseY, x2 + legs.width / 2, y2 + legs.height / 2);       //funzione usata per calcolare la distanza tra il cursore del mouse e il centro dell'icona di LEG
    let d3 = dist(mouseX, mouseY, x3 + body.width / 2, y3 + body.height / 2);       //funzione usata per calcolare la distanza tra il cursore del mouse e il centro dell'icona di BODY
    let d4 = dist(mouseX, mouseY, x4 + head.width / 2, y4 + head.height / 2);       //funzione usata per calcolare la distanza tra il cursore del mouse e il centro dell'icona di HEAD
    let home = dist(mouseX, mouseY, x5 + info.width / 2, y5 + info.height / 2);     //funzione usata per calcolare la distanza tra il cursore del mouse e il centro dell'icona di INFO

    if (d1 < 50) {
        window.location.href = "seconda_pagina.html";       //indirizza alla pagina dedicata all'impostazione delle braccia
    } else if (d2 < 50) {
        window.location.href = "quarta_pagina.html";        //indirizza alla pagina dedicata all'impostazione delle gambe
    } else if (d3 < 50) {
        window.location.href = "terza_pagina.html";         //indirizza alla pagina dedicata all'impostazione della corpo
    } else if (d4 < 50) {
        window.location.href = "head.html";                 //indirizza alla pagina dedicata all'impostazione della testa
    } else if (home < 50){
        window.location.href = "informazioni.html";         //indirizza alla pagina dedicata alle nostre informazioni
    }

    if (mouseX > 10 && mouseX < 10 + muto.width && mouseY > 2 && mouseY < 2 + muto.height) {
        if (!isPlaying) {
            audioCtx.resume(); // Assicura che l'AudioContext sia attivo
            song.loop();
            muto = loadImage('immagini/volume.png'); // Cambia immagine a "volume attivo"
            isPlaying = true;
        } else {
            song.stop();
            muto = loadImage('immagini/volume_no.png'); // Torna a "muto"
            isPlaying = false;
        }
    }
}
