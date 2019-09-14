const mysql = require("mysql");
const inquirer = require("inquirer");
// const table = require("table");

var Customer = function customerPortal() {
  var inquirer = require('inquirer');


  inquirer
    .prompt({
      message: "What topics would you like to subscribe to?",
      type: "checkbox",
      name: "topics",
      choices: ["JavaScript", "C#", "Ruby", "Java", "Python"]
    }).then(function (answer) { console.log("customer called inside of its own file"); })
}

module.exports = Customer;
/*
  //  "Browse Store Inventory"
      viewInventory();

  //  "View Low Inventory"
      viewLowInventory();

  //  "Add New Product"
      addNewProduct();

  //  "Add to Inventory"
      addToLowInventory();

  //  "Delete Item from Inventory"
      deleteProduct();
*/
/*()
inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Are you a Customer or Employee?",
      choices: [
        "Customer",
        "Employee",
        "Exit"
      ]
    }).then(function (answer) {
      if (answer.action === "Employee") {
        employeePortal();
      } else if (answer.action === "Customer") {
        customerPortal();
      } else if (answer.action === "Exit") {
        connection.end();
      }
      */