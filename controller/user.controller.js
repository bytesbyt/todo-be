const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {}

userController.createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            throw new Error('User already exists');
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({name, email, password: hash});
        await newUser.save();
        res.status(200).json({status:"success"});
    } catch (error) {
        res.status(400).json({status:"fail", error})
    }
}

module.exports = userController;