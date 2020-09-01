var ship;
var aliens = [];
//var aliens1 =[];
var lasers = [];
var timeInter=200;
var score = 0;
var ctx;
var canvas;
var timeInter2 = 10000;

function setup() {
  createCanvas(800, 800);
 // ctx= canvas.getContext("2d");
  ship = new Ship();
  for (var j= 0; j <= 3; j++) {
  	for (var i = 0; i < 12; i++) {
    aliens[12*j+i] = new Alien(i*60+60, j*40+20);
   
  }
  }
  
  var idenId = setInterval(shoot, timeInter);
  var waves= wave();

}

function draw() {
  background(51);
  ship.show();
  ship.move();



  for (var i = 0; i < lasers.length; i++) {
    lasers[i].show();
    lasers[i].move();
    for (var j = 0; j < aliens.length; j++) {
      if (lasers[i].hits(aliens[j])) {
        aliens[j].grow();
        lasers[i].evaporate();
        if(aliens[j].getR() == 0){
          aliens.splice(j,1);
          score++;
        }
      }
    }
  }

  var edge = false;

  for (var i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x > width || aliens[i].x < 0) {
      edge = true;
    }
    //var a = setInterval(add_aliens, timeInter2);
  }



  if (edge) {
    for (var i = 0; i < aliens.length; i++) {
      aliens[i].shiftDown();
    }
  }

  for (var i = lasers.length-1; i >= 0; i--) {
    if (lasers[i].toDelete) {
      lasers.splice(i, 1);
    }
  }

  for (var i = 0; i < aliens.length; i++) {
    var loose=false;
    if (aliens[i].y > height ) {
      loose= true;
    }
  }
  if(loose==true){
      alert('you LOOSE bc you are a LOOSER !!! Page automatically refresh !');
      window.location.reload();}

  if(aliens.length == 0){
    alert('you win ! Page automatically refresh !');
    window.location.reload();
  }
  textSize(32);
  fill(20, 148, 20);
  text("SCORE: " + score, ((canvas.width/10)*8)-20, 40);
  
  //ctx.fillStyle = "#FFFFFF";
  //ctx.fillText("SCORE: " + score, 10, canvas.height-10);

  /*for (var i = aliens.length-1; i >= 0; i--) {
    if (aliens[i].toDelete) {
      aliens.splice(i, 1, null);
    }
  }*/

}

function mouseDragged(e){

  /*if ( ship.getX()> mouseX) {
    ship.setDir(-1);
  }else if(ship.getX()< mouseX){
    ship.setDir(1);
  }*/
  ship.setX(mouseX);
}


function mouseReleased(e){
  ship.setDir(0);
}


    

function shoot(){
    var laser = new Laser(ship.x, height);
      lasers.push(laser);
       
  }

 function wave(){
 	for (var i = 0; i < 12; i++) {
    aliens[i] = new Alien(i*60+60, 20);
    aliens[12+i] = new Alien(i*60+60, 60);
    aliens[24+i] = new Alien(i*60+60, 100);
    aliens[36+i] = new Alien(i*60+60, 140);
  }
 }

 function add_aliens(){
 	for (var i = 0; i < 12; i++) {
    aliens1[i] = new Alien(i*60+60, 20);
    aliens1[12+i] = new Alien(i*60+60, 60);
    aliens1[24+i] = new Alien(i*60+60, 100);
    aliens1[36+i] = new Alien(i*60+60, 140);	
 }
 aliens1[i].show();
}


/*function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}


function keyPressed() {
  if (key === ' ') {
    var laser = new Laser(ship.x, height);
    lasers.push(laser);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}*/