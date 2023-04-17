const Author = require('../models/author.model');

/* Mongoose methods to interact with our MongoDB*/

//this will grab ALL Authors
module.exports.getAllAuthors = (req, res) => {
    Author.find().sort({fullname: 1})
        .then((allAuthors) => {
            res.json(allAuthors)
        })
        .catch((err) => {
            res.status(400).json({ message: 'There was an error getting all authors', error: err })
        });
}

//this will grab ONE Author by the _id
module.exports.getOneAuthorById = (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(oneAuthor => {
            res.json(oneAuthor)
        })
        .catch((err) => {
            res.status(400).json({ message: 'There was an error getting one author', error: err })
        });
}

//this will DELETE author by the _id
module.exports.deleteOneAuthorById = (req, res) => {
    Author.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.status(400).json({ message: 'There was an error trying to delete the author', error: err })
        })
}

//this will UPDATE an author by _id and req.body
module.exports.updateOneAuthorById = (req, res) => {
    Author.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedAuthor => {
            res.json(updatedAuthor)
        })
        .catch((err) => {
            res.status(400).json({ message: 'There was an error trying to update the author', error: err })
        });
}

//this will CREATE ONE author by form submission
module.exports.createOneAuthor = (req, res) => {
    console.log(req.body);
    Author.create(req.body)
        .then((author) => {
            return res.json(author);
        })
        .catch((err) => {
            res.status(400).json({ ...err, message: err.message})
        });
}