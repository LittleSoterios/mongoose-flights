var express = require('express');
var router = express.Router();
const destinationCtrl = require('../controllers/destinations')


router.get('/flights/destinations/:id/edit', destinationCtrl.edit)
router.put('/flights/destinations/:id', destinationCtrl.update)

module.exports = router;