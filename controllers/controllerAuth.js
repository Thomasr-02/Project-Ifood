
const { check, validationResult } = require('express-validator');

const User = require('./controllerUser');
const Restaurante = require('./controllerUser');

module.exports = {
    token : async function(req, res, next){
            const errors = validationResult(req);
            var verific =await User.Authenticate({email: req.body.email, password: req.body.password})
            
            if(verific["rowCount"] !=0){
                return res.status(200).json(verific["rows"]);
            }
            else{
                return res.status(401).json(false)
            }
        }
};