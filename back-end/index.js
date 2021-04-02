const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/logbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for purchases
const purchaseSchema = new mongoose.Schema({
  purchaser: String,
  description: String,
  fulfilled: Boolean,
  shipping: Number,
});

// Schema for line items
const lineItemSchema = new mongoose.Schema({
    purchase: {
        type: mongoose.Schema.ObjectId,
        ref: 'Purchase'
    },
    name: String,
    description: String,
    quantity: Number,
    price: Number,
})

// Create a model for projects
const Purchase = mongoose.model('Purchase', purchaseSchema);
// Model for items
const LineItem = mongoose.model('LineItem', lineItemSchema);

// Create a Purchase
app.post('/api/purchases', async (req, res) => {
  const purchase = new Purchase({
    purchaser: req.body.purchaser,
    description: req.body.description,
    fulfilled: req.body.fulfilled,
    shipping: req.body.shipping,
  });
  try {
    await purchase.save();
    res.send(purchase);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get all purchases
app.get('/api/purchases', async (req, res) => {
  try {
    let purchases = await Purchase.find();
    res.send(purchases);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit a purchase
app.put('/api/purchases/:purchaseID', async (req, res) => {
  try {
    let purchase = await Purchase.findOne({_id: req.params.purchaseID});
    if (!purchase) {
        res.send(404);
        return;
    }
    purchase.purchaser = req.body.purchaser;
    purchase.description = req.body.description;
    purchase.fulfilled = req.body.fulfilled;
    purchase.shipping = req.body.shipping;
    await purchase.save();
    res.send(purchase);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete a purchase
app.get('/api/purchase/:purchaseID', async (req, res) => {
  try {
    let purchase = await Purchase.findOne({_id: req.params.purchaseID});
    if (!purchase) {
        res.send(404);
        return;
    }
    await purchase.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/purchases/:purchaseID/lineItems', async (req, res) => {
    try {
        let purchase = await Purchase.findOne({_id: req.params.purchaseID});
        if (!purchase) {
            res.send(404);
            return;
        }
        let lineItem = new LineItem({
            purchase: purchase,
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
        });
        await lineItem.save();
        res.send(lineItem);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/purchases/:purchaseID/lineItems', async (req, res) => {
    try {
        let purchase = await Purchase.findOne({_id: req.params.purchaseID});
        if (!purchase) {
            res.send(404);
            return;
        }
        let lineItems = await LineItem.find({purchase:purchase});
        res.send(lineItems);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/purchases/:purchaseID/lineItems/:lineItemID', async (req, res) => {
    try {
        let lineItem = await LineItem.findOne({_id:req.params.lineItemID, purchase: req.params.purchaseID});
        if (!lineItem) {
            res.send(404);
            return;
        }
        lineItem.name = req.body.name;
        lineItem.description = req.body.description;
        lineItem.quantity = req.body.quantity;
        lineItem.price = req.body.price;
        await lineItem.save();
        res.send(lineItem);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/purchases/:purchaseID/lineItems/:lineItemID', async (req, res) => {
    try {
        let lineItem = await LineItem.findOne({_id:req.params.lineItemID, purchase: req.params.purchaseID});
        if (!lineItem) {
            res.send(404);
            return;
        }
        await lineItem.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
