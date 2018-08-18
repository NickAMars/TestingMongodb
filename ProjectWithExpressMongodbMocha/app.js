const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  app = express();
mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true });
}
//yarn add body-parser
app.use(bodyParser.json());

require('./routes')(app);

//middleware-- what to do if something goes wrong with this applications
app.use((err, req, res, next )=>{
  res.status(422).send({error: err.message});
})

module.exports = app;
