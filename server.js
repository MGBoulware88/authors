const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
require('./server/config/mongoose.config');
//REQUIRED FOR CRUD
app.use(express.json(), cors(), express.urlencoded({ extended: true }));
//ADD ALL MODEL ROUTES HERE
require('./server/routes/author.routes')(app);
//THIS SHOULD BE LAST
app.listen(port, () => console.log(`Listening on port: ${port}`) );