


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
      } else if (answer.action === "proceed to Employee Portal") {
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

      choices: ["Browse Store Inventory", "Buy an Item", "Exit"]
    }).then(function (answer) {
      if (answer.action === "Browse Store Inventory") {
        viewInventory();
      } else if (answer.action === "Buy an Item") {
        buyInventory();
      } else if (answer.action === "Exit") {

        console.log("You have exited!")
        connection.end(function (err) {
          process.exit();
        });
      }
    });
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
          (`$ ${res[i].price}`),
          (chalk.green(` ${res[i].stock_quantity}`)),
        ]);
      }
      let output = table.table(data);
      console.log(`
        `);
      console.log(output);

      goBackCustomer();
    });

  }
  function buyInventory() {
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item ID of the item would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like?"
        }
      ])
      .then(function (answer) {
        connection.query(

        )
      })
  }
}
module.exports = Customer;