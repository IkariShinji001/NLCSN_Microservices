const buffetTicketService = require("../services/buffetTicket.service");

class buffetTicketController {
  async findAllBuffetTicket(req, res, next) {
    const query = req.query;
    console.log(query);
    try {
      let buffetTicket;
      if (Object.keys(query).length !== 0) {
        // Nếu có query được truyền vào từ request
        buffetTicket = await buffetTicketService.getBuffetTicketByName(
          query.buffet_ticket_name
        );
      } else {
        buffetTicket = await buffetTicketService.getAllBuffetTicket();
      }
      return res.status(200).json(buffetTicket);
    } catch (error) {
      next(error);
    }
  }

  async getBuffetTicketById(req, res, next) {
    try {
      const buffetTicket = await buffetTicketService.getBuffetTicketById(
        req.params.id
      );
      return res.status(200).json(buffetTicket);
    } catch (error) {
      next(error);
    }
  }

  async createBuffetTicket(req, res, next) {
    const payload = req.body;
    payload.buffet_ticket_img = req.cloudinary_secure_url;
    console.log(payload);
    try {
      const newTicket = await buffetTicketService.createBuffetTicket(payload);
      return res.status(200).json(newTicket);
    } catch (error) {
      next(error);
    }
  }

  async deleteBuffetTicketById(req, res, next) {
    try {
      await buffetTicketService.deleteBuffetTicket(req.params.id);
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      next(error);
    }
  }

  async updateBuffetTicketById(req, res, next) {
    const id = req.params.id;
    const payload = req.body;

    try {
      await buffetTicketService.updateBuffetTicket(id, payload);
      return res.status(200).json({ message: "Cập nhật thông tin thành công" });
    } catch (error) {
      next(error);
    }
  }

  async updateBuffetTicketImage(req, res, next) {
    const id = req.params.id;
    const image = req.cloudinary_secure_url;
    try {
      const updated = await buffetTicketService.updateBuffetTicket(id, {
        buffet_ticket_img: image,
      });
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new buffetTicketController();
