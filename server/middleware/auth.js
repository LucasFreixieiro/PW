const { hasPermission } = require("../models/UserModel");


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
    },
    hasPermission: function(controller, action) {
        return (req, res, next) => {
            hasPermission({id: req.user[0].id, controller: controller, action: action}, 
            (err, rest) => {
                if(err) return res.status(500).send("Some Error");
                if(rest.length > 0){
                    return next();
                }
                return res.status(403).send("Without permissions");
            })
        }
    }
}