import {
  createNewMember,
  genAuthToken,
  signInWithEmailPassword,
} from "../service/auth.service";
const authController = {
  async register(req, res, next) {
    try {
      const member = await createNewMember(req, res);
      const token = await genAuthToken(member);
      res.cookie("x-access-token", token).status(200).send({
        member,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const member = await signInWithEmailPassword(email, password);
      const token = await genAuthToken(member);
      res.cookie("x-access-token", token).send({
        member,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async isauth(req, res, next) {
    res.json(req.member);
  },
};

module.exports = authController;
