/**
 * Factory that create a keyboard listener.
 */
export default function createKeyboardListener(currentPlayerId) {
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

  document.addEventListener("keydown", handleKeyDown);

  function handleKeyDown(event) {
    const keyPressed = event.key;

    const command = {
      id: currentPlayerId,
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
  };
}
