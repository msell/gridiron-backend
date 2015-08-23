var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function (user, res) {
    var payload = {
        //iss: req.hostname,
        sub: user.id,
        exp: moment().add(10, 'days').unix()
    };

    var token = jwt.encode(payload, process.env.GRIDIRON_AUTH_SECRET);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}
