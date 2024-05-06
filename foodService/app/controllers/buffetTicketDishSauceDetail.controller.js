const BuffetTicketDishSauceDetailService = require("../services/buffetTicketDishSauceDetail.service");
class BuffetTicketDishSauceDetailController {

  async getAllTicketDishSauce(req,res, next){
    try {
      const DishSauce = await BuffetTicketDishSauceDetailService.getAllTicketDishSauce();
      return res.status(200).json(DishSauce);
    } catch (error) {
      next(error);
    }
  }


  async getAllTicketDishSauceById(req, res, next){
    const id = req.params.id;
    try {
      const TicketDishSauce = await BuffetTicketDishSauceDetailService.getTicketDishSauceById(id);
      return res.status(200).json(TicketDishSauce);
    } catch (error) {
      next(error);
    }
  }


  async addDishSauceToTiket(req, res, next) {
    const payload = req.body;
    const id = req.params.id;
    try {
      await BuffetTicketDishSauceDetailService.addDishSauceToTiket(id ,payload);
      return res.status(200).json({message: "Thêm thành công"});
    } catch (error) {
      next(error);
    }
  }

  async removeDishFromTicket(req, res, next) {
    try {
      await BuffetTicketDishSauceDetailService.removeDishFromTicket(req.body.dishId, req.params.id);
      return res.status(200).json({message: "Thêm thành công"});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BuffetTicketDishSauceDetailController();
