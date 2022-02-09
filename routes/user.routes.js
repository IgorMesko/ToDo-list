const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * /api/users/registration:
 *  post:
 *      summary: Регистрация пользователя
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: User
 *          required: true
 *          description: Добавить объект со свойствами
 *          schema:
 *              $ref: '#/definitions/UserRegister'
 *      responses:
 *          '200':
 *              description: Успешный ответ
 *              shema:
 *                  title: return String
 *                  type: string
 *                  example: "User added succesfully"
 *          '500':
 *              description: Error
 *              shema:
 *                  type: string
 *                  example: "Error"
 * definitions:
 *  UserRegister:
 *      description: Users object
 *      properties:
 *          email:
 *              type: string
 *              example: example@example.com
 *              description: login for user
 *          password:
 *              type: string
 *              example: 123123
 *              description: password for user
 *      required:
 *           - email
 *           - password
 */ 

router.post('/registration', async (req, res) => {
    try {
        const user = await userControllers.registrationUser(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Registration error' });
    };
});

/**
 * @swagger
 * /api/users/login:
 *  post:
 *      summary: Аутентификация пользователя
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: User
 *          required: true
 *          description: Добавить объект со свойствами
 *          schema:
 *              $ref: '#/definitions/UserLogin'
 *      responses:
 *          '200':
 *              description: Успешный ответ
 *              shema:
 *                  title: return String
 *                  type: string
 *                  example: "User successfully logged in"
 *          '500':
 *              description: Error
 *              shema:
 *                  type: string
 *                  example: "Error"
 * definitions:
 *  UserLogin:
 *      description: Users object
 *      properties:
 *          email:
 *              type: string
 *              example: example@example.com
 *              description: login for user
 *          password:
 *              type: string
 *              example: 123123
 *              description: password for user
 *      required:
 *           - email
 *           - password
 */ 

router.post('/login', async (req, res) => {
    try {
        const user = await userControllers.loginUser(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Registration error' });
    };
});

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Список всех пользователей
 *      description: Используй этот URL для получения всех пользователей
 *      tags: 
 *          - Users
 *      security:
 *          - Bearer: []
 *      responses:
 *          '200':
 *              description: Успешный ответ
 */

router.get('/', authorization, async (req, res) => {
    try {
        const user = await userControllers.getUsers();
        res.json(user);
    } catch (error) {
        res.json({ message: error });
        res.status(400).json({ message: 'Registration error' });
    };
});

module.exports = router;