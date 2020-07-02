class App {
  constructor(canvas, sizeX, sizeY, sizeCase) {
    this.map = new Maps(canvas, sizeX, sizeY, sizeCase);
    this.size = { x: sizeX, y: sizeY };
    this.player = [];
    this.currentPlayer = 0;
    this.movementManager = this.movementManager.bind(this);
    this.addListtener();
    this.boxPlayer1 = document.getElementById("player1");
    this.boxPlayer2 = document.getElementById("player2");
    this.colorBoxP1 = this.boxPlayer1.style.background = "green";
    this.colorBoxP2 = this.boxPlayer2.style.background = "red";
    this.playerAttacked = false;
    this.setColorPlayerBox = this.setColorBoxPlayer();
  }

  setPlayers(quantity) {
    for (let index = 0; index < quantity; index++) {
      const x = App.random(this.size.x);
      const y = App.random(this.size.y);
      if (this.map.mapGame[y][x] === 0) {
        switch (index) {
          case 0: {
            const player1 = new Player(7, "vampi", 100, y, x);
            this.player.push(player1);
            console.log(player1);
            break;
          }
          case 1: {
            const player2 = new Player(8, "wolfi", 100, y, x);
            this.player.push(player2);
            console.log(player2);
            break;
          }
          default:
            break;
        }
      } else {
        console.log("Position occupied");
        index -= 1;
        console.log("qué es: " + typeof index);
      }
    }
  }

  drawPlayer = () => {
    for (let player of this.player) {
      this.map.mapGame[player.y][player.x] = player.imagePlayer;
    }
  };

  dibuja() {
    let tileMap = this.map.tileMap;
    tileMap.src = ".././img/tilemap.png";
    let ctxPlayer1 = this.boxPlayer1.getContext("2d");
    let ctxPlayer2 = this.boxPlayer2.getContext("2d");
    let imageCutX = 32; // sx : X coordinate, upper left corner image, horizontal
    let imageCutY = 0; // sy : y coordinate, upper left corner image, vertical
    let cutSizeImageX = 32; // sWidth :  horizontal size of image in original
    let cutSizeImageY = 32; // sHeight : vertical size of image in original
    let imagePlayerPositionX = 65; // dx: horizontal space in canvas
    let imagePlayerPositionY = 30; // dy: vertical space in canvas
    let widthImage = 80; // dWidth : horizontal size in canvas
    let heightImage = 60; // dHeight : vertical size in canvas

    let imageWeaponPositionY = 150;
    let textPositionX = 50;
    let textPositionY = 110;
    let WeaponPowerPositionY = 230;
    /**
     * Drawing the image of the player 1 and the image of his weapons.
     * Drawing the Player 1 score and the power of his weapon
     */
    ctxPlayer1.drawImage(
      tileMap,
      imageCutX * 7,
      imageCutY,
      cutSizeImageX,
      cutSizeImageY,
      imagePlayerPositionX,
      imagePlayerPositionY,
      widthImage,
      heightImage
    );
    let weaponP1 = this.player[0].weapon.idWeapon;
    ctxPlayer1.drawImage(
      tileMap,
      weaponP1 * 32,
      imageCutY,
      cutSizeImageX,
      cutSizeImageY,
      imagePlayerPositionX,
      imageWeaponPositionY,
      widthImage,
      heightImage
    );
    //Text score and power weapon
    let scoreP1 = this.player[0].score;
    let powerP1 = this.player[0].weapon.power;
    ctxPlayer1.font = "20px verdana";
    ctxPlayer1.fillText("Score:" + scoreP1, textPositionX, textPositionY);
    ctxPlayer1.fillText(
      "Power:" + powerP1,
      textPositionX,
      WeaponPowerPositionY
    );

    /**
     * Drawing the image of the player 2 and the image of his weapons.
     * Drawing the Player 2 score and the power of his weapon
     */
    ctxPlayer2.drawImage(
      tileMap,
      imageCutX * 8,
      imageCutY,
      cutSizeImageX,
      cutSizeImageY,
      imagePlayerPositionX,
      imagePlayerPositionY,
      widthImage,
      heightImage
    );
    let weaponP2 = this.player[1].weapon.idWeapon;
    ctxPlayer2.drawImage(
      tileMap,
      weaponP2 * 32,
      imageCutY,
      cutSizeImageX,
      cutSizeImageY,
      imagePlayerPositionX,
      imageWeaponPositionY,
      widthImage,
      heightImage
    );
    //Text score and power weapon
    ctxPlayer2.font = "20px verdana";
    ctxPlayer2.fillStyle = "white";
    ctxPlayer2.fillText(
      "Score:" + this.player[1].score,
      textPositionX,
      textPositionY
    );
    ctxPlayer2.fillText(
      "Power:" + this.player[1].weapon.power,
      textPositionX,
      WeaponPowerPositionY
    );
  }

  cleanPlayerCanvas() {
    this.boxPlayer1.width = 200;
    this.boxPlayer1.height = 300;
    this.boxPlayer2.width = 200;
    this.boxPlayer2.height = 300;
  }

  addListtener() {
    let direction;
    // const captureKey = document.addEventListener;
    // captureKey("keydown", this.movementManager);
    $(document).on("keydown", this.movementManager);
    $(document).on("fight", () => {
      this.fight();
    });
  }

  movementManager(event) {
    if (
      this.player[this.currentPlayer].movementAccumulator >=
      this.player[this.currentPlayer].limitMovement
    ) {
      if (this.currentPlayer == 0) {
        this.player[this.currentPlayer].movementAccumulator = 0;
        this.currentPlayer = 1;
      } else if (this.currentPlayer == 1) {
        this.player[this.currentPlayer].movementAccumulator = 0;
        this.currentPlayer = 0;
      }
    }

    if (event.keyCode == 13) {
      this.player[this.currentPlayer].movementAccumulator = 3;
      this.setColorBoxPlayer(this.currentPlayer);
    }

    if (this.player[this.currentPlayer].movementAccumulator >= 2) {
      this.setColorBoxPlayer(this.currentPlayer);
    }

    let direction = event.keyCode;
    this.player[this.currentPlayer].movement(
      direction,
      this.map,
      this.currentPlayer
    );
  }

  setColorBoxPlayer(playerActive) {
    if (playerActive == 0) {
      this.boxPlayer1.style.background = "red";
      this.boxPlayer2.style.background = "green";
    } else if (playerActive == 1) {
      this.boxPlayer1.style.background = "green";
      this.boxPlayer2.style.background = "red";
    }
  }

  fight() {
    $("#messageBox").hide();
    $("#launchInfoGame").hide();
    $("#buttonAttack").show(1000);
    $("#buttonDefense").show(1000);
    $(document).off("keydown");
    let attack = document.getElementById("buttonAttack");
    let defense = document.getElementById("buttonDefense");

    attack.addEventListener("click", (event) => {
      //wait
      this.atacking(this.currentPlayer);
    });

    defense.addEventListener("click", (event) => {
      this.defense(this.currentPlayer);
    });
  }

  atacking() {
    if (this.currentPlayer == 0) {
      console.log("Atacó VAMPI:", this.currentPlayer);
      this.substractingScore(
        this.player,
        this.currentPlayer,
        this.playerAttacked
      );
    } else if (this.currentPlayer == 1) {
      console.log("Atacó WOLFI:", this.currentPlayer);

      this.substractingScore(
        this.player,
        this.currentPlayer,
        this.playerAttacked
      );
    }
  }

  substractingScore(player, currentPlayer, playerAttacked) {
    console.log("Soy el jugador que atacó:", currentPlayer);

    let powerAttack = player[currentPlayer].weapon.power;
    console.log("power attack:", powerAttack);

    let woundedPlayer = Number(!currentPlayer);
    let score = player[woundedPlayer].score;
    let defense = player[woundedPlayer].defense;
    console.log("Valor de defensa", defense);

    let damage = score - powerAttack / defense;
    player[woundedPlayer].score = damage;
    player[woundedPlayer].defense = 1;
    this.currentPlayer = Number(!currentPlayer);
    this.playerAttacked = !playerAttacked;
    this.setColorBoxPlayer(currentPlayer);
    this.gameOver(currentPlayer);
  }

  defense(currentPlayer) {
    this.player[currentPlayer].defense = 2;
    this.currentPlayer = Number(!currentPlayer);
    this.setColorBoxPlayer(currentPlayer);
    this.gameOver(currentPlayer);
  }

  gameOver(currentPlayer) {
    if (this.player[Number(!currentPlayer)].score <= 0) {
      $("#buttonAttack").hide(1000);
      $("#buttonDefense").hide(1000);
      setTimeout(() => {
        $("#GameOver").modal("show");
        let fhatherTextLoser = document.getElementById("playerLoser");
        let textLoserPlayer = document.createElement("div");
        textLoserPlayer.textContent = `${
          this.player[Number(!currentPlayer)].name
        } has been lose`;
        textLoserPlayer.classList.add("textLoserPlayer");
        fhatherTextLoser.appendChild(textLoserPlayer);
        $("#playAgain").css("display", "block");
      }, 2000);
    }
  }

  /**
   * returns a random number between 0 and limit
   * @param limit
   * @returns {number}
   */
  static random(limit) {
    return Math.floor(Math.random() * limit);
  }
}
