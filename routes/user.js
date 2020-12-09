const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const Todo = require('../models/todo');
const { isLoggedIn, isAuthorizated, validateQuery, validateTodo } = require('../utils/middleware');
const user = require('../controllers/user');

router.route('/')
    .get(isLoggedIn, catchAsync(user.index))
    .post(isLoggedIn, isAuthorizated, validateTodo, catchAsync(user.addNewTask));

router.put('/edit/:do_id', isLoggedIn, isAuthorizated, validateTodo, catchAsync(user.editTask));
router.post('/did/:do_id', isLoggedIn, isAuthorizated, catchAsync(user.markTaskAsDoneorUndone))
router.delete('/rm/:do_id', isLoggedIn, isAuthorizated, catchAsync(user.deleteTask))
router.get('/group', isLoggedIn, isAuthorizated, validateQuery, catchAsync(user.getTasksByGroupName))
router.get('/when', isLoggedIn, isAuthorizated, validateQuery, catchAsync(user.getTasksByDate))

module.exports = router;