/*
callback --- callback in Node.js is a function that passed as argument to another function 
that is innvoked in that function to perform some operations


callbackHell --- callback hell in Node.js is when we have too many nested callbaked, it is not easy to read, bebug the code

*/

const fs = require('fs').promises

fs.readFile("input.txt", 'utf-8', (err, data1) =>{
    if(err) return console.log(err)
    
        fs.readFile('output.txt', 'utf-8', (err, data2) =>{
            if(err) return console.log(err)

                fs.readFile('input.txt', 'utf-8', (err, data3) =>{
                    if(err) return console.log(err)
                        console.log(data1, data2, data3)
                })
        })
})



/* to avoid the callback hell the best practice is use the async/await */

// const fs = require('fs').promises
async function ReadFile(){
    try {
        const d1 = await fs.readFile('input.txt', 'utf-8')
        const d2 = await fs.readFile('output.txt', 'utf-8')
console.log("using async/await")
        console.log(d1, d2)
    } catch (error) {
        console.log(error)
    }
}
ReadFile()


// Using promises

Promise.all(
    [
        fs.readFile('input.txt', 'utf-8'),
        fs.readFile("output.txt", 'utf-8')
    ]
).then(([d1, d2, d3]) => console.log(d1, d2, d3))
.catch(e=>console.log(e))