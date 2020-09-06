'use strict';

const mongoose = require('mongoose'), { Schema } = mongoose;

const ScreeningSchema = new Schema(
    {
        cinema_id: {
            type: String,
            trim: true,
            required: true
        },
        row: {
            type: String,
            trim: true
        },
        seat: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Screening', ScreeningSchema);
