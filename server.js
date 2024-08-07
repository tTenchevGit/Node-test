const express = require('express');
const app = express();
const portNumber = 5000;
const path = require('path');
const checkMiddleware = require('./middlewares/moddleware');



app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');
   
}); 

app.get('/download', (req, res) => {
    const filePath = './views/home.html';
    res.download(filePath, 'home.html', (err) => {
        if (err) {
            console.log('Error downloading file:', err);
        } else {
            console.log('File downloaded successfully');
        }
    });
});



app.get('/view', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'home.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error sending file:', err);
            res.status(500).send('Error sending file');
        } else {
            console.log('File sent successfully');
        }
    });
});

// app.get('/cats', (req, res)=>{
//     res.send('Meow');
//     console.log('Meow');
// });

app.post('/cats', (req, res)=>{
    res.send('Run fast eeeee');
    console.log('Meow');
    res.end();
});

app.get('/cats/:id?', checkMiddleware,(req, res) => {
    console.log(req.params); 
    const postId = req.params.id;
    res.send(`This is the ID ${postId}`);
    console.log(`Post ${postId}`);
  });
  

app.listen(portNumber, () => console.log(`Server is runing on port:${portNumber}`));