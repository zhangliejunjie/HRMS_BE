import {
  createNewMember,
  genAuthToken,
  signInWithEmailPassword,
  veriCode,
  forgotPass,
  resetPass,
  setNewPassword
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
        return res.json("Verify code successfully")
      }
      return res.json("Verify code failed")
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



  //-----reset password------------------------


  async forgotPassword(req, res, next) {
    try {
      const forgetPass = await forgotPass(req.body)
      res.send(forgetPass)
    } catch (error) {
      next(error);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const resetPasss = await resetPass(req, res)
      return res.seng(resetPasss)
    } catch (error) {
      next(error);

    }
  },
  async setNewPassword(req, res, next) {
    try {
      const setNewPasswordd = await setNewPassword(req, res)
    } catch (error) {
      next(error);
    }
  }
};


module.exports = authController;
