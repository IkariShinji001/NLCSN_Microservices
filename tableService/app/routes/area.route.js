const express = require('express')
const router = express.Router();
const areaController = require('../controllers/area.controller');

router.route('/')
  .get(areaController.getAll)
  .post(areaController.createArea);

router.route('/:id')
  .patch(areaController.updateAreaById)
  .delete(areaController.deleteAreaById);

router.route('/:id/tables')
  .get(areaController.getAllTableByAreaId)

  router.route('/:id/tables/available')
  .get(areaController.getAvailableTablesByAreaId)

module.exports = router;
