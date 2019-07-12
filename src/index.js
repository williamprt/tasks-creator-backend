const express = require('express');
const cors = require('cors');
const cluster = require('./cluster/connections');
const routes = require('./routes');

let aplication = express();
let server = require('http').Server(aplication);
let io = require('socket.io')(server)

cluster.mongoDB();

aplication.use((req, res, next) => {
    req.io = io;

    next()
});
aplication.use(cors())
aplication.use(routes)

server.listen(process.env.PORT || 3333, function () {
    console.log('localhost is ok')
});