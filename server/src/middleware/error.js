export default function error(err, _req, res, _next) {
  const status = err.status || 500;
  if (err.isJoi) {
    return res.status(400).json({
      error: "Validation error",
      details: err.details?.map((d) => d.message) ?? [err.message],
    });
  }
  res.status(status).json({
    error: err.message || "Server error",
  });
}
