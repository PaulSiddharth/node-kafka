const {kafka} = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init(params) {
    const producer = kafka.producer();

    await producer.connect();
    console.log("producer connected..");

    rl.setPrompt(">");
    rl.prompt();

    rl.on('line', async function(line) {
        const [riderName, location] = line.split(' ');
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() == "north" ? 0 : 1,
                    key: 'location-update',
                    value:JSON.stringify({name:riderName, location:location}) },
            ],
        })
    }).on('close', async function (params) {
        await producer.disconnect();
        
    })

}
init()