/* ******************* *
 *   Pallette: START   *
 * ******************* */

const yellowGreen = {
  dark:
    [
      '#146C23',
      '#1E851A',
      '#409E21'
    ],
  neutral:
    [
      '#6AB629',
      '#9ACD32',
      '#D4DA58'
    ],
  light:
    [
      '#E6CE7F',
      '#F0CBA8',
      '#F8DBD3'
    ]
};
const skyBlue = {
  dark:
    [
      '#14306C',
      '#1A5385',
      '#217E9E'
    ],
  neutral:
    [
      '#29B0B6',
      '#32CDB3',
      '#58DAA0'
    ],
  light:
    [
      '#7FE69B',
      '#A9F0A8',
      '#DEF8D3'
    ]
};
const slateBlue = {
  dark:
    [
      '#6C145C',
      '#821A85',
      '#7F219E'
    ],
  neutral:
    [
      '#7529B6',
      '#6532CD',
      '#5E58DA'
    ],
  light:
    [
      '#7F97E6',
      '#A8CDF0',
      '#D3F0F8'
    ]
};
const crimson = {
  dark:
    [
      '#6C4F14',
      '#854C1A',
      '#9E4121'
    ],
  neutral:
    [
      '#B62F29',
      '#CD324D',
      '#DA5893'
    ],
  light:
    [
      '#E67FCA',
      '#EFA8F0',
      '#EDD3F8'
    ]
};

const pallette = [
  yellowGreen,
  skyBlue,
  slateBlue,
  crimson
];

/* ******************* *
 *   Pallette: STOP    *
 * ******************* */

const tileSize = 12;  // highly composite number!
const tileAmount = 60; // highly composite number!
const boardSize = tileSize * tileAmount; // highly composite number!

const canvas = document.querySelector('canvas');
canvas.width = boardSize;
canvas.height = boardSize;
const ctx = canvas.getContext('2d');

let direction = [0, 1];

document.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowUp':
      direction = [0, -1];
      break;
    case 'ArrowDown':
      direction = [0,  1];
      break;
    case 'ArrowLeft':
      direction = [-1, 0];
      break;
    case 'ArrowRight':
      direction = [1,  0];
      break;
  }
};
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || // some formalities
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame =  window.cancelAnimationFrame || window.mozCancelAnimationFrame;
let myReq;

class Snake {
  constructor () {
    this.body = [[0, 0]];
    this.direction = [1, 0];
  }

  attachHead () {
    const head = this.body[0];
    const newHead = head.map( (el, idx) => {
      let result = (el+this.direction[idx]*tileSize)%boardSize;
      if (result < 0)
        result = boardSize;
      return result;
    });
    this.body.unshift(newHead);
  }

  cutTail () {
    this.body.pop();
  }

}

class Food {
  constructor () {
    this.x = Math.floor(Math.random() * tileAmount);
    this.y = Math.floor(Math.random() * tileAmount);
    this.position = [this.x, this.y];
  }
}

class Setup {
  constructor () {
    this.snake = new Snake();
    this.food = new Food();
  }

  snakeIsOnItself () {
    const tail = this.snake.body.slice(1);
    const head = this.snake.body[0];

    return tail.some( el => el[0] === head[0] && el[1] === head[1] );
  }

  snakeIsOnFood () {
    return this.snake.body.some( el => el[0] === this.food.x*tileSize && el[1] === this.food.y*tileSize );
  }

  generateFood () {
    this.food = new Food();
  }

  nextMove () {
    this.snake.attachHead();
    if (this.snakeIsOnItself()) {
      return false;
    } else if (!this.snakeIsOnFood()) {
      this.snake.cutTail();
    } else {
      this.generateFood();
    }

    return true;
  }
}

class Game {
  constructor () {
    this.setup = new Setup();
    this.counter = 0;
    this.difficultyLvl = 1;
    this.maxDifficultyLvl = 99;
    this.hardModeIsOn = false;
    this.gameOver = false;
  }

  updateDifficultyLvl () {
    const len = this.setup.snake.body.length;
    this.difficultyLvl = len <= this.maxDifficultyLvl? len : this.maxDifficultyLvl ;
  }

  drawSnake (colorCounter = 1) {
    let colorComponent = 1;
    this.setup.snake.body.forEach (el => {
      ctx.strokeStyle = pallette[colorCounter%4].light[colorCounter%3];
      ctx.fillStyle = pallette[colorCounter%4].light[(colorCounter-colorComponent)%3];
      ctx.beginPath();
      ctx.rect(el[0], el[1], tileSize, tileSize);
      ctx.fill();
      ctx.stroke();
      colorComponent++;
    })
  }

  drawFood (colorCounter = 1) {
    ctx.strokeStyle = pallette[1].dark[colorCounter%3];
    ctx.fillStyle = pallette[1].dark[(colorCounter+1)%3];
    ctx.beginPath();
    ctx.rect(this.setup.food.x*tileSize, this.setup.food.y*tileSize, tileSize, tileSize);
    ctx.fill();
    ctx.stroke();
  }
}

const g = new Game();
(animate = function () {

  if (!g.gameOver) {
    let lvlUp = 10 - Math.floor(g.difficultyLvl/10);
    if (++g.counter % lvlUp === 0) {

      ctx.clearRect(0, 0, boardSize, boardSize);
      ctx.beginPath();
      if (lvlUp <= 1) { // hard mode
        ctx.fillStyle = pallette[1+(g.counter/50 > Math.sin(g.counter))].dark[g.counter%2];
      } else {
        ctx.fillStyle = pallette[1].light[0];
      }
      ctx.fillRect(0, 0, boardSize, boardSize);
      ctx.stroke();

      g.setup.snake.direction = direction;
      g.drawSnake(g.counter);
      g.gameOver = !g.setup.nextMove();
      g.updateDifficultyLvl();
      g.drawFood(g.counter%4);

      g.counter %= 100;
    }

    myReq = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(myReq);
    alert('Game Over');
  }

})();

/*
  to do:
    - self-collision detection
        -- done
    - optimizing drawing functions
        -- nah
    - trippy bg
    - trippy snake
        -- kinda done
    - game gaining speed with snake eating Food
        -- kinda done
    - change food to snack
    - game over screen
    - division into smaller modules
    - score board on the side
*/
