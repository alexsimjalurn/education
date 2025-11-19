# 🖥️ แก้ปัญหา: หน้าจอดำ (Black Screen)

## 🔍 สาเหตุที่พบบ่อย

### 1. Background Image โหลดไม่ได้
**ปัญหา**: `BG.webp` อาจโหลดไม่ได้หรือมีปัญหา ทำให้หน้าไม่ render

**วิธีแก้** (ทำแล้ว):
- ✅ เพิ่ม CSS gradient fallback
- ✅ เพิ่ม `onError` handler เพื่อซ่อน image ถ้าโหลดไม่ได้
- ✅ ใช้ gradient background เป็น fallback

### 2. Vercel Deployment Issue
**ปัญหา**: Vercel อาจยังไม่ได้ rebuild หรือมี build error

**วิธีแก้**:
1. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. ตรวจสอบ deployment logs
3. ดูว่ามี build error หรือไม่
4. ถ้ามี error → แก้ไขและ redeploy

### 3. Image File ไม่มีใน Production
**ปัญหา**: ไฟล์ `.webp` อาจไม่ได้ถูก push ไป Vercel

**วิธีแก้**:
```bash
# ตรวจสอบว่าไฟล์มีใน git
git ls-files public/images/BG.webp

# ถ้าไม่มี → add และ push
git add public/images/BG.webp
git commit -m "Add BG.webp"
git push
```

### 4. JavaScript Error
**ปัญหา**: JavaScript error ที่ทำให้หน้าไม่ render

**วิธีตรวจสอบ**:
1. เปิด Browser DevTools (F12)
2. ไปที่ Console tab
3. ดูว่ามี error หรือไม่
4. ดูที่ Network tab ว่ามีไฟล์ไหนโหลดไม่ได้

### 5. Font Loading Issue
**ปัญหา**: Font โหลดช้าหรือ error

**วิธีแก้** (ทำแล้ว):
- ✅ ใช้ `display: 'swap'` - แสดง fallback font ก่อน
- ✅ ใช้ `adjustFontFallback: true`
- ✅ มี fallback fonts

---

## ✅ การแก้ไขที่ทำแล้ว

1. **เพิ่ม Background Fallback**:
   ```tsx
   {/* Fallback CSS gradient */}
   <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-60" />
   
   {/* Background Image */}
   <Image
     src="/images/BG.webp"
     onError={(e) => {
       e.currentTarget.style.display = 'none';
     }}
   />
   ```

2. **Error Handling**: เพิ่ม `onError` handler สำหรับ background image

---

## 🔧 วิธีตรวจสอบปัญหา

### 1. ตรวจสอบ Browser Console
```
1. เปิด DevTools (F12)
2. ไปที่ Console tab
3. ดูว่ามี error หรือไม่
```

### 2. ตรวจสอบ Network Tab
```
1. เปิด DevTools (F12)
2. ไปที่ Network tab
3. Reload หน้า (Ctrl+R)
4. ดูว่ามีไฟล์ไหนโหลดไม่ได้ (สีแดง)
```

### 3. ตรวจสอบ Vercel Logs
```
1. ไปที่ Vercel Dashboard
2. ดูที่ Deployments → Latest
3. ดูที่ Logs tab
4. ตรวจสอบว่ามี error หรือไม่
```

### 4. ตรวจสอบไฟล์ใน Production
```
1. ไปที่ https://education-gray-iota.vercel.app/images/BG.webp
2. ดูว่าไฟล์โหลดได้หรือไม่
3. ถ้าโหลดไม่ได้ → ไฟล์อาจไม่ได้ถูก deploy
```

---

## 🚀 วิธีแก้ไขทันที

### Option 1: ใช้ CSS Background แทน Image
```tsx
{/* ใช้ CSS gradient แทน image */}
<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-white opacity-60" />
```

### Option 2: ลบ Background Image ชั่วคราว
```tsx
{/* Comment out background image */}
{/* <Image src="/images/BG.webp" ... /> */}
```

### Option 3: ตรวจสอบและ Redeploy
```bash
# ตรวจสอบว่าไฟล์มีใน git
git ls-files public/images/

# ถ้าไม่มี → add และ push
git add public/images/
git commit -m "Add missing images"
git push

# รอให้ Vercel auto-deploy
```

---

## 📋 Checklist

- [ ] ตรวจสอบ Browser Console ว่ามี error หรือไม่
- [ ] ตรวจสอบ Network tab ว่ามีไฟล์ไหนโหลดไม่ได้
- [ ] ตรวจสอบ Vercel deployment logs
- [ ] ตรวจสอบว่าไฟล์ BG.webp มีใน production หรือไม่
- [ ] ทดสอบว่า fallback gradient แสดงหรือไม่
- [ ] ตรวจสอบว่า JavaScript bundle โหลดได้หรือไม่

---

## 🎯 ผลลัพธ์ที่คาดหวัง

หลังแก้ไข:
- ✅ หน้าเว็บควรแสดงผลได้ทันที (แม้ image โหลดไม่ได้)
- ✅ มี gradient fallback แสดงแทน
- ✅ ไม่มี black screen
- ✅ Console ไม่มี error

---

## 🆘 ถ้ายังแก้ไม่ได้

1. **ตรวจสอบ Vercel Build Logs**:
   - ไปที่ Vercel Dashboard → Deployments → Latest
   - ดู Build Logs ว่ามี error หรือไม่

2. **ตรวจสอบ Browser Console**:
   - เปิด DevTools → Console
   - ดู error messages

3. **ทดสอบ Local**:
   ```bash
   npm run build
   npm run start
   # เปิด http://localhost:3000
   ```

4. **ติดต่อ Support**:
   - Vercel Support: https://vercel.com/support
   - หรือตรวจสอบ Vercel Status: https://www.vercel-status.com/

