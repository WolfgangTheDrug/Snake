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

const pallette = {
  yellowGreen: yellowGreen,
  skyBlue: skyBlue,
  slateBlue: slateBlue,
  crimson: crimson
};

/* ******************* *
 *   Pallette: STOP    *
 * ******************* */

const tileSize = 12;  // highly composite number!
const tileAmount = 60; // highly composite number!
const boardSize = tileSize * tileAmount; //highly composite number!

const canvas = document.querySelector('canvas');
canvas.width = boardSize;
canvas.height = boardSize;
const ctx = canvas.getContext('2d');

class Snake {
  constructor () {
    this.body = [[0, 0]];
    this.direction = [1, 0];
  }

  attachHead () {
    const head = this.body[0];
    const newHead = head.map( (el, idx) => el+this.direction[idx])
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
  }
}

class Setup {
  constructor () {
    this.snake = new Snake();
    this.food = new Food();
  }

  snakeIsOnFood () {
    return this.snake.some( el => el[0] === food.x && el[1] === food.y );
  }

  generateFood () {
    this.food = new Food();
  }

  nextMove () {
    this.snake.attachHead();
    if (!snakeIsOnFood()) {
      this.snake.cutTail();
    } else {
      generateFood();
    }
  }
}
