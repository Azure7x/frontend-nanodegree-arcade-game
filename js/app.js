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

class Enemy{
  constructor(){
    this.sprite = 'images/enemy-bug.png';
    //sets a random speed for bug
    this.speed = getRandomNumber(35, 200);
    this.x = 0;
    this.setRow();
  }

  update(dt){
    this.x += (dt * this.speed);

    this.enemyLeft = this.x - 50;
    this.enemyRight = this.x + 50;
    this.enemyTop = this.y + 40;
    this.enemybottom = this.y - 40;

    //changes bug speed and row when offscreen
    if(this.x > 500){
      // allEnemies.pop();
      // console.log("enemy removed");
      this.x = getRandomNumber(-300, -100);
      this.setRow();
      this.speed = getRandomNumber(35, 200);
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
    //returns player to starting position when touching the water
    if(this.y < 0){
      this.y = this.startPositionY;
      this.x = this.startPositionX;
    }
  }

  //handles player movement
  handleInput(input){
    switch (input) {

      case 'left':
        if(this.x - 101 >= 0){
          this.x -= 101;
        }
        break;

      case 'right':
          if(this.x + 101 < 500){
            this.x += 101;
          }
          break;

      case 'up':
            this.y -= 83;
          break;

      case 'down':
          if(this.y + 83 <= 402){
            this.y += 83;
          }
          break;
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
