const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require("path");
const app = new express();
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const wordRoutes = require('./routes/wordRoutes');

app.use(express.json({limit: '10kb'})); //uploading data should be less than or equal to 10kb
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb'}));
app.use(cors());

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'http:', 'data:'],
        scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
      },
    })
  );

app.use('/api/v1/oxford', dictionaryRoutes);
app.use('/api/v1/word', wordRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


module.exports = app;