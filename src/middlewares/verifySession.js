function verifySession(req, res, next) {
  if (req.session.user !== undefined) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = verifySession;
