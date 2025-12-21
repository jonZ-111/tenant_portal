const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        try {
            console.log("LOGIN BODY:", req.body);
            const { email, password } = req.body;
            
            //verify if user exist
            const user = await User.scope("withSecrets").findOne({ 
                where: { email },
                attributes: [
                    "id",
                    "email",
                    "password",         
                    "role",
                    "tempPassword",
                    "mustChangePassword",
                    "passwordChangedAt"
                ]
            });
            if(!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            // verify if user's password is correct [password belongs to user]
            console.log("USER PASSWORD VALUE:", user.password);
            console.log("TYPE:", typeof user.password);
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return res.status(401).json({ message: 'Invalid email or password' })
            }
            //successful login's logic 
            const token = jwt.sign(
                {
                 id: user.id, 
                 email: user.email, 
                 role: user.role,
                 mustChangePassword: user.mustChangePassword
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
    },

    async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { newPassword } = req.body;

      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.update(
        {
          password: hashedPassword,
          tempPassword: null,
          mustChangePassword: false,
          passwordChangedAt: new Date(),
        },
        { where: { id: userId } }
      );

      return res.json({ message: "Password updated successfully" });
    } catch (err) {
      console.error("Change password error:", err);
      res.status(500).json({ message: "Failed to change password" });
    }
  }
};