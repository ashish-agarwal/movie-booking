'use strict';

const mongoose = require('mongoose'), { Schema } = mongoose;
const Movie = require('./movie');
const Cinema = require('./cinema');
const Screening = require('./screening');
const User = require('./user');

const BookingSchema = new Schema(
    {
        cinema: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: Cinema,
                trim: true,
                required: true
            },
            name: String,
            city: String
        },
        screening_id: {
            type: Schema.Types.ObjectId,
            ref: Screening,
            required: true
        },
        user: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: User,
                required: true
            },
            name: String
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
        seat: {},
        booked_at: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Booking', BookingSchema);
