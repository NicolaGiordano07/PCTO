let omino;
let xhome, yhome;

function preload() {
    omino = loadImage('charizard.png');
    sfondo = loadImage('cielo_pixelato.jpeg');
    menu = loadImage('immagini/menu.png');
}

function setup() {
    createCanvas(1538, 839);
    xhome = 10;
    yhome = 2;
}

function draw() {
    background(sfondo);
    image(menu, xhome, yhome);
    if (omino) {
        image(omino, width / 2 - omino.width / 2, height / 2 - omino.height / 2);
    }
    fill(0);
    textAlign(CENTER);
    textSize(24);
    text('Benvenuto nella seconda pagina!', width / 2, height - 50);
}

function mouseClicked(){
    let dhome = dist(mouseX, mouseY, xhome, yhome);
    if(dhome < 50){
        window.location.href = "pcto.html"; //vai a pagina home
    }
}
