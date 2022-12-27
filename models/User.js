const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxLength: 51
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },

})

//index.js 에서 user.sava 하기 직전
userSchema.pre('save', function ( next ) {
    var user = this;

    console.log('userSchema.pre')
    if (user.isModified('password')) {
        console.log('password modified')
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            //hash: 암호화된 비밀번호
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    }
});

const User = mongoose.model('User', userSchema)

module.exports = { User }