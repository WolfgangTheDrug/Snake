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

 class Tile {
   constructor(xTile = 0, yTile = 0, bgColor = pallette.yellowGreen.neutral[1], borderColor = pallette.yellowGreen.dark[1]) {
     this.posX = xTile * tileSize; // xTile and yTile are numbers of Tile, not pixel
     this.posY = yTile * tileSize; // but this.posX and this.posY are in pixels
     this.width = tileSize;
     this.height = tileSize;
     this.bgColor = bgColor;
     this.borderColor = borderColor;
   }

   draw () {
     ctx.fillStyle = this.bgColor;
     ctx.strokeStyle = this.borderColor;
     ctx.lineWidth = 1;
     ctx.beginPath();
     ctx.rect(this.posX, this.posY, this.width, this.height);
     ctx.fill();
     ctx.stroke();
   }
 }

/*
const t = new Tile (12, 10);
t.draw();
console.log(t);

// WORKS!
*/

class FoodTile extends Tile {
  constructor(xTile = Math.floor(Math.random() * tileAmount), yTile = Math.floor(Math.random() * tileAmount), bgColor, borderColor) {
    super(xTile, yTile, bgColor, borderColor);
  }
}

/*
const f = new FoodTile ();
f.draw();
console.log(f);

// WORKS!
*/

class Snake { // array of tiles
  constructor () {
    this.body = [[0,0]];
    this.head = this.body[0];
    this.tail = this.body.slice(1);
    this.length = this.body.length;
  }

  move (direction) { // direction is a unit 2x1 array
    this.body.push([this.head[0] + direction[0], this.head[1] + direction[1]]);
  }

  eat (food) {
    if (!(food.posX === this.head[0] && this.posY === this.head[1])) {
      this.body.pop();
    }
  }

  /*
    Umm... `move` and `eat` methods might be tricky to understand:
    `move` always adds one unit length to the snake.
    `eat` normally deletes this excess;
    the only exception of this rule is when the snake eats a fruit.
    In this case we don't want it to shrink.
  */

  doesntCollide () {
    return this.tail.every(el => el[0] !== this.head[0] || el[1] !== this.head[1]);
  } // the snake doesnt collide with itself if every element of its tail
  // has different coordinates than its head

  draw() {
    const body = this.body;
    body.forEach(
      el => {
        const index = body.indexOf(el);
        const t = new Tile(...body[index]);
        t.draw();
      }
    );
  }
};

class Game {
  constructor () {}

  generateFood () {
    const food = new FoodTile(Math.floor(Math.random() * tileAmount), Math.floor(Math.random() * tileAmount));
    food.draw();
    return food;
  }

  generateSnake () {
    const snake = new Snake ();
    snake.draw();
    return snake;
  };

  start () {
    const f = this.generateFood();
    const s = this.generateSnake();
  }
};

const g = new Game();
g.start()
