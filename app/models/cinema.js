'use strict';

const mongoose = require('mongoose'), { Schema } = mongoose;

const CinemaSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Cinema', CinemaSchema);
