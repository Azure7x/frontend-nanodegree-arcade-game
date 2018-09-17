// // Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started
//
//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
//     this.x = 0;
//     this.y = 62 ;
// };
//
// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
//     this.x = this.x + (dt * 90);
// };
//
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

let numMoves = 0;
let bugHits = 0;

class Enemy{
  constructor(){
    this.sprite = 'images/enemy-bug.png';
    //sets a random speed for bug
    this.speed = getRandomNumber(35, 400);
    this.x = 0;
    this.setRow();
  }

  update(dt){
    //prevents bugs from moving when game is won
    if(player.y >= 0){
      //responsible for making the bugs move
      this.x += (dt * this.speed);
    }
    //used to keep track of bugs size and location for collision
    this.enemyLeft = this.x - 50;
    this.enemyRight = this.x + 50;
    this.enemyTop = this.y + 40;
    this.enemybottom = this.y - 40;
    //checks collision with player
    if(player.x > this.enemyLeft && player.x < this.enemyRight
      && player.y < this.enemyTop && player.y > this.enemybottom){
      player.x = player.startPositionX;
      player.y = player.startPositionY;
      bugHits++;
    }

    //changes bug speed and row when offscreen
    if(this.x > 500){
      // allEnemies.pop();
      // console.log("enemy removed");
      this.x = getRandomNumber(-300, -100);
      this.setRow();
      this.speed = getRandomNumber(35, 400);
    }
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  setRow(){
    //randomly chooses a row for the bug enemy to spawn on
    this.row = getRandomNumber(1,3);
    switch (this.row) {
      case 1:
        this.y = 62;
        break;
      case 2:
        this.y = 145;
        break;
      case 3:
        this.y = 228;
        break;
      default:
        this.y = 62;
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
  constructor(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 402;
    this.startPositionX = 202;
    this.startPositionY = 373;
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update(dt){
    //game is won when the player reaches the water
    if(this.y < 0){
      document.getElementById("turns").innerHTML = numMoves;
      document.getElementById("hits").innerHTML = (bugHits === 1) ? bugHits + " time." : bugHits + " times.";
      document.getElementsByClassName("modal")[0].style.display = "block";
      document.getElementsByClassName("modal-victory")[0].style.display = "block";
      // this.y = this.startPositionY;
      // this.x = this.startPositionX;
    }
  }

  //handles player movement
  handleInput(input){
    //prevents movement after the game is won
    if(this.y >= 0){
      //responsible for movement when game is still active
      switch (input) {

        case 'left':
          if(this.x - 101 >= 0){
            this.x -= 101;
            numMoves++;
          }
          break;

        case 'right':
            if(this.x + 101 < 500){
              this.x += 101;
              numMoves++;
            }
            break;

        case 'up':
              this.y -= 83;
              numMoves++;
            break;

        case 'down':
            if(this.y + 83 <= 402){
              this.y += 83;
              numMoves++;
            }
            break;
      }
  }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//generates a random whole number within the min and max parameters, inclusive
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
