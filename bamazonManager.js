
// creating mysqlconnection
var fun = require('./fun.js');


// using inquirer
var inquirer = require("inquirer");


// using inquirer(user input)
inquirer.prompt({
  type: 'rawlist',
  name: 'input',
  message: 'select your choice',
  choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add new product"]
})

  //then function 
.then(function (answers) {
    //if statment 
    if (answers.input == "View Products for Sale") {
      fun.productSale();
    }

    if (answers.input == "View Low Inventory") {
      fun.lowinventory();
}
if (answers.input == "Add to Inventory") {
    fun.addinventory();
}
if (answers.input == "Add new product") {
    fun.newproduct();
}
  });


                 
  
  
 

