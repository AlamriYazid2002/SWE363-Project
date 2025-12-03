export default function Dashboard({ user }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.role || "user"}.</p>
    </div>
  );
}
