
var monkey, monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstacleGroup;
var ground, invisibleGround;
var SurvivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,200);
  
  monkey = createSprite(10,150,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey. scale = 0.1;
  
  ground = createSprite(300,180,600,8);
  ground.x = ground.width /2;
  
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  
  SurvivalTime = 0;
  
}


function draw() {
  
  background(230);
  
    monkey.collide(ground);
  
  if(gameState===PLAY){
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    food();
    obstacles();
    score();
  
  if(ObstacleGroup.collide(monkey)) {
    
    gameState = END;

  }
  }else if(gameState===END){
    
      ground.velocityX = 0;
      monkey.velocityY = 0
    
    
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     ObstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
    
    
    text("GAME OVER",270,100);
     
    }
  
  drawSprites();
}

function score() {
  
  stroke("black");
  textSize(10);
  fill("black");
  SurvivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + SurvivalTime,70,50);
  console.log(frameCount);
  
}

function food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(60,170));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

function obstacles() {
  
   if (frameCount % 80 === 0){
     
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -5;
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   ObstacleGroup.add(obstacle);

   
   }
}






