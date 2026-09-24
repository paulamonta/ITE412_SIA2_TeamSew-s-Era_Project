import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Customer dummy data
let customers = [
    {
        id: 1,
        name: "Paula Monta",
        contact: "09660280875"
    }
];

// Order dummy data
let orders = [
    {
        id: 1,
        customerId: 1,
        service: "Alteration",
        status: "Pending"
    }
];

// GET all customers
app.get("/customers", (req, res) => {
    res.status(200).json(customers);
});

// POST a new customer
app.post("/customers", (req, res) => {
    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name,
        contact: req.body.contact
    };

    customers.push(newCustomer);

    res.status(201).json(newCustomer);
});

// GET all orders
app.get("/orders", (req, res) => {
    res.status(200).json(orders);
});

// POST a new order
app.post("/orders", (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        customerId: req.body.customerId,
        service: req.body.service,
        status: req.body.status
    };

    orders.push(newOrder);

    res.status(201).json(newOrder);
});

// Start server
app.listen(PORT, () => {
    console.log(`Sews'Era API running at http://localhost:${PORT}`);
});