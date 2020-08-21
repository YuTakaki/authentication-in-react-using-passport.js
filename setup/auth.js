function ensureAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.send(false);
}

module.exports = ensureAuthenticated