var axios = require('axios');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

// start server
server.listen(process.env.PORT || 3000);
console.log('Server running');

// getting the file
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

io.sockets.on('connection', function (socket) {
    connections.push(socket); // add a socket
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', function (data) {
        // if(!socket.username) return; // no user
        // delete user
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        // disconnect user
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    // Send Message
    socket.on('send message', function (data) {
        // No BULLY
        const Url = 'http://35.237.196.72/message';
        const message = data
        axios({
                method: 'post',
                url: Url,
                data: { message }
            })

            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        // console.log(data);
        io.sockets.emit("new message", {
            msg: data,
            user: socket.username
        });
    });

    // New User 
    socket.on('new user', function (data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    })

    function updateUsernames() {
        io.sockets.emit('get users', users);
    }

});