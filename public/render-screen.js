/**
 * Render the screen elements
 */
export default function renderScreen(game, canvas) {
  
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
      context.fillStyle = color;
      context.fillRect(element.positionX, element.positionY, 1, 1);
    }
  }

  // Callback to update the screen continually
  requestAnimationFrame(() => {
    renderScreen(game, canvas)
  });
}
