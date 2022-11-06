import mongoose from 'mongoose';

// User's schema

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        trim: true,
        match: /.*@.*\..*/
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
        required: true
    },
    avatar: {
        type: String,
        trim: true
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "events"
    }],
    rankings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rankings"
    }]
});


const User = mongoose.model('users', userSchema);

export { User };