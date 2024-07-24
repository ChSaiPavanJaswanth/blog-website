const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
// const morgan = require('morgan');

let initial_path = path.join(__dirname, 'public');
// console.log(initial_path);
// console.log(__dirname)
const app = express();
// app.use(morgan());
app.use(express.static(initial_path));

app.use(fileupload());

app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, 'home.html'));
});

app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, 'editor.html'));
});

app.post('/upload', (req, res) => {
  // console.log(req.files);
  let file = req.files.image;
  let date = new Date();
  //image name so that it can be unique
  let imageName = date.getDate() + date.getTime() + file.name;
  //image upload path
  let paths = path.join(__dirname, 'public/uploads/') + imageName;
  //create upload
  file.mv(paths, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(`/uploads/${imageName}`);
    }
  });
});

app.listen('3000', () => {
  console.log('listening.....');
});
