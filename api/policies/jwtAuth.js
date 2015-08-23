var jwt = require('jwt-simple');

module.exports = function (req, res, next) {

  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({
      message: 'Unauthorized'
    });
  }

  var token = req.headers.authorization.split(' ')[1];
  console.log('token ' + token);
  console.log('secret ' + process.env.GRIDIRON_AUTH_SECRET);
  var payload = jwt.decode(token, process.env.GRIDIRON_AUTH_SECRET);

  if (!payload.sub) {
    res.status(401).send({
      message: 'Authentication failed'
    });
  }

  sails.models.user.findOne({
    id: payload['sub']
  }, function (err, user) {
    if (err) return next(err);

    req.options.values = req.options.values || {};

    if (user) {
      // suposedly the correct way is to use the req,options.values, but im not a level 6 wizard yet
      //req.options.values.user = user;
      req.body.user = user;
    }

    next();
  })
}
