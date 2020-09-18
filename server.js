import express from 'express';
import http from 'http';
import socketio from 'socket.io'
import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();

sockets.on('connection', (socket) => {
  const playerId = socket.id;
  console.log(`> Player connected on server-side with id ${playerId}`);

  game.state.currentPlayerId = playerId;

  game.addPlayer({ id: playerId });

  socket.emit('setup', game.state);

  socket.on('disconnect', () => {
    console.log(`> Player ${playerId} disconnected`);
    game.removePlayer({ id: playerId });
  });
});

sockets.on('', (socket) => {
  const playerId = socket.id;
  console.log(`> Player connected on server-side with id ${playerId}`);

  game.state.currentPlayerId = playerId;

  sockets.emit('setup', game.state);
});

const port = 3000;

server.listen(port, () => {
  console.log(`> Server is listening on port: ${port}`);
});
