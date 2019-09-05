// creates the connection in mysql
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});
var customerPortal = require("./customer.js");
var employeePortal = require("./manager.js");

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as: " + connection.threadId);
  startFunction();
});
// the first function called asks which portal you would like to enter
function startFunction() {
  console.log("hello im the start")
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

    })
}


