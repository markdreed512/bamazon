var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "W0rdwall",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

var query = "SELECT * FROM bamazonDB";

connection.query("SELECT * FROM products", function (err, result) {

    for (var i = 0; i < result.length; i++) {
        console.log(
            `Item ID: ${result[i].item_id}. **${result[i].product_name}** in Department: ${result[i].department_name}  Price: $${result[i].price}  In Stock: ${result[i].stock_quantity}`);
    }
    
});
connection.end();
inquirer.prompt([{
    name: "id",
    type: "input",
    message: "Enter item ID"
},
{
    name: "units",
    type: "input",
    message: "How many would you like to purchase?"
}]).then(function (answers) {
    connection.query("SELECT * FROM products", function (err, result) {
        console.log(result)
        //if the stock quantity at id = input id is < the inputUnits, error 
        // if (){

        // }

    
});
connection.end();


// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
})