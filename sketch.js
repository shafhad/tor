      var play = 1 ;
      var end = 2 ;
      var start = 0 ;
      var gameState = start;
      var thor , thorImg , score = 0 ;
      var tower , spaceImg ;
      var meteor , meteorImg , meteorGroup ;
      var hammer , hammerImg ;
      var destroyer ;
      var edges ;
      var gameOver , gameOverImg ;
      var restart , restartImg ; 
      var starter , starterImg ;
      var thorstand , thorstandImg ; 
      var comment , commentImg ; 
      var hamsound , sounder , ender ;
      var torr , torrImg ;
      var loki , lokiImg , lokiGroup ;
      var hela , helaImg , helaGroup ;
      var gorr , gorrImg , gorrGroup ;
      var notes , notesImg ; 
 
function preload(){
   
      thorImg = loadImage("THOR.png");
      spaceImg = loadImage("space.jpg");
      meteorImg = loadAnimation("meteor-.png");
      hammerImg = loadImage("hammer.png");
      gameOverImg = loadImage("go.png");
      restartImg = loadImage("rs.png");
      starterImg = loadImage("starter.png");
      thorstandImg = loadImage("thorstanding.png");
      commentImg = loadImage("commentbox (3).png");
      hamsound = loadSound("thor_mjolnir.mp3");
      sounder = loadSound("Thor-Bgm.mp3");    
      ender = loadSound("asgard.mp3");
      torrImg = loadImage("torr.png");
      gorrImg = loadImage("gorr.png");
      helaImg = loadImage("hela.png");
      lokiImg = loadAnimation("loki.png");
      notesImg = loadImage("Capture (1).png");
         
}




function setup() {
     
     sounder.loop();
     
     createCanvas(600, 600);
  
     space = createSprite(300,300,600,1200);
     space.addImage(spaceImg); 
     space.scale = 1.2;
  
     thor = createSprite(460,480,50,50);
     thor.addImage(thorImg);
     thor.scale=0.32;
  
     torr = createSprite(300,300,50,50);
     torr.addImage(torrImg);
     torr.scale=0.20;

     score = 0;

     starter = createSprite(450,390,50,50);
     starter.addImage(starterImg);
     starter.scale=0.70;
  
     thorstand = createSprite(150,340,50,50);
     thorstand.addImage(thorstandImg);
  
     comment = createSprite(295,115,50,50);
     comment.addImage(commentImg);

     notes = createSprite(503,115,50,50);
     notes.addImage(notesImg);
  
     edges = createEdgeSprites();

     gameOver = createSprite(300,200);
     gameOver.addImage(gameOverImg);
     gameOver.scale = 0.2;

     restart = createSprite(300,400);
     restart.addImage(restartImg);
     restart.scale = 0.5;

     meteorGroup = new Group();
     gorrGroup = new Group();
     lokiGroup = new Group();
     helaGroup = new Group();

     

     thor.depth = space.depth+1;

     thor.setCollider("rectangle",0,0,300,250);

     hammer = createSprite(375,410,50,50);
     hammer.addImage(hammerImg);
     hammer.scale=0.15;

     hammer.setCollider("rectangle",-80,-80,340,100);

}

function draw() 
{
  
    background("white");

if(gameState === start)
  {
           starter.visible = true;
           thor.visible = false;
           hammer.visible = false;
           gameOver.visible = false;
           space.visible = true;
           restart.visible = false; 
           thorstand.visible = true;
           comment.visible = true;
           torr.visible = false;
           notes.visible = true;
    
           if(mousePressedOver(starter))
           {
                  gameState = play;
           }
    drawSprites();
  }
  
  
if (gameState === play)
       {
         space.visible = true;
          
        
           starter.visible = false;
           thor.visible = true;
           hammer.visible = true;
           gameOver.visible = false;
           torr.visible = false;
           restart.visible = false;
           thorstand.visible = false;
           comment.visible = false;
           notes.visible = false;
           meteor();
         
         if (keyDown("left")){
          thor.x = thor.x-3;
          hammer.x = hammer.x-3;
        }
        if (keyDown("right")){
          thor.x = thor.x+3;
          hammer.x = hammer.x+3;
        }
        if (keyDown("up")){
          thor.y = thor.y-3;
          hammer.y = hammer.y-3;
        }
        if (keyDown("down")){
          thor.y +=3;  
          hammer.y +=3; 
        }

         if(meteorGroup.isTouching(hammer))
       {
           meteorGroup.destroyEach();
           score = score+1;
           hamsound.play();
       }

       if(meteorGroup.isTouching(thor))
       {
        gameState = end;
        ender.play();
         
       }
         
       if(thor.x > 550 || thor.y > 550 || thor.x < 40 || thor.y < 40)
       {
          gameState = end;
          ender.play();
       }

       space.velocityY = (2.5+score/7);
       space.velocityX = (2.5+score/7);


        if (space.y > 600)
        {
          space.y = -50;
        }
       if (space.x > 600)
        {
          space.x = 400;
        }

           drawSprites();
          fill("red");
           stroke("brown");
           strokeWeight(4);
           textSize(40);
           text("SCORE : "+ score, 360,50);

         }

  if (gameState === end )
    {
         space.visible = true;
         space.velocity.x = 0;
         space.velocity.y  = 0; 
         starter.visible = false;
         thor.visible = false;
         hammer.visible = false;
         gameOver.visible = true;
         meteorGroup.destroyEach();
         restart.visible = true;
         thorstand.visible = false;
         comment.visible = false;
         torr.visible = true;
         notes.visible = false;
         score = score;
        sounder.stop();

      if(mousePressedOver(restart)){
        reset();
      }

      drawSprites();
      
           fill("white");
           textSize(35); 
           stroke("black");
           strokeWeight(8);
           textFont("times new roman");
           text("CLICK  HERE  TO  RESTART",100,300);
      
           fill("orange");
           stroke("black");
           strokeWeight(4);
           textSize(45);
           text("SCORE : "+ score, 360,50);
      
           

    }

      

}

function meteor(){
  
    if(frameCount%90===0)
    {
      var   meteor=createSprite(600,200,20,20);
      position = Math.round(random(1,2));

        if (position === 1){
             meteor.x=-50;
             meteor.x=Math.round(random(50,340));
              //velocity
             meteor.velocityX =  (5+score/5);
             meteor.velocityY =  (5+score/5);
        }
      
        else if
          (position === 2){
              meteor.x = 0;
              meteor.y=Math.round(random(50,340));
               //velocity
              meteor.velocityX = (5+score/4);
              meteor.velocityY = (5+score/4) ;
          }

       
              meteor.addAnimation("collided",meteorImg);
              meteor.setCollider("circle",400,450,500);
              if(score>10){
                meteor.addAnimation("loki",lokiImg);
              }
              console.log(meteor.y);
      
              meteor.scale = 0.05
              meteor.setLifetime=100;

              meteorGroup.add(meteor);
       
    }
}
/*
function loki(){
  
    if(frameCount%90===0)
    {
      var   loki=createSprite(600,200,20,20);
      position = Math.round(random(1,2));

        if (position === 1){
             loki.x=-50;
             loki.x=Math.round(random(50,340));
              //velocity
             loki.velocityX =  (5+score/4);
             loki.velocityY =  (5+score/4);
        }
      
        else if
          (position === 2){
              loki.x = 0;
              loki.y=Math.round(random(50,340));
               //velocity
              loki.velocityX = (5+score/4);
              loki.velocityY = (5+score/4) ;
          }

       
              loki.addAnimation("collided",lokiImg);
              loki.setCollider("circle",400,450,500);
              loki.debug = true;
              
              loki.scale = 0.05
              loki.setLifetime=100;

              lokiGroup.add(loki);
       
    }
}

function hela(){
  
    if(frameCount%90===0)
    {
      var   hela=createSprite(600,200,20,20);
      position = Math.round(random(1,2));

        if (position === 1){
             hela.x=-50;
             hela.x=Math.round(random(50,340));
              //velocity
             hela.velocityX =  (5+score/4);
             hela.velocityY =  (5+score/4);
        }
      
        else if
          (position === 2){
              hela.x = 0;
              hela.y=Math.round(random(50,340));
               //velocity
              hela.velocityX = (5+score/4);
              hela.velocityY = (5+score/4) ;
          }

       
              hela.addAnimation("collided",helaImg);
              hela.setCollider("circle",400,450,500);
              hela.debug = true;
              
              hela.scale = 0.05
              hela.setLifetime=100;

              helaGroup.add(hela);
       
    }
}

function gorr(){
  
    if(frameCount%90===0)
    {
      var   gorr=createSprite(600,200,20,20);
      position = Math.round(random(1,2));

        if (position === 1){
             gorr.x=-50;
             gorr.x=Math.round(random(50,340));
              //velocity
             gorr.velocityX =  (5+score/4);
             gorr.velocityY =  (5+score/4);
        }
      
        else if
          (position === 2){
              gorr.x = 0;
              gorr.y=Math.round(random(50,340));
               //velocity
              gorr.velocityX = (5+score/4);
              gorr.velocityY = (5+score/4) ;
          }

       
              gorr.addAnimation("collided",gorrImg);
              gorr.setCollider("circle",400,450,500);
              gorr.debug = true;
              
              gorr.scale = 0.05
              gorr.setLifetime=100;

              gorrGroup.add(gorr);
       
    }
}*/

function reset(){
          
           sounder.play();
           gameState = start;
           score = 0; 
           thor.x = 460;
           hammer.x = 375;
           hammer.y = 410;
           thor.y = 480;
          
}