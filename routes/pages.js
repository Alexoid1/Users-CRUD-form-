const express = require('express');
const User = require('../core/user');

const router = express.Router();


const user= new User();

router.get('/', (req, res, next) => {  
  
    res.render('form-get', {title:"My application"});
});

router.get('/users', (req, res, next) => {
   

        console.log(req.query)
        res.render('users', {name:req.body.name});
        return;
   
    
});

router.get('/login', (req, res, next) => {  
    
    user.login(req.body.name, req.body.email, req.body.adress, function(result){
        if(result) {
            

            res.redirect('/users');
        }else{
            res.send('username incorect')
        }
    })
})

router.post('/register', (req, res, next) => {  
    const user= new User();
    let userInput = {
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        password: req.body.password
    };
    
    user.create(userInput, function(lastId) {
        if(lastId) {
            user.find(lastId, function(result){
                

                res.redirect('/index');
            });
          
        }else{
            console.log('error creatinmg the user')
        }
    }
)});

router.get('/index',(req,res,next)=> {
    const user= new User();
    user.index(user,function(result){
        if(user){
            
            res.render('index',{users:result});
        }else{
            console.log('error showing users')
        }
    })
    
})

router.get('/delete/:id',(req,res,next)=> {
    const user= new User();
    
    par=req.params
    user.delete(par,function(result){
        res.redirect('/index');
    })

});
router.get('/edit/:id',(req,res,next)=> {
    const user= new User();
    
    par=req.params
    user.edit(par,function(result){
        
        res.render('edit',{title:"My application",user:result[0]});
    })

});
router.post('/update/:id',(req,res,next)=> {
    const user= new User();
    let reqs=req.params
    let userUpdate = {
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        password: req.body.password,
        
    };
    console.log(userUpdate.name,req.params)
    
    user.update(userUpdate,reqs,function(result){
       
        res.redirect('/index');
    })

});
module.exports = router;