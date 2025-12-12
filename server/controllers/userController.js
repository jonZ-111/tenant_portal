const bcrypt = require('bcrypt');
const { sequelize, User, Tenant } = require('../models');

function generateTempPassword() {
  return Math.random().toString(36).slice(-10);
}

module.exports = {
  async createProfile(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { role, email, password, profile } = req.body;

      // Only admins can create profiles
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const rawPassword = password || generateTempPassword();
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      // 1️⃣ Create User
      const user = await User.create(
        {
          email,
          password: hashedPassword,
          role,
        },
        { transaction }
      );

      // 2️⃣ Create role-based profile
      let roleProfile = null;

      if (role === 'tenant') {
        roleProfile = await Tenant.create(
          {
            userId: user.id,
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
            email,
          },
          { transaction }
        );
      }

      // Add before deployment
      // if (role === 'staff') { ... }
      // if (role === 'admin') { ... }

      await transaction.commit();

      return res.status(201).json({
        message: 'Profile created successfully',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        profile: roleProfile,
        tempPassword: password ? null : rawPassword, // show only if auto-generated
      });

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ message: 'Failed to create profile' });
    }
  },
};
