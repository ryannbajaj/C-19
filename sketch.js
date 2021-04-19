var trex, trex_img, obstacles, ground, ground_img, invisGround, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6, obstacle,obstacleGroup, cloud, cloud_img, cloudGroup, gameOver, gameOver_img, restart, restart_img

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload(){
  trex_img = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  
  ground_img = loadImage("ground2.png")
  
  gameOver_img = loadImage("gameOver.png")
  
  restart_img = loadImage ("restart.png")
  
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
  cloud_img = loadImage("cloud.png")
  
  
  
}

function setup() {
  createCanvas(600,200);
  trex = createSprite(50,120);
  trex.addAnimation("trexanimation", trex_img)
  trex.scale = 0.5
    
  ground = createSprite(300,135)
  ground.addImage(ground_img)
  
  gameOver = createSprite(200,100)
  gameOver.addImage(gameOver_img)
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  restart = createSprite(300,120)
  restart.addImage(restart_img)
  
  invisGround = createSprite(300,175,600,60)
   
  restart.visible = false
  gameOver.visible = false
  invisGround.visible = false
}

function draw() {
  background("white");
  drawSprites();
  
  trex.collide(invisGround)
   
  text("Score: "+ score, 500,50);
  
if (gameState == PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y >=100){
      trex.velocityY = -12 ;
  }
  trex.velocityY = trex.velocityY + 0.8;
  
  ground.velocityX = -6
  
if (ground.x < 0){
  ground.x = ground.width/2;
  }
  //creating the coulds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,200,40,10);
    cloud.y = random(10,70);
    cloud.addImage(cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
  }
  
  //creating the obstacles
  if(World.frameCount % 80 === 0) {
    var obstacle = createSprite(600,120,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =  Math.round(random(1,6));
    
    switch(rand) {
    case 1:
    obstacle.addImage(obstacle1);
    break;
  
    case 2:
    obstacle.addImage(obstacle2);
    break;
  
    case 3:
    obstacle.addImage(obstacle3);
      break;  
    
    case 4:
    obstacle.addImage(obstacle4);
      break;  
      
    case 5:
    obstacle.addImage(obstacle5);
      break;  
      
    case 6:
    obstacle.addImage(obstacle6);
      break;  
      
    default: break;
      
    }
      
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 250;
    obstacleGroup.add(obstacle);
    
  
  
}
  if (trex.isTouching(obstacleGroup)){
  gameState = END
    
    
}
  }
  
  if (gameState == END){
   obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  ground.velocityX=0
  obstacleGroup.setLifetimeEach(-1)
  cloudGroup.setLifetimeEach(-1)
  restart.visible = true
  gameOver.visible = true
    
    
  }
  
  
  
  
  
  
}
