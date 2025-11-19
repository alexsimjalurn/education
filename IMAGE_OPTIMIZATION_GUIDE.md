# 🖼️ Image Optimization Guide

## 📋 สรุปการเปลี่ยนแปลง

โค้ดได้ถูกอัปเดตให้ใช้ `.webp` แทน `.png` และ `.jpg` แล้ว แต่คุณต้องแปลงไฟล์รูปภาพจริงๆ

## ✅ สิ่งที่ทำแล้ว

1. ✅ เปลี่ยน background image จาก CSS `bg-[url()]` เป็น Next.js `<Image>` component
2. ✅ เพิ่ม `loading="lazy"` สำหรับรูปภาพที่ไม่ได้อยู่ใน viewport
3. ✅ อัปเดต path ทั้งหมดเป็น `.webp`
4. ✅ ตั้งค่า `quality` ที่เหมาะสม (75-85)
5. ✅ ใช้ `priority` เฉพาะ hero image เท่านั้น

## 🔄 ไฟล์ที่ต้องแปลงเป็น .webp

### Background Image
- `public/images/BG.png` → `public/images/BG.webp`
  - **เป้าหมาย**: < 100 KB
  - **คำแนะนำ**: ใช้ quality 75-80

### Hero Section
- `public/images/hero-people.png` → `public/images/hero-people.webp`
  - **คำแนะนำ**: ใช้ quality 85

### Feature Icons
- `public/images/online-test.png` → `public/images/online-test.webp`
- `public/images/exam.png` → `public/images/exam.webp`
- `public/images/certification.png` → `public/images/certification.webp`
  - **คำแนะนำ**: ใช้ quality 80

### Course Images
- `public/images/course-1.jpg` → `public/images/course-1.webp`
- `public/images/course-2.jpg` → `public/images/course-2.webp`
- `public/images/course-3.jpg` → `public/images/course-3.webp`
  - **คำแนะนำ**: ใช้ quality 85

### Premium Highlights
- `public/images/hearts_.png` → `public/images/hearts_.webp`
- `public/images/jigsaw_.png` → `public/images/jigsaw_.webp`
  - **คำแนะนำ**: ใช้ quality 80

### Other Images
- `public/images/fullstack.jpg` → `public/images/fullstack.webp`
- `public/images/Phonesai.png` → `public/images/Phonesai.webp`
- `public/images/Oven.png` → `public/images/Oven.webp`
- `public/images/Heng.png` → `public/images/Heng.webp`
  - **คำแนะนำ**: ใช้ quality 85

## 🛠️ วิธีแปลงรูปภาพ

### วิธีที่ 1: ใช้ Online Tools (ง่ายที่สุด)

1. **Squoosh** (แนะนำ): https://squoosh.app/
   - ลากไฟล์เข้าไป
   - เลือก WebP
   - ปรับ quality ตามคำแนะนำด้านบน
   - ดาวน์โหลด

2. **CloudConvert**: https://cloudconvert.com/png-to-webp
   - อัปโหลดไฟล์
   - เลือก WebP format
   - ปรับ quality
   - แปลงและดาวน์โหลด

### วิธีที่ 2: ใช้ Command Line (สำหรับหลายไฟล์)

#### Windows (PowerShell)
```powershell
# ติดตั้ง ImageMagick ก่อน
# จากนั้นรัน:
magick convert "public/images/BG.png" -quality 75 "public/images/BG.webp"
```

#### macOS/Linux
```bash
# ติดตั้ง cwebp ก่อน: brew install webp (macOS) หรือ apt-get install webp (Linux)
cwebp -q 75 public/images/BG.png -o public/images/BG.webp
```

### วิธีที่ 3: ใช้ Node.js Script

สร้างไฟล์ `scripts/convert-to-webp.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const qualityMap = {
  'BG.png': 75,
  'hero-people.png': 85,
  'online-test.png': 80,
  'exam.png': 80,
  'certification.png': 80,
  'course-1.jpg': 85,
  'course-2.jpg': 85,
  'course-3.jpg': 85,
  'hearts_.png': 80,
  'jigsaw_.png': 80,
  'fullstack.jpg': 85,
  'Phonesai.png': 85,
  'Oven.png': 85,
  'Heng.png': 85,
};

async function convertToWebp() {
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    if (qualityMap[file]) {
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(imagesDir, file.replace(/\.(png|jpg)$/, '.webp'));
      
      await sharp(inputPath)
        .webp({ quality: qualityMap[file] })
        .toFile(outputPath);
      
      console.log(`✅ Converted: ${file} → ${path.basename(outputPath)}`);
    }
  }
}

convertToWebp().catch(console.error);
```

รัน:
```bash
npm install sharp --save-dev
node scripts/convert-to-webp.js
```

## 📊 ผลลัพธ์ที่คาดหวัง

- **ขนาดไฟล์ลดลง**: 70-80% จากไฟล์เดิม
- **โหลดเร็วขึ้น**: 70% เร็วกว่า PNG/JPG
- **Background image**: < 100 KB (จากเดิมอาจ 200-800 KB)
- **Lazy loading**: รูปภาพที่ไม่ได้อยู่ใน viewport จะโหลดเมื่อ scroll ถึง

## ⚠️ หมายเหตุ

1. **Backup ไฟล์เดิม**: เก็บไฟล์ PNG/JPG เดิมไว้ก่อน
2. **ทดสอบ**: ตรวจสอบว่ารูปภาพแสดงผลถูกต้อง
3. **Browser Support**: WebP รองรับใน browser ใหม่ๆ ทั้งหมด (95%+)
4. **Fallback**: Next.js Image จะ fallback อัตโนมัติถ้า browser ไม่รองรับ

## 🎯 Checklist

- [ ] แปลง `BG.png` → `BG.webp` (< 100 KB)
- [ ] แปลง `hero-people.png` → `hero-people.webp`
- [ ] แปลง feature icons (3 ไฟล์)
- [ ] แปลง course images (3 ไฟล์)
- [ ] แปลง premium highlight icons (2 ไฟล์)
- [ ] แปลง `fullstack.jpg` → `fullstack.webp`
- [ ] แปลง mentor images (3 ไฟล์)
- [ ] ทดสอบหน้าแรกว่าทุกรูปภาพแสดงผลถูกต้อง
- [ ] ตรวจสอบขนาดไฟล์รวม < 500 KB

## 📈 Performance Metrics

หลังจากการ optimize:
- **First Contentful Paint (FCP)**: ควรลดลง 30-50%
- **Largest Contentful Paint (LCP)**: ควรลดลง 40-60%
- **Total Page Size**: ควรลดลง 60-70%

