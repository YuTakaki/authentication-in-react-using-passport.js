const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/account');

// module.exports = function(passport){
//     passport.use(new localStrategy((username, password, done) => {
//         User.findOne({$or : [
//             {username : username},
//             {email: username}
//         ]})
//             .then(user => {
//                 if(!user)
//                     return done(null, false, {msg : 'username is not registered'});
//                 bcrypt.compare(password, user.password, (err, isMatch) => {
//                     if(isMatch){
//                         return done(null, user);
//                     }else{
//                         return done(null, false, {msg : 'password is incorrect'});
//                     }
//                 });
//             })
//             .catch(err => console.log(err));
//     }));
//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//       });
      
//     passport.deserializeUser((id, done) => {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });
// }

module.exports = function(passport){
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({$or : [
                {username : username},
                {email : username}
            ]}).then(user => {
                if (!user) return done(null, false, {msg : 'account is not registered'});
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {msg : 'password is incorrect'});
                    }
                })
            })
                .catch(err => console.log(err))
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}