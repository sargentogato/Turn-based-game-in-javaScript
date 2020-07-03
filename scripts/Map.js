/* eslint-disable no-console */
class Maps {
  constructor(canvas, sizeX, sizeY, sizeCase) {
    this.canvas = document.getElementById("canvas");
    this.canvas.width = sizeX * sizeCase;
    this.canvas.height = sizeY * sizeCase;
    this.size = { x: sizeX, y: sizeY, case: sizeCase };
    this.ctx = this.canvas.getContext("2d");
    this.tileMap = new Image();
    this.tileMap.src = "img/tilemap.png";
    this.mapGame = [];
    this.FPS = 50;
    this.weapons = [];
  }

  set(rocks, guns) {
    this.setTiles();
    this.setRocks(rocks);
    this.setGuns(guns);
  }

  setTiles() {
    for (let indexLine = 0; indexLine < this.size.y; indexLine++) {
      const line = [];
      for (let indexColumn = 0; indexColumn < this.size.x; indexColumn++) {
        const column = 0;
        line.push(column);
      }
      this.mapGame.push(line);
    }
  }

  setRocks(quantity) {
    for (let index = 0; index < quantity; index++) {
      const x = App.random(this.size.x);
      const y = App.random(this.size.y);
      let element;
      if (this.mapGame[y][x] === 0) {
        element = new Rock(y, x);
        this.mapGame[element.position.y][element.position.x] = 1;
        console.log(element);
      } else {
        console.log("Postion occupied");
        index -= 1;
      }
    }
  }

  setGuns(quantity) {
    for (let index = 0; index < quantity; index++) {
      const x = App.random(this.size.x);
      const y = App.random(this.size.y);
      let element;
      if (this.mapGame[y][x] === 0) {
        switch (index) {
          case 0: {
            element = new Gun(3, "watermelon", 15, y, x);
            this.mapGame[element.y][element.x] = 3;
            console.log(element);
            this.weapons.push(element);
            break;
          }
          case 1: {
            element = new Gun(4, "eggplant", 20, y, x);
            this.mapGame[element.y][element.x] = 4;
            console.log(element);
            this.weapons.push(element);
            break;
          }
          case 2: {
            element = new Gun(5, "pumkin", 25, y, x);
            this.mapGame[element.y][element.x] = 5;
            this.weapons.push(element);
            console.log(element);
            break;
          }
          case 3: {
            element = new Gun(6, "broccoli", 30, y, x);
            this.mapGame[element.y][element.x] = 6;
            this.weapons.push(element);
            console.log(element);
            break;
          }
          default:
            break;
        }
      } else {
        index -= 1;
      }
    }
    console.log(this.weapons);
  }

  drawMapGame() {
    for (let y = 0; y < this.mapGame.length; y++) {
      for (let x = 0; x < this.size.x; x++) {
        const tile = this.mapGame[y][x];
        this.ctx.drawImage(
          this.tileMap,
          tile * 32,
          0,
          32,
          32,
          this.size.case * x,
          this.size.case * y,
          this.size.case,
          this.size.case
        );
        // drawImage definition;
        // tileMap : Image
        // sx : X coordinate upper left corner image, horizontal
        // sy : y coordinate upper left corner image, vertical
        // sWidth :  horizontal size of image in original : 32
        // sHeight : vertical size of image in original :32
        // dx: horizontal space in canvas
        // dy: vertical space in canvas
        // dWidth : horizontal size in canvas
        // dHeight : vertical size in canvas
      }
    }
  }
} // end class
