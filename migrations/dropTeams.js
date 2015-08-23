var MongoClient = require('mongodb').MongoClient;
(function(){
  MongoClient.connect('mongodb://localhost:27017/gridiron', function(err, db){
      if(err) throw err;
      db.collection('team', function(err, collection){
        collection.remove({}, function(err,removed){
          console.log('teams dropped');
          db.close();
        })
      })
    })

})(); 