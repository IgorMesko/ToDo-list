const User = require('../models/users.models');

class UserServices {
    getUsers() {
        return new Promise((resolve, reject) => {
            try {
                const users = User.find();
                resolve(users);
            } catch (error) {
                reject(error);
            };
        });
    };

    getUserEmail(email) {
        return new Promise((resolve, reject) => {
            try {
                const users = User.findOne({ email });
                resolve(users);
            } catch (error) {
                reject(error);
            };
        });
    };

    createUser(body) {
        return new Promise((resolve, reject) => {
            try {
                const { email, password } = body;
                const newUser = User.create({ email, password });
                resolve(newUser);
            } catch (error) {
                reject(error);
            };
        });
    };

};

module.exports = new UserServices();