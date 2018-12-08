const models = require('../models');
const Promise = require('bluebird');
const session = require('../models/session.js')

module.exports.createSession = (req, res, next) => {
    if (req.body.username) {
        console.log('HERES the user name ', req.body.username)
    }
    if (JSON.stringify(req.cookies) === JSON.stringify({}) || !req.cookies ) {
        res.cookies ={};
        return session.create()
        .then ( (result) => {
            return session.get({id:result.insertId})
        })        
        .then ((result) => {
            req.session = result;
            res.cookie('shortlyid',result.hash);
            next('TEST');
        })
    } else {
        let hash = req.cookies.shortlyid; 
        return session.get({hash:hash})       
        .then ((result) => {
            if(result){
                req.session = result;
                res.cookie('shortlyid',result.hash);
                next('TEST');
            } else {
                return session.create()
                .then ( (result) => {
                    return session.get({id:result.insertId})
                })        
                .then ((result) => {
                    req.session = result;
                    res.cookie('shortlyid',result.hash);
                    next('TEST');
                })
            }
        })
    }     
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

