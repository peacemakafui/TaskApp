//error handler function that responds with our custom errors
function handleErrors(error){
    console.log(error.message, error.code);
    let errorsObj = {email: '', password: ''};

    //duplicate error code, checks to make sure email is unique when signing up and sends the message to the user
    if(error.code === 11000){
        errorsObj.email = 'email already registered';
        return errorsObj;
    }
    //incorrect email when logging in
    if(error.message === 'incorrect email'){
        errorsObj.email = 'that email is not registered'
        
    }

    //incorrect password when logging in
    if(error.message === 'incorrect password'){
        errorsObj.password = 'password is incorrect'
        
    }

    //conditions for the validation error for signing up
    if(error.message.includes('user validation failed')){
        Object.values(error.errors).forEach(({properties})=>{
            errorsObj[properties.path] = properties.message;//this now gives us the message form the properties property
        }); //the object property helps as get the error values from the errors object
    }
    return errorsObj;
}

module.exports = {handleErrors};