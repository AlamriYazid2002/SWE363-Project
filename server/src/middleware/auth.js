import jwt from "jsonwebtoken";

export function auth(allowedRoles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = header.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = payload || {};
      req.user = { id, role };

      if (allowedRoles.length && !allowedRoles.includes(role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
