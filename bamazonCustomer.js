
// creating mysqlconnection
var fun = require('./fun.js');


// using inquirer
var inquirer = require("inquirer");


// using inquirer(user input)
inquirer.prompt({
  type: 'rawlist',
  name: 'input',
  message: 'select your choice',
  choices: ["buy product","see the list of product"]
})

  //then function 
.then(function (answers) {
    //if statment 
    if (answers.input == "buy product") {
      fun.buy();
    }

    if (answers.input == "see the list of product") {
      fun.display();
}

  });


                 
  
  
 

