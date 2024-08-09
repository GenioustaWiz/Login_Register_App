// check if user is authenticated
function isAuthenticated(req, res, next){
    if (req.session.userId){ //If user is authenticated Load next templated
        return next();
    }
    //ELSE
    res.redirect('user/login');
}

//check if user is not uathenticated
function isNotAuthenticated(req, res, next){
    if(!req.session.userId){ // if usr is not authenticated load next
        return next()
    }
    //ELSE load index page
    res.redirect('/')
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated
}