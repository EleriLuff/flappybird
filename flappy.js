// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var labelScore;
var player;
var pipes ;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "assets/grumpy_penguin.gif");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#85D6FF");
    game.add.text (190,170, "Welcome to the game...",
    {font:"40px Calibri", fill: "#000000"});
    // player = game.add.sprite(150,175,"playerImg");
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeScore);
    labelScore = game.add.text(20,20,"0");
    player = game.add.sprite(100,200, "playerImg");
    game.physics.arcade.enable(player);

    player.body.velocity.x = 0;
    player.body.velocity.y = 50;

    player.body.gravity.y = 200
    player.body.gravity.x = 0

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    pipes = game.add.group();

    var gapStart = game.rnd.integerInRange(1,5);

    generatePipe();

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);

    var pipeInterval = 1.75;
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);


}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}

function clickHandler (event) {
    //alert (score)
    player.x = event.x;
    player.y = event.y
}

function changeScore(){
    game.sound.play("score");
    score = score + 1;
    labelScore.setText(score.toString());
}

function moveRight(){
    player.x = player.x + 10;
}

function moveLeft(){
    player.x = player.x - 10;
}

function moveUp(){
    player.y = player.y - 10;
}

function moveDown(){
    player.y = player.y + 10;
}

function generatePipe(){
    var gapStart = game.rnd.integerInRange (1,5);
    for (var count = 0; count < 8; count = count+1) {
        if (count !=gapStart && count !=gapStart + 1){
            addPipeBlock(800,count*50);
        }
    }
    changeScore();
}

function addPipeBlock(x,y) {
var pipe = pipes.create(x,y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function playerJump(){
    player.body.velocity.y = -200
}

function update(){
    game.physics.arcade.overlap(player,pipes,gameOver);
}

function gameOver(){
    location.reload();
}