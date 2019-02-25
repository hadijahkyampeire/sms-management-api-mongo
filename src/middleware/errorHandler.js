module.exports = (err, req, res, next) => {
  if (req.headersSent) {
    return next(err);
  }

  let { code = 400, message = 'Something went wrong' } = err;

  if (code > 500 || code < 200) {
    code = 400;
  }
  if (code === 422) {
    return res.status(422).json(err.errors);
  }
  return res.status(code).send({ error: message });
};
