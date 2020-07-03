class Player {
  constructor(imagePlayer, name, score, positionY, positionX) {
    this.imagePlayer = imagePlayer;
    this.name = name;
    this.score = score;
    this.x = positionX;
    this.y = positionY;
    this.movementAccumulator = 0;
    this.limitMovement = 3;
    this.weapon = new Gun(2, "cherries", 10, positionY, positionX);
    this.lastTurnElement = 0;
    this.defense = 1;
  }

  movement(direction, map, currentPlayer) {
    const collision = this.rockCollision(direction, map);
    switch (direction) {
      case up:
        if (this.y > 0) {
          if (!collision) {
            map.mapGame[this.y][this.x] = this.lastTurnElement; // draw grass
            this.y -= 1;
            this.whoPlayerIsMoving(map, currentPlayer);
            this.counterMovement();
            console.log("Contador de movimientos:", this.movementAccumulator);
            this.getWeapons(map);
          }
        }
        break;

      case down:
        if (this.y < 9) {
          if (!collision) {
            map.mapGame[this.y][this.x] = this.lastTurnElement; // draw grass
            this.y += 1;
            this.whoPlayerIsMoving(map, currentPlayer);
            this.counterMovement();
            console.log("Contador de movimientos:", this.movementAccumulator);
            this.getWeapons(map);
          }
        }
        break;

      case left:
        if (this.x > 0) {
          if (!collision) {
            map.mapGame[this.y][this.x] = this.lastTurnElement; // draw grass
            this.x -= 1;
            this.whoPlayerIsMoving(map, currentPlayer);
            this.counterMovement();
            console.log("Contador de movimientos:", this.movementAccumulator);
            this.getWeapons(map);
          }
        }
        break;

      case right:
        if (this.x < 14) {
          if (!collision) {
            map.mapGame[this.y][this.x] = this.lastTurnElement; // draw grass
            this.x += 1;
            this.whoPlayerIsMoving(map, currentPlayer);
            this.counterMovement();
            console.log("Contador de movimientos:", this.movementAccumulator);
            this.getWeapons(map);
          }
        }
        break;

      default:
        break;
    }
  }

  // Increment this.movementAccumulator after movement
  counterMovement() {
    this.movementAccumulator += 1;
  }

  /**
   * Checking rock collisions. Is received the map property fromo App class
   */
  rockCollision(direction, map) {
    const limitTopDown = this.y;
    let collision = false;
    switch (direction) {
      case up:
        if (limitTopDown != 0) {
          collision = map.mapGame[this.y - 1][this.x] == 1;
        }
        break;
      case down:
        if (limitTopDown != 9) {
          collision = map.mapGame[this.y + 1][this.x] == 1;
        }
        break;
      case left:
        collision = map.mapGame[this.y][this.x - 1] == 1;
        break;
      case right:
        collision = map.mapGame[this.y][this.x + 1] == 1;
        break;
      default:
        break;
    }
    return collision;
  }

  // Checking who player is moving
  whoPlayerIsMoving(map, currentPlayer) {
    let playerToFind;
    if (currentPlayer === 0) {
      playerToFind = 8;
    } else {
      playerToFind = 7;
    }

    this.playerDetection(map, playerToFind);
  }

  playerDetection(map, playerToFind) {
    const limitTopDown = this.y;
    switch (limitTopDown) {
      case 0:
        if (
          map.mapGame[this.y + 1][this.x] == playerToFind ||
          map.mapGame[this.y][this.x - 1] == playerToFind ||
          map.mapGame[this.y][this.x + 1] == playerToFind
        ) {
          this.dispatchFightEvent();
        }
        break;
      case 9:
        if (
          map.mapGame[this.y - 1][this.x] == playerToFind ||
          map.mapGame[this.y][this.x - 1] == playerToFind ||
          map.mapGame[this.y][this.x + 1] == playerToFind
        ) {
          this.dispatchFightEvent();
        }
        break;
      default:
        if (
          map.mapGame[this.y - 1][this.x] == playerToFind ||
          map.mapGame[this.y + 1][this.x] == playerToFind ||
          map.mapGame[this.y][this.x - 1] == playerToFind ||
          map.mapGame[this.y][this.x + 1] == playerToFind
        ) {
          this.dispatchFightEvent();
        }
        break;
    }
  }

  dispatchFightEvent() {
    const event = new Event("fight", { bubbles: true });
    document.dispatchEvent(event);
  }

  getWeapons(map) {
    const playerPosition = map.mapGame[this.y][this.x];
    const weaponIndex = map.weapons.findIndex(
      (weapon) => weapon.idWeapon == playerPosition
    ); // devuelve el index del array cuando encuentra un arma

    /**
     * Ese index no servirá para extraer el elemento del array y ponerlo dentro del this.weapons que es el array que almacena las armas de los jugadores.
     */

    if (weaponIndex !== -1) {
      // Existe un arma
      const currentWeapon = this.weapon;
      const takingWeapon = map.weapons.find(
        (weapon) => weapon.idWeapon == playerPosition
      ); // Recorriendo array almacenando arma

      this.weapon = takingWeapon; // guardando arma
      map.weapons.splice(weaponIndex, 1); // Sacando el arma

      if (currentWeapon !== null) {
        this.lastTurnElement = currentWeapon.idWeapon;
        map.weapons.push(currentWeapon);
      }
    }

    if (weaponIndex == -1) {
      this.lastTurnElement = 0;
    }
  }
}
