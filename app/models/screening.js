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
                trim: true
            },
            name: String,
            city: String
        },
        movie: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: Movie,
                trim: true
            },
            title: String
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
