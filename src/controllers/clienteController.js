const res = require("express/lib/response");

const clienteController = {};

clienteController.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes', (err, cliente) => {
            if (err) {
                res.json(err);
            }

            res.render('clientes', {
                data: cliente
            });
        });
    });

};

clienteController.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        console.log("chegou aqui");
        conn.query('INSERT INTO clientes set ?', [data], (err, cliente) => {
            console.log("chegou aqui");
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};

clienteController.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM clientes WHERE clienteID = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};

clienteController.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes WHERE clienteID = ?', [id], (err, cliente) => {
            if (err) {
                res.json(err);
            }
            
            res.render('clientes_edit', {
                data: cliente[0]
            });
        });
    });
};

clienteController.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE clientes set ? WHERE clienteID = ?', [newCustomer, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/');
        });
    });
};

module.exports = clienteController;