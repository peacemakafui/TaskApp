const User = require('../models/User');
const errorHandler = require('./errorHandler');
const jwt = require('jsonwebtoken');


//function with jwt to authenticate user signup form
const maxAge = 3 * 34 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id}, 'net ninja secret'/*hash key*/,{
        expiresIn: maxAge
    });
}
//logic for signup page rendering
signup_get = (request, response)=>{
    response.render('signup');
}
//logic for login page rendering
login_get = (request, response)=>{
    response.render('login');
}
//logic for sending signup page form to the database
//because of its behavior this has to be async function, because it creates the user,
//inside db and then sends back a json to the browser
signup_post = async (request, response)=>{
    const {email, password} = request.body;

    //we create the user inside our db with this try block
    try{
        const user = await User.create({email, password});
        const token = createToken(user._id); //creates the jwt
        response.cookie('jwt',token,{httpOnly: true, maxAge: maxAge * 1000});// cookie containing our users jwt to the browser
        response.status(201).json({user:user._id});
        console.log('successfully created a new user')
    }
    catch(error){
        const errorsObj = errorHandler.handleErrors(error)
        response.status(400).json({errorsObj});
    }   
}

//logic for validating login details to allow user access the app post request
login_post = async (request, response)=>{
    const {email, password} = request.body;
    
    //now we cann access the static method we created in our db schema
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id); //creates the jwt
        response.cookie('jwt',token,{httpOnly: true, maxAge: maxAge * 1000});// cookie containing our users jwt to the browser
        response.status(200).json({user: user._id})
    }
    catch (error){
        const errorsObj = errorHandler.handleErrors(error);
        response.status(400).json({errorsObj});
    }
}
//logic to log a user out by replace=ing the original cookie with a blank cookie
// and an empty value, with a very short expiry time.
logout_get = (request,response)=>{
   response.cookie('jwt','',{maxAge:1});
   response.redirect('/');
}

module.exports ={
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
}