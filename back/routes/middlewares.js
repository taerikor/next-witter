exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    }else {
        res.status(401).send('require login')
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    }else {
        res.status(401).send('Login users are not accessible')
    }
}