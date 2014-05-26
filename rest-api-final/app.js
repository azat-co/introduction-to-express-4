var express = require('express'),
  mongodb = require('mongodb'),
  bodyParser = require('body-parser')

var ObjectID = require('mongodb').ObjectID
var db
var app = express()
app.set('port', 3000)

app.get('/', function(req, res, next) {
  return res.send('ok')
})

app.get('/tasks', function(req, res, next) {
  db.collection('tasks').find({}, {
    limit: 10,
    sort: {_id: -1}
  }).toArray(function(error, tasks){
    if (error) return next(error)
    return res.send(tasks)
  })
})

app.post('/tasks', function(req, res, next) {
  db.collection('tasks').insert(req.body, function(error, task){
    if (error) return next(error)
    return res.send(task)
  })
})

app.put('/tasks/:id', function(req, res, next) {
  db.collection('tasks').update({_id: ObjectID(req.param.id)}, req.body, function(error, affectedCount){
    if (error) return next(error)
    return res.send(affectedCount)
  })
})

app.delete('/tasks/:id', function(req, res, next) {
  db.collection('tasks').remove({ _id: ObjectID(req.param.id)}, function(error, affectedCount){
    if (error) return next(error)
    return res.send(affectedCount)
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