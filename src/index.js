const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const url = require('./url');

let aplication = express();
UseCORS();
let server = require('http').Server(aplication);
let io = require('socket.io')(server)

ConnectToMongoose();
UseSocketIO();
UseRoutes();

server.listen(process.env.PORT || 3333, function () {
    console.log('localhost is ok')
});


function ConnectToMongoose() {
    try {
        mongoose.connect(url.mongoDB, {
            useNewUrlParser: true,
        });
    } catch (e) {
        aplication.get('/', function (req, res) {
            res.send(`Cannot connect to mongoose. ${e}`)
        });
    };
};
function UseSocketIO() {
    return aplication.use((req, res, next) => {
        req.io = io;
        next()
    });
};
function UseCORS() {
    return aplication.use(cors());
};
function UseRoutes() {
    return aplication.use(routes);
};