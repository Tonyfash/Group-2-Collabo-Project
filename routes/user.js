const { createUser, getUser, getAllUsers, clearDb, deleteAuser } = require('../controller/user');

const router = require('express').Router();

router.post('/user', createUser);

router.get('/user', getAllUsers);

router.get('/user/:id', getUser);

router.delete('/user', clearDb);

router.delete('/user/:id', deleteAuser);


module.exports = router