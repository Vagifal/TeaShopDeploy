const Product = require('../models/productModel');

class ProductListTools {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter = () => {
        const queryObject = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(elem => delete (queryObject[elem]));

        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryString));

        return this;
    };

    sort = () => {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    };

    paginate = () => {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 12;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    };
};

const productController = {
    getProducts: async (req, res) => {
        try {
            const updatingList = new ProductListTools(Product.find(), req.query).filter().sort().paginate();
            const products = await updatingList.query;

            res.json({
                status: 'success',
                result: products.length,
                products: products
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, image, category } = req.body;

            if (!image)
                return res.status(400).json({ message: "No image upload" });

            const product = await Product.findOne({ product_id });

            if (product)
                return res.status(400).json({ message: "Product already exists" });

            const newProduct = new Product({
                product_id, title: title.toLowerCase(), price, description, content, image, category
            });

            await newProduct.save();

            res.json({ message: "Product created" });

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);

            res.json({ message: "Product deleted" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, image, category } = req.body;

            if (!image)
                return res.status(400).json({ message: "No image upload" });

            await Product.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), price, description, content, image, category
            });

            res.json({ message: "Product updated" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;