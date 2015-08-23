var MongoClient = require('mongodb').MongoClient;
(function(){
  MongoClient.connect('mongodb://localhost:27017/gridiron', function(err, db){
      if(err) throw err;
      db.collection('player', function(err, collection){
        collection.remove({}, function(err,removed){
          console.log('players dropped');
          db.close();
        })
      })
    })

})(); 