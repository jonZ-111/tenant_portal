const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            //verify if user exist
            const user = await User.findOne({ where: { email } });
            if(!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            // verify if user's password is correct [password belongs to user]
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return res.status(401).json({ message: 'Invalid email or password' })
            }
            //successful login's logic 
            const token = jwt.sign(
                {
                 id: user.id, 
                 email: user.email, 
                 role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN } 
            );

        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 24 * 60 * 60 *1000
            })
            .json({
                message: "Login Succesful",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                    }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({message: "Server error"});
        };
    } 
};