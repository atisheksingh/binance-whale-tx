const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//------------ Network Schema ------------//
const NetworkSchema = new mongoose.Schema({
    networkId: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    rpc: {type: String, required: true},
    explorer: {type: String, required: true},
    active: {type: Boolean, default: true},
    wallets: {type: Object, default: null},
    whales: {
        type: Object,
        default: {
            cron: '0 */1 * * *', // every 1 hour.
            amount: 10, // amount of whales to track.
            balance: 100000, // minimum balance to be considered a whale.
        }
    },
}, {timestamps: true});

NetworkSchema.plugin(uniqueValidator, {message: 'is already configured.'});

const Network = mongoose.model('Network', NetworkSchema);

NetworkSchema.methods.toProfileJSONFor = function () {
    return {
        networkId: this.networkId,
        name: this.name,
        rpc: this.rpc,
        explorer: this.explorer,
        active: this.active,
        wallets: this.wallets,
        whales: this.whales,
    };
};

module.exports = Network;