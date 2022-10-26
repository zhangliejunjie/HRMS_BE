import {
  createStaff,
  genAuthToken,
  signInWithEmailPassword,
} from "../service/staffAuth.service";
const staffAuth = {
  async register(req, res, next) {
    try {
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      const staff = await createStaff(req, res);
      const token = await genAuthToken(staff);

      res.cookie("x-access-token", token).status(200).send({
        staff,
        token,
      });
      console.log(staff);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const staff = await signInWithEmailPassword(email, password);
      const token = await genAuthToken(staff);
      res.cookie("x-access-token", token).send({
        staff,
        token,
      });
      console.log(staff);
    } catch (error) {
      next(error);
      // res.send({ error: error.statusCode, message: error.message });
    }
  },
  async isauth(req, res, next) {
    return res.json(req.currentUser);
  },
};

module.exports = staffAuth;
