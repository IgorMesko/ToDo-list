const express = require('express');
const router = express.Router();
const notesControllers = require('../controllers/notes.controllers');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * /api/notes:
 *  get:
 *      summary: Список всех заметок пользователя
 *      description: Используй этот URL для получения всех заметок
 *      tags: 
 *          - Notes
 *      security:
 *          - Bearer: []
 *      responses:
 *          '200':
 *              description: Успешный ответ
 */

router.get('/', authorization, async (req, res) => {
    try {
        const notes = await notesControllers.getNotes();
        res.set('Access-Control-Allow-Origin', '*');
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json({ message: error });
    };
});

/**
 * @swagger
 * /api/notes/create:
 *  post:
 *      summary: Создания новой записки
 *      tags:
 *        - Notes
 *      security:
 *          - Bearer: []
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: Note
 *          required: true
 *          description: Добавить объект со свойствами
 *          schema:
 *              $ref: '#/definitions/Notes'
 *      responses:
 *          '200':
 *              description: Успешный ответ
 *              shema:
 *                  title: return String
 *                  type: string
 *                  example: "Notes added succesfully"
 *          '500':
 *              description: Error
 *              shema:
 *                  type: string
 *                  example: "Error"
 * definitions:
 *  Notes:
 *      description: Notes object
 *      properties:
 *          text:
 *              type: string
 *              example: text
 *              description: description created notes
 *          time:
 *              type: string
 *              example: 20:00
 *              description: description time of created notes
 *      required:
 *           - text
 *           - time
 */ 

router.post('/create', authorization, async (req, res) => {
    try {
        const notes = await notesControllers.createNotes(req.body);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(notes);
        console.log('Запись успешно создана.');
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json({ message: error });
    };
});

/**
 * @swagger
 * /api/notes/edit/{id}:
 *  put:
 *      summary: Изменить пользователя
 *      tags:
 *        - Notes
 *      security:
 *          - Bearer: []
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Указать id который нужно изменить
 *          type: string
 *        - in: body
 *          name: Notes
 *          required: true
 *          description: Объект для замены
 *          schema:
 *               $ref: '#/definitions/Notes'
 *      responses:
 *          '200':
 *              description: Успешный ответ
 */

router.put('/edit/:id', authorization, async (req, res) => {
    try {
        const notes = notesControllers.editNotes(req.params.id, req.body);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(notes);
        console.log('Запись успешно изменена.');
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json({ message: error });
    }
});

/**
 * @swagger
 * /api/notes/delete/{id}:
 *  delete:
 *      summary: Удалить пользователя из списка из списка
 *      tags:
 *        - Notes
 *      security:
 *          - Bearer: []
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Указать id который нужно удалить
 *          type: string
 *      responses:
 *          '200':
 *              description: Успешный ответ
 */

router.delete('/delete/:id', authorization, async (req, res) => {
    try {
        const notes = await notesControllers.deleteNotes(req.params.id);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(notes);
        console.log('Запись успешно удалена.');
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json({ message: error });
    };
});

module.exports = router;