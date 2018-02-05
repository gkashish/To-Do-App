var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://todo:todoapp@ds259105.mlab.com:59105/to_do_app')

//schema-blueprint
var todoschema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo',todoschema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });
  });
  app.post('/todo',urlencodedParser,function(req,res){
    var newTdodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });
  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });
};
