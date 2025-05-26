import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName : {
        type :  String,
        required : true
    },
    userEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    userPassword: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    userRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const userModel = mongoose.model('User', userSchema)

export default userModel