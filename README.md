
# การตั้งค่าเว็บไซต์ shorturl สำหรับ front end



ตั้งค่าและใช้งานเซิร์ฟเวอร์สำหรับเว็บไซต์ย่อ URL ที่โฮสต์บน Netlify โดยใช้ตัวอย่างจาก https://burinshorturl.netlify.app
## สิ่งที่คุณต้องมี:
 - โปรแกรม Git
 - Node.js



## เริ่มต้นการใช้งาน
โคลน repository
```bash
git clone https://github.com/burinc51/ShortUrl-front.git
```
ติดตั้งแพ็กเกจ (packages)
```bash
cd ShortUrl-front
npm install
```
 เปลี่ยน url ที่ติดต่อกับฝั่ง back-end ที่บรรทัด 14 ที่ไฟล์ \src\component\form.js
```bash
const local = " url ที่ติดต่อกับฝั่ง back-end "
```
รันเว็บเซิร์ฟเวอร์
```bash
npm start
```
## repository ฝั่ง backend ของเว็บไซต์ shorturl
https://github.com/burinc51/ShortUrl-server.git
