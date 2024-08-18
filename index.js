var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const path = require('path');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // File info to be returned
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileInfo);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
