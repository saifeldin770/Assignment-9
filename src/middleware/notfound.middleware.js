async function notFoundMiddleware(req, res) {
  res.status(400).json({ msg: "Invalid method or url." });
}
export default notFoundMiddleware;
