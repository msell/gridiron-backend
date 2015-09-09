var _ = require("underscore");
var request = require('superagent');
var config = require('./config.json');
var fs = require('fs');

(function () {

  request.get(config.mfl_url + "?TYPE=league&L=" + config.leagueId + "&JSON=1")
    .set("Accept", "applicaiton/json")
    .end()
    .on('response', function (res) {

      // console.log(res.body);
      var franchises = res.body.league.franchises.franchise;

      console.log(franchises.length + ' total franchises');

      var count = 0;
      _.each(franchises, function (f) {
        request.post(config.url + 'franchise')
          .send({
            "id": f.id.toString(),
            "name": f.name,
            //"league": need to add league,
            "division": f.division,
            "abbreviation": f.abbrev,
            "waiverSortOrder": f.waiverSortOrder,
            "logo": f.logo,
            "icon": f.icon
          })
          .on('response', function (res) {

          })
          .end(function () {
            count++;
          });
      })
    })
})();
