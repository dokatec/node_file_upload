'use strict'

import express from 'express';
import bodyParse from 'body-parser';
import multer from 'multer';
import fs from 'fs';

const app = express();

const fileNames = fs.readdirSync('./uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },

    filename: function (req, file, cb) {
        const nomeArquivo = file.originalname;

        cb(null, `${nomeArquivo}`)
    }
});

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(bodyParse.urlencoded({ extended: true }))

const upload = multer({ storage });

app.get("/", async (req, res) => {

    fileNames.map(item => {
        console.log(item);
    })
    return await res.render('index', fileNames);


});
app.post("/uploads", upload.single('file'), function (req, res) {

    return res.redirect("/")
});

app.listen(3000, () => {
    console.log("File Upload Online");
});