const express = require('express')
const router = express.Router()
const { ROLE } = require('../config/constant')

const AuthMiddleware = require('../middlewares/Authentication')
const WhalesController = require('../controllers/WhalesController')

// only owner is allowed.
// router.use(AuthMiddleware(ROLE.OWNER))

//------------ Network Routes ------------//
router.get('/getTopWhales/:networkId', WhalesController.getTopWhalesData)
router.get('/networks', WhalesController.getNetworks)
router.post('/networks', WhalesController.saveNetwork)
router.put('/networks/:id', WhalesController.updateNetwork)
router.delete('/networks/:id', WhalesController.deleteNetwork)

module.exports = router