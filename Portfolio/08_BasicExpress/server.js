const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/calculate', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (!isNaN(weight) && !isNaN(height)) {
        const bmi = (weight / (height * height)) * 10000;
        res.send(`Your BMI is: ${bmi.toFixed(2)}`);
    } else {
        res.send('Invalid input. Please provide valid weight and height.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});