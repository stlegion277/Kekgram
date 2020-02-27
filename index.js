
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


server.listen(3000);


app.get('/', function(request, respons) {
    respons.sendFile(__dirname + '/index.html');
});

// Массив со всеми подключениями
connections = [];


io.sockets.on('connection', function(socket) {
    console.log("Соединились");
    // Добавление нового соединения в массив
    connections.push(socket);


    socket.on('disconnect', function(data) {
        // Удаления пользователя из массива
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отсоединились");
    });

    // Функция получающая сообщение от какого-либо пользователя
    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });

});