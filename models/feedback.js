const mongoose = require('mongoose');

// Schema for a single feedback
const feedbackItemSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
    }
});

// Schema for product's feedbacks
const feedbackSchema = new mongoose.Schema({
    reference: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    feedbackList: {
        type: [ feedbackItemSchema ],
        required: true
    },
});

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;
