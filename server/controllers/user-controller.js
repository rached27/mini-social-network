var db = require('../database/database');
var jwt  = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);




module.exports.createUser = function(req, res){
    var password = bcrypt.hashSync(req.body.user_password, salt);
    var query = "INSERT INTO users (username, user_password, email, origin, age, famille, race, nourriture) VALUES ('" + req.body.username + "', '" + password + "', '" + req.body.email + "', '" + req.body.origin + "', '" + req.body.age + "', '" + req.body.famille + "', '" + req.body.race + "', '" + req.body.nourriture + "')";
    
    db.query(query).spread(function(result, metadata){
        res.status(200).send("User was successfully created.");
    }).catch(function(err){
        res.status(500).send(err);
    })
}

module.exports.modifyUser = function(req, res){
    var password = bcrypt.hashSync(req.body.user_password, salt);


    
    var query = "UPDATE users SET username='" + req.body.username + "', user_password='" + password + "', email='" + req.body.email + "', origin='" + req.body.origin + "', age='" + req.body.age + "', famille='" + req.body.famille + "', race='" + req.body.race + "', nourriture='" + req.body.nourriture + "'  WHERE id='" + req.body.id + "' ";
   
    db.query(query).spread(function(result, metadata){
        res.status(200).send("Profile was successfully edited.");
    }).catch(function(err){
        res.status(500).send(err);
    })

}

module.exports.logIn = function(req, res){
    var submittedPassword = req.body.password;
    
    var query = "SELECT * FROM users WHERE username='" + req.body.loginName + "' OR email='" + req.body.loginName + "'";
   
    db.query(query).spread(function(result, metadata){
        if (result.length > 0){
            var userData = result[0];
            var isVerified = bcrypt.compareSync(submittedPassword, userData.user_password);
            
            var token = jwt.sign(userData, process.env.SECRET, {
                expiresIn: 60*60*24
            })
            
            if (isVerified){
                delete userData.user_password;
                res.json({
                    userData: userData,
                    token: token
                })
            } else {
                res.status(400).send("User entered the wrong password");
            }
        }
        
    }).catch(function(err){
        res.status(500).send("Unable to process the query.");
    })
}

