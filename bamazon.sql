CREATE DATABASE bamazonDB;
use bamazonDB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100),
price DECIMAL(10,2),
stock_quantity INT,
primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("zune", "electronics", 25.00, 2);,
("coca-cola", "food and beverage", 2.50, 200),
("Honda Fit (used)", "automobiles", 10000, 1),
("Fender Jazzmaster", "musical instruments", 850, 5),
("Trek Mountain Bike", "bicycles", 500, 10),
("Vans shoes", "shoes", 45, 12),
("Gardein Chik'n Tenders", "food and beverage", 3.97, 50),
("Marshall JCM 800", "musical instruments", 2000, 7),
("Espresso Machine", "kitchen gadgets", 200, 17),
("One dirty ol' sock", "clothing", .12, 1);
 