function middleware(req, res, next) {
  console.log("middleware");
  console.log(req.params);

  if (req.params.id) {
    next(); // Pass control to the next middleware or route handler
  } else {
    res.status(403).send("ID Not found"); // Send response if no ID is found
  }
}

module.exports = middleware;