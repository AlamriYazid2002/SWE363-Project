import jwt from "jsonwebtoken";

export default function auth(roles = []) {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ error: "Missing token" });

      const token = header.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { id: payload.id, role: payload.role };

      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
