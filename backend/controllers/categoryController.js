const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name });

            if (category)
                return res.status(400).json({ message: "Category already exists" });

            const newCategory = new Category({ name });

            await newCategory.save();
            res.json({ message: "Category created" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Product.findOne({ category: req.params.id });

            if (products)
                return res.status(400).json({
                    message: "Deletion failed - There are products in this category"
                });

            await Category.findByIdAndDelete(req.params.id);
            res.json({ message: "Deleted a Category" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: req.params.id }, { name });

            res.json({ message: "Updated category" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = categoryController;