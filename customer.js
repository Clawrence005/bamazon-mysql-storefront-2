const mysql = require("mysql");
const inquirer = require("inquirer");
// const table = require("table");

var Customer = function customerPortal() {
  var inquirer = require('inquirer');

  //offer a list of options to go back
  function goBackCustomer() {
    inquirer.prompt({
      message: "What would you like to do next?",
      type: "list",
      name: "action",
      choices: ["go back to Customer Portal", "proceed to Employee Portal", "exit"]
    }).then(function (answer) {
      if (answer.action === "go back to Customer Portal") {
        customerPortal();
      } else if (answer.action === "proceed to Employees Portal") {
        //need to export this
        // employeePortal();

      } else if (answer.action === "exit") {
        connection.end()
      }
    })
  }

  function A() {
    console.log(`
    i did A
    `);
    goBackCustomer();
  }

  function B() {
    console.log(`
    i just did B
    `);
    goBackCustomer();
  }
  function C() {
    console.log(`
    just did C
    `);

    goBackCustomer();
  }


  inquirer
    .prompt({
      message: "What would you like to do in the Customer Portal?",
      type: "list",
      name: "action",
      choices: ["A", "B", "C", "D"]
    }).then(function (answer) {
      if (answer.action === "A") {
        A();
      } else if (answer.action === "B") {
        B();
      } else if (answer.action === "C") {
        C();
      } else if (answer.action === "D") {
        connection.end();
      }
    })

  /*
  
  
  async function run() {
    await one();
    await two();
    three();
  }
  run();
  
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
}
module.exports = Customer;