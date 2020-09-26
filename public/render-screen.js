/**
 * Render the screen elements
 */
export default function renderScreen(game, canvas, currentPlayerId) {
  
  const context = canvas.getContext('2d');
  
  // Clear all the screen area
  context.clearRect(0, 0, game.state.screen.width, game.state.screen.height);

  renderElements(game.state.players, "black");
  renderElements(game.state.fruits, "green");

  /**
   * Render the elements
   */
  function renderElements(elementsArray, color) {
    for (const elementId in elementsArray) {
      const element = elementsArray[elementId];
      // Define yellow to current player
      context.fillStyle = currentPlayerId === elementId ? 'yellow' : color;
      context.fillRect(element.positionX, element.positionY, 1, 1);
    }
  }

  // const currentPlayer = game.state.players[currentPlayerId];

  // if (currentPlayer) {
  //   context.fillStyle = '#F0DB4F';
  //   context.fillRect(currentPlayer.positionX, currentPlayer.positionY, 1, 1);
  // }

  // Callback to update the screen continually
  requestAnimationFrame(() => {
    renderScreen(game, canvas, currentPlayerId)
  });
}
