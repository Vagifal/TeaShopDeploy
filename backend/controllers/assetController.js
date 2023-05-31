const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const cleanTempFiles = (path) => {
    fs.unlink(path, error => {
        if (error)
            throw error;
    })
};

const assetController = {
    uploadAsset: (req, res) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({ message: 'No file uploaded' });

            const file = req.files.file;

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                cleanTempFiles(file.tempFilePath);
                return res.status(400).json({ message: "File format is incorrect" });
            }

            if (file.size > 1024 * 1024) {
                cleanTempFiles(file.tempFilePath);
                return res.status(400).json({ message: "Too large size" });
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "TeaShopAssets" }, async (error, result) => {
                if (error)
                    throw error;

                cleanTempFiles(file.tempFilePath)
                res.json({ public_id: result.public_id, url: result.secure_url })
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteAsset: (req, res) => {
        try {
            const { public_id } = req.body;

            if (!public_id)
                return res.status(400).json({ message: 'No image selected' });

            cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
                if (error)
                    throw error;

                res.json({ message: "Deleted image" });
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = assetController;