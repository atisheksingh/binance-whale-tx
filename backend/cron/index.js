const cron = require('node-cron');
const {getTopWhales} = require('./bitquery');

const jobs = {};

function scheduleWhaleMonitoring(network, deleteJob) {
    if (jobs[network.networkId]) {
        console.log(`Stoping cron job for ${network.networkId}`);
        jobs[network.networkId].stop();
    }
    if (deleteJob) return delete jobs[network.networkId];

    console.log(`Scheduling cron job for ${network.name}`);
    jobs[network.networkId] = cron.schedule(network.whales.cron, async () => {
        console.log(`----------------- ${network.name} -----------------`);
        console.log(`Top "${network.whales.amount}" Whale Transactions:`);
        const whales = await getTopWhales(network.networkId, network.whales.amount, network.whales.balance);
        console.log(whales);
    });

    console.log(`Cron job for ${network.networkId} is running...`);
}

module.exports = {scheduleWhaleMonitoring};
