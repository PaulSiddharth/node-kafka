
const {kafka} = require("./client");


async function init() {
    const admin = kafka.admin();

    admin.connect();

    console.log("Admin connected");

    await admin.createTopics({
        // validateOnly: <boolean>,
        // waitForLeaders: <boolean>
        // timeout: <Number>,
        topics: [{
            topic: "rider-updates",
            numPartitions: 2
        }],
    })
    console.log('Topic created success');

    admin.disconnect();
}

init()