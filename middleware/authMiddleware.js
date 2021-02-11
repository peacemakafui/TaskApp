const jwt = require('jsonwebtoken');
const User = require('../models/User');


const requireAuth = (request, response, next) =>{
    const token = request.cookies.jwt;

    //check json web token exists & is verified
    if(token){
        jwt.verify(token, 'net ninja secret', (error, decodedToken)=>{
            if(error){
                console.log(error.message);
                response.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        response.redirect('/login')
    }
}

//logic to check current user
const checkUser = (request, response, next)=>{
    const token = request.cookies.jwt;

    if(token){
        jwt.verify(token, 'net ninja secret', async (error, decodedToken)=>{
            if(error){
                console.log(error.message);
                response.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                response.locals.user = user;
                next();
            }
        })
    }
    else{
        response.locals.user = null;
        next();
    }
}

module.exports = {requireAuth,checkUser};