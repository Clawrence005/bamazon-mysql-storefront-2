


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
  // get the item by id
  // need to compare the desired orderQuantity from the actual amout
  // if (the amount is equal to or greater) {than you can buy it}
  // else { send error that the amount is insufficent and go back to portal}


  function buyInventory() {
    // shows the user the inventory first
    connection.query("SELECT * FROM products", function (err, res) {
      let data = [
        ["", "", 'BAMAZON ITEMS INVENTORY', "", ""], ["Product Name", "ID #", "Department Name", "Price $", "Quantity in Stock"]
      ];
      for (let i = 0; i < res.length; i++) {
        data.push([
          res[i].product_name,
          (chalk.blue(` ${res[i].item_id}`)),
          res[i].department_name,
          (`$ ${res[i].price}`),
          res[i].stock_quantity,
        ]);
      }
      let output = table.table(data);
      console.log(`
      `);
      console.log(output);
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "item",
            type: "input",
            message: "What is the item id you would like to buy?"
          },
          {
            name: "quantity",
            type: "input",
            message: "How many items would you like to buy?"
          },
        ])
        .then(function (answer) {
          console.log(`
          answer  ${answer.item}

          `)

          connection.query("SELECT  product_name, item_id, department_name, price, stock_quantity FROM products where item_id = ? group by product_name, item_id, department_name, price, stock_quantity",
            [answer.item],
            function (err, res) {
              console.log('res', res);
              let orderID = res[0].item_id;

              let orderQuantity = answer.quantity;
              if (orderQuantity <= res[0].stock_quantity) {
                let newQuantity = res[0].stock_quantity - answer.quantity;
                let orderPrice = parseInt(res[0].price) * parseInt(orderQuantity);
                console.log(`
orderID ${orderID}
orderQuantity ${orderQuantity}
newQuantity ${newQuantity}
orderPrice ${orderPrice}
`)
              } if (err) throw err;
              // let data = [
              //   ["", "", 'BAMAZON ITEMS INVENTORY', "", ""], ["Product Name", "ID #", "Department Name", "Price $", "Quantity in Stock"]
              // ];
              // data.push([
              //   res[0].product_name,
              //   (chalk.blue(` ${res[0].item_id}`)),
              //   res[0].department_name,
              //   (`$ ${res[0].price}`),
              //   res[0].stock_quantity,
              // ]);
              // let output = table.table(data);

              // console.log(output);



              goBackCustomer();
            }
          );

        });
    })
  }
}


module.exports = Customer;