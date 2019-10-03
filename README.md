# Bamazon-Storefront
## Overview
Bamazon is a Command-Line Interface application in which the command line in the storefront updates the information in the MySQL database. The user to chooses whether they are a customer or employee and offers appropriate options to manage the storefront. 

## Built using: ##
- Javascript
- MySql
- Node
- Inquirer.Js
- Chalk
- Table

~[Click here](https://drive.google.com/file/d/1Dt1Ds9Y2sGi4SZffwq3Vv4DRcR4KoXeP/view) to watch a video on how to navigate the Bamazon App~

- Will be updating with a GIF soon.

### The Customer Portal ###
Customer Options: 
- See All Store Inventory
- Search for Items by id number and then order appropriate amount or return feed on insufficient quantity.

### The Employee Portal ###
Employee Options: 
- See All Store Inventory 
- See Low Store Inventory, quantity 5 or less
- Add New Product to Inventory
- Exit the Program

In the command line start by typing the words **`node`** then the file name **`bamazonCustomer.js`**. the the User will follow the commands and use the arrow keys to answer the prompts highlighted in blue. and the the keyboard itself. 

## Customer View ##

### List a set of Customer menu options: ###

- `Browse Store Inventory`
- `Buy an Item`

The store has a table called products inside of a MySQL database.

The products table should have each of the following columns:

item_id, product_name, department_name, price stock_quantity 

 Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

Then the app will prompt users with two messages.

- The first the app will `prompt the user for the ID of the product they would like to buy`.

- The second message should ask `how many units of the product they would like to buy`.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like **`Insufficient quantity!`** , and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.

## Manager View ##

### List a set of Manager menu options: ###

- `Browse Store Inventory`
- `View Low Inventory`
- `Add New Product`
- `Change Quantity in Inventory`
- `Delete Item from Inventory`

If `Browse Store Inventory` is selected, the app should list every available item: the item IDs, names, prices, and quantities.

If `View Low Inventory` is selected, then it should list all items with an inventory count lower than five.

If `Add New Product` is selected, it should allow the manager to add a completely new product to the store.

If `Change Quantity in Inventory` is selected, your app should display a prompt that will let the manager "add more" of any item currently in the store.

If `Delete Item from Inventory` is selected, it should allow the manager to add a completely delete product from the store.
