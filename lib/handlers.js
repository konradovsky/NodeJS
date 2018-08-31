//  Const dependencies

const _data = require('./data');
const helpers = require('./helpers');
 
 
 
 let handlers = {};

 handlers.users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];

    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback);
    } else{
        callback(405);
    }

 };

//  Container for the users submethods
handlers._users = {};

// Users POST
handlers._users.post = (data,callback) => {
    let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    let tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

    if(firstName && lastName && phone && password && tosAgreement){
        // Make sure that the user doesnt already exist
        _data.read('users', phone, (err, data) => {
            if(!err){
                // Hash the password
                let hashPassword = helpers.hash(password);
                if(hashPassword){
                    // Create user object
                    const userObject = {
                        firstName,
                        lastName,
                        phone,
                        'password' : hashPassword,
                        tosAgreement: true
                    }
                    // Store the user
                    _data.create('users', phone, userObject, (err) => {
                        if(!err){
                            callback(200)
                        }else {
                            console.log(err)
                            callback(500, {'Error': 'Could not create a new user'})
                        }
                    })
                }else{
                    callback(500, {'Error': 'Could not hash the password'})
                }
                
            } else{
                callback(400, {'Error': 'That user with that phone number already exists'})
            }
        })
    } else {
        callback(400, {'Error': 'Missing required fields'})
    }
};
// Users GET
handlers._users.get = (data,callback) => {

};

// Users PUT
handlers._users.put = (data,callback) => {

};

// Users DELETE
handlers._users.delete = (data,callback) => {

};

 handlers.ping = (data, callback) => {
     callback(200)
 };
 handlers.notFound = (data, callback) => {
     callback(404)
 };

