const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');

//task board page
router.get('/taskBoard',requireAuth, taskController.task_board);

//post request to send data to our db from our views
router.post('/taskBoard', taskController.task_create_post);

router.get('/taskBoard/create', taskController.task_create_get);

//get request for task edit
router.get('/taskBoard/edit/:id', taskController.task_edit_get);
//post request for task edit to update db
router.post('/taskBoard/edit/:id', taskController.task_edit_post);

//getting a single blog
router.get('/taskBoard/:id',taskController.task_details)

//delete request is made but we need to send this data in json to our front end
router.delete('/taskBoard/:id', taskController.task_delete);

module.exports = router;

