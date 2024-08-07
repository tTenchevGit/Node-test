



const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const checkMiddleware = require('./middlewares/moddleware');
const exphbs = require('express-handlebars');

const app = express();
const portNumber = 5000;

app.use(logger);
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { layout: false });
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

app.post('/cats', (req, res) => {
    res.send('Run fast eeeee');
    console.log('Meow');
});

app.get('/cats/:id?', checkMiddleware, (req, res) => {
    console.log(req.params);
    const postId = req.params.id;
    res.send(`This is the ID ${postId}`);
    console.log(`Post ${postId}`);
});

app.listen(portNumber, () => console.log(`Server is running on port: ${portNumber}`));
