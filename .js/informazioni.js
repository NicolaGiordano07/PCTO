let xhome, yhome;

function preload() {
    menu = loadImage('immagini/CASA_PICCOLA.png');
}

function setup() {
    createCanvas(1538, 839);
    xhome = 15;
    yhome = 0;
}

function draw() {
    image(menu, xhome, yhome);
}

function mouseClicked(){
    let dhome = dist(mouseX, mouseY, xhome, yhome);
    if(dhome < 50){
        window.location.href = "pcto.html"; //vai a pagina home
    }
}
