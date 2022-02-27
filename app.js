// imports
const express = require('express');
const Datastore = require('nedb');
const bodyParser= require('body-parser');

// set up
const app = express();
const db = new Datastore();

// add body-parsing functionality to the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// get app to serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// global variable for id
let id = 1;

let itemBuilder = (itemName, itemDescription, itemPrice, itemID) => {
    let item = {
        name : itemName,
        description : itemDescription,
        price : itemPrice,
        _id : itemID
    }
    return item;
}

app.post('/create', (req,res) => {
    console.log(`\nCreate - POST`);

    let item = itemBuilder(req.body.name, req.body.description, req.body.price, parseInt(id));
    id++;

    db.insert(item, (err, item) => {
        if (err) res.send(err);
        res.status(201).send(item);
        console.log(`Created item: ${JSON.stringify(item.name)}`);
    });
});

app.get('/read', (req,res) => {
    console.log(`\nRead - GET`);

    db.find({}, (err, items) => {
        if (err) res.send(err);
        res.status(200).send(items);
        console.log(`Reading items: ${JSON.stringify(items)}`);
    });
});

app.get('/read/:id', (req,res) => {
    console.log(`\nRead - GET`);

    // reading item from database by id
    db.find({_id : parseInt(req.params.id)}, (err, item) => {
        if (err) res.send(err);
        res.status(200).send(item);
        console.log(`Reading item: ${JSON.stringify(item)}`);
    });
});

// UPDATE (Put)
app.put('/update/:id', (req,res) => {
    console.log(`\nUpdate - PUT`);
    let updatedItem = itemBuilder(req.body.name, req.body.description, req.body.price, parseInt(req.params.id));

    db.update({_id : parseInt(req.params.id)}, updatedItem, (err, itemID) => {
        if (err) res.send(err);
        res.sendStatus(200);
        console.log(`Updated item id: ${JSON.stringify(itemID)}`);
    });
});

// DELETE (Delete)
app.delete('/delete/:id', (req,res) => {
    // log that we are running the delete operation
    console.log(`\nDelete - DELETE`);

    db.remove({_id : parseInt(req.params.id)}, (err, itemID) => {
        if (err) res.send(err);
        res.sendStatus(200);
        console.log(`Deleted item id: ${JSON.stringify(itemID)}`);
    });
});

// export the app and the itemBuilder
module.exports = {app, itemBuilder};
