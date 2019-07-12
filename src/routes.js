const express = require('express');
const Products = require('./models/products');
const multer = require('multer');
const upload = multer();

let routes = new express.Router();
routes.get('/', function (req, res) {
    const value = {
        name: req.query.name,
        default: 'World'
    };

    switch (value.name) {
        case undefined: {
            res.send(`Hello, ${value.default}.`);

            break;
        }
        default: {
            res.send(`Hello, ${value.name}.`);

            break;
        }
    };
});
routes.get('/tasks', async function (req, res) {
    let indexofproducts = await Products.find().sort('-createdAt');

    try {
        return res.json(indexofproducts);    
    } catch (e) {
        console.log(e)
    };
});
routes.post('/tasks', upload.none(), async function (req, res) {
    const { task, info } = req.body;
    let createnewproduct = await Products.create({
        task,
        info,
    });
    req.io.emit('task', createnewproduct);
    req.io.emit('info', createnewproduct);

    try {
        return res.json(createnewproduct)
    } catch (e) {
        console.log(e)
    }
});
routes.put('/tasks/:id', upload.none(), async function (req, res) {
    let updatetask = await Products.findByIdAndUpdate(req.params.id, req.body);

    try {
        return res.json(updatetask); 
    } catch (e) {
        console.log(e)
    };
});
routes.delete('/tasks/:id', async function (req, res) {
    let deleteproduct = await Products.findOneAndRemove(req.params.id);
    console.log(`Deleted object: ${deleteproduct}`);
    
    try {
        return res.json(deleteproduct);
    } catch (e) {
        console.log(e)
    };
});

module.exports = routes;