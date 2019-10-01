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
  console.log("connected as id :" + connection.threadId);

});

var Customer = function customerPortal() {
  console.log("connection :", connection)
  // var inquirer = require('inquirer');

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

      choices: ["Browse Store Inventory", "View Low Inventory", "Add New Product", "Add to Inventory", "Delete Item from Inventory", "Exit"]
    }).then(function (answer) {
      if (answer.action === "Browse Store Inventory") {
        viewInventory();
      } else if (answer.action === "View Low Inventory") {
        viewLowInventory();
      } else if (answer.action === "Add New Product") {
        addNewProduct();
      } else if (answer.action === "Add to Inventory") {
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

  // //  "Browse Store Inventory"
  // function viewInventory() {
  //   console.log(`
  //   i did A

  //   `);
  //   //option menu to go back
  //   goBackCustomer();
  // };


  function viewInventory() {
    // query the   
    // import {
    //   table
    // } from 'table';






    connection.query("SELECT * FROM products", function (err, res) {
      let data = [
        ["", "", 'BAMAZON ITEMS IN STOCK', "", ""], ["Product Name", "ID #", "Department Name", "Price $", "Quantity in Stock"]
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

      console.log(output);

      goBackCustomer();
    });

  }

  //  "View Low Inventory"
  function viewLowInventory() {
    console.log(`
    i did b
    `);
    //option menu to go back
    goBackCustomer();
  };

  //  "Add New Product"
  function addNewProduct() {
    console.log(`
    i did c
    `);
    //option menu to go back
    goBackCustomer();
  };

  //  "Add to Inventory"
  function addToLowInventory() {
    console.log(`
    i did d
    `);
    //option menu to go back
    goBackCustomer();
  };

  //  "Delete Item from Inventory"
  function deleteProduct() {
    console.log(`
    i did e
    `);
    //option menu to go back
    goBackCustomer();
  };

}
module.exports = Customer;