
var monkey , monkey_running;
var ground, groundI,invisible;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0, score1 = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backgroundC, backgroundI;

// These are all Sound Variables.
var jump, scoreS,gameFinish, negative;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  backgroundI = loadImage("jungle.jpg");
  
  jump = loadSound("jump.mp3");
  scoreS = loadSound("score.mp3");
  gameFinish = loadSound("gameFinish.mp3");
  negative = loadSound("negative.mp3");
}



function setup() {
  createCanvas(400,400);
  
  backgroundC = createSprite(200,200,400,400);
  backgroundC.addImage(backgroundI);
  backgroundC.velocityX = -4;
  
  monkey = createSprite(80,370,20,20);
  monkey.addAnimation("moves", monkey_running);
  monkey.scale = 0.1;
 
 

  ground = createSprite(400,370,900,10);
  ground.visible = false;
 
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  invisible = createSprite(420,378,900,10);
  invisible.visible = false;
  
  
}


function draw() {
  
  background(250);
  
  if(backgroundC.x < 0){
    backgroundC.x = backgroundC.width/2;
  }
  
  
  if(gameState === PLAY){
    Sbanana();
    SpawnObstacles();
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space") && monkey.y >= 314){
      monkey.velocityY = -17;
      jump.play();
  }
  monkey.velocityY = monkey.velocityY + 0.8 ;
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score1 = score1 + 2;
      scoreS.play();
    }
    
  // You can call this a NESTED IF(conditional statement).
  // This means that an IF within another IF. 
  // It's like nested loop.
  if(obstacleGroup.isTouching(monkey)){
     obstacleGroup.destroyEach();
     monkey.scale = 0.1;
     
    
    //if(monkey.scale < 0.13){
      
      //backgroundC.destroy();
      //obstacleGroup.destroyEach();
      //FoodGroup.destroyEach();
      //monkey.destroy();
      //gameFinish.play();
  //}
  }
    
  switch(score1){
   case 5 : monkey.scale = 0.13;
     break;
     case 10 : monkey.scale = 0.15
     break;
     case 20 : monkey.scale = 0.17;
     break;
     case 25 : monkey.scale = 0.19;
     break;
     default: break;
 }
 }
  
  
  

  
  

   monkey.collide(invisible);
  
 
  
 
  
  
  drawSprites();
  fill("white");
  stroke("red");
  textSize(15);
  text("Survival Time : " + score, 280,30);
  text("Score : " + score1, 200,30);
}

function Sbanana(){
  if(frameCount%80 === 0){
    banana = createSprite(400,200,30,20);
    banana.velocityX = -4;
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }
 
}

function SpawnObstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(420,350,30,20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
    
  }
 
}



