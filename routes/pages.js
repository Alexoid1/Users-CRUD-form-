const express = require('express');
const User = require('../core/user');

const router = express.Router();


const user= new User();

router.get('/', (req, res, next) => {  
  
    res.render('form-get', {title:"My application"});
});

router.get('/users', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('users', {opp:req.session.opp, name:user.name});
        return;
    }
    res.redirect('/');
});

router.get('/login', (req, res, next) => {  
    
    user.login(req.body.name, req.body.email, req.body.adress, function(result){
        if(result) {
            req.session.user=result;
            req.session.opp=1;

            res.redirect('/users');
        }else{
            res.send('username incorect')
        }
    })
})

router.post('/register', (req, res, next) => {  

    let userInput = {
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        password: req.body.password
    };
    
    user.create(userInput, function(lastId) {
        if(lastId) {
            user.find(lastId, function(result){
                req.session.user=result;
                req.session.opp=0;

                res.redirect('/users');
            });
          
        }else{
            console.log('error creatinmg the user')
        }
    }
)});

router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});


module.exports = router;