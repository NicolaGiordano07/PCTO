let x1, y1, x2, y2, x3, y3;

function preload(){
    sfondo = loadImage('sfondo_gioco.jpg');
    menu = loadImage('immagini/menu.png');
    arm = loadImage('immagini/arm.png');
    legs = loadImage('immagini/legs.png');
    body = loadImage('immagini/body.png');
}

function setup() {
    createCanvas(1538, 839);
    x1 = (width/3)-20; //sx
    y1 = height/2;

    x2 = ((2 * width)/3)-20; //dx
    y2 = height/2;

    x3 = (width / 2)-20;  //centro
    y3 = height / 2; //centro
    
}

function draw() {
    background(sfondo);

    // Primo blocco (rosso)
    /*fill(150, 0, 0);
    ellipse(x1, y1, 100, 100);
    fill(0);
    */
    image(arm, x1, y1);
    textAlign(CENTER);
    textSize(18);

    // Secondo blocco (blu)
    /*fill(0, 0, 150);
    ellipse(x2, y2, 100, 100);
    fill(0);
    */
    image(legs, x2, y2);
    textSize(18);

    // Terzo blocco (verde)
    /*fill(0, 150, 0);
    ellipse(x3, y3, 100, 100);
    fill(0);*/
    image(body, x3, y3);
    textSize(18);


    textSize(24);
    fill(0);
    text('Clicca un blocco per cambiare pagina', width / 2, height - 50);
}

function mouseClicked() {
    let d1 = dist(mouseX, mouseY, x1, y1);
    let d2 = dist(mouseX, mouseY, x2, y2);
    let d3 = dist(mouseX, mouseY, x3, y3);

    if (d1 < 50) {
        window.location.href = "seconda_pagina.html"; // Vai alla seconda pagina
    } else if (d2 < 50) {
        window.location.href = "quarta_pagina.html"; // Vai alla terza pagina
    } else if (d3 < 50){
        window.location.href = "terza_pagina.html"; // Vai alla quarta pagina
    }
}
