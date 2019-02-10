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
                data: {
                    message
                }
            })

            .then(response => {
                msg = response.data
                // strip data
                const payloads = msg.split('payload');
                const toxicList = [];
                const nonToxicList = [];
                for (const payload of payloads) {
                    if (payload === '[') {
                        continue;
                    }
                    const score = payload.substring(payload.indexOf('score'), payload.indexOf('}')).split(' ')[1].replace(/(\r\n|\n|\r)/gm, "");
                    const display = payload.substring(payload.indexOf('display_name')).split('}')[0].split(' ')[1].replace(/(\r\n|\n|\r)/gm, "");
                    const valid = display.localeCompare('"Toxic"');
                    if (valid == 0) {
                        toxicList.push(score);
                    } else {
                        nonToxicList.push(score);
                    }
                }
                
                var nonToxicRate = 0;
                var toxicRate = 0;
                for (var i = 0; i < nonToxicList.length; i++) {
                        nonToxicRate += parseFloat(nonToxicList[i]);
                }
                for (var i = 0; i < toxicList.length; i++) {
                        toxicRate += parseFloat(toxicList[i]);
                }
                console.log(nonToxicRate);
                console.log(toxicRate);
                if (nonToxicRate >= toxicRate) {
                    io.sockets.emit("new message", {
                        msg: data,
                        user: socket.username,
                        toxic: "false"
                    });
                } else {
                    // console.log(data);
                    io.sockets.emit("new message", {
                        msg: data,
                        user: socket.username,
                        toxic: "true"
                    });
                }
                // console.log(msg);
                // console.log(nonToxicList);
                // console.log(toxicList);
            })
            .catch(err => console.log(err))


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