/**
 * Factory to create the game.
 */
export default function createGame(currentPlayerId, canvas) {
  // State of game elements
  const state = {
    players: {
      player1: {
        positionX: 1,
        positionY: 1
      },
      player2: {
        positionX: 9,
        positionY: 9
      },
    },
    fruits: {
      fruit1: {
        positionX: 3,
        positionY: 1
      },
    },
    screen: {
      width: canvas.width,
      height: canvas.height
    },
    currentPlayerId: currentPlayerId
  };

  function addPlayer(command) {
    addElement(state.players, command);
  }

  function removePlayer(command) {
    removeElement(state.players, command);
  }

  function addFruit(command) {
    addElement(state.fruits, command);
  }

  function removeFruit(command) {
    removeElement(state.fruits, command);
  }

  function addElement(elementsArray, command) {
    elementsArray[command.id] = {
      positionX: command.positionX,
      positionY: command.positionY,
    };
  }

  function removeElement(elementsArray, command) {
    delete elementsArray[command.id];
  }

  /**
   * Accepted player moves. Each function name is equivalent to "event.key" from keyboard listener.
   */
  const acceptedMoves = {
    ArrowUp(player) {
      if (player.positionY > 0) {
        player.positionY--;
      }
    },
    ArrowDown(player) {
      if (player.positionY + 1 < canvas.height) {
        player.positionY++;
      }
    },
    ArrowLeft(player) {
      if (player.positionX > 0) {
        player.positionX--;
      }
    },
    ArrowRight(player) {
      if (player.positionX + 1 < canvas.width) {
        player.positionX++;
      }
    },
  };

  /**
   * Move the player.
   */
  function movePlayer(command) {
    const keyPressed = command.keyPressed;

    const currentPlayer = state.players[state.currentPlayerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (currentPlayer && moveFunction) {
      moveFunction(currentPlayer);
    }
  }

  return {
    state,
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
  };
}