//global variable ประกาศด้วย var สามารถเรียกใช้งานได้ทุกที่
var foo = "Hello World"

//block scope variable เรียก ใช้งานได้เฉพาะในปีกกาเท่านั้น
let bar = 200
{
    let bar = 200
    const car =true
    
    console.log(bar)
    console.log(car)
}

//block scope & constant variable ประกาศเรียกแบบค่าคงที่ จะไม่สามารถเปลี่ยนแปลงค่ามันได้(ถ้าเราประกาศเรียกมัน)
const car = true

//ประกาศตัวแปร

var string = "hello" // string
var number = 100     //Number
var boolean = true   //boolean
var array = []       //array
var object = {}      //object
var func = function () {} //function


//ค่าว่าง
var x = null
var y = underfined

console.log(typeof(x))
console.log(typeof(y))

//คำสั่งในการดูประเภทตัวแปร
console.log(typeof(string))
console.log(typeof(number))
console.log(typeof(boolean))
console.log(typeof(array))
console.log(typeof(object))
console.log(typeof(func))

// if else

let x = 10
if(x >= 10){
    console.log("this is if")
} else{
    console.log("this is eles")
}

let x = 10
if(x >= 10){
    console.log("this is if")
} else if(x >= 5){
    console.log("this is eles if")
}else{
    console.log("this is eles")
}

//switch case
let x = 300
switch(x){
    case 100:
        console.log("x = ",x)
        break // ใช้จบการทำงานเมื่อเข้ามาใน case
    case 200:
        console.log("x = ",x)
        break
    case 300:
        console.log("x = ",x)
        break
    case 400:
        console.log("x = ",x)
    break
    default: //จะทำงานเมื่อไม่เข้าเงื่อนไขไหนเลย
        console.log("not in care")
    break
}

//for loop
    
for(let x = 0; x <= 10; x++){
    console.log(x)
}

//while loop เช็คเงื่อนไขก่อนทำ

let x = 10
while(x<=10){
    console.log(x)
    x++
}

// do while loop ทำก่อนเช็คเงื่อนไข

let y = 10
do{
    console.log(y)
    y++
}while(y <= 10)

//functions

function hello(){
    console.log("hellow world")
}

//เรียกใช้งาน
hello()

//function ที่รับค่า parameter
function add(x,y){
    console.log(x + y)
}

//function ที่มีการ return ค่ากลับ
function sum(x,y){
    return x + y
}
add(10,20)
let a = sum(10, 20)
console.log(a)

// import & export

var x = 100

//คำสั่งส่งออกช้อมูล
module.exports = x

//คำสั่งดึงข้อมูล
var x = require("./simple2")

console.log(x) //100


//String & array

let string1 = "hello"

let string2 = "world"

let string3 = '${string1} ${string2} !!!'

let string = "hello World !!!"
//คำสั่งดูจำนวนตัวอักษร
console.log(string.length)

//ลบช่องว่างหน้าหลัง
console.log(string.trim())

//ค้นหาคำ ผลลัพจะเป็นต่ำแหน่งที่เจอ
console.log(string.search("World"))

//แปลงตัวอักษรเป็นตัวพิมใหญ่
console.log(string.toUpperCase())

//แปลงตัวอักษรเป็นตัวพิมเล็ก
console.log(string.toLowerCase())

//แทนที่คำ
console.log(string.replace("hello","hi"))

let string2 = " hello hello hello World !!!"
//แทนที่คำทั้งหมด กับ regex
console.log(string2.replace(/hello/g,"hi"))

let array = [1,2,3,4,5]

//เพิ่มข้อมูลต่อท้าย
array.push(6)

//ดึงข้อมูลตัวสุดท้าย
array.pop()

//ดึงข้อมูลตัวหน้า
array.shift()

//เพิ่มข้อมูลข้างหน้า
array.push(0)

let array = [1,2,3,4,5,6,7,8,9,10]

for(let i = 0; i<array.length; i++){
    //ใช้ i เป็นเลข index ชี้ตำแหน่ง
    console.log(array[i])
}

for(let i of array)
    {    console.log(array[i])
}