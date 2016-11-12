var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
app.use(bodyParser.json());

var multer = require('multer');

var upload = multer().single('uploadedFile');

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})
/*
app.post('/fileUpload', upload.single('uploadedFile'), function (req, res, next) {
  console.log(req.file);
  res.send(req.file);
})
*/
app.post('/fileUpload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return
    }
    console.log('receiving data');
    res.send('your file is ' + req.file.size + ' bytes.');

  })
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port '+app.get('port')+'!')
})