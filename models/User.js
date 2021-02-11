const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'Please enter an email'],//''takes in the custom error message to display to the user
        unique: true, //this property ensures that each email cannot be the same
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email']//property to validate a user email
    },
    password: {
        type: String,
        required: [true,'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
});

//hashing our password
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login user, this block of code contains the logic the scehma 
//would use to compare user passowrd in the db and the one the user would type in whiles
//logging in to authenticate them
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}
const User = mongoose.model('user', userSchema);

module.exports = User;