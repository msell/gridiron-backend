var node_xj = require('xls-to-json');

(function(){
  node_xj({
    input: 'rotowireDraftRankings.xls',
    output: 'rotowireDraftRankings.json',
    sheetname: 'rankings'
  }, function(err, result){
    if(err) {
      console.log(err);
    }
    console.log(result);
  })
})();