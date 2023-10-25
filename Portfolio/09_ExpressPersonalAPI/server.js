const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('html'));
app.use(bodyParser.urlencoded({ extended: true }));

const names = [];
const tasks = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.post('/greet', (req, res) => {
    const name = req.query.name;
    names.push(name);
    res.redirect('/');
});

app.get('/wazzup/:name', (req, res) => {
    const name = req.params.name;
    res.sendFile(__dirname + `/html/wazzup.html?name=${name}`);
});

app.get('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.redirect('/');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.send('Error: ' + err.message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});