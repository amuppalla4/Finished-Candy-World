var player,playerImg
var bg,bgImg
var candy,candyImg1,candyImg2,candyImg3
var vegetable,vegetableImg1,vegetableImg2
var candyGroup,vegetableGroup
var score=0;
var life=3;
var restart,restartImg
function preload() {
  playerImg=loadImage("../Images/player.png")
  bgImg=loadImage("../Images/candyBackground.jpg")
  candyImg1=loadImage("../Images/candy1.png")
  candyImg2=loadImage("../Images/candy2.png")
  candyImg3=loadImage("../Images/candy3.png")
  vegetableImg1=loadImage("../Images/broccoli.png")
  vegetableImg2=loadImage("../Images/carrot.png")
  restartImg=loadImage("../Images/restart.png")
}

function setup () {
  createCanvas(1200,900)

  bg=createSprite(600,600,1500,1500)
  bg.addImage("bg",bgImg)
  bg.scale=2
  bg.velocityX=-3
  player=createSprite(50,900,20,20)
  player.addImage("player",playerImg)
  player.scale=0.4

  candyGroup=new Group();
  vegetableGroup=new Group();
  invisibleGround=createSprite(300,980,1200,2)
  invisibleGround.visible=false;

  restart=createSprite(400,800);
  restart.addImage("restart",restartImg)
  restart.scale=0.2
  restart.visible=false;
}

function draw() {
  background(bgImg);

if (bg.x<0) {
  bg.x=bg.width/4
}
if(keyDown("space")){
  player.velocityY=-7
}
player.velocityY+=1
camera.position.y=player.y
player.collide(invisibleGround)
if (player.isTouching(candyGroup)) {
  score+=1;
  candyGroup[0].destroy()
}
  if(player.isTouching(vegetableGroup)){
    vegetableGroup[0].destroy();
    life-=1    

  }
  
  spawnVegetable();
  spawnCandy(); 
  drawSprites();
  stroke("red");
  fill("black");
  textSize(40);
  text("Score-"+score,70,470);
  text("Life-"+life,900,470)
  if(life===0){
    candyGroup.setVelocityXEach(0)
    vegetableGroup.setVelocityXEach(0)
    player.velocityY=0
    bg.velocityX=0;
    strokeWeight(5);
    stroke("red");
    textSize(120);
    fill("black")
    text("Game Over",150,700);
    restart.visible=true
  }
  if(mousePressedOver(restart)){
    candyGroup.setVelocityXEach(-6)
    vegetableGroup.setVelocityXEach(-6)
    player.velocityY=-7;
    bg.velocityX=-3;
    restart.visible=false
    life=3
    score=0
  }
}

function spawnCandy() {
  if(frameCount%120===0){
    candy = createSprite(1180,random(500,1000));
    candy.velocityX=-6

    var world=Math.round(random(1,3))
    switch(world){
      case 1:candy.addImage("candy",candyImg1);
      break;
      case 2:candy.addImage("candy",candyImg2);
      break;
      case 3:candy.addImage("candy",candyImg3);
      default:break;

    }
    candy.scale=0.18
    candyGroup.add(candy)
  }
}

function spawnVegetable() {
  if(frameCount%80===0){
    vegetable = createSprite(1180,random(500,1000));
    vegetable.velocityX=-6

    var world=Math.round(random(1,2))
    switch(world){
      case 1:vegetable.addImage("vegetable",vegetableImg1);
      break;
      case 2:vegetable.addImage("vegetable",vegetableImg2);
      default:break;

    }
    vegetable.scale=0.18
    vegetableGroup.add(vegetable)
  }
}
