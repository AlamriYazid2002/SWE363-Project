export default function RequireRole({ user, allowed = [], children }) {
  if (!user || !allowed.includes(user.role)) return null;
  return children;
}
