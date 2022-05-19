const mongoose  = require('mongoose');
const validator = require('validator');


const schema = new mongoose.Schema({
    name : {
        type : String,
        unique : [true, "This name already exists in the database"],
        trim : true
    },

    email : {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("This is not a correct email format")
            }
        },
        unique: [true, "This email already exists"],
        required: true,
        trim: true
    },
    slug : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    date : {
        type : String
    }
})

const Mydatabase = new mongoose.model('Omkarpatne', schema);

module.exports = Mydatabase;