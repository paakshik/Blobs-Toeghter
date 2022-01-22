class Form {
    constructor() {
        this.input = createInput("");
        this.button = createButton('Play');
        this.title = createElement('h2');
        this.Rules = createElement('h2');
        this.Rules1 = createElement('h2');
        this.Rules2 = createElement('h2');
        this.Rules3 = createElement('h2');
        this.font1 = loadFont('Images/NotoSansDisplay-VariableFont_wdth,wght.ttf')
        this.hit = loadSound('Images/hitmarker_2.mp3')
    }
    hide() {
        this.Rules.hide();
        this.Rules1.hide();
        this.Rules2.hide();
        this.Rules3.hide();
        this.highScore.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
       
    }
    display() {

        background('black')
        
        this.title.html("slither.io");

        this.title.position(window.width / 2 -250, 100);
        this.title.style('font-size', '120px');
        this.title.style('font-family', 'Nanum Gothic');
        this.title.style('font-style','normal')
        this.title.style('color', 'yellowgreen');

        this.Rules.html("Rules");
        this.Rules.position(window.width / 2 + 650, 100);
        this.Rules.style('font-size', '60px');
        this.Rules.style('font-family', 'Nanum Gothic');
        this.Rules.style('font-style', 'normal')
        this.Rules.style('color', 'yellowgreen');

        this.Rules1.html("Use Arrow Keys to move.");
        this.Rules1.position(window.width / 2 + 620, 300);
        this.Rules1.style('font-size', '20px');
        this.Rules1.style('font-family', 'Nanum Gothic');
        this.Rules1.style('font-style', 'normal')
        this.Rules1.style('color', 'yellowgreen');

        this.Rules2.html("Use WASD to use Boost but can be used with points.");
        this.Rules2.position(window.width / 2 + 620, 340);
        this.Rules2.style('font-size', '20px');
        this.Rules2.style('font-family', 'Nanum Gothic');
        this.Rules2.style('font-style', 'normal')
        this.Rules2.style('color', 'yellowgreen');

        this.Rules3.html("You can kill a player only when you are bigger than him.");
        this.Rules3.position(window.width / 2 + 620, 420);
        this.Rules3.style('font-size', '20px'); 
        this.Rules3.style('font-family', 'Nanum Gothic');
        this.Rules3.style('font-style', 'normal')
        this.Rules3.style('color', 'yellowgreen');

        this.input.position(window.width / 2 -350, 460);
        this.input.style('width', '600px');
        this.input.style('height', '40px');
        this.input.style('text-align', 'center')
        this.input.style('background', 'lavender');
        
        this.button.position(window.width / 2 -150, 600);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'lightgreen');


        this.button.mousePressed(() => {

            this.input.hide();
            this.title.hide();
            this.button.hide();
            this.Rules.hide();
            this.Rules1.hide();
            this.Rules2.hide();
            this.hit.play();
            this.Rules3.hide();
            var gameToserver = {
    x: snake.x,
    y: snake.y,
    r: snake.r
  };
  snake_serverData.emit('start', gameToserver);
          
            gameState = 1;
            player_name = this.input.value();
        });
    }
}