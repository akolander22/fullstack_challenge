var router = require('express').Router();
var mongoose = require('mongoose');
var path = require('path');

//mongoose mongodb
var db = mongoose.connect('mongodb://localhost/groceryList').connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
})

var grocerySchema = mongoose.Schema({
  name: String,
  qty: Number
})

var Grocery = mongoose.model('Grocery', grocerySchema);



//gets items from grocery db
router.get('/groceries', function(request,response){
  Grocery.find({}, function(err,groceries){
    if(err){
      console.log(err);
    }
    response.send(groceries);
  });
});


//puts new entry of grocery into db
router.post('/add', function(request, response){
  var grocery = new Grocery({name: request.body.name, qty: request.body.qty});
  grocery.save(function(err){
    if(err){
      console.log('Major error with new grocery', err);
    }
    response.send(grocery);
  });
});

//supposed to put on db the updated item
router.put('/editWithId/:id', function(request,response){
  var id = request.params.id;
  var name = request.params.name;
  var qty = request.params.qty;

  Grocery.findById(id, function(err, grocery){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      grocery.name = name;
      grocery.qty = qty;

      grocery.save(function(err){
        if(err){
          console.log('Some problem happened whilst saving', err);
          response.sendStatus(500);
        } else {
          console.log('Wow, you actually saved something..');
          response.sendStatus(200);
        }
      })
    }
  })
})

//supposed to delete item based on id
router.delete('/:id', function(request, response){
  var id = request.params.id;

  Grocery.findByIdAndRemove(id,function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Item Deleted');
      response.sendStatus(200);
    }
  })
})
//testing to see if update can happen...
// Grocery.findOneAndUpdate({_id: '5797811fe87c0e427ce57451'}, {name: 'apples'}, function(err,grocery){
//   if (err) throw err;
//   console.log(grocery);
// })

//puts html on the page
router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'))
})


module.exports = router;
