require('dotenv').config();
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || '8080';

var app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  return res.json(req.file);
});

app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
