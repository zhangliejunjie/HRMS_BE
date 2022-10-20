import {
  createNewMember,
  genAuthToken,
  signInWithEmailPassword,
  veriCode,
} from "../service/auth.service";
const authController = {
  async register(req, res, next) {
    try {
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      const member = await createNewMember(req, res);
      const token = await genAuthToken(member);
      res.cookie("sang", "sang dep chai");
      res.cookie("x-access-token", token).status(200).send({
        member,
        token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async verifyCode(req, res, next) {
    try {
      const ve = await veriCode(req, res);
      if (ve == 1) {
        return res.send("Verify code successfully")
      }
      return res.send("Verify code failed")
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
      // res.send({ error: error.statusCode, message: error.message });
    }
  },
  async isauth(req, res, next) {
    res.json(req.currentUser);
  },
};

module.exports = authController;
