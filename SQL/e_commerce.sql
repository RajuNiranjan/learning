USE e_commerce;
-- user  table
--
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) --
--
-- products table
--
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proudct_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
) --
--
-- orders table
--
CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM(
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
    ) NOT NULL DEFAULT "pending",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
) --
--
-- order items table
--
CREATE TABLE order_items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) --
--
-- wish list table
--
CREATE TABLE wish_list(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) --
--
-- insert data into users table
--
INSERT INTO user (name, email, password)
VALUES("John", "john@gmail.com", "123"),
    ("Willson", 'deo@gmail.com', '1234'),
    ("Okp", "okp@gmail.com", '5432');
--
--
-- selecting all data from users table
--
SELECT *
FROM user;
--
-- get user by id 
SELECT *
FROM user
WHERE id = 3;
--
-- insert data into products table
--
INSERT INTO products (
        proudct_name,
        product_description,
        product_price,
        stock,
        user_id
    )
VALUES(
        "T-shirt",
        "T-shirt is a type of clothing",
        100,
        10,
        1
    ),
    (
        "Hoodie",
        "Hoodie is a type of clothing",
        90,
        10,
        3
    ),
    (
        "Cargo Pants",
        "Cargo Pants is a type of clothing",
        57,
        10,
        2
    );
--
-- selecting all data from products table
--
SELECT *
FROM products;
--
-- get product by id
--
SELECT *
FROM products
WHERE id = 3;
--
-- get product by user_id
--
SELECT *
FROM products
WHERE user_id = 3;
--
-- update the stock of a product
--
UPDATE products
SET stock = 69
WHERE id = 2;
--
-- delete a product 
--
DELETE FROM products
WHERE id = 3;
--
-- insert data into orders table
--
INSERT INTO orders(user_id, total_amount, status)
VALUES(1, 231, "shipped"),
    (2, 100, "pending"),
    (3, 500, "delivered");
--
-- selecting all data from orders table
--
SELECT *
FROM orders;
--
-- update order status
--
UPDATE orders
SET status = "confirmed"
WHERE id = 2;
--
--
-- insert data into order items table
--
INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        price
    )
VALUES(1, 1, 2, 100),
    (2, 2, 1, 90);
--
-- selecting all data from order items table
--
SELECT *
FROM order_items;
--
-- get detailed order with items and product info 
--
SELECT o.id AS order_id,
    o.price,
    p.proudct_name AS product_name
FROM order_items o
    JOIN products p ON o.product_id = p.id
WHERE o.order_id = 1;
--
-- get all orders with user details
--
-- Add to wishlist
INSERT INTO wish_list (user_id, product_id)
VALUES (1, 2);
-- Get wishlist for user
SELECT p.*
FROM wish_list w
    JOIN products p ON w.product_id = p.id
WHERE w.user_id = 1;
-- Remove from wishlist
DELETE FROM wish_list
WHERE user_id = 1
    AND product_id = 2
RETURNING *;