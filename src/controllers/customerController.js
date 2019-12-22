const ip = require("ip");

const controller = {};
console.log(ip.address());

controller.list = (req, res) => {
  if (ip.address() === "192.168.0.106") {
    db.query("SELECT * FROM customer", (err, customers) => {
      if (err) {
        res.redirect("/");
      }
      res.render("customers", {
        data: customers
      })
    })
  } else if (ip.address() === "192.168.0.108") {
    db2.query("SELECT * FROM customer", (err, customers) => {
      if (err) {
        res.redirect("/");
      }
      res.render("customers", {
        data: customers
      })
    })
  }
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    db.query("INSERT INTO customer set ?", data, (err, customer) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(customer);
    })
  } catch (e) {
    console.error("error at db1", e);
  }
  try {
    db2.query("INSERT INTO customer set ?", data, (err, customer) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(customer);
      res.redirect("/");
    })
  } catch (e) {
    console.error("error at db2", e);
  }
}

controller.edit = (req, res) => {
  const { id } = req.params;
  if (ip.address() === "192.168.0.106") {
    db.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
      if (err) {
        res.redirect("/");
      }
      res.render('customers_edit', {
        data: rows[0]
      })
    })
  } else if (ip.address() === "192.168.0.108") {
    db2.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
      if (err) {
        res.redirect("/");
      }
      res.render('customers_edit', {
        data: rows[0]
      })
    })
  }
}

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  try {
    db.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      }
    })
  } catch (e) {
    console.error("error at db1", e);
  }
  try {
    db2.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    })
  } catch (e) {
    console.error("error at db2", e);
  }
}

controller.delete = (req, res) => {
  const { id } = req.params;
  try {
    db.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      }
    })
  } catch (e) {
    console.error("error at db1", e);
  }
  try {
    db2.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    })
  } catch (e) {
    console.error("error at db2", e);
  }
}


// controller.edit = (req, res) => {
//     const {id} = req.params;
//     req.getConnection((err, conn) => {
//         conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
//             res.render('customers_edit', {
//                 data: rows[0]
//             })
//         });
//     });
// };

// controller.update = (req, res) => {
//     const {id} = req.params;
//     const newCustomer = req.body;
//     req.getConnection((err, conn) => {

//         conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
//             res.redirect('/');
//         });
//     });
// };

// controller.delete = (req, res) => {
//     const {id} = req.params;
//     req.getConnection((err, connection) => {
//         connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
//             res.redirect('/');
//         });
//     });
// };

module.exports = controller;
