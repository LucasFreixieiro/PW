module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        return res.status(403).send("User not logged");
    },
    forwardAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()){
            return next();
        }
        return res.status(200).send("Already Logged");
    }
}