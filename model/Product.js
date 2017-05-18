const queryDB = require('../db');
class Product {
    constructor(id, title, image, video, descr) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.video = video;
        this.descr = descr;
    }

    static getAllProduct(cb) {
        const sql = `Select * from public."Product"`;
        queryDB(sql,[], (err, result) => {
            if (err) return cb(err);
            cb(undefined, result.rows);
        });
    }

    getProductByID(cb) {
        const sql = `SELECT * FROM public."Product" WHERE id = $1`;
        queryDB(sql, [this.id], (err, result) => {
            if (err) return cb(err);
            cb(undefined, result.rows);
        });
    }

    addProduct(cb) {
        const sql = `INSERT INTO public."Product"(title, image, video, descr) VALUES ( $1, $2, $3, $4)`;
        queryDB(sql, [this.title, this.image, this.video, this.descr], (err, result) => {
            if (err) return cb(err, undefined);
            cb(undefined);
        });
    }

    removeProduct(cb) {
        const sql = `DELETE FROM public."Product" WHERE id = $1`;
        queryDB(sql, [this.id], (err, result) => {
            if (err) return cb(err, undefined);
            cb(undefined);
        });
    }

    updateProduct(cb) {
        const sql = `UPDATE public."Product" SET  
        title = $1 , image = $2, video= $3, descr = $4
        WHERE id = $5;`;
        queryDB(sql, [this.title, this.image, this.video, this.descr, this.id], (err, result) => {
            if (err) return cb(err, undefined);
            cb(undefined);
        });
    }
}

module.exports = Product;

// Product.getAllProduct((err, rows) => {
    //     if (err) return res.send('Error');
    //     console.log(rows);
    // });