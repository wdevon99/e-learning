const Person= require("../api/models/person.model");

const config = require("./database");
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const  opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//setting the secret key defined in the config (database.js file)
opts.secretOrKey = config.secret ;

module.exports= ( passport )=> {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Person.findUserById( jwt_payload._id , function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null , user);
            } else {
                return done(null , false);
            }
        });
    }));
}

