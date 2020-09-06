'use strict';

const mongoose = require('mongoose'), { Schema } = mongoose;

const MovieShowSchema = new Schema(
    {
        movie_id: {
            type: Schema.Types.ObjectId

        },
        original_title: {
            type: String,
            trim: true
        },
        overview: {
            type: String,
            trim: true
        },
        title: {
            type: String,
            trim: true,
            required: true
        },
        tagline: {
            type: String,
            trim: true
        },
        imdb_id: {
            type: String,
            trim: true
        }, original_language: {
            type: String,
            trim: true
        }, vote_average: {
            type: Number
        }, vote_count: {
            type: Number
        }, genres: [{ type: String }]

    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('MovieShow', MovieShowSchema);
