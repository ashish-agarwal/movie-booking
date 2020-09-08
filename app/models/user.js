'use strict';

const crypto = require('crypto'), mongoose = require('mongoose'), { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required!'],
            trim: true,
            validate: {
                validator: (email) => {
                    const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
                    return emailRegex.test(email);
                },
                message: '{VALUE} is not a valid email!'
            }
        },
        phone: String,
        profilePicture: String,
        role: String,
        deleted: {
            type: Boolean,
            default: false
        },
        address: {
            city: String,
            state: String,
            zipcode: String
        },
        hashed_password: String,
        salt: String,
        disabled: {
            type: Boolean,
            default: false
        },
        disabled_on: Date
    },
    {
        timestamps: true
    }
);

UserSchema.virtual('password')
    .set(function (password) {
        this._password = String(password);
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(this._password);
    }).get(function () {
        return this._password;
    });

UserSchema.methods = {
    authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    makeSalt() {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword(password) {
        if (!password || !this.salt) return '';
        const salt = Buffer.from(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    }
};
UserSchema.set('toJSON', {
    transform (doc, ret, opt) {
        delete ret['hashed_password'];
        delete ret['salt'];
        return ret;
    }
});

module.exports = mongoose.model('User', UserSchema);
