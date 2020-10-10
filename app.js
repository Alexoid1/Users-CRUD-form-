const express = require('express');
const bodyParser= require('body-parser');
const session = require('express-session');
const pageRouter = require('./routes/pages');
const app=express();
const morgan=require('morgan')
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', "pug")
app.use(morgan('dev'));
app.use(session({
    secret:'youtube_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use(bodyParser.urlencoded({extended:true}));

app.use('/', pageRouter);
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});




app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
module.exports = app;