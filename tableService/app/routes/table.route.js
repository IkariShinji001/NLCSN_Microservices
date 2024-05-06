const express = require('express')
const router = express.Router();
const tableController = require('../controllers/table.controller');

router.route('/')
  .get(tableController.getAll)
  .post(tableController.createTable);

router.route('/inuse')
  .get(tableController.getTotalTableInsuse)

router.route('/:id')
  .get(tableController.getTableById)
  .patch(tableController.activeTable)
  .put(tableController.updateTableById)
  .delete(tableController.deleteTableById)

router.route('/:id/change-table')
  .patch(tableController.changeTable)

router.route('/:id/area')
  .get(tableController.getTableAreaById)

module.exports = router;
