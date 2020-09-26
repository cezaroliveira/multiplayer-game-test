/**
 * Factory that create a keyboard listener.
 */
export default function createKeyboardListener(currentPlayerId) {
  const state = {
    observers: [],
    currentPlayerId: currentPlayerId
  }

  /**
   * Subscribe a function that will execute a command { playerId, keyPressed }.
   */
  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  /**
   * Notify all the subscribe functions to execute a command { playerId, keyPressed }.
   */
  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  function handleKeyDown(event) {
    const keyPressed = event.key;

    const command = {
      id: state.currentPlayerId,
      keyPressed,
      type: 'move-player',
    };

    notifyAll(command);
  }

  return {
    subscribe
  };
}
