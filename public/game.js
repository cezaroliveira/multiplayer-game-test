/**
 * Factory to create the game.
 */
export default function createGame() {
  // State of game elements
  const state = {
    players: {
      // player1: {
      //   positionX: 1,
      //   positionY: 1
      // },
      // player2: {
      //   positionX: 9,
      //   positionY: 9
      // },
    },
    fruits: {
      // fruit1: {
      //   positionX: 3,
      //   positionY: 1
      // },
    },
    screen: {
      width: 10,
      height: 10
    }
  };

  function start() {
    const frequency = 10000;
    setInterval(addFruit, frequency);
  }

  const observers = [];

  /**
   * Subscribe a function that will execute a command { playerId, keyPressed }.
   */
  function subscribe(observerFunction) {
    observers.push(observerFunction);
  }

  /**
   * Notify all the subscribe functions to execute a command { playerId, keyPressed }.
   */
  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function addPlayer(command) {
    addElement(state.players, {
      ...command,
      type: 'add-player'
    });
  }

  function removePlayer(command) {
    removeElement(state.players, {
      ...command,
      type: 'remove-player'
    });
  }

  function addFruit(command) {
    addElement(state.fruits, {
      id: `fruit_${Math.floor(Math.random() * 10000000)}`,
      ...command,
      type: 'add-fruit'
    });
  }

  function removeFruit(command) {
    removeElement(state.fruits, {
      ...command,
      type: 'remove-fruit'
    });
  }

  function addElement(elementsArray, command) {
    elementsArray[command.id] = {
      ...command,
      id: command.id,
      positionX: command.positionX ? command.positionX : Math.floor(Math.random() * state.screen.width),
      positionY: command.positionY ? command.positionY : Math.floor(Math.random() * state.screen.height),
    };

    console.log('> Adding element...', {
      ...elementsArray[command.id]
    });

    console.log('>>> Comparing command with element added...', command, elementsArray[command.id]);

    notifyAll(elementsArray[command.id]);
  }

  function removeElement(elementsArray, command) {
    console.log('> Removing element...', {
      ...command,
      ...elementsArray[command.id]
    });
    delete elementsArray[command.id];
    notifyAll(command);
  }

  function checkCollision(currentPlayerId) {
    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];
      const player = state.players[currentPlayerId];

      if (player.positionX === fruit.positionX && player.positionY === fruit.positionY) {
        delete state.fruits[fruitId];
        break;
      }
    }
  }

  /**
   * Accepted player moves. Each function name is equivalent to "event.key" from keyboard listener.
   */
  const acceptedMoves = {
    ArrowUp(player) {
      if (player.positionY > 0) {
        player.positionY--;
        return true;
      }
      return false;
    },
    ArrowDown(player) {
      if (player.positionY + 1 < state.screen.height) {
        player.positionY++;
        return true;
      }
      return false;
    },
    ArrowLeft(player) {
      if (player.positionX > 0) {
        player.positionX--;
        return true;
      }
      return false;
    },
    ArrowRight(player) {
      if (player.positionX + 1 < state.screen.width) {
        player.positionX++;
        return true;
      }
      return false;
    },
  };

  /**
   * Move the player.
   */
  function movePlayer(command) {
    const keyPressed = command.keyPressed;

    const currentPlayer = state.players[command.id];

    const moveFunction = acceptedMoves[keyPressed];

    if (currentPlayer && moveFunction) {
      if (moveFunction(currentPlayer)) {
        console.log('moved', command, currentPlayer);
        checkCollision(command.id);
        notifyAll({
          ...command,
          type: 'move-player'
        });
      }
    }
  }

  return {
    state,
    setState,
    start,
    subscribe,
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
  };
}
