const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./model/Product');

const app = express();
const parser = bodyParser.urlencoded({ extended: false });

//const {queryDB, getAllProduct, insertData, deleteData } = require('./db');

// getData('select * from "Product"', (err, result) => {
//     if (err) return console.log('error...');
//     console.log(result.rows)
// });

app.listen(8888, (req, res) => console.log('server started'));
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static('public'));

app.get('/', (req, res) => { res.render('home') })

app.get('/admin', (req, res) => {
    Product.getAllProduct((err, rows) => {
        if (err) return res.send('Error');
        res.render('admin', { data: rows });
    });
});

app.post('/admin/addNewProduct', parser, (req, res) => {
    const { title, image, video, descr } = req.body;
    const product = new Product(undefined, title, image, video, descr);
    product.addProduct(err => {
        if (err) return res.send('Error: ' + err);
        res.redirect('/admin');
    });
});

app.post('/admin/updateProduct', parser, (req, res) => {
    const { id, title, image, video, descr } = req.body;
    const product = new Product(id, title, image, video, descr);
    product.updateProduct(err => {
        if (err) return res.send('Error: ' + err);
        res.redirect('/admin');
    });
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const product = new Product(id, undefined, undefined, undefined, undefined);
    product.getProductByID((err, rows) => {
        if (err) return res.send('Error: ' + err);
        res.render('update', { data: rows });
    });
});

app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const product = new Product(id, undefined, undefined, undefined, undefined);
    product.removeProduct(err => {
        if (err) console.log(err);
        res.redirect('/admin');
    });
});
