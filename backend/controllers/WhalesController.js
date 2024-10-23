const NetworkServices = require('../services/NetworkServices')

const Network = require('../models/Network')
const { scheduleWhaleMonitoring } = require("../cron/index");
const { getTopWhales } = require("../cron/bitquery");

// ----------------- Owner ------------------ //
exports.getTopWhalesData = async (req, res) => {
    console.log("<-------------------------go top whales--------------->")
    const networkId = req.params.networkId;
    const whales = await getTopWhales(networkId, 10, 1000);
    res.status(200).json(whales)

}


exports.getNetworks = async (req, res) => {
    const networks = await Network.find({ "active": true })
    res.status(200).json(networks)
}

exports.saveNetwork = async (req, res) => {
    const network = await NetworkServices.saveNetwork(req.headers, req.body)
    scheduleWhaleMonitoring(network);
    res.status(200).json(network)
}

exports.updateNetwork = async (req, res) => {
    const network = await NetworkServices.updateNetwork(req.params.id, req.body)
    scheduleWhaleMonitoring(network);
    res.status(200).json(network)
}

exports.deleteNetwork = async (req, res) => {
    const networkId = req.params.id;
    const networks = await NetworkServices.deleteNetwork(req.params.id)
    scheduleWhaleMonitoring({ networkId }, true);

    res.status(200).json(networks)
}