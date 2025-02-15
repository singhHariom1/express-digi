import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).send("Name and price are required");
    }

    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).json(newTea);
});

// Get all teas
app.get('/teas', (req, res) => {
    res.status(200).json(teaData);
});

// Get a tea by ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).json(tea);
});

// Update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }

    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send("Name and price are required");
    }

    tea.name = name;
    tea.price = price;
    res.status(200).json(tea);
});

// Delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Tea not found');
    }
    teaData.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});
