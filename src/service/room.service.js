const httpStatus = require("http-status");
const roomRepository = require("../repository/room.repository");
import { ApiError } from "../middleware/apiError";
const getAllRooms = async () => {
  try {
    const rooms = await roomRepository.getAllRooms();
    return rooms;
  } catch (error) {
    throw error;
  }
};

const createOnlineRoom = async (
  interview_id,
  zoom_id,
  topic,
  start_url,
  join_url,
  pwd
) => {
  try {
    const findRoom = await roomRepository.getRoomByInterviewID(interview_id);
    if (findRoom) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This interview has online room before"
      );
    }
    const result = await roomRepository.createOnlineRoom(
      interview_id,
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
