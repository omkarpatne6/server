const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://omkar:omkar123@test.ynj89.mongodb.net/exampledb', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to the db successfully")
    })
    .catch((e) => {
        console.log(e)
    })


module.exports = mongoose;