const express = require('express');
const app = express();
const portNumber = 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');
}); 

app.get('/cats', (req, res)=>{
    res.send('Meow');
    console.log('Meow');
});

app.post('/cats', (req, res)=>{
    res.send('Run fast eeeee');
    console.log('Meow');
    res.end();
});

app.get('/posts/:id', (req, res) => {
    console.log(req.params); 
    const postId = req.params.id;
    res.send(`Post ${postId}`);
    console.log(`Post ${postId}`);
  });
  

app.listen(portNumber, () => console.log(`Server is runing on port:${portNumber}`));