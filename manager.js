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
var customerPortal = require("./customer.js");

// connects to the database and shows the connection
connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id :" + connection.threadId);
});

var Employee = function employeePortal() {
  //offer a list of options to go back
  function goBackEmployee() {
    inquirer.prompt({
      message: "What would you like to do next?",
      type: "list",
      name: "action",
      choices: ["go back to Employee Portal", "proceed to Customer Portal", "Exit"]
    }).then(function (answer) {
      if (answer.action === "go back to Employee Portal") {
        employeePortal();
      } else if (answer.action === "proceed to Customer Portal") {
        //need to export this
        customerPortal();

      } else if (answer.action === "Exit") {
        connection.end();
      }

    })
  }

  inquirer
    .prompt({
      message: "What would you like to do in the Employee Portal?",
      type: "list",
      name: "action",

      choices: ["Browse Store Inventory", "View Low Inventory", "Add New Product", "Change Quantity in Inventory", "Delete Item from Inventory", "Exit"]
    }).then(function (answer) {
      if (answer.action === "Browse Store Inventory") {
        viewInventory();
      } else if (answer.action === "View Low Inventory") {
        viewLowInventory();
      } else if (answer.action === "Add New Product") {
        addNewProduct();
      } else if (answer.action === "Change Quantity in Inventory") {
        addToLowInventory();
      } else if (answer.action === "Delete Item from Inventory") {
        deleteProduct();
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
          (chalk.green(`${res[i].stock_quantity}`)),
        ]);
      }
      let output = table.table(data);
      console.log(`
          `);
      console.log(output);

      goBackEmployee();
    });
  }

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
          (`$ ${res[i].price}`),
          (chalk.yellow(`${res[i].stock_quantity}`)),
        ]);
      }
      let output = table.table(data);
      console.log(`
            `);
      console.log(output);

      //option menu to go back
      goBackEmployee();
    });

  }

  function addNewProduct() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the name of the item you would like to submit?"
        },
        {
          name: "dept",
          type: "input",
          message: "Which department would you like to place your item in?"
        },
        {
          name: "price",
          type: "input",
          message: "What would you like the price to be?",
        },
        {
          name: "quantity",
          type: "input",
          message: "How many items do you have?",
        }
      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.item,
            department_name: answer.dept,
            price: answer.price,
            stock_quantity: answer.quantity
          }, function (err) {
            if (err) throw err;
            console.log(`
            Your item ${ answer.item} was created successfully in the ${answer.dept}! department
        `);
            //go back function
            goBackEmployee();
          }
        );
      });

  }

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
          message: "What is the total amount you would like?"
        }
      ])
      .then(function (answer) {
        connection.query(

          "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",

          [answer.quantity, answer.item],
          function (err) {
            if (err) throw err;
            //it'd be nice to show the final table cell update and name here
            console.log(`
            You have successfully updated ${ answer.item} quantity to ${answer.quantity}
        `);
            //go back to portal
            goBackEmployee();
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
          message: (chalk.red(`What is the ${chalk.red.bold('item id')} of the item you would like to delete? `)),
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
            console.log(`
            You have successfully deleted inventory with the item Id ${ answer.item} !
        `);
            //go back function
            goBackEmployee();
          }
        );
      })
  }

}
module.exports = Employee;