let omino;
let xhome, yhome;

function preload() {
    sfondo = loadImage('immagini/work_in_progress.jpg');
    menu = loadImage('immagini/CASA_PICCOLA.png');
}

function setup() {
    createCanvas(1538, 839);
    xhome = 15;
    yhome = 2;
}

function draw() {
    background(sfondo);
    fill(255);
    textSize(50)
    textStyle(BOLD);
    text(`WORK IN PROGRESS`, 500, 150)

    image(menu, xhome, yhome);
}

function mouseClicked(){
    let dhome = dist(mouseX, mouseY, xhome+menu.width/2, yhome+menu.height/2);

    if(dhome < 50){
        window.location.href = "pcto.html"; //vai a pagina home
    }
}

