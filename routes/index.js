const express = require('express');
const User = require('../models/account');
const bcrypt = require('bcrypt');
const passport = require('passport')
const ensureAuthenticated = require('../setup/auth');


const { urlencoded } = require('express');

const route = express.Router();

route.use(express.json());
route.use(urlencoded({extended : false}));

route.get('/', (req, res) => {
    User.find({}).then((data) => res.send(data));
});
route.post('/register', (req, res) => {
    console.log(req.body);
    const {username, email, password, retryPassword} = req.body;
    let err = [];
    User.findOne({username : username}).then(result => {
        if(result !== null) err.push({msg : 'username already exist'});
        console.log(result);
        User.findOne({email : email}).then(result => {
            if(result !== null) err.push({msg : 'email already exist'});
            console.log(result);
            if(password !== retryPassword){
                err.push({msg : 'password is not the same'});
            }
            const test= /(^([\w.])+)[@](\w+)[.](\w+)([.](\w)+)?/;
            if(!test.test(email)){
                err.push({msg : 'not a valid email'});
            }
            if(err.length === 0){
                console.log(true);
                const newUser = new User({
                    username,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {
                            console.log(user);
                            res.send(true);
                        })
                        .catch(err => console.log(err));
                }));

            }else{
                res.send(err);
                console.log(err);
            }
            console.log(err);
        });
    });
});

// route.post('/login', (req, res, next)=>{
//     passport.authenticate('local', (err, user, info) => {
//         if(err) return next(error);
//         if(!user) return res.send(info.msg);
//         req.logIn(user, (err)=>{
//             if (err)  return next(err);
//             return res.send(true)

//         });
//     })(req, res, next)
// })
route.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.send(info);
        req.logIn(user, (err) => {
            if(err) return next(err);
            return res.redirect('/authentication/dashboard/' + user.username);
        });
    })(req, res, next)
})
route.get('/dashboard/:user',ensureAuthenticated, (req, res)=> {
    res.send(req.params.user);
})
route.get('/logout', (req, res)=>{
    req.logout();
    res.send(true);
})
module.exports = route;