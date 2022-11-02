const roomRepository = require("../repository/room.repository");

const getAllRooms = async () => {
  try {
    const rooms = await roomRepository.getAllRooms();
    return rooms;
  } catch (error) {
    throw error;
  }
};

const createOnlineRoom = async (zoom_id, topic, start_url, join_url, pwd) => {
  try {
    const result = await roomRepository.createOnlineRoom(
      zoom_id,
      topic,
      start_url,
      join_url,
      pwd
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRooms,
  createOnlineRoom,
};
