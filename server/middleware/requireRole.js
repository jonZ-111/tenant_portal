module.exports = function requireRole(role) {
  return function (req, res, next) {
    // 1. If the logged-in user's role is NOT the required role → respond 403
    // 2. Otherwise → let the request continue
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};