const models = require('../models');
const Promise = require('bluebird');
const session = require('../models/session.js')

module.exports.createSession = (req, res, next) => {
    if (JSON.stringify(req.cookies) === JSON.stringify({})) {
        return session.create()
        .then ( (result) => {
            return session.get({id:result.insertId})
        })        
        .then ((result) => {
            req.session = result;
            res.cookies['shortlyid'] = {'value' : result.hash};
            next();
        })
    } else {
        console.log('%%%%%%%%%%%%%',req.cookies);
        let hash = req.cookies.shortlyid; 

        return session.get({hash:hash})       
            .then ((result) => {
                req.session = result;
                res.cookies['shortlyid'] = {'value' : result.hash};
                next();
            })
    }     
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

