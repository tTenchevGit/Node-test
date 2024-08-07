const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const checkMiddleware = require('./middlewares/moddleware');
const { create } = require('express-handlebars');
// const handlebars = require('handlebars');
const bodyParser = require('body-parser');

const app = express();
const portNumber = 5000;


const cats = require('./cats');
const hbs = create({ extname: 'hbs' });
app.use(logger);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    let name = 'John';
    res.render('home', { name });
});

app.get('/download', (req, res) => {
    const filePath = './public/done.html';
    res.download(filePath, 'done.html', (err) => {
        if (err) {
            console.log('Error downloading file:', err);
        } else {
            console.log('File downloaded successfully');
        }
    });
});

app.get('/public', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'done.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error sending file:', err);
            res.status(500).send('Error sending file');
        } else {
            console.log('File sent successfully');
        }
    });
});

app.get('/cats', (req, res) => {
    res.render('cats', { cats: cats.getAll() });
});

app.post('/cats', (req, res) => {
    console.log(req.body);
    let catName = req.body.cat;
    cats.add(catName); 
    res.redirect('/cats');
});

app.get('/cats/:id?', checkMiddleware, (req, res) => {
    console.log(req.params);
    const postId = req.params.id;
    res.send(`This is the ID ${postId}`);
    console.log(`Post ${postId}`);
});

app.listen(portNumber, () => console.log(`Server is running on port: ${portNumber}`));
