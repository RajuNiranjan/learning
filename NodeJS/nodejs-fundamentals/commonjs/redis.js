const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => console.error('Redis Error:', err));

(async () =>{
    await client.connect()

    await client.set("name", "John")

    const name = await client.get("name")

    console.log("Name", name)

    await client.del("name")

    await client.quit()
})()
