




// using mysql
var mysql = require("mysql");
// using inquirer
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port;
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
});

// connect the connection
connection.connect(function (err) {
    if (err) throw err;
});


// creating buy function
var buy = function () {

// using user inputs
    inquirer.prompt([
        {
            type: "input",
            message: " please enter ID of the product they would like to buy",
            name: "id"
        },
        {
            type: "input",
            message: "how many units of the product they would like to buy",
            name: "stock_quantity"
        },
        // then function
    ]).then(function (ans) {
        // using query statment
        connection.query("SELECT * FROM products WHERE item_id=" + ans.id, function (err, res) {
            // creating new qunt varriable
            var qunt;
            // creating new price varriable
            var price;
            if (err) throw err;
            // using for loops
            for (var i = 0; i < res.length; i++) {
                // taking all value from the  database


                console.log("item id :" + res[i].item_id, "    product_name :" + res[i].product_name, "  department_name :" + res[i].department_name, "    price :" + res[i].price, "   stock_quantity :" + res[i].stock_quantity)
                qunt = res[i].stock_quantity;
                price = res[i].price;
            }
            var newqunt = qunt - ans.stock_quantity;
            var newprice = price * ans.stock_quantity;


            var query = connection.query(
                //  using the update query
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newqunt
                    },
                    {
                        item_id: ans.id
                    }
                ],
                function (err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                    console.log("New quantity is :" + newqunt + "\n Total your bill is " + newprice);

                }
    );
    // connection.end()function  
    connection.end();
        });

     
    });

}

// creating display fuction
var display = function () {
// select query
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // for loop
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
        }
        // Log all results of the SELECT statement
        // connection.end function
        connection.end();

    });


}

// creating productsale function
var productSale = function(){
    // using select query
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity)
        }
        // Log all results of the SELECT statement
        connection.end();

    });
}
// creating lowinventory function
var lowinventory=function(){
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5" , function (err, res){
        if (err) throw err;
        // using for loops
        for (var i = 0; i < res.length; i++) {
            console.log("item id :" + res[i].item_id, "    product_name :" + res[i].product_name, "  department_name :" + res[i].department_name, "    price :" + res[i].price, "   stock_quantity :" + res[i].stock_quantity)
        } 
    }
)};
// creating addinventory function
var addinventory=function(){
    // using user input
    inquirer.prompt([
        {
            type: "input",
            message: " please enter ID of the product they would like to buy",
            name: "id"
        },
        {
            type: "input",
            message: "how many units of the product they would like to buy",
            name: "stock_quantity"
        },
        // then function
    ]).then(function(stock) {
        // using query statment
        connection.query("SELECT * FROM products WHERE item_id =" + stock.id, function (err, res) {
            // creating new qunt varriable
            var qunt;
            if (err) throw err;
            // using for loops
            for (var i = 0; i < res.length; i++) {
                // taking all value from the  database


                console.log("item id :" + res[i].item_id, "    product_name :" + res[i].product_name, "  department_name :" + res[i].department_name, "    price :" + res[i].price, "   stock_quantity :" + res[i].stock_quantity)
                qunt = res[i].stock_quantity;
            }
            // creating new varriable and using parseInt statment
            var newqunt = parseInt(qunt) + parseInt(stock.stock_quantity);


            var query = connection.query(
                //  using the update query
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newqunt
                    },
                    {
                        item_id: stock.id
                    }
                ],
                function (err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                    console.log("now quantity is :" + newqunt);

                }
    );        
}
        )}
    )};
    // creating newproduct function
    var newproduct=function(){
    //    user inputs
        inquirer.prompt([
            {
                type: "input",
                message: "please enter product Id",
                name: "item_id"
            },
            {
                type: "input",
                message: "please enter product name",
                name: "product_name"
            },
            {
                type: "input",
                message: "please enter department name",
                name: "department_name"
            },
            {
                type: "input",
                message: "please enter price",
                name: "price"
            },
            {
                type: "input",
                message: "please enter stock_quantity",
                name: "stock_quantity"
            }
            // then function
        ]).then(function(stock){
        //    using user input
            var query=connection.query("INSERT INTO products SET ?",
           {
            item_id:stock.item_id,
            product_name: stock.product_name,
            product_name: stock.product_name,
            department_name:stock.department_name,
            price:stock.price,
            stock_quantity:stock.stock_quantity,
            
            function(err, res) {
                console.log(res.affectedRows + " product inserted!\n");
        }
       })

           connection.end(); 
        }
    )}
// module exports
    module.exports = {
    buy: buy,
    display: display,
    productSale:productSale,
    lowinventory:lowinventory,
    addinventory:addinventory,
    newproduct:newproduct
} 