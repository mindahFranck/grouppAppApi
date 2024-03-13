import env from "../../../config/env";

const jwt = require("jsonwebtoken");

const JWT8_SIGN_SECRET = env.JWT8_SIGN_SECRET;

module.exports = {
  generateTokenUser: function (userData: any) {
    return jwt.sign(
      {
        UserId: userData.id,
        Email: userData.email,
      },
      JWT8_SIGN_SECRET
    );
  },
};
