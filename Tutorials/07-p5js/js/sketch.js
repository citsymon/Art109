
let img;

// Load the image.
function preload() {
    img = loadImage('img/ConcernFroge.png');
}

let xPos = 0; // stores lagging X position
let yPos = 0; // stores lagging Y position
let easing = 0.08; // speed of ease: 0 to 1.0


let canvas;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", -2)
    background(50);
    image(img, 0, 0, width, height, 0, 0, img.width, img.height, CONTAIN);

    describe('It is a pixelated frog. he is concerned.');
}

function windowResized(){
    console.log("size");
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);
    artge(xPos - 10, yPos - 15);
    
}

function artge(_X, _Y){
    // background(50);
    strokeWeight(0);
    fill(random(200, 255), random(200, 255), random(200, 255));
    ellipse(_X, _Y, 30, 30);
}
/*
function mouseMoved(){
    clear();
    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);
    artge(xPos - 10, yPos - 15);
}
*/
