const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    selected: {
        type: Boolean,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

mongoose.model('Product', productSchema);
