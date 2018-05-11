const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(__dirname));

app.use(bodyParser.json()); 

var jsonfile = require('jsonfile');
var fs = require('fs');

var default_file = 'lists/default-list.json';
var default_dir = 'lists/';

fs.stat(default_dir, function(err, stat){
    if (err == null){
        //do nothing
    }
    else if (err.code == 'ENOENT') {
        fs.mkdir(default_dir, function(err){
            if (err) { console.log('Failed creating directory: ', err)};
        });
    } else {
        console.log('There is a problem with directory:', err);
    }
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'))
});

app.get('/api/lists', function (req,res) {
   fs.readdir(default_dir, function(err, files){
       if (err) throw err;
       let lists = files;
       return res.send(lists);
   }) 
   return null;
});

app.get('/api/lists/:name', function(req, res){
   let name = req.params.name;
   fs.readFile(default_dir + name, function(err, file){
        if (err) throw err;
        let data = file;
        return res.send(data);
   }) 
   return null;
});

app.put('/api/lists/:name', function(req, res){
    let name = req.params.name;
    let data = req.body;
    fs.writeFile (default_dir + name, JSON.stringify(data), function(err){
        if (err) throw err;
    })
    return res.send(data);
})

// HTTP listener
app.listen(5000, function () {
    console.log('Travel Prep API : listening on port 5000');
});
module.exports = app;