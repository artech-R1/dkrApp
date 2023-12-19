const bcrypt = require('bcrypt');
const User = require('../models/User.js');

/* GET ALL users */
const findAll = async function (req, res, next) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        return next(error);
    }
};

/* GET SINGLE User BY ID */
const findOne = async function (req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        return next(error);
    }
};

/* SAVE user */
const create = async function (req, res, next) {
    
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create(req.body);
        res.json(newUser);
        console.log(newUser);
    } catch (error) {
        return next(error);
    }
};

/* UPDATE User */
const update = async function (req, res, next) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        return next(error);
    }
};

/* DELETE User */
const deleteUser = async function (req, res, next) {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        // user.deleteOne()
        res.json(user);
    } catch (error) {
        return next(error);
    }
};





module.exports ={ findAll, findOne, create, update, deleteUser };
