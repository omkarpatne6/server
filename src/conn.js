const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/exampledb')
    .then(() => {
        console.log("connected to the db successfully")
    })
    .catch((e) => {
        console.log(e)
    })


module.exports = mongoose;