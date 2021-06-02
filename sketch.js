var balloon,balloonImage1,balloonImage2;

var database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }


function setup() {
  database=firebase.database();
  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value",readPosition,showError);

  createCanvas(1500,700);

  balloon=createSprite(250,250,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 

}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW))
  {

    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-4,0);

  }

  else if(keyDown(RIGHT_ARROW))
  {

    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(4,0)

  }

  else if(keyDown(UP_ARROW))
  {
  
    writePosition(0,-3);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale =balloon.scale +0.01;
    
  }

  else if(keyDown(DOWN_ARROW))
  {
   

    writePosition(0,3);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale =balloon.scale -0.01;

  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y)
{

  database.ref("balloon/position").set
  ({
    x:balloon.x+x,
    y:balloon.y+y

})

}

function readPosition(data)
  {

    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;

  }

function showError()
{
  console.log("Error In Program");
}





