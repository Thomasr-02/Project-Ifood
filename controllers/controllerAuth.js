
const { check, validationResult } = require('express-validator');

const User = require('./controllerUser');

module.exports = {
    token : async function(req, res, next){
            const errors = validationResult(req);
            var verific =User.Authenticate({email: req.body.email, password: req.body.password})
            if(verific ==true){
                return res.status(200).json();
            }
            else{
                return res.status(401).json("email or password incorret")
            }
        }
};