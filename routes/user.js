const { createUser, getUser, getAllUsers, clearDb, deleteAuser, updateUser } = require('../controller/user');

const router = require('express').Router();

router.post('/user', createUser);

router.get('/user', getAllUsers);

router.get('/user/:id', getUser);

router.delete('/user', clearDb);

router.delete('/user/:id', deleteAuser);

router.put('/user/id', updateUser);

module.exports = router