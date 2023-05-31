const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');


const orderController = {
    getOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createOrder: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('name email');

            if (!user)
                return res.status(400).json({ message: "User does not exist" });

            const { basket, id, address } = req.body;
            const { _id, name, email } = user;

            const newOrder = new Order({
                user_id: _id, name, email, basket, id, address
            });

            basket.filter(item => {
                return sold(item._id, item.quantity, item.sold);
            })

            await newOrder.save();

            res.json({ message: "Order successfully created" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

const sold = async (id, quantity, oldSold) => {
    await Product.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    });
};

module.exports = orderController;