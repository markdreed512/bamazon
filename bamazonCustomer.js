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
    // console.log("connected as id " + connection.threadId + "\n");
});

var query = "SELECT * FROM products";

connection.query(query, function (err, result) {
    for (var i = 0; i < result.length; i++) {
        console.log(
            `Item ID: ${result[i].item_id}. **${result[i].product_name}** in Department: ${result[i].department_name}  Price: $${result[i].price}  In Stock: ${result[i].stock_quantity}`);
    }
    runInquirer()
});
function runInquirer() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter item ID"
        },
        {
            name: "units",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ]).then(function (answers) {
        connection.query("SELECT * FROM products", function (err, result) {
            var inputId = parseInt(answers.id);
            var availStock = parseInt(result[inputId - 1].stock_quantity);
            var unitsPurchased = parseInt(answers.units);
            if (availStock < unitsPurchased) {
                console.log("insufficient Quantity!\n");
                runInquirer();
            } else {
                updateDb(availStock, unitsPurchased, inputId);
            }



        });



    })
}
function updateDb(avail, purchased, id) {
    var quant = avail - purchased;
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: parseFloat(quant.toFixed(2))
            },
            {
                item_id: id
            }
        ], function (err, res) {
            
        });
    displayTotalCost(id ,purchased);
    connection.end();
}

function displayTotalCost(itemId, num){
    connection.query("SELECT * FROM products", function(err, result){
        //cost = num * item price
        var cost = num * result[itemId - 1].price.toFixed(2);
        console.log("Total Cost: $"+ parseFloat(cost));
        console.log("Thanks for purchasing "+ result[itemId - 1].product_name +  " on Bamazon!!")
    })
}