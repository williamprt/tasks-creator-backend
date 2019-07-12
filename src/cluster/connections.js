const mongoose = require('mongoose');

module.exports = {
    mongoDB() {
        let ConnectWithMongo = mongoose.connect('mongodb+srv://admin:admin@cluster0-w2g57.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
        });

        return ConnectWithMongo;
    }
}