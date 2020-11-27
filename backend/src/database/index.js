const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://admin:${process.env.PASSWORD}@e-commerse.p8x0m.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, {         
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise

module.exports = mongoose