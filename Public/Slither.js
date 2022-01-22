var starsA = [];
var potionB = [];

var snake_serverData;

var posX = 0;
var posY = 0;

var gameState = 0;

var XP = 0;
var snake;
var snake_radius = 20;

var player_name = '';

var serverPlayers = [];
var serverPlayerRadius = [];
var leaderBoard = [];

function preload() {
game_background = loadImage('Images/image.png')
    potion2 = loadImage('Images/download-removebg-preview.png');
    getting_point = loadSound('Images/mixkit-arcade-game-jump-coin-216.wav')
    killing_sound = loadSound('Images/mixkit-impact-of-a-blow-2150.wav')
    potion_sound = loadSound('Images/mixkit-metal-grill-quick-hit-2177.wav')

}

function setup() {
    createCanvas(1900, 901);

    form = new Form()

    snake = new Snake(200, 200, snake_radius);
    
    snake_serverData = io.connect('http://localhost:3000/');
    
    for (var i = -40; i < 2000; i++) {
        starsA[i] = new Star(random(-10000, +10000), random(-10000, 10000), 10)
    }
    
    for (var i = -40; i < 200; i++) {
        potionB[i] = new Potion(random(-10000, +10000), random(-10000, 10000), 30, 30, potion2)
    }
    

    
}

function draw() {
    if (gameState === 0) {
    
        background('black')
       
        form.display();
 
     }
    
if (gameState === 1) {
background(game_background);

snake_serverData.on('heartbeat', function(data) {
  serverPlayers = data;
});
    
snake_serverData.on('heartbeat2', function(data) {
  serverPlayerRadius = data;
leaderBoard = selectionSort(serverPlayerRadius);
});
             if (snake_serverData.id == undefined){
console.log(true)
        window.location.reload()
                     
        }
for (i=0;i < leaderBoard.length; i++){
let g = (10 * i) + (20 * i);    
fill('white');
textSize('200');
text(leaderBoard[i].id+" :"+leaderBoard[i].r,window.width -240, 200 + g);
}



push() 
fill('white');
textSize('200');
text(player_name, 20, 680);
text('Your Length: ' + snake_radius, 20, 700);
    text('Points: ' + XP, 20, 720)
    
pop();
    
push()
fill('white');
textSize(30);
text('LeaderBoard', window.width -280, 150);
pop()

translate(window.width/2, window.height/2)
translate(-snake.x,-snake.y)

snake.draw();  

snake.coords(posX, posY);


var dataToserver = {
    x: posX,
    y: posY,    
    r: snake_radius,
name:player_name
}

snake_serverData.emit('update', dataToserver);
snake_serverData.emit('update2',dataToserver);

for (var i=serverPlayers.length-1;i>=0;i--){
    if (serverPlayers[i] !== undefined){
        var id = serverPlayers[i].id;

    if (id.substring() != snake_serverData.id) {
       push()
      fill(0, 0, 255);
     ellipse(serverPlayers[i].x, serverPlayers[i].y, serverPlayers[i].r*1, serverPlayers[i].r*1);
pop()
       push()
      fill(255);    
      textAlign(CENTER)
      textSize(13);
      text(serverPlayers[i].name, serverPlayers[i].x, serverPlayers[i].y + serverPlayers[i].r);
        pop();
    }




}       
}

    
for (var i=serverPlayers.length-1;i>=0;i--){
    if (dist(snake.x, snake.y, serverPlayers[i].x, serverPlayers[i].y) < 1 && serverPlayers[i].id !== snake_serverData.id) {    
        if (snake_radius < serverPlayers[i].r) {

serverPlayers[i] = serverPlayers.splice(i,1)
serverPlayerRadius[i] = serverPlayerRadius.splice(i,1)
        snake_serverData.emit('Forcedisconnect', i)
        killing_sound.play();
        
}}

}
        
snake.increaseR(snake_radius)
       
if (keyDown('RIGHT_ARROW')) {

            posX += 5;
        }
if (keyDown('LEFT_ARROW')) {
            posX = posX - 5;
        }
if (keyDown('UP_ARROW')) {

            posY -= 5;
        }
if (keyDown('DOWN_ARROW')) {
            posY += 5;
        }

if (XP > 0) {
if (keyDown('a')) {

                posX += 20;
                XP = XP - 0.5;
            }
if (keyDown('s')) {
                posX = posX - 20;
                XP = XP - 0.5;
            }
if (keyDown('w')) {
                XP = XP - 0.5;
                posY -= 20;
            }
if (keyDown('d')) {
                posY += 20;
                XP = XP - 0.5;
            }
}
    
   starsA.forEach(star => {
star.draw();
    
if (dist(snake.x, snake.y, star.x, star.y) < snake.r ) {
       var value = starsA.indexOf(star)
                starsA.splice(value, 1);
     snake_radius += 1;
     XP += 2;
    snake.increaseR(snake_radius)
    getting_point.play()
            }
        })
    
potionB.forEach(star => {
            star.draw();
            if (dist(snake.x, snake.y, star.x, star.y) < snake.r ) {
                
                var value = potionB.indexOf(star)
                potionB.splice(value, 1);
                XP += 10;
                potion_sound.play();
            }
        }) 

             
}
drawSprites();
}


function selectionSort(arr) {
  let max;
    
  for (let i = 0; i < arr.length; i++) {

    //index of the smallest element to be the ith element.
    max = i;

    //Check through the rest of the array for a lesser element
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].r > arr[max].r) {
        max = j;
      }
    }

    //compare the indexes
    if (min !== i) {
      //swap
      [arr[i].r, arr[max].r] = [arr[max].r, arr[i].r];
        [arr[i].id, arr[max].id] = [arr[max].id, arr[i].id];
    }
  }

  return arr;
}
