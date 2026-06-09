const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Order = require('../models/order.model');

const sendResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data || []
    });
};

// get ดึงข้อมูลทั้งหมด
router.get('/', async (req, res) => {
        let products = await Product.find({});
        sendResponse(res, 200, ` (ผลไม้ทั้งหมด ${products.length} รายการ)`, products);
});
// get ดึงข้อมูล  (ค้นหาจาก ID)

router.get('/:id', async (req, res) => {
    
    let productId = req.params.id; 
    let product = await Product.findById(productId);

    if (!product) {
        return sendResponse(res, 404, "ไม่พบผลไม้รหัสนี้ในร้าน", null);
    }
    sendResponse(res, 200, product);

});

// POST - เพิ่มรายการ

router.post('/', async (req, res) => {
        let { name, stock } = req.body;

        if (!name | !stock) {
            return sendResponse(res, 400, "กรุณากรอก name , stock ให้ครบถ้วน", null);
        }

        // สร้างและบันทึกผลไม้ใหม่
        let newProduct = new Product({
            name: name,
            stock: Number(stock)
        });
        await newProduct.save();

        sendResponse(res, 201, ` เพิ่มผลไม้ '${name}' เข้าสู่ระบบสำเร็จ!`, newProduct);

});


// PUT - แก้ไขรายการ

router.put('/:id', async (req, res) => {
        let { name, stock } = req.body;
        
        // ค้นหาด้วย ID แล้วทำการอัปเดตข้อมูล
        let product = await Product.findByIdAndUpdate(
            req.params.id, 
            { name, stock }, 
            { new: true } // แสดงข้อมูลใหม่
        );

        if (!product) {
            return sendResponse(res, 400, "ไม่พบสินค้า", null);
        }
        sendResponse(res, 200, "แก้ไขสินค้าสำเร็จแล้ว", product);
});


// DELETE - ลบรายการ

router.delete('/:id', async (req, res) => {

    // ค้นหาด้วย ID แล้วทำการลบ
        let product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return sendResponse(res, 400, "ไม่พบสินค้า", null);
        }
        
        sendResponse(res, 200, "ลบสินค้าเรียบร้อยแล้ว", []);

});

//POST-orders 

router.post('/:id/orders', async (req, res) => {

        let productId = req.params.id;

        let requestCount = Number(req.body.count);

        if (!requestCount) {

            return sendResponse(res, 400, "กรุณาระบุจำนวน (count) ที่ต้องการสั่งซื้อ", null);
        }

        let product = await Product.findById(productId);

        if (!product) {
            return sendResponse(res, 400, "ไม่พบรายการผลไม้นี้ในระบบ", null);
        }

        if (requestCount > product.stock) {
            return sendResponse(res, 400, `ไม่สามารถสั่งซื้อได้ (ตอนนี้คุณสั่ง ${product.name} เกินจำนวน)`, null);
        }

        let newOrder = new Order({ productId: productId, count: requestCount });

        // สั่งบันทึกบิลออเดอร์
        await newOrder.save();

        product.stock = product.stock - requestCount;
        await product.save();

        sendResponse(res, 201, `สั่งซื้อ ${product.name} จำนวน ${requestCount} รายการ สำเร็จ!`, newOrder);

});

module.exports = router;


//GET oreders

router.get('/:id/orders', async (req, res) => {
        let orders = await Order.find({ productId: req.params.id })
            .populate({
                
                path: 'productId',
                model: Product,  
                select: 'name'
            });
        sendResponse(res, 200, `(เจอ Order ทั้งหมด ${orders.length} รายการ)`, orders);

});

module.exports = router;


module.exports = router;