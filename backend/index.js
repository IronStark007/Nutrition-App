const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/nutrition", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected');
    })
const foodSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    weight: Number,
})

const foodModel = new mongoose.model("foods", foodSchema);
app.post('/food/create', (req, res) => {
    const food = req.body;
    let foodObj = new foodModel(food);
    foodObj.save().then(() => {
        res.send({ status: "Food stored" });
    })
})

app.get('/food', async(req, res) => {
    let foods = await foodModel.find();
    res.send({ "Foods": foods });
})
app.listen(8000);