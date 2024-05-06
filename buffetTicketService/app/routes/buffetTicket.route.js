const express = require('express')
const router = express.Router();
const buffetTicketController = require('../controllers/buffetTicket.controller');
const uploadSingleImageCoudinary = require('../middlewares/uploadImage')
const upload = require('../middlewares/multer');


router.route('/')
  .get(buffetTicketController.findAllBuffetTicket)
  .post(upload.single('image'), uploadSingleImageCoudinary, buffetTicketController.createBuffetTicket)

router.route('/:id')
  .get(buffetTicketController.getBuffetTicketById) 
  .patch(buffetTicketController.updateBuffetTicketById)
  .delete(buffetTicketController.deleteBuffetTicketById)

router.route('/:id/image')
  .patch(upload.single('image'), uploadSingleImageCoudinary, buffetTicketController.updateBuffetTicketImage)


module.exports = router;
