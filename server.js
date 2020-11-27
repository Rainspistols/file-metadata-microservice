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

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  const { originalname: name, mimetype: type, size } = req.file;

  res.json({
    name,
    type,
    size,
  });
});

app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
