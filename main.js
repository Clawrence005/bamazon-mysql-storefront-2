// creates the connection in mysql: requiring inquirer.
var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require('chalk');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});
// requiring and importing the customer and manager files
var customerPortal = require("./customer.js");
var employeePortal = require("./manager.js");

// connects to the database and shows the connection
connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id :" + connection.threadId);
  startFunction();
});
// the start function called asks which portal you would like to enter

function startFunction() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: console.log(chalk.blue(`
      Welcome to ${chalk.whiteBright.bold('BAMAZON')} CLI Storehouse. 
       
      Are you a Customer or Employee?
      `)),
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
    })
}



