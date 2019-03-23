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
    menu();
});
function menu() {
    connection.query("SELECT * FROM products", function (err, result) {
        inquirer.prompt([
            {
                name: "main",
                type: "list",
                message: "Choose an option: ",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
            }
        ]).then(function (answer) {
            switch (answer.main) {
                case "View Products for Sale":
                    viewProducts(result);
                    menu();
                    break;
                case "View Low Inventory":
                    viewLowInventory(result);
                    menu();
                    break;
                case "Add to Inventory":
                    addToInventory(result);
                    break;
                case "Add New Product":
                    addNewProduct(result);
                    break;
                case "EXIT":
                    exit(result);
                    break;
                default:
                // code block
            }
        });
    })
};
function viewProducts(result) {
    // console.log("result: ", result)
    for (var i = 0; i < result.length; i++) {
        console.log(
            `Item ID: ${result[i].item_id}. **${result[i].product_name}** in Department: ${result[i].department_name}  Price: $${result[i].price}  In Stock: ${result[i].stock_quantity}`);
    }
};
function viewLowInventory(result) {
    for (var i = 0; i < result.length; i++) {
        if (parseInt(result[i].stock_quantity) < 5) {
            console.log(`${result[i].product_name}  --  quantity: ${result[i].stock_quantity}`)
        }
    }
};
function addToInventory(result) {

    inquirer.prompt([
        {
            name: "addItem",
            type: "list",
            message: "What Item would you like to add more of?",
            choices: getItems(result)
        },
        {
            name: "addQuantity",
            type: "input",
            message: "How many would you like to add?"
        }
    ]).then(function (answers) {
        addMore(answers, result);

    });
    // connection.end();
}
function addMore(answers, result) {
    var quantity = answers.addQuantity;
    var totalQuant = 0;
    for (var i = 0; i < result.length; i++) {
        if (result[i].product_name === answers.addItem) {
            totalQuant = parseInt(result[i].stock_quantity) + parseInt(quantity);
        }
    };
    var item = answers.addItem;
    connection.query(
        // "UPDATE products SET stock_quantity = " + quantity +" WHERE product_name = " + item
        "UPDATE products SET stock_quantity = ? WHERE product_name = ?",
        [
            parseInt(totalQuant), item
        ]
        , function (err, res) {
            console.log(res.affectedRows + " item updated");
            menu();
        }
    )
};

function getItems(result) {
    var items = [];
    for (var i = 0; i < result.length; i++) {
        items.push(result[i].product_name);
    };
    return items;
}
function addNewProduct(result) {
    inquirer.prompt([
        {
            name: "addNewItem",
            type: "input",
            message: "What item would you like to post?"
        },
        {
            name: "addNewDept",
            type: "input",
            message: "What department would you like this listed under?"
        },
        {
            name: "addNewPrice",
            type: "input",
            message: "Enter the price of the item:"
        },
        {
            name: "addNewQuantity",
            type: "input",
            message: "How many do you have in stock?"
        }
    ]).then(function (answers) {
        insertNewProduct(answers)

    })
}
function insertNewProduct(answers) {
    connection.query(
        // "UPDATE products SET stock_quantity = ? WHERE product_name = ?",
        // [
        //     parseInt(totalQuant), item
        // ]
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (\"" + answers.addNewItem + "\", \"" + answers.addNewDept + "\", \" " + parseFloat(answers.addNewPrice) + "\", \" " + parseInt(answers.addNewQuantity) + "\")",
        function (err, res) {
            console.log("\n" +  res.affectedRows + " product inserted!\n");

        }
    );
    menu();
}
function exit(answers) {
    console.log("Goodbye!!")
    connection.end()
}
