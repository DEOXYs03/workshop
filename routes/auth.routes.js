const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.model'); 

const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: data || []
  });
};


router.post('/register', async (req, res) => {
  try {
    let { name, password } = req.body;

    // เช็คว่ามีชื่อนี้ในระบบ
    let existingUser = await userSchema.findOne({ name: name });
    if (existingUser) {
      return sendResponse(res, 400, "ชื่อผู้ใช้ดังกล่าวมีอยู่แล้ว", null);
    }

    // สร้าง User ใหม่
    let user = new userSchema({
      name: name,
      password: await bcrypt.hash(password, 10),
      status: 'รอตรวจสอบ' 
    });

    await user.save();
    
    sendResponse(res, 201, "ลงทะเบียนสำเร็จแล้ว โปรดรอการอนุมัติ", {
      id: user._id,
      name: user.name,
      status: user.status
    });

  } catch (err) {
    sendResponse(res, 500, "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน", null);
  }
});

router.post('/login', async (req, res) => {
  try {
    let { name, password } = req.body;

    let user = await userSchema.findOne({ name: name });
    if (!user) {
      return sendResponse(res, 400, "ไม่พบผู้ใช้ โปรดลงทะเบียนก่อน", null);
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, "รหัสผ่านไม่ถูกต้อง", null);
    }

    // 2. เช็คว่าได้รับการ Approve หรือยัง
    if (user.status !== 'approved') {
      return sendResponse(res, 401, "โปรดรอการอนุมัติสักครู่", null);
    }
    
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "1234", { expiresIn: '1h' });
    
    sendResponse(res, 200, "เข้าสู่ระบบสำเร็จ", { token: token, user: { id: user._id, name: user.name } });

  } catch (err) {
    sendResponse(res, 500, "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน", null);
  }
});

router.put('/users/:id/approve', async (req, res) => {
  try {
    let { id } = req.params;
    // อัปเดตสถานะเป็น approved
    let user = await userSchema.findByIdAndUpdate(
      id, 
      { status: 'approved' }, 
      { new: true } 
    );

    if (!user) {
      return sendResponse(res, 400, "ไม่พบผู้ใช้", null);
    }

    sendResponse(res, 200, `ผู้ใช้งาน ${user.name} ได้รับการอนุมัติเรียบร้อยแล้ว`, { 
        id: user._id, 
        status: user.status 
    });

  } catch (err) {
    sendResponse(res, 500, "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน", null);
  }
});

module.exports = router;