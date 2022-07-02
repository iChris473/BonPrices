const Order = require("../models/Order")

// Create Order
exports.createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        await newOrder.save()
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(400).status(error)
    }

}

// Update Order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true}
    );
    res.status(200).json(order) 
    } catch (error) {
        res.status(401).status(error)
    }
}

// Delete Order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted")
    } catch (error) {
        res.status(401).status(error)
    }
}

// Get Order 
exports.getOneOrder = async (req, res) => {
    const {userid} = req.query
    try {
        const order = await Order.findOne({userId: userid})
        res.status(200).json(order) 
    } catch (error) {
        res.status(404).status(error)
    }
}

// Get all orders 
exports.getAllOrder = async (req, res) => {
    try {
       const orders = await Order.find({})
       res.status(200).json(orders) 
    } catch (error) {
        res.status(404).json(error)
    }
}