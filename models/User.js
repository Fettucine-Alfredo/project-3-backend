const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true,},
        username: {type: String, unique: true, required: true},
        email: {type: String, required: true}


    },
    {
        timestamps: true
    }
)



module.exports = User
