const roomService = require("../service/room.service");

const handleGetAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const handleCreateOnlineRoom = async (req, res, next) => {
  try {
    const zoom_id = req.body.zoom_id;
    const topic = req.body.topic;
    const join_url = req.body.join_url;
    const start_url = req.body.start_url;
    const pwd = req.body.pwd;
    const interview_id = req.body.interview_id;
    const result = await roomService.createOnlineRoom(
      interview_id,
      zoom_id,
      topic,
      start_url,
      join_url,
      pwd
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { handleGetAllRooms, handleCreateOnlineRoom };
