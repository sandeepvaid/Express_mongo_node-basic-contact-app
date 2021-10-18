//First import the mongoose
const mongoose = require('mongoose');

//Create schema and define it

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    phone:{
        type:String,
        required:true
    }
});

//Define the name of Collection for our schema

const Contact = mongoose.model('Contact' , contactSchema);

module.exports = Contact;