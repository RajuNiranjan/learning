const buf1 = Buffer.alloc(10)

console.log("Allowcating Buffer size", buf1)

const buf2 = Buffer.from("ABCDEabcde")

console.log("Buffer from string", buf2)

const buf3 = Buffer.from("NodeJS")

console.log("Buffer to string", buf3.toString())

const buf4 = Buffer.alloc(5)
buf4.write("Hello")

console.log("write buffer", buf4.toString())


const buf5 = Buffer.from("ABC")

console.log(buf5[1])
console.log(buf5[2])


/*
Buffer is temparary storage for Binary data, data is not plain text formate
like image, video, files
*/