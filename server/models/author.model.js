const mongoose = require('mongoose');
//create the author schema with validations
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Author Name is required!'],
        minLength: [3, 'Author Name must be at least 3 characters long!']
    }
});
//export the author as a mongoose model
const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;