const Promise = require('bluebird');

const User = require('../models/user');

exports.register = function (userObject) {
    if (!userObject.email) {
        return Promise.reject(new Error('Email is not provided'));
    }
    return User.findOne({
        email: userObject.email
    }).then((user) => {
        if (!user) {
            return User.create(userObject);
        }
        return Promise.reject(new Error('User Exists With Same Email'));
    });
};

exports.authenticate = function (userDetails) {
    return User.findOne({
        email: userDetails.email
    }).then((user) => {
        if (!user) {
            return Promise.reject(new Error('User Not Found'));
        }
        if (user.authenticate(userDetails.password)) {
            return user;
        }
        return Promise.reject(new Error('Invalid Password'));

    });
};

exports.getProfile = function (user, callback) {
    return User.findOne(user, callback);
};
exports.updateProfile = function (id, user) {
    return User.findOneAndUpdate({
        _id: id,
        deleted: false
    }, user, {
        runValidators: true,
        new: true
    });
};

exports.getUsers = function (query) {
    return User.find(query);
};

exports.getUserById = function (id) {
    return User.findById(id);
};
