import mongoose from 'mongoose';

// User's schema

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        trim: true,
        match: /.*@.*\..*/
        // validate: [isEmail, 'invalid email'],
        // createIndexes: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLenght: 3,
        maxLenght: 35
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minLenght: 3,
        maxLenght: 35
    },
    birthDate: {
        type: Date,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Hombre', 'Mujer', 'Prefiero no decir'],
        default: 'Prefiero no decir',
        // required: true
    },
    avatar: {
        type: String,
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ranking",
        required: true
    },
    myEvents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    myComments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        required: true
    }
    // Dónde establecer referencias
});


const User = mongoose.model('users', userSchema);

export { User };