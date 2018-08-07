DROP DATABASE IF EXISTS bamazon_DB;
 
CREATE DATABASE bamazon_DB;
 
USE bamazon_DB;
 
 create table products(
  id int  not null auto_increment,
  item_id int,
  product_name varchar(150) not null,
  department_name varchar(200),
  price int,
  stock_quantity int,
  primary key(id)
  );