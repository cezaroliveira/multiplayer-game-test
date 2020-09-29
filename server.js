import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();
game.start();

game.subscribe((command) => {
  console.log(`> Emitting ${command.type}`, command);

  // Emit the custom command.type event to client and send a command
  sockets.emit(command.type, command);
});

sockets.on('connection', (socket) => {
  const playerId = socket.id;
  console.log(`> Player connected on server-side with id ${playerId}`);

  game.state.currentPlayerId = playerId;

  game.addPlayer({ id: playerId });

  // Emit the custom 'setup' event to client and send a game.state
  socket.emit('setup', game.state);
  console.log(`> Emiting 'setup' event to client`, game.state);

  // Listen the custom 'move-player' event from client to execute the business logic
  socket.on('move-player', (command) => {
    console.log(`> Player ${playerId} is moving on server-side`, command);
    game.movePlayer(command);
  });

  // Listen the 'disconnect' event from client to execute the business logic
  socket.on('disconnect', () => {
    console.log(`> Player ${playerId} disconnected`);
    game.removePlayer({ id: playerId });
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`> Server is listening on port: ${port}`);
});
