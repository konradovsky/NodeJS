/**
 * Helpers for various taskt
 * 
 */


//  Dependencies
const crypto = require('crypto');
const config = require('../config');


//  Container for all helpers
let helpers = {};

helpers.hash = password => {
    if(typeof(password == 'string' && password.length > 0 )){
        let hash = crypto.createHmac('sha256', config.hashingSecret).update(password).digest('hex');
        return hash;
    }else {
        return false;
    }
}

helpers.parseJsonToObject = data => {
    try{
        let obj = JSON.parse(data);
        return obj;
    }catch(e){
        return {};
    }
}
module.exports = helpers;