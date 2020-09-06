'use strict';

const mongoose = require('mongoose'), { Schema } = mongoose;

const ScreeningSchema = new Schema(
    {
        cinema_id: {
            type: String,
            trim: true,
            required: true
        },
        movie_id: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        start_time: Date,
        end_time: Date,
        reserved_seats: []
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Screening', ScreeningSchema);
