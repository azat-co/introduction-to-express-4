var express = require('express'),
  mongodb = require('mongodb'),
  bodyParser = require('body-parser')

var db
var app = express()
app.set('port', 3000)

app.get('/', function(req, res, next) {
  return res.send('ok')
})

app.get('/tasks', function(req, res, next) {
  db.collection('tasks').find({}, {limit: 10, sort: {_id: -1}}).toArray(function(error, tasks){
    return res.send(tasks)
  })
})



require('mongodb').MongoClient.connect("mongodb://localhost:27017/todo", function(err, openDb) {
  if (err) return console.error(err)
  db = openDb
  app.listen(app.get('port'))
})

process.on('exit', function(){
  db.close()
})