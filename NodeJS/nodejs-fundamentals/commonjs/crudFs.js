const fs = require('fs')

// create a file and adding text Hello World!!

fs.writeFile("test.txt", "Hello World!!", 'utf-8', (err) =>{
    if(err) return console.log(err)

        console.log("file created successfully")
})

fs.writeFileSync("t.txt",'Hi John', 'utf-8')

// reading a file
fs.readFile('input.txt', 'utf-8', (err, data) =>{
    if(err) return console.log(err)
        console.log("Read input.txt file --->", data)
})

const data = fs.readFileSync('test.txt', 'utf-8')

console.log("data", data)


// append file
fs.appendFile("test.txt", "\nI am John Doe\n", 'utf-8', (err) =>{
    if(err) return console.log(err)
        console.log("data Appended")
})

// delete file

fs.unlink("t.txt",(err) =>{
    if(err) return console.log(err)
        console.log('filre removed successfully')
})

fs.unlinkSync("test.txt")