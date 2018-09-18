let numMoves = 0;
let bugHits = 0;
let stars = 0;

class Star{
  constructor(row){
    this.sprite = 'images/Star.png';
    this.x = getRandomNumber(0, 4);
    this.x *= 100;
    this.y = row * 78;
    //gets the star boundaries
    this.starLeft = this.x - 50;
    this.starRight = this. x + 50;
    this.starTop = this.y + 40;
    this.starBottom = this.y - 40;
    //active status sets whether star shows on screen
    this.active = true;
  }

  update(dt){
    //checks to see if player touches star
    if(player.x > this.starLeft && player.x < this.starRight
      && player.y < this.starTop && player.y > this.starBottom){
        stars++;
        this.active = false;
      }
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

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
      document.getElementById("stars").innerHTML = (stars === 1) ? stars + " star." : stars + " stars.";
      document.getElementsByClassName("modal")[0].style.display = "block";
      document.getElementsByClassName("modal-victory")[0].style.display = "block";
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

  //resets the game when when the spacebar is pressed
  if(input == 'spacebar'){
    this.x = this.startPositionX;
    this.y = this. startPositionY;
    numMoves = 0;
    bugHits = 0;
    stars = 0;
    document.getElementsByClassName("modal")[0].style.display = "none";
    document.getElementsByClassName("modal-victory")[0].style.display = "none";
    allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    allStars = [new Star(1), new Star(2), new Star(3)];
  }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player();
let allStars = [new Star(1), new Star(2), new Star(3)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'spacebar'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//generates a random whole number within the min and max parameters, inclusive
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
