const roomService = require("../service/room.service");

const handleGetAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = { handleGetAllRooms };
