const AuthorController = require('../controllers/author.controller');
//all api routes for CRUD w/ read one & read all
module.exports = function(app) {
    app.get('/api/authors', AuthorController.getAllAuthors)
    app.post('/api/author', AuthorController.createOneAuthor)
    app.get('/api/author/:id', AuthorController.getOneAuthorById)
    app.put('/api/author/:id', AuthorController.updateOneAuthorById)
    app.delete('/api/author/:id', AuthorController.deleteOneAuthorById)
}