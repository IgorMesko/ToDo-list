const userServices = require('../services/user.services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserControllers {
    async registrationUser(body) {
        const { email, password } = body;
        const candidate = await userServices.getUserEmail(email);
        
        if(!candidate) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = await userServices.createUser({email, password: hashedPassword});
            return user;
        } else {
            return 'Данный email уже зарегистрирован.';
        };
    };

    async loginUser(body) {
        const { email, password } = body;
        const candidate = await userServices.getUserEmail(email);

        if(candidate) {
            const validatePassword = await bcrypt.compare(password, candidate.password);
            if(validatePassword) {
                const token = jwt.sign({
                    email: candidate.email,
                }, process.env.ACCESS_TOKEN_SECRET);
                return token;
            } else {
                return "Введен неправильный пароль."
            }; 
        } else {
            return 'Данный пользователь не зарегистрирован.';
        };
    };

    async getUsers() {
        const users = await userServices.getUsers();
        return users;
    };
};

module.exports = new UserControllers();
