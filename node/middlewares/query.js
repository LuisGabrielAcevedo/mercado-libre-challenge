function pagination(req, res, next) {
  req.query.page = req.query.page || 1;
  req.query.perPage = req.query.per_page || 50;
  next();
}

module.exports = {
  pagination
};
