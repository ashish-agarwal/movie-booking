'use strict';

const mongoose = require('mongoose'), { Schema } = mongoose;
const Movie = require('./movie');
const Cinema = require('./cinema');

const ScreeningSchema = new Schema(
    {
        cinema: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: Cinema,
                required: true,
                trim: true
            },
            name: String,
            city: String
        },
        movie: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: Movie,
                required: true,
                trim: true
            },
            title: String
        },
        start_time: {
            type: Date,
            required: true
        },
        end_time: {
            type: Date,
            required: true
        },
        reserved_seats: []
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Screening', ScreeningSchema);
