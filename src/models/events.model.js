import mongoose from 'mongoose';

// Event's schema

const eventSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    timeStart: {
        type: Date,
        required: true,
        trim: true
    },
    timeEnd: {
        type: Date,
        required: true,
        trim: true
    },
    haveCost: {
        type: Boolean,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        trim: true
    },
    capacity: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLenght: 90,
        maxLenght: 300
    },
    images: [{
        type: String,
        trim: true
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true
    },
    attendance: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }]
});

// Create model
// ('events' (reference collection name), 'eventSchema (schema))
const Event = mongoose.model('events', eventSchema);

export { Event };
