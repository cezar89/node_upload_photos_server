const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const errorController = require('./controllers/error');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
// for making the files accessible to the public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));



const fileStorage = multer.diskStorage({
        //path
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    //filename
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        //store the file
        cb(null, true);
    } else {
        //don't store the file
        cb(null, false);
    }
};

// for reading files 
// make sure that when you send to POST, do the enctype="multipart/form-data", to parse text and file
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
