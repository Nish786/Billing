
const express = require('express');
const app = express();


const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
const knex = require("knex");

// Create database object
const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "password",
    database: "inventory",
  },
});
const now = new Date()
app.post('/order',(req, res)=>{
    let products= req.body.items;

    db.insert({
    customername : req.body.name,
    customeremail : req.body.mail,
    customerno : req.body.number,
    customeraddress : req.body.address,
    customertime : now,
    products : JSON.stringify(products) ,
    subtotal : req.body.subtotal ,
    gst : req.body.gst,
    totalprice : req.body.totalprice 
      })
        .into("invoices")
        .then(() => res.json({ success: true }))
        .catch((err) =>
          console.log({ success: false, message: "upload failed", stack: err.stack })
        );
})

app.post('/products',(req,res)=>{
  db.insert({
    productid :req.body.id,
    productname :req.body.name,
    productprice :req.body.price,
    stocks :req.body.stocks
  }).into("products").then(() => res.json({succes:true})).catch((err) =>
  console.log({ success: false, message: "upload failed", stack: err.stack })
);
})

app.put('/products',(req,res)=>{
  db.update({
    productname :req.body.productname,
    productprice :req.body.productprice,
    stocks :req.body.stocks
  }).into("products").where('productid',req.body.productid).then(() => res.json({succes:true})).catch((err) =>
  console.log({ success: false, message: "upload failed", stack: err.stack })
);
})
app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  db.select("*")
    .from("users")
    .where("username", userName)
    .then((data) => {
      res.send(data[0]);
    });
});
app.get('/customers',(req, res)=>{
  db.select("*")
  .from("customers")
  .then((data) => res.json(data))
      .catch((err) =>
        console.log({ success: false, message: "upload failed", stack: err.stack })
      );
})

app.post('/customer',(req, res)=>{
  if(req.body.phonenumber && req.body.customerid){
-db.select("*")
.from("customers").where( 'id',req.body.customerid )
.then((data) => res.json(data))
    .catch((err) =>
      console.log({ success: false, message: "upload failed", stack: err.stack })
    );
  }else if(req.body.customerid){
    db.select("*")
    .from("customers").where('id',req.body.customerid)
    .then((data) => res.json(data))
        .catch((err) =>
          console.log({ success: false, message: "upload failed", stack: err.stack })
        );
  }
  else if(req.body.phonenumber){
    db.select("*")
    .from("customers").where('customerno',req.body.phonenumber)
    .then((data) => res.json(data))
        .catch((err) =>
          console.log({ success: false, message: "upload failed", stack: err.stack })
        );
  }
})

app.post('/customers',(req,res)=>{
  var number = Math.random(); // 0.9394456857981651
  number.toString(36); // '0.xtis06h6'
  var uniqueid = number.toString(36).substr(2, 8); // 'xtis06h6'
  uniqueid.length >= 8; // false

  db.insert({
    id : uniqueid,
    customername : req.body.name,
    customeremail : req.body.email,
    customerno : req.body.number,
    customeraddress : req.body.address
  }).into("customers").then(() => res.json({succes:true})).catch((err) =>
  console.log({ success: false, message: "upload failed", stack: err.stack })
);
})


app.get('/product/:name',(req, res)=>{
    db.select("*")
    .from("products")
    .where("productname" , req.params.name)
    .then((data) => res.json(data))
        .catch((err) =>
          console.log({ success: false, message: "upload failed", stack: err.stack })
        );
})
app.get('/products',(req, res)=>{
    db.select("*")
    .from("products")
    .then((data) => res.json(data))
        .catch((err) =>
          console.log({ success: false, message: "upload failed", stack: err.stack })
        );
})





app.get('/',(req, res) => {
    res.send("hello")
})
app.listen(5050, ()=>console.log(`Express Server is running at : http://localhost:5050`))

