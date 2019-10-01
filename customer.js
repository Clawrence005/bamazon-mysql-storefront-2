// creates the connection in mysql: requiring inquirer.
var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require('chalk');
var table = require('table');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});
var employeePortal = require("./manager.js");
// const table = require("table");

// connects to the database and shows the connection
connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id :" + connection.threadId);
});

var Customer = function customerPortal() {
  //offer a list of options to go back
  function goBackCustomer() {
    inquirer.prompt({
      message: "What would you like to do next?",
      type: "list",
      name: "action",
      choices: ["go back to Customer Portal", "proceed to Employee Portal", "Exit"]
    }).then(function (answer) {
      if (answer.action === "go back to Customer Portal") {
        customerPortal();
      } else if (answer.action === "proceed to Employees Portal") {
        //need to export this
        employeePortal();

      } else if (answer.action === "Exit") {
        connection.end();
      }

    })
  }

  inquirer
    .prompt({
      message: "What would you like to do in the Customer Portal?",
      type: "list",
      name: "action",

      choices: ["Browse Store Inventory", "View Low Inventory", "Add New Product", "Change Amount in Inventory", "Delete Item from Inventory", "Exit"]
    }).then(function (answer) {
      if (answer.action === "Browse Store Inventory") {
        viewInventory();
      } else if (answer.action === "View Low Inventory") {
        viewLowInventory();
      } else if (answer.action === "Add New Product") {
        addNewProduct();
      } else if (answer.action === "Change Amount in Inventory") {
        addToLowInventory();
      } else if (answer.action === "Delete Item from Inventory") {
        deleteProduct();
      } else if (answer.action === "Exit") {

        console.log("You have exited!")
        connection.end(function (err) {
          process.exit();
        });
      }
    })

  function viewInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
      let data = [
        ["", "", 'BAMAZON ITEMS INVENTORY', "", ""], ["Product Name", "ID #", "Department Name", "Price $", "Quantity in Stock"]
      ];
      for (let i = 0; i < res.length; i++) {
        data.push([
          res[i].product_name,
          res[i].item_id,
          res[i].department_name,
          res[i].price,
          res[i].stock_quantity,
        ]);
      }
      let output = table.table(data);
      console.log(`
      `);
      console.log(output);

      goBackCustomer();
    });

  }

  //  "View Low Inventory"
  function viewLowInventory() {
    connection.query("SELECT count(*),item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity <= 5 group by item_id, product_name, department_name, price, stock_quantity ORDER BY stock_quantity", function (err, res) {
      let data = [
        ["", "", 'LOW ITEMS INVENTORY', "", ""], ["Product Name", "ID #", "Department Name", "Price $", "Quantity in Stock"]
      ];
      for (let i = 0; i < res.length; i++) {
        data.push([
          res[i].product_name,
          res[i].item_id,
          res[i].department_name,
          res[i].price,
          res[i].stock_quantity,
        ]);
      }
      let output = table.table(data);
      console.log(`
    `);
      console.log(output);

      //option menu to go back
      goBackCustomer();
    });

  }

  //  "Add New Product"
  function addNewProduct() {
    console.log(`
    i did c
    `);
    //option menu to go back
    goBackCustomer();
  };

  function addToLowInventory() {
    //id like to show the table here
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item id number you would like to add to?"
        },
        {
          name: "quantity",
          type: "input",
          message: "What is the total amount you would like?",
          validate: function (value) {
            if (isNaN(value)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ])
      .then(function (answer) {
        connection.query(

          "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",

          [answer.quantity, answer.item],
          function (err) {
            if (err) throw err;
            //it'd be nice to show the final table cell update and name here
            console.log(`You have successfully updated ${answer.item} quantity to ${answer.quantity}`);
            //go back function
            goBackCustomer();
          }
        );
      })
  }


  function deleteProduct() {
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item id of the item you would like to delete?",
          validate: function (value) {
            if (isNaN(value)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ])
      .then(function (answer) {
        connection.query(
          "DELETE FROM products WHERE ?",
          [{
            item_id: answer.item
          }],
          function (err) {
            if (err) throw err;
            //it'd be nice to show the final table cell update and name here
            console.log(`You have successfully deleted inventory with the item Id ${answer.item}!`);
            //go back function
            goBackCustomer();
          }
        );
      })
  }
}
module.exports = Customer;