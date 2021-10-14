CREATE DATABASE inventory;

CREATE TABLE products(
id SERIAL PRIMARY KEY,
productid VARCHAR(),
productname VARCHAR(255) NOT NULL,
productprice INTEGER NOT NULL,
stocks INTEGER NOT NULL
);


CREATE TABLE customers(
id SERIAL PRIMARY KEY,
    customername VARCHAR(255),
    customeremail VARCHAR(255),
    customerno VARCHAR(255),
    customeraddress VARCHAR(255)
);


CREATE TABLE invoices(
    id SERIAL PRIMARY KEY,
    customername VARCHAR(255),
    customeremail VARCHAR(255),
    customerno VARCHAR(255),
    customeraddress VARCHAR(255),
    customertime TIMESTAMP,
    products JSONB,
    subtotal VARCHAR(255),
    gst VARCHAR(255),
    totalprice VARCHAR(255)
);

CREATE TABLE users(
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
