/**
 * Network Service
 *
 * This module provides various services for managing Network entities.
 * It includes functions to retrieve, create, update, and delete Network records.
 *
 * Dependencies:
 * - BadRequestError: Custom error classes for handling specific error cases.
 * - Network: Mongoose models for respective entities.
 *
 * Functions:
 * - saveNetwork: Creates a new network to inspect for whales.
 * - updateNetwork: Updates a network's details by their Network ID.
 * - deleteNetwork: Deletes a network by their Network ID.
 *
 * Each function handles specific error cases and throws appropriate errors when necessary.
 */

const {BadRequestError} = require('../utils/errors')

const Network = require('../models/Network')

// ----------------- Owner ------------------ //
exports.saveNetwork = async (header, body) => {
    console.log(body)
    const {networkId, name, rpc, explorer, whales} = body

    if (await Network.exists({networkId}))
        throw new BadRequestError('Network already exist.')

    const network = new Network({
        networkId,
        name,
        rpc,
        explorer,
        whales
    })

    await network.save()

    return network
}

exports.updateNetwork = async (id, body) => {
    const {name, rpc, explorer, active, wallets, whales} = body
    const network = await Network.findOne({networkId: id})

    const update_network = {
        ...network._doc,
        name: name ? name : network._doc.name,
        rpc: rpc ? rpc : network._doc.rpc,
        explorer: explorer ? explorer : network._doc.explorer,
        active: active ? active : network._doc.active,
        wallets: wallets ? wallets : network._doc.wallets,
        whales: whales ? whales : network._doc.whales,
    }

    await network.updateOne(update_network)

    return update_network
}

exports.deleteNetwork = async (id) => {
    console.log(id)

    return Network.deleteOne({networkId: id})
}