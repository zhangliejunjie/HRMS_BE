const roomRepository = require("../repository/room.repository");

const getAllRooms = async () => {
  try {
    const rooms = await roomRepository.getAllRooms();
    return rooms;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRooms,
};
