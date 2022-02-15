
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http'
import { Server } from "socket.io";
import "reflect-metadata";

import indexRouter from './routes/index.js';

var app = express();
const server = http.Server(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const __dirname = path.resolve();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 9000;

io.on("connection", (socket) => {
  console.log("New Socket connected: ", socket.id);
  socket.on('join_game',({ room }) => {
    const connectedSockets = io.sockets.adapter.rooms.get(room);
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );

    if (
      socketRooms.length > 0 ||
      (connectedSockets && connectedSockets.size === 2)
    ) {
      socket.emit("room_join_error", {
        error: "Room is full please choose another room to play!",
      });
    } else {
      socket.join(room);
      socket.emit("room_joined");

      if (io.sockets.adapter.rooms.get(room).size === 2) {
        socket.emit("start_game", { start: true, symbol: "x" });
        socket
          .to(room)
          .emit("start_game", { start: false, symbol: "o" });
      }
    }
  })

});

server.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
