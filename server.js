const { Socket } = require('dgram');
const express = require('express');
const fetch = import('node-fetch');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

server.listen(3000, () => {
    console.log('listening on *:3000');
});
//send index.html to client
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


var database = [] //stores all data

//server-client connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    //get data from client, emit the data to all clients
    socket.on('drawing', (data) => {
        database.push(data)
        io.emit('drawing', data)
        console.log(data)
    })

    //send all previous to new client
    socket.emit("startingData", database)
});
