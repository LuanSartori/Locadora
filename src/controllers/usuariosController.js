const usuariosController = {};


usuariosController.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if (err) {
                res.json(err);
            }

            res.render('usuarios', {
                data: usuarios
            });
        });
    });

};

usuariosController.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuarios set ?', [data], (err, usuarios) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/usuarios');
        });
    });
};

usuariosController.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuarios WHERE usuariosID = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/usuarios');
        });
    });
};

usuariosController.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE usuariosID = ?', [id], (err, usuarios) => {
            if (err) {
                res.json(err);
            }
            
            res.render('usuarios_edit', {
                data: usuarios[0]
            });
        });
    });
};

usuariosController.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE usuarios set ? WHERE usuariosID = ?', [newCustomer, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/usuarios');
        });
    });
};


export default usuariosController;