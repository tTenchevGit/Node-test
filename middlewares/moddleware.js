function middleware(req, res, next) {
  console.log("middleware");
  console.log(req.params);

  if (req.params.id) {
    next();
  }

  res.status(403).send("ID Not found");
}

module.exports = middleware;