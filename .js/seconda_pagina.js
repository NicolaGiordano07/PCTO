let omino;
let xhome, yhome;

function preload() {
    sfondo = loadImage('immagini/sfondoParquetSfocato.jpg');
    start = loadImage('immagini/START.gif');
    menu = loadImage('immagini/CASA_PICCOLA.png');
    scrittaStarter = loadImage('immagini/STARTER.gif');
}

function setup() {
    createCanvas(1538, 839);

    //coordinate per il pulsante start
    x = 615;
    y = 275;

    //coordinate per la scritta d'inizio
    xStart = 525
    yStart = 200;
    
    //coordinate per tasto per tornare nella home
    xhome = 15;
    yhome = 2;
}

function draw() {
    background(sfondo);  //viene impostato lo sfondo
    image(menu, xhome, yhome); //icona per tornare nella home
    
    image(start, x, y); // gif per mostrare il tasto start
    image(scrittaStarter, xStart, yStart); //scritta 'start...'
}

function mouseClicked(){
    let dhome = dist(mouseX, mouseY, xhome+menu.width/2, yhome+menu.height/2);  //funzione usata per calcolare la distanza tra il cursore del mouse e il centro dell'icona di home
    let dStart = dist(mouseX, mouseY, x + start.width/2, y + start.height/2);   //funzione usate per calcolare la distanza tra il cursore del mouse e il centro dell'icona di start

    if(dhome < 50){
        window.location.href = "pcto.html"; //indirizza alla pagina home
    } else if(dStart < 50){
        window.location.href = "ARM.html";  //indirizza alla pagina degli esercizi per le ARM
    }
}
